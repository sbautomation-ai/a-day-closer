import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ensureUserRow } from "@/lib/auth";
import { signOut } from "@/lib/actions/auth";
import { AppShell } from "@/components/app/AppShell";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    redirect("/login?redirect=/app/today");
  }

  await ensureUserRow(
    authUser.id,
    authUser.email!,
    authUser.user_metadata?.name
  );

  const isAdmin =
    process.env.ADMIN_EMAIL && authUser.email === process.env.ADMIN_EMAIL;

  return (
    <AppShell
      userEmail={authUser.email ?? ""}
      signOut={signOut}
      showAdminLink={!!isAdmin}
    >
      {children}
    </AppShell>
  );
}
