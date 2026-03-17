import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const MOOD_LABELS: Record<number, string> = {
  1: "Struggling",
  2: "Low",
  3: "Okay",
  4: "Good",
  5: "Great",
};

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
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/app/history">
          <Button variant="ghost">← Back to history</Button>
        </Link>
      </div>

      <Card>
        <CardHeader className="border-b border-zinc-100 pb-3 dark:border-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {dateStr} · {entry.readingDay.season}
          </p>
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            {entry.readingDay.bibleReference}
          </h1>
        </CardHeader>
        <CardContent className="space-y-4">
          {"bibleText" in entry.readingDay && entry.readingDay.bibleText && (
            <div className="rounded-md bg-zinc-900/95 px-4 py-3 text-sm leading-relaxed text-zinc-100 shadow-sm dark:bg-zinc-900">
              <p className="whitespace-pre-wrap">
                {entry.readingDay.bibleText as string}
              </p>
            </div>
          )}
          {entry.readingDay.explanation && (
            <p className="whitespace-pre-wrap text-zinc-700 dark:text-zinc-300">
              {entry.readingDay.explanation}
            </p>
          )}
          {prompts.length > 0 && (
            <ul className="list-inside list-disc space-y-1 text-zinc-700 dark:text-zinc-300">
              {prompts.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          )}
          {entry.mood != null && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Mood: {MOOD_LABELS[entry.mood] ?? entry.mood}
            </p>
          )}
          {entry.journalText && (
            <div className="border-t border-zinc-200 pt-4 dark:border-zinc-700">
              <h3 className="mb-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Journal
              </h3>
              <p className="whitespace-pre-wrap text-zinc-700 dark:text-zinc-300">
                {entry.journalText}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
