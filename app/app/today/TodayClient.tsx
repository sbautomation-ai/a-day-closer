"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { completeToday } from "@/lib/actions/today";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Textarea } from "@/components/ui/Textarea";
import { MoodSelector } from "@/components/today/MoodSelector";

const TEXT_SIZE_CLASSES: Record<string, string> = {
  small: "text-xs leading-relaxed",
  default: "text-sm leading-relaxed",
  large: "text-base leading-loose",
};

type TodayClientProps = {
  userId: string;
  readingDayId: string;
  defaultJournal: string;
  defaultMood: number | null;
  alreadyCompleted: boolean;
  textSize?: string;
  timezone?: string | null;
  dayRolloverTime?: string | null;
};

export function TodayClient({
  userId,
  readingDayId,
  defaultJournal,
  defaultMood,
  alreadyCompleted,
  textSize = "default",
  timezone = null,
  dayRolloverTime = null,
}: TodayClientProps) {
  const router = useRouter();
  const [journalText, setJournalText] = useState(defaultJournal);
  const [mood, setMood] = useState<number | null>(defaultMood);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const textCls = TEXT_SIZE_CLASSES[textSize] ?? TEXT_SIZE_CLASSES.default;
  const textareaRows = textSize === "large" ? 6 : textSize === "small" ? 4 : 5;

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    setShowSuccess(false);
    const res = await completeToday(userId, readingDayId, journalText, mood, timezone, dayRolloverTime);
    setLoading(false);
    if (res.ok) {
      setShowSuccess(true);
      router.refresh();
      setTimeout(() => setShowSuccess(false), 4000);
    } else {
      setError(res.error);
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/40">
          How are you today?
        </label>
        <MoodSelector value={mood} onChange={setMood} />
      </div>
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/40">
          Journal (optional)
        </label>
        <Textarea
          value={journalText}
          onChange={(e) => setJournalText(e.target.value)}
          placeholder="Reflect on the reading…"
          rows={textareaRows}
          className={textCls}
        />
      </div>
      {showSuccess && (
        <p className="text-sm text-emerald-300">Saved. Day completed.</p>
      )}
      {error && (
        <p className="text-sm text-red-300">{error}</p>
      )}
      <PrimaryButton
        onClick={handleSubmit}
        disabled={loading}
        fullWidth
        className="py-3"
      >
        {alreadyCompleted
          ? loading
            ? "Updating…"
            : "Update entry"
          : loading
            ? "Saving…"
            : "Save & complete today"}
      </PrimaryButton>
    </div>
  );
}
