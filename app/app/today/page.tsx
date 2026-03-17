import { createClient } from "@/lib/supabase/server";
import { getTodayReading, getTodayEntry, toEntryDate } from "@/lib/today";
import { GlassCard } from "@/components/ui/GlassCard";
import { TodayClient } from "./TodayClient";

function formatBibleTextWithSuperscriptVerses(text: string): string {
  // Turn leading verse numbers like "1 Comfort..." into superscripts.
  // Also handles verse numbers after punctuation/newlines.
  return text.replace(/(^|[\s\u00A0])(\d+)(?=\s)/g, (match, before, num) => {
    return (
      before +
      `<sup class="align-super text-[0.65em] opacity-70 mr-1">${num}</sup>`
    );
  });
}

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
    <div className="mx-auto max-w-xl space-y-4">
      {/* Date + streak header row */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div>
          <h1 className="text-2xl font-semibold text-white">Today</h1>
          <p className="text-sm text-white/45">{todayLabel}</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
          <span className="font-medium text-white/80">
            {progress.currentStreak} day{progress.currentStreak === 1 ? "" : "s"}
          </span>
          {progress.longestStreak > 0 && (
            <span className="text-white/35">· best {progress.longestStreak}</span>
          )}
        </div>
      </div>

      {!readingDay ? (
        <GlassCard className="px-6 py-6">
          <p className="text-white/60">
            No reading is available for this season yet. Run the seed script to
            load the plan, or try again later.
          </p>
        </GlassCard>
      ) : (
        <GlassCard>
          {/* Scripture reference */}
          <div className="border-b border-white/10 px-6 py-5">
            <p className="text-xs font-medium uppercase tracking-wider text-white/40">
              {readingDay.season}
            </p>
            <p className="mt-1 text-xl font-semibold text-white">
              {readingDay.bibleReference}
            </p>
          </div>

          <div className="space-y-6 px-6 py-5">
            {/* Bible text */}
            {("bibleText" in readingDay && (readingDay as any).bibleText) && (
              <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-4 text-sm leading-relaxed text-white/80 backdrop-blur-sm">
                <p
                  className="whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{
                    __html: formatBibleTextWithSuperscriptVerses(
                      (readingDay as any).bibleText as string
                    ),
                  }}
                />
              </div>
            )}

            {/* Explanation */}
            {readingDay.explanation ? (
              <p className="text-sm leading-relaxed text-white/70 whitespace-pre-wrap">
                {readingDay.explanation}
              </p>
            ) : (
              <p className="text-sm italic text-white/35">
                (No explanation yet for this reading.)
              </p>
            )}

            {/* Reflection prompts */}
            {Array.isArray(readingDay.reflectionPrompts) &&
            (readingDay.reflectionPrompts as string[]).length > 0 ? (
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/40">
                  Reflect
                </p>
                <ul className="space-y-2">
                  {(readingDay.reflectionPrompts as string[]).map((p, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-white/65">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Divider */}
            <div className="border-t border-white/10" />

            {/* Journal + mood + save */}
            <TodayClient
              userId={user.id}
              readingDayId={readingDay.id}
              defaultJournal={existingEntry?.journalText ?? ""}
              defaultMood={existingEntry?.mood ?? null}
              alreadyCompleted={!!existingEntry}
            />
          </div>
        </GlassCard>
      )}
    </div>
  );
}
