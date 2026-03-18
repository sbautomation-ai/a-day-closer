import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/db";
import { resolveUserToday, toEntryDate } from "@/lib/today";
import { authorizeCronRequest } from "@/lib/cron/auth";
import { buildReminderEmail } from "@/lib/email/reminder";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_ADDRESS = process.env.EMAIL_FROM ?? "A Day Closer <noreply@adaycloser.app>";

/**
 * Returns true if the user's preferred reminder time hour (in their timezone)
 * matches the current hour in their timezone.
 */
function isReminderHour(
  preferredReminderTime: string,
  timezone: string | null
): boolean {
  const tz = timezone ?? "UTC";
  const [prefHourStr] = preferredReminderTime.split(":");
  const prefHour = parseInt(prefHourStr ?? "0", 10);

  const nowInTz = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour: "numeric",
    hour12: false,
  }).format(new Date());

  const currentHour = parseInt(nowInTz, 10);
  return currentHour === prefHour;
}

/**
 * Returns true if today (in user's timezone) should be a reminder day
 * given their frequency setting.
 */
function isReminderDay(
  frequency: string | null,
  timezone: string | null
): boolean {
  if (!frequency || frequency === "off") return false;
  if (frequency === "daily") return true;
  if (frequency === "weekdays") {
    const tz = timezone ?? "UTC";
    const dayOfWeek = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      weekday: "short",
    }).format(new Date());
    // Mon–Fri = weekdays
    return !["Sat", "Sun"].includes(dayOfWeek);
  }
  return false;
}

export async function GET(request: Request) {
  if (!authorizeCronRequest(request)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const usersWithReminders = await prisma.userSettings.findMany({
    where: { emailReminderEnabled: true, preferredReminderTime: { not: null } },
    include: { user: { select: { id: true, email: true, name: true } } },
  });

  let sent = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const settings of usersWithReminders) {
    const { user, preferredReminderTime, timezone, dayRolloverTime, emailReminderFrequency } = settings;

    try {
      // Guard: preferred time must be valid HH:mm
      if (!preferredReminderTime || !/^\d{2}:\d{2}$/.test(preferredReminderTime)) {
        skipped++;
        continue;
      }

      // Check reminder day (daily vs weekdays)
      if (!isReminderDay(emailReminderFrequency, timezone)) {
        skipped++;
        continue;
      }

      // Check hour matches in user's timezone
      if (!isReminderHour(preferredReminderTime, timezone)) {
        skipped++;
        continue;
      }

      // Deduplication: skip if already sent today
      const userToday = resolveUserToday(timezone, dayRolloverTime);
      const todayStr = toEntryDate(userToday);
      if (
        settings.lastReminderSentDate &&
        toEntryDate(settings.lastReminderSentDate) === todayStr
      ) {
        skipped++;
        continue;
      }

      // Check if today's reading is already completed
      const todayEntry = await prisma.entry.findFirst({
        where: { userId: user.id, entryDate: new Date(todayStr) },
      });
      if (todayEntry) {
        skipped++;
        continue;
      }

      // Send email
      const { to, subject, html } = buildReminderEmail(user.email, user.name);
      const { error } = await resend.emails.send({ from: FROM_ADDRESS, to, subject, html });
      if (error) {
        errors.push(`${user.email}: ${error.message}`);
        continue;
      }

      // Mark sent
      await prisma.userSettings.update({
        where: { userId: user.id },
        data: { lastReminderSentDate: new Date(todayStr) },
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
