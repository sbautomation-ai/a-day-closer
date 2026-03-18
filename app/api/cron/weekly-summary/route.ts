import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/db";
import { resolveUserToday, toEntryDate } from "@/lib/today";
import { authorizeCronRequest } from "@/lib/cron/auth";
import { buildWeeklySummaryEmail } from "@/lib/email/weeklySummary";

const FROM_ADDRESS = process.env.EMAIL_FROM ?? "A Day Closer <noreply@adaycloser.app>";
const DEFAULT_PLAN_SLUG = "core-365-day-journey";

export async function GET(request: Request) {
  if (!authorizeCronRequest(request)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "RESEND_API_KEY not configured" },
      { status: 503 }
    );
  }
  const resend = new Resend(apiKey);

  const usersWithSummary = await prisma.userSettings.findMany({
    where: { weeklySummaryEnabled: true },
    include: { user: { select: { id: true, email: true, name: true } } },
  });

  const plan = await prisma.readingPlan.findUnique({ where: { slug: DEFAULT_PLAN_SLUG } });

  let sent = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const settings of usersWithSummary) {
    const { user, timezone, dayRolloverTime, lastWeeklySentDate } = settings;

    try {
      // Deduplication: only send once every 7 days
      if (lastWeeklySentDate) {
        const daysSinceLast = Math.floor(
          (Date.now() - new Date(lastWeeklySentDate).getTime()) / (1000 * 60 * 60 * 24)
        );
        if (daysSinceLast < 7) {
          skipped++;
          continue;
        }
      }

      // Compute user's "today" and 7 days ago
      const userToday = resolveUserToday(timezone, dayRolloverTime);
      const sevenDaysAgo = new Date(userToday);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

      const daysCompleted = await prisma.entry.count({
        where: {
          userId: user.id,
          entryDate: { gte: sevenDaysAgo, lte: new Date(toEntryDate(userToday)) },
        },
      });

      // Fetch streak from progress
      const progress = plan
        ? await prisma.userPlanProgress.findUnique({
            where: { userId_planId: { userId: user.id, planId: plan.id } },
          })
        : null;

      // Send email
      const { to, subject, html } = buildWeeklySummaryEmail({
        userEmail: user.email,
        name: user.name,
        daysCompleted,
        currentStreak: progress?.currentStreak ?? 0,
        longestStreak: progress?.longestStreak ?? 0,
      });

      const { error } = await resend.emails.send({ from: FROM_ADDRESS, to, subject, html });
      if (error) {
        errors.push(`${user.email}: ${error.message}`);
        continue;
      }

      // Mark sent
      await prisma.userSettings.update({
        where: { userId: user.id },
        data: { lastWeeklySentDate: new Date(toEntryDate(userToday)) },
      });
      sent++;
    } catch (e) {
      errors.push(`${user.email}: ${e instanceof Error ? e.message : "unknown error"}`);
    }
  }

  return NextResponse.json({
    ok: true,
    sent,
    skipped,
    errors: errors.length > 0 ? errors : undefined,
  });
}
