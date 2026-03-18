"use client";

import * as React from "react";

const MOODS = [
  { value: 1, label: "Struggling", emoji: "😔" },
  { value: 2, label: "Low", emoji: "😕" },
  { value: 3, label: "Okay", emoji: "😐" },
  { value: 4, label: "Good", emoji: "🙂" },
  { value: 5, label: "Great", emoji: "😊" },
] as const;

type MoodSelectorProps = {
  value: number | null;
  onChange: (value: number | null) => void;
};

export function MoodSelector({ value, onChange }: MoodSelectorProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="How are you today? Select your mood."
    >
      {MOODS.map(({ value: v, label, emoji }) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(value === v ? null : v)}
          aria-pressed={value === v}
          aria-label={label}
          className={[
            "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-all duration-150",
            value === v
              ? "border-indigo-400/60 bg-indigo-500/30 text-white shadow shadow-indigo-500/20"
              : "border-white/20 bg-white/[0.06] text-white/70 hover:bg-white/[0.12] hover:text-white hover:border-white/30",
          ].join(" ")}
        >
          <span aria-hidden>{emoji}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
