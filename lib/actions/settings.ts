"use server";

import { prisma } from "@/lib/db";

export type SaveSettingsResult = { ok: true } | { ok: false; error: string };

export async function saveSettings(
  userId: string,
  data: {
    name: string | null;
    readingPace: string | null;
    preferredReminderTime: string | null;
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
      },
      update: {
        readingPace: data.readingPace ?? undefined,
        preferredReminderTime: data.preferredReminderTime ?? undefined,
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
