"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveSettings } from "@/lib/actions/settings";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/40">
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
        <label htmlFor="readingPace" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/40">
          Reading pace
        </label>
        <select
          id="readingPace"
          value={readingPace}
          onChange={(e) => setReadingPace(e.target.value)}
          className="block w-full rounded-xl border border-white/20 bg-white/[0.08] px-4 py-2.5 text-white backdrop-blur-sm focus:border-white/40 focus:bg-white/[0.12] focus:outline-none focus:ring-1 focus:ring-white/25 transition-colors duration-150"
        >
          <option value="short" className="bg-slate-900 text-white">Short</option>
          <option value="medium" className="bg-slate-900 text-white">Medium</option>
          <option value="long" className="bg-slate-900 text-white">Long</option>
        </select>
      </div>

      <div>
        <label htmlFor="reminderTime" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/40">
          Preferred reminder time (optional)
        </label>
        <Input
          id="reminderTime"
          type="time"
          value={reminderTime}
          onChange={(e) => setReminderTime(e.target.value)}
        />
        <p className="mt-1.5 text-xs text-white/30">
          Reminders are not sent yet — saved for future use.
        </p>
      </div>

      {message && (
        <p
          className={`text-sm ${
            message.type === "error" ? "text-red-300" : "text-emerald-300"
          }`}
        >
          {message.text}
        </p>
      )}

      <div className="border-t border-white/10 pt-4">
        <PrimaryButton type="submit" disabled={loading} className="py-2.5 px-6">
          {loading ? "Saving…" : "Save changes"}
        </PrimaryButton>
      </div>
    </form>
  );
}
