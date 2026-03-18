import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";
import { resolveUserToday } from "@/lib/today";
import { GlassCard, GlassCardHeader, GlassCardContent } from "@/components/ui/GlassCard";
import { MonthNavigator } from "./ProgressPageContent";

const DEFAULT_PLAN_SLUG = "core-365-day-journey";

type DayCell = {
  date: Date;
  hasEntry: boolean;
};

/** Build grid for a given year/month. */
function buildMonthGrid(year: number, month: number, entries: Date[]): DayCell[] {
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

/** Parse ?month=YYYY-MM; returns null if invalid. */
function parseMonthParam(monthParam: string | undefined): { year: number; month: number } | null {
  if (!monthParam || !/^\d{4}-\d{2}$/.test(monthParam)) return null;
  const [y, m] = monthParam.split("-").map(Number);
  if (m < 1 || m > 12) return null;
  return { year: y, month: m - 1 };
}

type Props = {
  searchParams: Promise<{ month?: string }>;
};

export default async function ProgressPage({ searchParams }: Props) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const settings = await prisma.userSettings.findUnique({
    where: { userId: user.id },
  });
  const tz = settings?.timezone ?? null;
  const rollover = settings?.dayRolloverTime ?? null;

  const userToday = resolveUserToday(tz, rollover);
  const userTodayYear = userToday.getFullYear();
  const userTodayMonth = userToday.getMonth();

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

  const params = await searchParams;
  const parsed = parseMonthParam(params.month);
  const year = parsed?.year ?? userTodayYear;
  const month = parsed?.month ?? userTodayMonth;

  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0);

  const monthEntries = await prisma.entry.findMany({
    where: {
      userId: user.id,
      entryDate: { gte: startOfMonth, lte: endOfMonth },
    },
    select: { entryDate: true },
  });

  const grid = buildMonthGrid(year, month, monthEntries.map((e) => e.entryDate));
  const firstWeekday = startOfMonth.getDay();

  const stats = [
    { label: "Current streak", value: progress?.currentStreak ?? 0 },
    { label: "Longest streak", value: progress?.longestStreak ?? 0 },
    { label: "Days this month", value: monthEntries.length },
  ];

  const isUserToday = (d: Date) =>
    d.getFullYear() === userTodayYear &&
    d.getMonth() === userTodayMonth &&
    d.getDate() === userToday.getDate();

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h1 className="px-1 text-2xl font-semibold text-white">Progress</h1>

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

      <GlassCard>
        <GlassCardHeader>
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-white/60">Calendar</p>
            <MonthNavigator
              year={year}
              month={month}
              userTodayYear={userTodayYear}
              userTodayMonth={userTodayMonth}
            />
          </div>
        </GlassCardHeader>
        <GlassCardContent>
          <div className="mb-2 grid grid-cols-7 gap-1.5 text-center">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div key={d} className="text-xs text-white/30">
                {d}
              </div>
            ))}
          </div>
          {monthEntries.length === 0 ? (
            <p className="py-8 text-center text-sm text-white/40">No entries this month.</p>
          ) : (
            <div className="grid grid-cols-7 gap-1.5 text-center text-sm">
              {Array.from({ length: firstWeekday }, (_, i) => (
                <div key={`blank-${i}`} />
              ))}
              {grid.map((cell) => {
                const day = cell.date.getDate();
                const key = cell.date.toISOString().slice(0, 10);
                const isToday = isUserToday(cell.date);
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
          )}
        </GlassCardContent>
      </GlassCard>
    </div>
  );
}
