import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

const DEFAULT_PLAN_SLUG = "core-365-day-journey";

type DayCell = {
  date: Date;
  hasEntry: boolean;
};

function buildMonthGrid(entries: Date[]): DayCell[] {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const start = new Date(year, month, 1);
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
      <Card>
        <CardContent className="pt-6">
          <p className="text-zinc-600 dark:text-zinc-400">
            No plan found. Run the seed script to create the default plan.
          </p>
        </CardContent>
      </Card>
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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
        Progress
      </h1>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            Streak
          </h2>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Current streak
            </p>
            <p className="text-3xl font-semibold">
              {progress?.currentStreak ?? 0}
            </p>
          </div>
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Longest streak
            </p>
            <p className="text-3xl font-semibold">
              {progress?.longestStreak ?? 0}
            </p>
          </div>
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Days read this month
            </p>
            <p className="text-3xl font-semibold">
              {monthEntries.length}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            Calendar
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {monthLabel}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 text-center text-xs text-zinc-500 dark:text-zinc-400">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-7 gap-2 text-center text-sm">
            {(() => {
              const firstWeekday = startOfMonth.getDay();
              const blanks = Array.from({ length: firstWeekday }, (_, i) => (
                <div key={`blank-${i}`} />
              ));
              return [
                ...blanks,
                ...grid.map((cell) => {
                  const day = cell.date.getDate();
                  const key = cell.date.toISOString().slice(0, 10);
                  const isToday =
                    cell.date.toDateString() === now.toDateString();
                  return (
                    <div
                      key={key}
                      className={[
                        "flex h-9 items-center justify-center rounded-md border text-xs font-medium",
                        cell.hasEntry
                          ? "border-emerald-500 bg-emerald-50 text-emerald-800 dark:border-emerald-400/80 dark:bg-emerald-900/40 dark:text-emerald-100"
                          : "border-zinc-200 bg-white text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400",
                        isToday ? "ring-2 ring-emerald-500 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-950" : "",
                      ].join(" ")}
                    >
                      {day}
                    </div>
                  );
                }),
              ];
            })()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

