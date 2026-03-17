import * as React from "react";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ className = "", ...props }, ref) {
  return (
    <input
      ref={ref}
      className={[
        "block w-full rounded-xl border border-white/20 bg-white/[0.08]",
        "px-4 py-2.5 text-white placeholder-white/40",
        "backdrop-blur-sm",
        "focus:border-white/40 focus:bg-white/[0.12] focus:outline-none focus:ring-1 focus:ring-white/25",
        "transition-colors duration-150",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
});
