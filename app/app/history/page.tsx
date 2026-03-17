import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";

const DEFAULT_PLAN_SLUG = "core-365-day-journey";

const MOOD_EMOJI: Record<number, string> = {
  1: "😔",
  2: "😕",
  3: "😐",
  4: "🙂",
  5: "😊",
};

const MOOD_LABELS: Record<number, string> = {
  1: "Struggling",
  2: "Low",
  3: "Okay",
  4: "Good",
  5: "Great",
};

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

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
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
    take: 100,
  });

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
        {entries.length === 0 ? (
          <div className="px-6 py-8 text-center">
            <p className="text-sm text-white/40">
              No entries yet. Complete a day on the Today page to see it here.
            </p>
          </div>
        ) : (
          <ul>
            {entries.map(
              (entry: {
                id: string;
                entryDate: Date;
                journalText: string;
                mood: number | null;
                readingDay: { bibleReference: string };
              }, idx) => {
                const dateStr = entry.entryDate.toISOString().slice(0, 10);
                return (
                  <li key={entry.id}>
                    <Link
                      href={`/app/history/${entry.id}`}
                      className={[
                        "flex items-center justify-between gap-4 px-6 py-4 transition-all duration-150",
                        "hover:bg-white/[0.05]",
                        idx < entries.length - 1 ? "border-b border-white/[0.07]" : "",
                      ].join(" ")}
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-white/80">{dateStr}</p>
                        <p className="truncate text-sm text-white/40">
                          {entry.readingDay.bibleReference}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        {entry.mood != null && (
                          <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-xs text-white/50">
                            <span aria-hidden>{MOOD_EMOJI[entry.mood]}</span>
                            {MOOD_LABELS[entry.mood] ?? entry.mood}
                          </span>
                        )}
                        <span className="text-indigo-400/60 text-sm">✓</span>
                      </div>
                    </Link>
                  </li>
                );
              }
            )}
          </ul>
        )}
      </GlassCard>
    </div>
  );
}
