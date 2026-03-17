import * as React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:opacity-50 disabled:pointer-events-none";

  const variants: Record<string, string> = {
    primary:
      "bg-gradient-to-r from-indigo-500 to-indigo-400 text-white shadow shadow-indigo-500/20 hover:brightness-110 hover:-translate-y-px active:translate-y-0 focus-visible:ring-indigo-400",
    secondary:
      "border border-white/20 bg-white/10 text-white/90 backdrop-blur-sm hover:bg-white/15 focus-visible:ring-white/30",
    ghost:
      "text-white/70 hover:text-white hover:bg-white/10 focus-visible:ring-white/30",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
