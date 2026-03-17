import * as React from "react";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className = "", ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={[
        "block w-full rounded-xl border border-white/20 bg-white/[0.08]",
        "px-4 py-3 text-white placeholder-white/40",
        "backdrop-blur-sm resize-none",
        "focus:border-white/40 focus:bg-white/[0.12] focus:outline-none focus:ring-1 focus:ring-white/25",
        "transition-colors duration-150 leading-relaxed",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
});
