"use client";

import { useState } from "react";
import Link from "next/link";
import { getMoreHistoryEntries } from "@/lib/actions/history";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

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

export type HistoryEntryForList = {
  id: string;
  entryDate: Date | string;
  journalText: string;
  mood: number | null;
  readingDay: { bibleReference: string };
};

type HistoryListProps = {
  initialEntries: HistoryEntryForList[];
  nextCursor: string | null;
  userId: string;
};

function formatEntryDate(entryDate: Date | string): string {
  if (typeof entryDate === "string") return entryDate;
  return entryDate.toISOString().slice(0, 10);
}

/** First non-empty line of journal text, truncated to 60 chars. */
function journalPreview(text: string): string {
  if (!text?.trim()) return "";
  const firstLine = text.split("\n").find((l) => l.trim()) ?? "";
  return firstLine.length > 60 ? firstLine.slice(0, 60) + "…" : firstLine;
}

export function HistoryList({ initialEntries, nextCursor, userId }: HistoryListProps) {
  const [entries, setEntries] = useState<HistoryEntryForList[]>(initialEntries);
  const [cursor, setCursor] = useState<string | null>(nextCursor);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [exhausted, setExhausted] = useState(false);

  async function handleLoadMore() {
    if (!cursor) return;
    setLoading(true);
    setError(null);
    const res = await getMoreHistoryEntries(userId, cursor);
    setLoading(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setEntries((prev) => [
      ...prev,
      ...res.entries.map((e) => ({ ...e, entryDate: e.entryDate })),
    ]);
    setCursor(res.nextCursor);
    if (!res.nextCursor) setExhausted(true);
  }

  if (entries.length === 0) {
    return (
      <div className="px-6 py-8 text-center">
        <p className="text-sm text-white/40">
          No entries yet. Complete a day on the Today page to see it here.
        </p>
      </div>
    );
  }

  return (
    <>
      <ul>
        {entries.map((entry, idx) => {
          const dateStr = formatEntryDate(entry.entryDate);
          const preview = journalPreview(entry.journalText);
          return (
            <li key={entry.id}>
              <Link
                href={`/app/history/${entry.id}`}
                className={[
                  "flex items-center justify-between gap-4 px-6 py-4 transition-all duration-150",
                  "hover:bg-white/[0.05]",
                  idx < entries.length - 1 ? "border-b border-white/[0.07]" : "",
                ].join(" ")}
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white/80">{dateStr}</p>
                  <p className="truncate text-sm text-white/40">
                    {entry.readingDay.bibleReference}
                  </p>
                  {preview && (
                    <p className="mt-0.5 truncate text-xs text-white/25 italic">
                      {preview}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {entry.mood != null && (
                    <span className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-1 text-xs text-white/50">
                      <span aria-hidden>{MOOD_EMOJI[entry.mood]}</span>
                      {MOOD_LABELS[entry.mood] ?? entry.mood}
                    </span>
                  )}
                  <span className="text-indigo-400/60 text-sm">✓</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="border-t border-white/10 px-6 py-4">
        {error && <p className="mb-2 text-sm text-red-300">{error}</p>}
        {cursor ? (
          <PrimaryButton
            onClick={handleLoadMore}
            disabled={loading}
            fullWidth
            className="py-2"
          >
            {loading ? "Loading…" : "Load more"}
          </PrimaryButton>
        ) : exhausted ? (
          <p className="text-center text-sm text-white/30">No more entries.</p>
        ) : null}
      </div>
    </>
  );
}
