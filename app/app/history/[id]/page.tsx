import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { GlassCard, GlassCardContent, GlassCardHeader } from "@/components/ui/GlassCard";

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

  const entry = await prisma.entry.findFirst({
    where: { id, userId: user.id },
    include: { readingDay: true },
  });

  if (!entry) notFound();

  const dateStr = entry.entryDate.toISOString().slice(0, 10);
  const prompts = Array.isArray(entry.readingDay.reflectionPrompts)
    ? (entry.readingDay.reflectionPrompts as string[])
    : [];

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <Link
        href="/app/history"
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-white/50 hover:text-white hover:bg-white/10 transition-all duration-150"
      >
        ← History
      </Link>

      <GlassCard>
        <GlassCardHeader>
          <p className="text-xs text-white/40">
            {dateStr} · {entry.readingDay.season}
          </p>
          <h1 className="mt-0.5 text-xl font-semibold text-white">
            {entry.readingDay.bibleReference}
          </h1>
        </GlassCardHeader>
        <GlassCardContent className="space-y-5">
          {"bibleText" in entry.readingDay && entry.readingDay.bibleText && (
            <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-4 text-sm leading-relaxed text-white/80 backdrop-blur-sm">
              <p
                className="whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  __html: formatBibleTextWithSuperscriptVerses(
                    entry.readingDay.bibleText as string
                  ),
                }}
              />
            </div>
          )}
          {entry.readingDay.explanation && (
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/65">
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
                  <li key={i} className="flex gap-2.5 text-sm text-white/65">
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
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/70">
                {entry.journalText}
              </p>
            </div>
          )}
        </GlassCardContent>
      </GlassCard>
    </div>
  );
}
