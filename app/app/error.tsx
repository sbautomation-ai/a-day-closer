"use client";

import { useEffect } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-md space-y-4">
      <GlassCard className="px-6 py-8 text-center">
        <h2 className="text-lg font-semibold text-white">Something went wrong</h2>
        <p className="mt-2 text-sm text-white/60">
          We couldn’t load this page. Please try again.
        </p>
        {process.env.NODE_ENV === "development" && error.message && (
          <p className="mt-3 rounded-lg bg-red-500/20 px-3 py-2 text-left text-xs text-red-200 font-mono">
            {error.message}
          </p>
        )}
        <PrimaryButton
          onClick={reset}
          className="mt-6 min-w-[140px]"
        >
          Try again
        </PrimaryButton>
      </GlassCard>
    </div>
  );
}
