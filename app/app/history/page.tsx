import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";
import { resolveUserToday } from "@/lib/today";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { HistoryList } from "./HistoryList";

const DEFAULT_PLAN_SLUG = "core-365-day-journey";
const PAGE_SIZE = 50;

export default async function HistoryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const plan = await prisma.readingPlan.findUnique({
    where: { slug: DEFAULT_PLAN_SLUG },
  });
  if (!plan) {
    return (
      <GlassCard className="px-6 py-6">
        <p className="text-white/60">No plan found.</p>
      </GlassCard>
    );
  }

  const progress = await prisma.userPlanProgress.findUnique({
    where: { userId_planId: { userId: user.id, planId: plan.id } },
  });

  const settings = await prisma.userSettings.findUnique({
    where: { userId: user.id },
  });
  const tz = settings?.timezone ?? null;
  const rollover = settings?.dayRolloverTime ?? null;
  const userToday = resolveUserToday(tz, rollover);
  const startOfMonth = new Date(userToday.getFullYear(), userToday.getMonth(), 1);
  const entriesThisMonth = await prisma.entry.count({
    where: {
      userId: user.id,
      entryDate: { gte: startOfMonth },
    },
  });

  const entries = await prisma.entry.findMany({
    where: { userId: user.id },
    include: { readingDay: true },
    orderBy: { entryDate: "desc" },
    take: PAGE_SIZE,
  });

  const hasMore = entries.length === PAGE_SIZE;
  const nextCursor =
    hasMore && entries.length > 0
      ? entries[entries.length - 1]!.entryDate.toISOString().slice(0, 10)
      : null;

  const stats = [
    { label: "Current streak", value: progress?.currentStreak ?? 0, unit: "days" },
    { label: "Longest streak", value: progress?.longestStreak ?? 0, unit: "days" },
    { label: "This month", value: entriesThisMonth, unit: "days read" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="px-1 text-2xl font-semibold text-white">History</h1>

      {/* Summary stats */}
      <GlassCard>
        <div className="border-b border-white/10 px-6 py-4">
          <p className="text-sm font-medium text-white/60">Overview</p>
        </div>
        <div className="grid gap-px sm:grid-cols-3">
          {stats.map(({ label, value, unit }, i) => (
            <div
              key={label}
              className={[
                "px-6 py-5",
                i < stats.length - 1 ? "border-b border-white/10 sm:border-b-0 sm:border-r" : "",
              ].join(" ")}
            >
              <p className="text-xs text-white/40">{label}</p>
              <p className="mt-1 text-3xl font-semibold text-white">{value}</p>
              <p className="text-xs text-white/30">{unit}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Entry list */}
      <GlassCard>
        <div className="border-b border-white/10 px-6 py-4">
          <p className="text-sm font-medium text-white/60">Past entries</p>
        </div>
        <HistoryList
          initialEntries={entries.map((e) => ({
            id: e.id,
            entryDate: e.entryDate,
            journalText: e.journalText,
            mood: e.mood,
            readingDay: e.readingDay,
          }))}
          nextCursor={nextCursor}
          userId={user.id}
        />
      </GlassCard>
    </div>
  );
}
