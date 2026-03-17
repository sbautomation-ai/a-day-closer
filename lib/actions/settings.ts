"use server";

import { prisma } from "@/lib/db";

export type SaveSettingsResult = { ok: true } | { ok: false; error: string };

export async function saveSettings(
  userId: string,
  data: {
    name: string | null;
    readingPace: string | null;
    preferredReminderTime: string | null;
    // Phase 1
    timezone?: string | null;
    dayRolloverTime?: string | null;
    textSize?: string | null;
    highContrastReading?: boolean | null;
    // Phase 2
    emailReminderEnabled?: boolean | null;
    emailReminderFrequency?: string | null;
    weeklySummaryEnabled?: boolean | null;
  }
): Promise<SaveSettingsResult> {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { name: data.name ?? undefined },
    });
    await prisma.userSettings.upsert({
      where: { userId },
      create: {
        userId,
        readingPace: data.readingPace ?? undefined,
        preferredReminderTime: data.preferredReminderTime ?? undefined,
        timezone: data.timezone ?? undefined,
        dayRolloverTime: data.dayRolloverTime ?? undefined,
        textSize: data.textSize ?? undefined,
        highContrastReading: data.highContrastReading ?? undefined,
        emailReminderEnabled: data.emailReminderEnabled ?? undefined,
        emailReminderFrequency: data.emailReminderFrequency ?? undefined,
        weeklySummaryEnabled: data.weeklySummaryEnabled ?? undefined,
      },
      update: {
        readingPace: data.readingPace ?? undefined,
        preferredReminderTime: data.preferredReminderTime ?? undefined,
        timezone: data.timezone ?? undefined,
        dayRolloverTime: data.dayRolloverTime ?? undefined,
        textSize: data.textSize ?? undefined,
        highContrastReading: data.highContrastReading ?? undefined,
        emailReminderEnabled: data.emailReminderEnabled ?? undefined,
        emailReminderFrequency: data.emailReminderFrequency ?? undefined,
        weeklySummaryEnabled: data.weeklySummaryEnabled ?? undefined,
      },
    });
    return { ok: true };
  } catch (e) {
    console.error(e);
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Failed to save.",
    };
  }
}
