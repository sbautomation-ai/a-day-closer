"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Input } from "@/components/ui/Input";
import { GlassCard, GlassCardContent, GlassCardHeader } from "@/components/ui/GlassCard";

type ResetPasswordFormProps = {
  tokenHash: string | null;
  type: string | null;
};

export function ResetPasswordForm({ tokenHash, type }: ResetPasswordFormProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(!!(tokenHash && type === "recovery"));
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  useEffect(() => {
    if (!tokenHash || type !== "recovery") {
      setVerifying(false);
      setMessage({
        type: "error",
        text: "Invalid or expired reset link. Request a new link from the forgot password page.",
      });
      return;
    }
    const supabase = (async () => {
      const { createClient } = await import("@/lib/supabase/client");
      return createClient();
    })();
    supabase.then((client) => {
      client.auth
        .verifyOtp({ token_hash: tokenHash, type: "recovery" })
        .then(() => setVerifying(false))
        .catch((err) => {
          setVerifying(false);
          setMessage({
            type: "error",
            text: err?.message ?? "Invalid or expired link. Request a new reset link.",
          });
        });
    });
  }, [tokenHash, type]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." });
      return;
    }
    if (password.length < 6) {
      setMessage({ type: "error", text: "Password must be at least 6 characters." });
      return;
    }
    setLoading(true);
    setMessage(null);
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setMessage({ type: "error", text: error.message });
      return;
    }
    setMessage({ type: "success", text: "Password updated. Redirecting…" });
    router.push("/app/today");
    router.refresh();
  }

  if (verifying) {
    return (
      <GlassCard className="w-full max-w-md">
        <GlassCardContent className="py-8 text-center">
          <p className="text-sm text-white/60">Verifying reset link…</p>
        </GlassCardContent>
      </GlassCard>
    );
  }

  if (!tokenHash || type !== "recovery") {
    return (
      <GlassCard className="w-full max-w-md">
        <GlassCardContent className="py-8">
          <p className="text-center text-sm text-red-300">{message?.text}</p>
          <div className="mt-4 text-center">
            <a
              href="/forgot-password"
              className="text-sm font-medium text-indigo-300 hover:text-indigo-200"
            >
              Request new link
            </a>
          </div>
        </GlassCardContent>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="w-full max-w-md">
      <GlassCardHeader>
        <h2 className="text-xl font-semibold text-white">Set new password</h2>
        <p className="mt-1 text-sm text-white/50">Choose a secure password (at least 6 characters).</p>
      </GlassCardHeader>
      <GlassCardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-white/70">
              New password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              autoComplete="new-password"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-white/70">
              Confirm password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              autoComplete="new-password"
            />
          </div>
          {message && (
            <p
              className={`text-sm ${
                message.type === "error" ? "text-red-300" : "text-emerald-300"
              }`}
            >
              {message.text}
            </p>
          )}
          <PrimaryButton type="submit" disabled={loading} fullWidth>
            {loading ? "Updating…" : "Update password"}
          </PrimaryButton>
        </form>
      </GlassCardContent>
    </GlassCard>
  );
}
