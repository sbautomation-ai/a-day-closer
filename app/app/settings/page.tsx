import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";
import { GlassCard, GlassCardHeader, GlassCardContent } from "@/components/ui/GlassCard";
import { SettingsForm } from "./SettingsForm";
import { DangerZone } from "./DangerZone";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();
  if (!authUser) return null;

  const [user, settings] = await Promise.all([
    prisma.user.findUnique({ where: { id: authUser.id } }),
    prisma.userSettings.findUnique({ where: { userId: authUser.id } }),
  ]);

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h1 className="px-1 text-2xl font-semibold text-white">Settings</h1>

      <GlassCard>
        <GlassCardHeader>
          <p className="text-sm font-medium text-white/60">Profile &amp; preferences</p>
        </GlassCardHeader>
        <GlassCardContent>
          <SettingsForm
            userId={authUser.id}
            defaultName={user?.name ?? ""}
            defaultReadingPace={settings?.readingPace ?? "medium"}
            defaultReminderTime={settings?.preferredReminderTime ?? ""}
            defaultTimezone={settings?.timezone ?? ""}
            defaultDayRolloverTime={settings?.dayRolloverTime ?? ""}
            defaultTextSize={settings?.textSize ?? "default"}
            defaultHighContrast={settings?.highContrastReading ?? false}
            defaultEmailReminderEnabled={settings?.emailReminderEnabled ?? false}
            defaultEmailReminderFrequency={settings?.emailReminderFrequency ?? "daily"}
            defaultWeeklySummaryEnabled={settings?.weeklySummaryEnabled ?? false}
          />
        </GlassCardContent>
      </GlassCard>
      <GlassCard>
        <GlassCardHeader>
          <p className="text-sm font-medium text-red-300/80">Data &amp; account</p>
        </GlassCardHeader>
        <GlassCardContent>
          <DangerZone userId={authUser.id} />
        </GlassCardContent>
      </GlassCard>
    </div>
  );
}
