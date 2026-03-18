import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { GlassCard, GlassCardContent, GlassCardHeader } from "@/components/ui/GlassCard";
import { CopyVerseButton } from "@/components/today/CopyVerseButton";

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

const TEXT_SIZE_CLASSES: Record<string, string> = {
  small: "text-xs leading-relaxed",
  default: "text-sm leading-relaxed",
  large: "text-base leading-loose",
};

function formatBibleTextWithSuperscriptVerses(text: string): string {
  return text.replace(/(^|[\s\u00A0])(\d+)(?=\s)/g, (match, before, num) => {
    return (
      before +
      `<sup class="align-super text-[0.65em] opacity-70 mr-1">${num}</sup>`
    );
  });
}

export default async function EntryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { id } = await params;

  const [entry, settings] = await Promise.all([
    prisma.entry.findFirst({
      where: { id, userId: user.id },
      include: { readingDay: true },
    }),
    prisma.userSettings.findUnique({ where: { userId: user.id } }),
  ]);

  if (!entry) notFound();

  const [prevEntry, nextEntry] = await Promise.all([
    prisma.entry.findFirst({
      where: { userId: user.id, entryDate: { lt: entry.entryDate } },
      orderBy: { entryDate: "desc" },
      select: { id: true },
    }),
    prisma.entry.findFirst({
      where: { userId: user.id, entryDate: { gt: entry.entryDate } },
      orderBy: { entryDate: "asc" },
      select: { id: true },
    }),
  ]);

  const dateStr = entry.entryDate.toISOString().slice(0, 10);
  const prompts = Array.isArray(entry.readingDay.reflectionPrompts)
    ? (entry.readingDay.reflectionPrompts as string[])
    : [];

  const textSize = settings?.textSize ?? "default";
  const highContrast = settings?.highContrastReading ?? false;
  const textCls = TEXT_SIZE_CLASSES[textSize] ?? TEXT_SIZE_CLASSES.default;

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Link
          href="/app/history"
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-white/50 transition-colors hover:bg-white/10 hover:text-white"
        >
          ← History
        </Link>
        <div className="flex items-center gap-2">
          {prevEntry ? (
            <Link
              href={`/app/history/${prevEntry.id}`}
              className="rounded-full px-3 py-1.5 text-sm text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            >
              ← Previous
            </Link>
          ) : null}
          {nextEntry ? (
            <Link
              href={`/app/history/${nextEntry.id}`}
              className="rounded-full px-3 py-1.5 text-sm text-white/50 transition-colors hover:bg-white/10 hover:text-white"
            >
              Next →
            </Link>
          ) : null}
        </div>
      </div>

      <GlassCard className={highContrast ? "bg-white/[0.13]" : ""}>
        <GlassCardHeader>
          <p className="text-xs text-white/40">
            {dateStr} · {entry.readingDay.season}
          </p>
          <div className="mt-0.5 flex flex-wrap items-start justify-between gap-3">
            <h1 className="text-xl font-semibold text-white">
              {entry.readingDay.bibleReference}
            </h1>
            {"bibleText" in entry.readingDay && entry.readingDay.bibleText && (
              <CopyVerseButton
                reference={entry.readingDay.bibleReference}
                bibleText={entry.readingDay.bibleText as string}
                appUrl={process.env.NEXT_PUBLIC_APP_URL}
              />
            )}
          </div>
        </GlassCardHeader>
        <GlassCardContent className="space-y-5">
          {"bibleText" in entry.readingDay && entry.readingDay.bibleText && (
            <div className={`rounded-xl border border-white/10 bg-black/30 px-4 py-4 backdrop-blur-sm ${highContrast ? "text-white/95" : "text-white/80"}`}>
              <p
                className={textCls}
                dangerouslySetInnerHTML={{
                  __html: formatBibleTextWithSuperscriptVerses(
                    entry.readingDay.bibleText as string
                  ),
                }}
              />
            </div>
          )}
          {entry.readingDay.explanation && (
            <p className={`whitespace-pre-wrap ${textCls} ${highContrast ? "text-white/85" : "text-white/65"}`}>
              {entry.readingDay.explanation}
            </p>
          )}
          {prompts.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/40">
                Reflection prompts
              </p>
              <ul className="space-y-2">
                {prompts.map((p, i) => (
                  <li key={i} className={`flex gap-2.5 ${textCls} ${highContrast ? "text-white/80" : "text-white/65"}`}>
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {entry.mood != null && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/40">Mood</span>
              <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-xs text-white/60">
                <span aria-hidden>{MOOD_EMOJI[entry.mood]}</span>
                {MOOD_LABELS[entry.mood] ?? entry.mood}
              </span>
            </div>
          )}
          {entry.journalText && (
            <div className="border-t border-white/10 pt-5">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-white/40">
                Journal
              </p>
              <p className={`whitespace-pre-wrap ${textCls} ${highContrast ? "text-white/85" : "text-white/70"}`}>
                {entry.journalText}
              </p>
            </div>
          )}
        </GlassCardContent>
      </GlassCard>
    </div>
  );
}
