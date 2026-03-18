import { createClient } from "@/lib/supabase/server";
import { getTodayReading, getTodayEntry, toEntryDate, resolveUserToday } from "@/lib/today";
import { GlassCard } from "@/components/ui/GlassCard";
import { TodayClient } from "./TodayClient";
import { CopyVerseButton } from "@/components/today/CopyVerseButton";
import { prisma } from "@/lib/db";

function formatBibleTextWithSuperscriptVerses(text: string): string {
  return text.replace(/(^|[\s\u00A0])(\d+)(?=\s)/g, (match, before, num) => {
    return (
      before +
      `<sup class="align-super text-[0.65em] opacity-70 mr-1">${num}</sup>`
    );
  });
}

const TEXT_SIZE_CLASSES: Record<string, string> = {
  small: "text-xs leading-relaxed",
  default: "text-sm leading-relaxed",
  large: "text-base leading-loose",
};

export default async function TodayPage() {
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
  const textSize = settings?.textSize ?? "default";
  const highContrast = settings?.highContrastReading ?? false;

  const [todayData, existingEntry] = await Promise.all([
    getTodayReading(user.id, tz, rollover),
    getTodayEntry(user.id, tz, rollover),
  ]);

  const { readingDay, progress } = todayData;
  const todayLabel = toEntryDate(resolveUserToday(tz, rollover));

  const textCls = TEXT_SIZE_CLASSES[textSize] ?? TEXT_SIZE_CLASSES.default;

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
        <GlassCard className="px-6 py-8 text-center">
          <p className="text-base font-medium text-white/70">
            We&apos;re still preparing this season&apos;s readings.
          </p>
          <p className="mt-2 text-sm text-white/40">
            Check back soon — or browse your{" "}
            <a
              href="/app/history"
              className="font-medium text-indigo-300 underline underline-offset-2 hover:text-indigo-200"
            >
              past entries
            </a>{" "}
            in the meantime.
          </p>
        </GlassCard>
      ) : (
        <GlassCard className={highContrast ? "bg-white/[0.13]" : ""}>
          {/* Scripture reference */}
          <div className="border-b border-white/10 px-6 py-5">
            <p className="text-xs font-medium uppercase tracking-wider text-white/40">
              {readingDay.season}
            </p>
            <div className="mt-1 flex flex-wrap items-start justify-between gap-3">
              <p className="text-xl font-semibold text-white">
                {readingDay.bibleReference}
              </p>
              {("bibleText" in readingDay && (readingDay as any).bibleText) && (
                <CopyVerseButton
                  reference={readingDay.bibleReference}
                  bibleText={(readingDay as any).bibleText as string}
                  appUrl={process.env.NEXT_PUBLIC_APP_URL}
                />
              )}
            </div>
          </div>

          <div className="space-y-6 px-6 py-5">
            {/* Bible text */}
            {("bibleText" in readingDay && (readingDay as any).bibleText) && (
              <div className={`rounded-xl border border-white/10 bg-black/30 px-4 py-4 backdrop-blur-sm ${highContrast ? "text-white/95" : "text-white/80"}`}>
                <p
                  className={textCls}
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
              <p className={`${textCls} ${highContrast ? "text-white/85" : "text-white/70"} whitespace-pre-wrap`}>
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
                    <li key={i} className={`flex gap-2.5 ${textCls} ${highContrast ? "text-white/80" : "text-white/65"}`}>
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
              textSize={textSize}
              timezone={tz}
              dayRolloverTime={rollover}
            />
          </div>
        </GlassCard>
      )}
    </div>
  );
}
