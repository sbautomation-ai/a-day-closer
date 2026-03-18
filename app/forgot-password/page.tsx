import Link from "next/link";
import Image from "next/image";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { GlassCard } from "@/components/ui/GlassCard";

export default function ForgotPasswordPage() {
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
            <p className="text-sm text-white/45">Reset your password</p>
          </Link>
        </div>
        <ForgotPasswordForm />
        <p className="text-center text-sm text-white/40">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-medium text-indigo-300 transition-colors hover:text-indigo-200"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
