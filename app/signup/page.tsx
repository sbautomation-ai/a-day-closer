 "use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthForm } from "@/components/auth/AuthForm";

export default function SignupPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Link href="/" className="inline-flex flex-col items-center gap-3">
            <Image
              src="/brand/a-day-closer-full.svg"
              alt="a day closer"
              width={220}
              height={80}
              priority
            />
            <p className="text-sm text-white/45">Start your daily habit</p>
          </Link>
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
