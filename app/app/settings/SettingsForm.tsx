"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveSettings } from "@/lib/actions/settings";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

type SettingsFormProps = {
  userId: string;
  defaultName: string;
  defaultReadingPace: string;
  defaultReminderTime: string;
};

export function SettingsForm({
  userId,
  defaultName,
  defaultReadingPace,
  defaultReminderTime,
}: SettingsFormProps) {
  const router = useRouter();
  const [name, setName] = useState(defaultName);
  const [readingPace, setReadingPace] = useState(defaultReadingPace);
  const [reminderTime, setReminderTime] = useState(defaultReminderTime);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    const res = await saveSettings(userId, {
      name: name.trim() || null,
      readingPace: readingPace || null,
      preferredReminderTime: reminderTime.trim() || null,
    });
    setLoading(false);
    if (res.ok) {
      setMessage({ type: "success", text: "Settings saved." });
      router.refresh();
    } else {
      setMessage({ type: "error", text: res.error });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Name
        </label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="readingPace" className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Reading pace
        </label>
        <select
          id="readingPace"
          value={readingPace}
          onChange={(e) => setReadingPace(e.target.value)}
          className="block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
        >
          <option value="short">Short</option>
          <option value="medium">Medium</option>
          <option value="long">Long</option>
        </select>
      </div>
      <div>
        <label htmlFor="reminderTime" className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Preferred reminder time (optional)
        </label>
        <Input
          id="reminderTime"
          type="time"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
        />
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          Reminders are not sent yet; this is saved for future use.
        </p>
      </div>
      {message && (
        <p
          className={`text-sm ${
            message.type === "error" ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
          }`}
        >
          {message.text}
        </p>
      )}
      <Button type="submit" disabled={loading}>
        {loading ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
