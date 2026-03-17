"use client";

import { useState } from "react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Input } from "@/components/ui/Input";
import { GlassCard, GlassCardContent, GlassCardHeader } from "@/components/ui/GlassCard";

type AuthFormProps = {
  mode: "signin" | "signup";
  onSuccess?: () => void;
};

export function AuthForm({ mode, onSuccess }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const isSignUp = mode === "signup";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password, options: { data: { name } } });
      if (error) {
        setMessage({ type: "error", text: error.message });
        setLoading(false);
        return;
      }
      setMessage({ type: "success", text: "Check your email to confirm your account, then sign in." });
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMessage({ type: "error", text: error.message });
        setLoading(false);
        return;
      }
      onSuccess?.();
    }
    setLoading(false);
  }

  return (
    <GlassCard className="w-full max-w-md">
      <GlassCardHeader>
        <h2 className="text-xl font-semibold text-white">
          {isSignUp ? "Create an account" : "Sign in"}
        </h2>
      </GlassCardHeader>
      <GlassCardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignUp && (
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-white/70">
                Name (optional)
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
              />
            </div>
          )}
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
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-white/70">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={isSignUp ? "new-password" : "current-password"}
              minLength={6}
            />
          </div>
          {message && (
            <p
              className={`text-sm ${
                message.type === "error"
                  ? "text-red-300"
                  : "text-emerald-300"
              }`}
            >
              {message.text}
            </p>
          )}
          <PrimaryButton type="submit" disabled={loading} fullWidth>
            {loading ? "Please wait…" : isSignUp ? "Sign up" : "Sign in"}
          </PrimaryButton>
        </form>
      </GlassCardContent>
    </GlassCard>
  );
}
