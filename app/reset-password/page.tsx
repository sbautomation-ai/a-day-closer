import Link from "next/link";
import Image from "next/image";
import { ResetPasswordForm } from "./ResetPasswordForm";
import { GlassCard } from "@/components/ui/GlassCard";

type Props = {
  searchParams: Promise<{ token_hash?: string; type?: string }>;
};

export default async function ResetPasswordPage({ searchParams }: Props) {
  const params = await searchParams;
  const tokenHash = params.token_hash ?? null;
  const type = params.type ?? null;

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
            <p className="text-sm text-white/45">Set a new password</p>
          </Link>
        </div>
        <ResetPasswordForm tokenHash={tokenHash} type={type} />
        <p className="text-center text-sm text-white/40">
          <Link
            href="/login"
            className="font-medium text-indigo-300 transition-colors hover:text-indigo-200"
          >
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
