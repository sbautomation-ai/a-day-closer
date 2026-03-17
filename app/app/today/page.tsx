import { createClient } from "@/lib/supabase/server";
import { getTodayReading, getTodayEntry, toEntryDate } from "@/lib/today";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { TodayClient } from "./TodayClient";

export default async function TodayPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const [todayData, existingEntry] = await Promise.all([
    getTodayReading(user.id),
    getTodayEntry(user.id),
  ]);

  const { readingDay, progress } = todayData;
  const todayLabel = toEntryDate(new Date());

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            Today
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {todayLabel}
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200">
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Streak
          </span>
          <span className="text-sm font-semibold">
            {progress.currentStreak} day
            {progress.currentStreak === 1 ? "" : "s"}
          </span>
          {progress.longestStreak > 0 && (
            <span className="text-zinc-400 dark:text-zinc-500">
              best {progress.longestStreak}
            </span>
          )}
        </div>
      </div>

      {!readingDay ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-zinc-600 dark:text-zinc-400">
              No reading is available for this season yet. Run the seed script to load the plan, or try again later.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="border-b border-zinc-100 pb-3 dark:border-zinc-800">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {readingDay.season}
            </p>
            <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {readingDay.bibleReference}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {("bibleText" in readingDay && (readingDay as any).bibleText) && (
              <div className="rounded-md bg-zinc-900/95 px-4 py-3 text-sm leading-relaxed text-zinc-100 shadow-sm dark:bg-zinc-900">
                <p className="whitespace-pre-wrap">
                  {(readingDay as any).bibleText as string}
                </p>
              </div>
            )}
            {readingDay.explanation ? (
              <p className="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
                {readingDay.explanation}
              </p>
            ) : (
              <p className="italic text-zinc-500 dark:text-zinc-400">
                (No explanation yet for this reading.)
              </p>
            )}

            {Array.isArray(readingDay.reflectionPrompts) &&
            (readingDay.reflectionPrompts as string[]).length > 0 ? (
              <ul className="list-inside list-disc space-y-1 text-zinc-700 dark:text-zinc-300">
                {(readingDay.reflectionPrompts as string[]).map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            ) : null}

            <TodayClient
              userId={user.id}
              readingDayId={readingDay.id}
              defaultJournal={existingEntry?.journalText ?? ""}
              defaultMood={existingEntry?.mood ?? null}
              alreadyCompleted={!!existingEntry}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
