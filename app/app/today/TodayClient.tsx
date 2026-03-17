"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { completeToday } from "@/lib/actions/today";
import { Button } from "@/components/ui/Button";
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
    <div className="space-y-4 border-t border-zinc-200 pt-4 dark:border-zinc-700">
      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          How are you today?
        </label>
        <MoodSelector value={mood} onChange={setMood} />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Journal (optional)
        </label>
        <Textarea
          value={journalText}
          onChange={(e) => setJournalText(e.target.value)}
          placeholder="Reflect on the reading..."
          rows={4}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
      <Button
        onClick={handleSubmit}
        disabled={loading || alreadyCompleted}
        className="w-full"
      >
        {alreadyCompleted
          ? "Completed today"
          : loading
            ? "Saving…"
            : "Save & complete today"}
      </Button>
    </div>
  );
}
