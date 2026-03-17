import Image from "next/image";
import Link from "next/link";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { GlassCard } from "@/components/ui/GlassCard";

export default function LandingPage() {
  return (
    <div className="min-h-dvh flex flex-col">
      {/* Glass header */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-white/[0.06] backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Image
              src="/brand/a-day-closer-full.svg"
              alt="a day closer"
              width={220}
              height={80}
              priority
            />
          </div>
          <nav className="flex items-center gap-2">
            <Link
              href="/login"
              className="rounded-full px-3 py-1.5 text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-all duration-150"
            >
              Log in
            </Link>
            <Link href="/signup">
              <PrimaryButton className="text-sm px-4 py-1.5">
                Sign up
              </PrimaryButton>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        <div className="mx-auto max-w-xl space-y-6">
          <p className="text-sm font-medium uppercase tracking-widest text-indigo-300/80">
            Daily devotional
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            Build a daily rhythm of Scripture and reflection
          </h1>
          <p className="text-lg text-white/60 leading-relaxed">
            One passage, a short explanation, and a quiet place to journal.
            Build a sustainable habit that fits your life.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/signup">
              <PrimaryButton className="min-w-[160px] py-3">
                Get started
              </PrimaryButton>
            </Link>
            <Link
              href="/login"
              className="inline-flex min-w-[160px] items-center justify-center rounded-full border border-white/20 bg-white/[0.06] px-6 py-3 text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-150 hover:bg-white/[0.12] hover:text-white"
            >
              Log in
            </Link>
          </div>
        </div>

        {/* Preview card — mock of the Today experience */}
        <div className="mx-auto mt-20 w-full max-w-md">
          <GlassCard className="text-left">
            <div className="border-b border-white/10 px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-white/40">
                    Today&apos;s reading
                  </p>
                  <p className="mt-0.5 text-lg font-semibold text-white">
                    Psalm 23:1–6
                  </p>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs text-white/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                  7-day streak
                </div>
              </div>
            </div>
            <div className="space-y-4 px-6 py-5">
              <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm leading-relaxed text-white/80 backdrop-blur-sm">
                "The Lord is my shepherd; I shall not want. He makes me lie down
                in green pastures…"
              </div>
              <p className="text-sm leading-relaxed text-white/60">
                A psalm of quiet trust. David draws on the image of a shepherd to
                express total dependence on God for provision, rest, and
                guidance.
              </p>
              <div className="space-y-1.5">
                <p className="text-xs font-medium uppercase tracking-wider text-white/40">
                  Reflect
                </p>
                <ul className="space-y-1 text-sm text-white/70">
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
                    Where do you need to trust God&apos;s provision today?
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
                    What does it feel like to be truly led by God?
                  </li>
                </ul>
              </div>
            </div>
          </GlassCard>
          <p className="mt-3 text-center text-xs text-white/30">
            Preview — sign up to unlock your daily reading
          </p>
        </div>

        {/* Feature highlights */}
        <div className="mx-auto mt-16 grid w-full max-w-2xl gap-4 sm:grid-cols-3">
          {[
            {
              title: "Daily passage",
              body: "A curated reading for each season — Advent, Lent, and ordinary time.",
            },
            {
              title: "Short explanation",
              body: "Modern, accessible commentary to ground you in the text.",
            },
            {
              title: "Journal & streak",
              body: "Reflect with gentle prompts and track your rhythm over time.",
            },
          ].map(({ title, body }) => (
            <GlassCard key={title} className="px-5 py-5">
              <p className="font-medium text-white/90">{title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/50">{body}</p>
            </GlassCard>
          ))}
        </div>
      </main>

      <footer className="py-8 text-center text-xs text-white/25">
        © {new Date().getFullYear()} A Day Closer
      </footer>
    </div>
  );
}
