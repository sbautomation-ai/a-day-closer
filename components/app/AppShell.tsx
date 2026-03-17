"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";

type AppShellProps = {
  children: React.ReactNode;
  userEmail: string;
  signOut: () => Promise<void>;
  showAdminLink?: boolean;
};

const nav = [
  { href: "/app/today", label: "Today" },
  { href: "/app/history", label: "History" },
  { href: "/app/progress", label: "Progress" },
  { href: "/app/settings", label: "Settings" },
] as const;

export function AppShell({ children, userEmail, signOut, showAdminLink }: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <Link
            href="/app/today"
            className="text-lg font-semibold text-zinc-900 dark:text-zinc-100"
          >
            A Day Closer
          </Link>
          <nav className="flex items-center gap-1">
            {nav.map(({ href, label }) => (
              <Link key={href} href={href}>
                <Button
                  variant={pathname === href ? "primary" : "ghost"}
                  className="text-sm"
                >
                  {label}
                </Button>
              </Link>
            ))}
            {showAdminLink && (
              <Link href="/app/admin/reading-plan">
                <Button variant="ghost" className="text-sm">
                  Admin
                </Button>
              </Link>
            )}
            <form action={signOut} className="ml-2">
              <Button type="submit" variant="ghost" className="text-sm">
                Sign out
              </Button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-4 py-6">{children}</main>
    </div>
  );
}
