"use client";

import { useState } from "react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Input } from "@/components/ui/Input";
import { GlassCard, GlassCardContent, GlassCardHeader } from "@/components/ui/GlassCard";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const redirectTo =
      typeof window !== "undefined" ? `${window.location.origin}/reset-password` : "";
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: redirectTo || undefined,
    });
    setLoading(false);
    if (error) {
      setMessage({ type: "error", text: error.message });
      return;
    }
    setMessage({
      type: "success",
      text: "Check your email for a link to reset your password. The link may take a few minutes to arrive.",
    });
  }

  return (
    <GlassCard className="w-full max-w-md">
      <GlassCardHeader>
        <h2 className="text-xl font-semibold text-white">Forgot password?</h2>
        <p className="mt-1 text-sm text-white/50">
          Enter your email and we&apos;ll send you a link to reset your password.
        </p>
      </GlassCardHeader>
      <GlassCardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-white/70">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
              disabled={message?.type === "success"}
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
          <PrimaryButton type="submit" disabled={loading || message?.type === "success"} fullWidth>
            {loading ? "Sending…" : message?.type === "success" ? "Email sent" : "Send reset link"}
          </PrimaryButton>
        </form>
      </GlassCardContent>
    </GlassCard>
  );
}
