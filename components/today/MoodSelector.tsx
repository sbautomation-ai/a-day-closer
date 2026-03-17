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
    <div className="flex flex-wrap gap-2">
      {MOODS.map(({ value: v, label, emoji }) => (
        <button
          key={v}
          type="button"
          onClick={() => onChange(value === v ? null : v)}
          className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm transition-colors ${
            value === v
              ? "border-zinc-900 bg-zinc-100 dark:border-zinc-100 dark:bg-zinc-700"
              : "border-zinc-200 hover:bg-zinc-50 dark:border-zinc-600 dark:hover:bg-zinc-800"
          }`}
        >
          <span aria-hidden>{emoji}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
