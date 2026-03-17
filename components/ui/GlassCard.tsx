import * as React from "react";

/**
 * GlassCard — the primary liquid-glass surface.
 *
 * Design tokens used:
 *   bg-white/10          → semi-transparent white background
 *   backdrop-blur-xl     → frosted-glass blur
 *   border-white/15      → faint inner border highlight
 *   shadow-[...]         → outer glow + inset top-highlight
 *
 * Extend via `className` for layout-specific sizing (e.g. `max-w-xl mx-auto`).
 */
export function GlassCard({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/[0.15] bg-white/[0.08] backdrop-blur-xl",
        "shadow-[0_8px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)]",
        "transition-all duration-200",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

export function GlassCardHeader({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`border-b border-white/10 px-6 py-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function GlassCardContent({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </div>
  );
}
