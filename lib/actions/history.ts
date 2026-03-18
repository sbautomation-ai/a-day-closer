"use server";

import { prisma } from "@/lib/db";

const PAGE_SIZE = 50;

export type HistoryEntryItem = {
  id: string;
  entryDate: string;
  journalText: string;
  mood: number | null;
  readingDay: { bibleReference: string };
};

export type GetMoreHistoryResult =
  | { ok: true; entries: HistoryEntryItem[]; nextCursor: string | null }
  | { ok: false; error: string };

/**
 * Returns the next page of history entries for the user, after the given cursor (exclusive).
 * Cursor is YYYY-MM-DD of the last entry from the previous page.
 */
export async function getMoreHistoryEntries(
  userId: string,
  cursor: string
): Promise<GetMoreHistoryResult> {
  if (!userId || !cursor || !/^\d{4}-\d{2}-\d{2}$/.test(cursor)) {
    return { ok: false, error: "Invalid request." };
  }
  const cursorDate = new Date(cursor);
  if (Number.isNaN(cursorDate.getTime())) {
    return { ok: false, error: "Invalid request." };
  }

  try {
    const entries = await prisma.entry.findMany({
      where: {
        userId,
        entryDate: { lt: cursorDate },
      },
      include: { readingDay: { select: { bibleReference: true } } },
      orderBy: { entryDate: "desc" },
      take: PAGE_SIZE,
    });

    const items: HistoryEntryItem[] = entries.map((e) => ({
      id: e.id,
      entryDate: e.entryDate.toISOString().slice(0, 10),
      journalText: e.journalText,
      mood: e.mood,
      readingDay: e.readingDay,
    }));

    const hasMore = entries.length === PAGE_SIZE;
    const nextCursor =
      hasMore && items.length > 0 ? items[items.length - 1]!.entryDate : null;

    return { ok: true, entries: items, nextCursor };
  } catch (e) {
    console.error(e);
    return { ok: false, error: "Failed to load more entries." };
  }
}
