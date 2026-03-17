"use server";

import { prisma } from "@/lib/db";

export type ActionResult = { ok: true } | { ok: false; error: string };

const MOOD_LABELS: Record<number, string> = {
  1: "Struggling",
  2: "Low",
  3: "Okay",
  4: "Good",
  5: "Great",
};

/**
 * Returns the user's full journal as a formatted Markdown string.
 */
export async function exportJournalText(userId: string): Promise<string> {
  const entries = await prisma.entry.findMany({
    where: { userId },
    include: { readingDay: true },
    orderBy: { entryDate: "asc" },
  });

  if (entries.length === 0) {
    return "# My Journal – A Day Closer\n\nNo entries yet.\n";
  }

  const lines: string[] = [
    "# My Journal – A Day Closer",
    `_Exported on ${new Date().toISOString().slice(0, 10)}_`,
    "",
  ];

  for (const entry of entries) {
    const dateStr = entry.entryDate.toISOString().slice(0, 10);
    lines.push(`## ${dateStr} — ${entry.readingDay.bibleReference}`);
    lines.push(`_Season: ${entry.readingDay.season}_`);
    if (entry.mood != null) {
      lines.push(`**Mood:** ${MOOD_LABELS[entry.mood] ?? entry.mood}`);
    }
    lines.push("");
    if (entry.journalText?.trim()) {
      lines.push(entry.journalText.trim());
    } else {
      lines.push("_(no journal entry)_");
    }
    lines.push("");
    lines.push("---");
    lines.push("");
  }

  return lines.join("\n");
}

/**
 * Deletes all journal entries for the user and resets their streak progress.
 */
export async function deleteJournalHistory(userId: string): Promise<ActionResult> {
  try {
    await prisma.$transaction([
      prisma.entry.deleteMany({ where: { userId } }),
      prisma.userPlanProgress.updateMany({
        where: { userId },
        data: {
          currentStreak: 0,
          longestStreak: 0,
          lastCompletedDate: null,
          seasonDayIndexMap: {},
        },
      }),
    ]);
    return { ok: true };
  } catch (e) {
    console.error(e);
    return { ok: false, error: e instanceof Error ? e.message : "Failed to delete history." };
  }
}

/**
 * Deletes the user's app data row. The Supabase Auth user must be deleted
 * separately (Supabase Dashboard > Authentication or a separate admin call).
 * Cascade deletes: entries, settings, plan progress.
 */
export async function deleteAccount(userId: string): Promise<ActionResult> {
  try {
    await prisma.user.delete({ where: { id: userId } });
    return { ok: true };
  } catch (e) {
    console.error(e);
    return { ok: false, error: e instanceof Error ? e.message : "Failed to delete account." };
  }
}
