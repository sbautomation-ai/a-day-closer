import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

const DEFAULT_PLAN_SLUG = "core-365-day-journey";

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
      <Card>
        <CardContent className="pt-6">
          <p className="text-zinc-600 dark:text-zinc-400">No plan found.</p>
        </CardContent>
      </Card>
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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
        History
      </h1>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            Summary
          </h2>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Current streak
            </p>
            <p className="text-2xl font-semibold">
              {progress?.currentStreak ?? 0}
            </p>
          </div>
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Longest streak
            </p>
            <p className="text-2xl font-semibold">
              {progress?.longestStreak ?? 0}
            </p>
          </div>
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Days read this month
            </p>
            <p className="text-2xl font-semibold">{entriesThisMonth}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            Past entries
          </h2>
        </CardHeader>
        <CardContent>
          {entries.length === 0 ? (
            <p className="text-zinc-500 dark:text-zinc-400">
              No entries yet. Complete a day on the Today page to see it here.
            </p>
          ) : (
            <ul className="divide-y divide-zinc-200 dark:divide-zinc-700">
              {entries.map((entry: { id: string; entryDate: Date; journalText: string; mood: number | null; readingDay: { bibleReference: string } }) => {
                const dateStr = entry.entryDate.toISOString().slice(0, 10);
                return (
                  <li key={entry.id}>
                    <Link
                      href={`/app/history/${entry.id}`}
                      className="flex items-center justify-between gap-4 py-3 text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-zinc-900 dark:text-zinc-100">
                          {dateStr}
                        </p>
                        <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">
                          {entry.readingDay.bibleReference}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {entry.mood != null && (
                          <span className="text-sm text-zinc-500">
                            {MOOD_LABELS[entry.mood] ?? entry.mood}
                          </span>
                        )}
                        <span className="text-zinc-400 dark:text-zinc-500">
                          ✓
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
