/**
 * Today page: season-aware ReadingDay selection and progress.
 */

import { prisma } from "@/lib/db";
import { getLiturgicalSeason, type LiturgicalSeason } from "./liturgicalSeason";

const DEFAULT_PLAN_SLUG = "core-365-day-journey";

type SeasonDayIndexMap = Record<string, number>;

/**
 * Resolves "today" in the user's timezone (IANA, e.g. "Europe/London") with an
 * optional day-rollover offset.  Falls back to server UTC if no timezone is given.
 *
 * dayRolloverTime is stored as "HH:mm" (24-h).  When set, the calendar "day" for
 * the user doesn't turn over at midnight but at that time instead.  E.g. if set to
 * "03:00", a reading done at 01:30 local still counts for the previous calendar day.
 */
export function resolveUserToday(
  timezone?: string | null,
  dayRolloverTime?: string | null
): Date {
  const now = new Date();

  // Convert to the user's local wall-clock time using Intl.
  const tz = timezone || "UTC";
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) =>
    parseInt(parts.find((p) => p.type === type)?.value ?? "0", 10);

  let year = get("year");
  let month = get("month") - 1; // 0-indexed
  let day = get("day");
  const hour = get("hour");
  const minute = get("minute");

  // Apply day rollover: if current local time is before the rollover time,
  // we are still "yesterday" for streak purposes.
  if (dayRolloverTime) {
    const [rh, rm] = dayRolloverTime.split(":").map(Number);
    if (hour < rh! || (hour === rh && minute < rm!)) {
      const d = new Date(year, month, day - 1);
      year = d.getFullYear();
      month = d.getMonth();
      day = d.getDate();
    }
  }

  return new Date(year, month, day);
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
 * Respects the user's timezone and dayRolloverTime if provided.
 */
export async function getTodayReading(
  userId: string,
  timezone?: string | null,
  dayRolloverTime?: string | null
) {
  const { progress, plan } = await ensureProgress(userId);
  const today = resolveUserToday(timezone, dayRolloverTime);
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
 * Respects the user's timezone and dayRolloverTime if provided.
 */
export async function getTodayEntry(
  userId: string,
  timezone?: string | null,
  dayRolloverTime?: string | null
) {
  const today = resolveUserToday(timezone, dayRolloverTime);
  const entryDate = toEntryDate(today);
  const entry = await prisma.entry.findFirst({
    where: { userId, entryDate: new Date(entryDate) },
    include: { readingDay: true },
  });
  return entry;
}
