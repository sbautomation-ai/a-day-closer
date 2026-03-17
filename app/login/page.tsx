import { Suspense } from "react";
import Link from "next/link";
import { LoginForm } from "./LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link href="/" className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            A Day Closer
          </Link>
        </div>
        <Suspense fallback={<div className="h-64 rounded-xl border border-zinc-200 bg-white animate-pulse dark:border-zinc-700 dark:bg-zinc-800" />}>
          <LoginForm />
        </Suspense>
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-medium text-zinc-900 underline dark:text-zinc-100">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
