import * as React from "react";

/**
 * PrimaryButton — pill-shaped, gradient CTA button.
 *
 * Use for main actions: "Get started", "Save & complete today", etc.
 * For supporting actions (cancel, back, nav), use <Button variant="secondary|ghost">.
 *
 * Props:
 *   fullWidth — stretch to container width (defaults to false)
 */
type PrimaryButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean;
};

export function PrimaryButton({
  className = "",
  fullWidth = false,
  children,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      className={[
        "inline-flex items-center justify-center rounded-full",
        "bg-gradient-to-r from-indigo-500 to-indigo-400",
        "px-6 py-2.5 text-sm font-medium text-white",
        "shadow-lg shadow-indigo-500/25",
        "transition-all duration-200",
        "hover:brightness-110 hover:-translate-y-px",
        "active:translate-y-0 active:brightness-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        "disabled:opacity-50 disabled:pointer-events-none",
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
