"use server";

import { prisma } from "@/lib/db";
import { getLiturgicalSeason } from "@/lib/liturgicalSeason";
import { toEntryDate, ensureProgress, resolveUserToday } from "@/lib/today";

const DEFAULT_PLAN_SLUG = "core-365-day-journey";

type SeasonDayIndexMap = Record<string, number>;

export type CompleteTodayResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * Creates or updates today's entry and updates streak + seasonDayIndexMap.
 * When timezone is provided, "today" is resolved using the user's timezone and day rollover.
 */
export async function completeToday(
  userId: string,
  readingDayId: string,
  journalText: string,
  mood: number | null,
  timezone?: string | null,
  dayRolloverTime?: string | null
): Promise<CompleteTodayResult> {
  try {
    const today =
      timezone != null && timezone !== ""
        ? resolveUserToday(timezone, dayRolloverTime)
        : new Date();
    const entryDateStr = toEntryDate(today);
    const entryDate = new Date(entryDateStr);

    const { progress, plan } = await ensureProgress(userId);
    if (plan.slug !== DEFAULT_PLAN_SLUG) {
      return { ok: false, error: "Unexpected plan." };
    }

    const readingDay = await prisma.readingDay.findUnique({
      where: { id: readingDayId, planId: plan.id },
    });
    if (!readingDay) {
      return { ok: false, error: "Reading not found." };
    }

    const existingEntry = await prisma.entry.findUnique({
      where: { userId_entryDate: { userId, entryDate } },
    });
    const isNewCompletion = !existingEntry;

    const map = (progress.seasonDayIndexMap as SeasonDayIndexMap) ?? {};
    const todaySeason = getLiturgicalSeason(today);
    const currentIndex = map[todaySeason] ?? 1;
    const newMap = { ...map, [todaySeason]: isNewCompletion ? currentIndex + 1 : currentIndex };

    let currentStreak = progress.currentStreak;
    let longestStreak = progress.longestStreak;
    const last = progress.lastCompletedDate;

    if (isNewCompletion) {
      if (!last) {
        currentStreak = 1;
      } else {
        const lastStr = toEntryDate(last);
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = toEntryDate(yesterday);
        if (lastStr === yesterdayStr) {
          currentStreak += 1;
        } else if (lastStr !== entryDateStr) {
          currentStreak = 1;
        }
      }
      if (currentStreak > longestStreak) longestStreak = currentStreak;
    }

    await prisma.entry.upsert({
      where: {
        userId_entryDate: { userId, entryDate },
      },
      create: {
        userId,
        readingDayId: readingDay.id,
        entryDate,
        journalText: journalText ?? "",
        mood,
      },
      update: {
        readingDayId: readingDay.id,
        journalText: journalText ?? "",
        mood,
      },
    });

    if (isNewCompletion) {
      await prisma.userPlanProgress.update({
        where: { id: progress.id },
        data: {
          currentStreak,
          longestStreak,
          lastCompletedDate: entryDate,
          seasonDayIndexMap: newMap,
        },
      });
    }

    return { ok: true };
  } catch (e) {
    console.error(e);
    return { ok: false, error: e instanceof Error ? e.message : "Something went wrong." };
  }
}
