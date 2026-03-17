"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";

export default function SignupPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link href="/" className="text-xl font-semibold text-white/90 hover:text-white transition-colors">
            A Day Closer
          </Link>
          <p className="mt-1 text-sm text-white/40">Start your daily habit</p>
        </div>
        <AuthForm
          mode="signup"
          onSuccess={() => router.push("/app/today")}
        />
        <p className="text-center text-sm text-white/40">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-indigo-300 hover:text-indigo-200 transition-colors">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
