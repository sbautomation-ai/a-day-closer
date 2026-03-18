import { GlassCard } from "@/components/ui/GlassCard";

export default function AppLoading() {
  return (
    <div className="mx-auto max-w-xl space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="animate-pulse">
          <div className="h-8 w-24 rounded-lg bg-white/10" />
          <div className="mt-2 h-4 w-32 rounded bg-white/5" />
        </div>
        <div className="h-9 w-28 rounded-full bg-white/10 animate-pulse" />
      </div>
      <GlassCard className="overflow-hidden">
        <div className="border-b border-white/10 px-6 py-5">
          <div className="h-3 w-16 rounded bg-white/10 animate-pulse" />
          <div className="mt-2 h-6 w-40 rounded bg-white/15 animate-pulse" />
        </div>
        <div className="space-y-6 px-6 py-5">
          <div className="h-24 rounded-xl bg-white/10 animate-pulse" />
          <div className="h-4 w-full rounded bg-white/5 animate-pulse" />
          <div className="h-4 w-4/5 rounded bg-white/5 animate-pulse" />
          <div className="border-t border-white/10 pt-5 space-y-4">
            <div className="h-3 w-20 rounded bg-white/10 animate-pulse" />
            <div className="h-10 w-full rounded-lg bg-white/5 animate-pulse" />
            <div className="h-3 w-24 rounded bg-white/10 animate-pulse" />
            <div className="h-20 rounded-xl bg-white/5 animate-pulse" />
            <div className="h-11 w-full rounded-full bg-white/10 animate-pulse" />
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
