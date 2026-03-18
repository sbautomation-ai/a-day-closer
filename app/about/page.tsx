import Image from "next/image";
import Link from "next/link";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { GlassCard } from "@/components/ui/GlassCard";

export default function AboutPage() {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-white/[0.06] backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/brand/a-day-closer-full.svg"
              alt="a day closer"
              width={220}
              height={80}
              priority
            />
          </Link>
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

      <main className="flex flex-1 flex-col items-center px-4 py-16">
        <div className="mx-auto w-full max-w-xl space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              About A Day Closer
            </h1>
            <p className="mt-2 text-sm font-medium uppercase tracking-wider text-indigo-300/80">
              Daily Scripture & reflection
            </p>
          </div>

          <GlassCard className="px-6 py-6 text-left">
            <p className="text-white/80 leading-relaxed">
              A Day Closer is a simple daily devotional. Each day you get one
              passage of Scripture, a short explanation, and a quiet place to
              journal and reflect. The readings follow the church year — Advent,
              Lent, and ordinary time — so you can build a sustainable rhythm
              that fits your life.
            </p>
            <p className="mt-4 text-white/60 leading-relaxed">
              Our hope is that a few minutes with the Bible and a pen can help
              you grow closer to God, one day at a time.
            </p>
          </GlassCard>

          <div className="flex justify-center">
            <Link href="/">
              <PrimaryButton className="min-w-[160px] py-3">
                Back to home
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-white/25">
        © {new Date().getFullYear()} A Day Closer
      </footer>
    </div>
  );
}
