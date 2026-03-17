"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { AuthForm } from "@/components/auth/AuthForm";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/app/today";

  return (
    <AuthForm
      mode="signin"
      onSuccess={() => router.push(redirect)}
    />
  );
}
