"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

export function AppShell({ children, userEmail: _userEmail, signOut, showAdminLink }: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-dvh">
      {/* Glass header */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-white/[0.06] backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-2 px-4 py-3">
          <Link
            href="/app/today"
            className="text-base font-semibold text-white/90 tracking-tight hover:text-white transition-colors"
          >
            A Day Closer
          </Link>

          <nav className="flex items-center gap-0.5 flex-wrap">
            {nav.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={[
                    "rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-150",
                    active
                      ? "bg-indigo-500/30 text-white border border-indigo-400/40"
                      : "text-white/60 hover:text-white hover:bg-white/10",
                  ].join(" ")}
                >
                  {label}
                </Link>
              );
            })}
            {showAdminLink && (
              <Link
                href="/app/admin/reading-plan"
                className={[
                  "rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-150",
                  pathname === "/app/admin/reading-plan"
                    ? "bg-indigo-500/30 text-white border border-indigo-400/40"
                    : "text-white/60 hover:text-white hover:bg-white/10",
                ].join(" ")}
              >
                Admin
              </Link>
            )}
            <form action={signOut} className="ml-1">
              <button
                type="submit"
                className="rounded-full px-3 py-1.5 text-sm font-medium text-white/50 hover:text-white hover:bg-white/10 transition-all duration-150"
              >
                Sign out
              </button>
            </form>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
        {children}
      </main>
    </div>
  );
}
