import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <span className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            A Day Closer
          </span>
          <nav className="flex gap-3">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-16">
        <section className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
            A daily rhythm of Scripture and reflection
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            One passage, a short explanation, and a place to journal. Build a sustainable habit that fits your life.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/signup">
              <Button className="min-w-[140px]">Get started</Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary" className="min-w-[140px]">
                Log in
              </Button>
            </Link>
          </div>
        </section>

        <section className="mt-24 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            What you’ll do each day
          </h2>
          <ul className="mt-4 space-y-2 text-zinc-600 dark:text-zinc-400">
            <li>• Read today’s Bible passage (chosen for the season—Advent, Lent, etc.)</li>
            <li>• Read a short, modern explanation</li>
            <li>• Reflect with 1–3 prompts and journal</li>
            <li>• Log your mood and complete the day to keep your streak</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
