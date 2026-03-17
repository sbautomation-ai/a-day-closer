import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { SettingsForm } from "./SettingsForm";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();
  if (!authUser) return null;

  const user = await prisma.user.findUnique({
    where: { id: authUser.id },
  });
  const settings = await prisma.userSettings.findUnique({
    where: { userId: authUser.id },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
        Settings
      </h1>

      <Card>
        <CardHeader>
          <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            Profile & preferences
          </h2>
        </CardHeader>
        <CardContent>
          <SettingsForm
            userId={authUser.id}
            defaultName={user?.name ?? ""}
            defaultReadingPace={settings?.readingPace ?? "medium"}
            defaultReminderTime={settings?.preferredReminderTime ?? ""}
          />
        </CardContent>
      </Card>
    </div>
  );
}
