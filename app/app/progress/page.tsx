import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";
import { GlassCard, GlassCardHeader, GlassCardContent } from "@/components/ui/GlassCard";

const DEFAULT_PLAN_SLUG = "core-365-day-journey";

type DayCell = {
  date: Date;
  hasEntry: boolean;
};

function buildMonthGrid(entries: Date[]): DayCell[] {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const end = new Date(year, month + 1, 0);

  const entrySet = new Set(entries.map((d) => d.toISOString().slice(0, 10)));
  const cells: DayCell[] = [];
  for (let day = 1; day <= end.getDate(); day++) {
    const d = new Date(year, month, day);
    cells.push({
      date: d,
      hasEntry: entrySet.has(d.toISOString().slice(0, 10)),
    });
  }
  return cells;
}

export default async function ProgressPage() {
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
      <GlassCard>
        <GlassCardContent>
          <p className="text-white/60">
            No plan found. Run the seed script to create the default plan.
          </p>
        </GlassCardContent>
      </GlassCard>
    );
  }

  const progress = await prisma.userPlanProgress.findUnique({
    where: { userId_planId: { userId: user.id, planId: plan.id } },
  });

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const monthEntries = await prisma.entry.findMany({
    where: {
      userId: user.id,
      entryDate: { gte: startOfMonth, lte: endOfMonth },
    },
    select: { entryDate: true },
  });

  const grid = buildMonthGrid(monthEntries.map((e) => e.entryDate));
  const monthLabel = now.toLocaleString(undefined, {
    month: "long",
    year: "numeric",
  });

  const startOfMonth2 = new Date(now.getFullYear(), now.getMonth(), 1);
  const firstWeekday = startOfMonth2.getDay();

  const stats = [
    { label: "Current streak", value: progress?.currentStreak ?? 0 },
    { label: "Longest streak", value: progress?.longestStreak ?? 0 },
    { label: "Days this month", value: monthEntries.length },
  ];

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h1 className="px-1 text-2xl font-semibold text-white">Progress</h1>

      {/* Streak stats */}
      <GlassCard>
        <div className="border-b border-white/10 px-6 py-4">
          <p className="text-sm font-medium text-white/60">Streak</p>
        </div>
        <div className="grid grid-cols-3 gap-px">
          {stats.map(({ label, value }, i) => (
            <div
              key={label}
              className={[
                "px-5 py-5",
                i < stats.length - 1 ? "border-r border-white/10" : "",
              ].join(" ")}
            >
              <p className="text-xs text-white/40">{label}</p>
              <p className="mt-1 text-3xl font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Monthly calendar */}
      <GlassCard>
        <GlassCardHeader>
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-medium text-white/60">Calendar</p>
            <p className="text-xs text-white/35">{monthLabel}</p>
          </div>
        </GlassCardHeader>
        <GlassCardContent>
          {/* Day labels */}
          <div className="mb-2 grid grid-cols-7 gap-1.5 text-center">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div key={d} className="text-xs text-white/30">
                {d}
              </div>
            ))}
          </div>
          {/* Day cells */}
          <div className="grid grid-cols-7 gap-1.5 text-center text-sm">
            {Array.from({ length: firstWeekday }, (_, i) => (
              <div key={`blank-${i}`} />
            ))}
            {grid.map((cell) => {
              const day = cell.date.getDate();
              const key = cell.date.toISOString().slice(0, 10);
              const isToday = cell.date.toDateString() === now.toDateString();
              return (
                <div
                  key={key}
                  className={[
                    "flex h-9 items-center justify-center rounded-lg text-xs font-medium border transition-colors",
                    cell.hasEntry
                      ? "border-indigo-400/40 bg-indigo-500/25 text-indigo-200"
                      : "border-white/10 bg-white/[0.04] text-white/35",
                    isToday
                      ? "ring-1 ring-indigo-400 ring-offset-1 ring-offset-transparent"
                      : "",
                  ].join(" ")}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </GlassCardContent>
      </GlassCard>
    </div>
  );
}
