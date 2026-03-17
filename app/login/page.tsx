import { Suspense } from "react";
import Link from "next/link";
import { LoginForm } from "./LoginForm";
import { GlassCard } from "@/components/ui/GlassCard";

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link href="/" className="text-xl font-semibold text-white/90 hover:text-white transition-colors">
            A Day Closer
          </Link>
          <p className="mt-1 text-sm text-white/40">Welcome back</p>
        </div>
        <Suspense
          fallback={
            <GlassCard className="h-64 animate-pulse" />
          }
        >
          <LoginForm />
        </Suspense>
        <p className="text-center text-sm text-white/40">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-indigo-300 hover:text-indigo-200 transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
