/**
 * Today page: season-aware ReadingDay selection and progress.
 */

import { prisma } from "@/lib/db";
import { getLiturgicalSeason, type LiturgicalSeason } from "./liturgicalSeason";

const DEFAULT_PLAN_SLUG = "core-365-day-journey";

type SeasonDayIndexMap = Record<string, number>;

function getTodayDate(): Date {
  return new Date();
}

/** Returns YYYY-MM-DD for the given date (server local date). */
export function toEntryDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Ensures UserPlanProgress exists for (userId, defaultPlan). Creates with defaults if missing.
 */
export async function ensureProgress(userId: string) {
  const plan = await prisma.readingPlan.findUnique({
    where: { slug: DEFAULT_PLAN_SLUG },
  });
  if (!plan) throw new Error("Default reading plan not found. Run seed:reading-plan.");

  const existing = await prisma.userPlanProgress.findUnique({
    where: { userId_planId: { userId, planId: plan.id } },
  });
  if (existing) return { progress: existing, plan };

  const progress = await prisma.userPlanProgress.create({
    data: {
      userId,
      planId: plan.id,
      currentStreak: 0,
      longestStreak: 0,
      lastCompletedDate: null,
      seasonDayIndexMap: {},
    },
  });
  return { progress, plan };
}

/**
 * Returns the ReadingDay to show today for this user (season-aware) and their progress.
 */
export async function getTodayReading(userId: string) {
  const { progress, plan } = await ensureProgress(userId);
  const today = getTodayDate();
  const todaySeason = getLiturgicalSeason(today);

  const seasonDays = await prisma.readingDay.findMany({
    where: { planId: plan.id, season: todaySeason },
    orderBy: { dayIndex: "asc" },
  });

  if (seasonDays.length === 0) {
    return {
      readingDay: null,
      progress: { currentStreak: progress.currentStreak, longestStreak: progress.longestStreak },
      todaySeason,
    };
  }

  const map = (progress.seasonDayIndexMap as SeasonDayIndexMap) ?? {};
  const seasonDayIndex = map[todaySeason] ?? 1;
  const indexWithinSeason = (seasonDayIndex - 1) % seasonDays.length;
  const readingDay = seasonDays[indexWithinSeason]!;

  return {
    readingDay,
    progress: { currentStreak: progress.currentStreak, longestStreak: progress.longestStreak },
    todaySeason,
  };
}

/**
 * Returns whether the user has already completed an entry for today.
 */
export async function getTodayEntry(userId: string) {
  const today = getTodayDate();
  const entryDate = toEntryDate(today);
  const entry = await prisma.entry.findFirst({
    where: { userId, entryDate: new Date(entryDate) },
    include: { readingDay: true },
  });
  return entry;
}
