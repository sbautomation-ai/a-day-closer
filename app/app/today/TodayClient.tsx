"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { completeToday } from "@/lib/actions/today";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Textarea } from "@/components/ui/Textarea";
import { MoodSelector } from "@/components/today/MoodSelector";

type TodayClientProps = {
  userId: string;
  readingDayId: string;
  defaultJournal: string;
  defaultMood: number | null;
  alreadyCompleted: boolean;
};

export function TodayClient({
  userId,
  readingDayId,
  defaultJournal,
  defaultMood,
  alreadyCompleted,
}: TodayClientProps) {
  const router = useRouter();
  const [journalText, setJournalText] = useState(defaultJournal);
  const [mood, setMood] = useState<number | null>(defaultMood);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    const res = await completeToday(userId, readingDayId, journalText, mood);
    setLoading(false);
    if (res.ok) {
      router.refresh();
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
          rows={5}
        />
      </div>
      {error && (
        <p className="text-sm text-red-300">{error}</p>
      )}
      <PrimaryButton
        onClick={handleSubmit}
        disabled={loading || alreadyCompleted}
        fullWidth
        className="py-3"
      >
        {alreadyCompleted
          ? "Completed today ✓"
          : loading
            ? "Saving…"
            : "Save & complete today"}
      </PrimaryButton>
    </div>
  );
}
