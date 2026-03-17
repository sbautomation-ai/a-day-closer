"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveSettings } from "@/lib/actions/settings";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { Input } from "@/components/ui/Input";

// Common IANA timezones grouped for the dropdown
const COMMON_TIMEZONES = [
  { value: "", label: "Auto (server default)" },
  { value: "Pacific/Honolulu", label: "Hawaii (UTC−10)" },
  { value: "America/Anchorage", label: "Alaska (UTC−9)" },
  { value: "America/Los_Angeles", label: "Pacific (UTC−8/−7)" },
  { value: "America/Denver", label: "Mountain (UTC−7/−6)" },
  { value: "America/Chicago", label: "Central (UTC−6/−5)" },
  { value: "America/New_York", label: "Eastern (UTC−5/−4)" },
  { value: "America/Sao_Paulo", label: "Brazil – São Paulo (UTC−3)" },
  { value: "Europe/London", label: "London / Dublin (UTC+0/+1)" },
  { value: "Europe/Paris", label: "Central Europe – Paris (UTC+1/+2)" },
  { value: "Europe/Helsinki", label: "Eastern Europe – Helsinki (UTC+2/+3)" },
  { value: "Europe/Moscow", label: "Moscow (UTC+3)" },
  { value: "Asia/Dubai", label: "Dubai (UTC+4)" },
  { value: "Asia/Karachi", label: "Pakistan (UTC+5)" },
  { value: "Asia/Kolkata", label: "India (UTC+5:30)" },
  { value: "Asia/Dhaka", label: "Bangladesh (UTC+6)" },
  { value: "Asia/Bangkok", label: "Indochina (UTC+7)" },
  { value: "Asia/Singapore", label: "Singapore / HK (UTC+8)" },
  { value: "Asia/Tokyo", label: "Japan / Korea (UTC+9)" },
  { value: "Australia/Sydney", label: "Sydney (UTC+10/+11)" },
  { value: "Pacific/Auckland", label: "New Zealand (UTC+12/+13)" },
];

const REMINDER_PRESETS = [
  { label: "Morning", value: "07:00" },
  { label: "Midday", value: "12:00" },
  { label: "Evening", value: "19:00" },
];

type SettingsFormProps = {
  userId: string;
  defaultName: string;
  defaultReadingPace: string;
  defaultReminderTime: string;
  defaultTimezone: string;
  defaultDayRolloverTime: string;
  defaultTextSize: string;
  defaultHighContrast: boolean;
  defaultEmailReminderEnabled: boolean;
  defaultEmailReminderFrequency: string;
  defaultWeeklySummaryEnabled: boolean;
};

const selectClass =
  "block w-full rounded-xl border border-white/20 bg-white/[0.08] px-4 py-2.5 text-white backdrop-blur-sm focus:border-white/40 focus:bg-white/[0.12] focus:outline-none focus:ring-1 focus:ring-white/25 transition-colors duration-150";

export function SettingsForm({
  userId,
  defaultName,
  defaultReadingPace,
  defaultReminderTime,
  defaultTimezone,
  defaultDayRolloverTime,
  defaultTextSize,
  defaultHighContrast,
  defaultEmailReminderEnabled,
  defaultEmailReminderFrequency,
  defaultWeeklySummaryEnabled,
}: SettingsFormProps) {
  const router = useRouter();
  const [name, setName] = useState(defaultName);
  const [readingPace, setReadingPace] = useState(defaultReadingPace);
  const [reminderTime, setReminderTime] = useState(defaultReminderTime);
  const [timezone, setTimezone] = useState(defaultTimezone);
  const [dayRolloverTime, setDayRolloverTime] = useState(defaultDayRolloverTime);
  const [textSize, setTextSize] = useState(defaultTextSize);
  const [highContrast, setHighContrast] = useState(defaultHighContrast);
  const [emailReminderEnabled, setEmailReminderEnabled] = useState(defaultEmailReminderEnabled);
  const [emailReminderFrequency, setEmailReminderFrequency] = useState(defaultEmailReminderFrequency);
  const [weeklySummaryEnabled, setWeeklySummaryEnabled] = useState(defaultWeeklySummaryEnabled);

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
      timezone: timezone.trim() || null,
      dayRolloverTime: dayRolloverTime.trim() || null,
      textSize: textSize || null,
      highContrastReading: highContrast,
      emailReminderEnabled,
      emailReminderFrequency: emailReminderFrequency || null,
      weeklySummaryEnabled,
    });
    setLoading(false);
    if (res.ok) {
      setMessage({ type: "success", text: "Settings saved." });
      router.refresh();
    } else {
      setMessage({ type: "error", text: res.error });
    }
  }

  const fieldLabel = (text: string) => (
    <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/40">
      {text}
    </span>
  );

  const sectionHeading = (text: string) => (
    <p className="text-sm font-semibold text-white/70 border-b border-white/10 pb-2">{text}</p>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-7">

      {/* ─── Profile ─────────────────────────────────── */}
      <div className="space-y-5">
        {sectionHeading("Profile")}

        <div>
          {fieldLabel("Name")}
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </div>
      </div>

      {/* ─── Reading ─────────────────────────────────── */}
      <div className="space-y-5">
        {sectionHeading("Reading")}

        <div>
          {fieldLabel("Reading pace")}
          <select
            id="readingPace"
            value={readingPace}
            onChange={(e) => setReadingPace(e.target.value)}
            className={selectClass}
          >
            <option value="short" className="bg-slate-900 text-white">Short (3–5 min)</option>
            <option value="medium" className="bg-slate-900 text-white">Medium (8–10 min)</option>
            <option value="long" className="bg-slate-900 text-white">Long (15+ min)</option>
          </select>
        </div>

        <div>
          {fieldLabel("Text size")}
          <div className="flex gap-2">
            {(["small", "default", "large"] as const).map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setTextSize(size)}
                className={[
                  "flex-1 rounded-xl border px-3 py-2 text-sm capitalize transition-all duration-150",
                  textSize === size
                    ? "border-indigo-400/60 bg-indigo-500/30 text-white"
                    : "border-white/20 bg-white/[0.06] text-white/60 hover:bg-white/[0.12] hover:text-white",
                ].join(" ")}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-white/15 bg-white/[0.05] px-4 py-3">
          <div>
            <p className="text-sm text-white/80">High contrast reading</p>
            <p className="text-xs text-white/35">Slightly brighter text on reading cards</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={highContrast}
            onClick={() => setHighContrast(!highContrast)}
            className={[
              "relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400",
              highContrast ? "bg-indigo-500" : "bg-white/20",
            ].join(" ")}
          >
            <span
              className={[
                "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200",
                highContrast ? "translate-x-5" : "translate-x-0",
              ].join(" ")}
            />
          </button>
        </div>
      </div>

      {/* ─── Time & timezone ─────────────────────────── */}
      <div className="space-y-5">
        {sectionHeading("Time & timezone")}

        <div>
          {fieldLabel("Timezone")}
          <select
            id="timezone"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className={selectClass}
          >
            {COMMON_TIMEZONES.map((tz) => (
              <option key={tz.value} value={tz.value} className="bg-slate-900 text-white">
                {tz.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          {fieldLabel("Preferred reminder time")}
          <div className="mb-2 flex gap-2">
            {REMINDER_PRESETS.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => setReminderTime(preset.value)}
                className={[
                  "rounded-full border px-3 py-1 text-xs transition-all duration-150",
                  reminderTime === preset.value
                    ? "border-indigo-400/60 bg-indigo-500/30 text-white"
                    : "border-white/20 bg-white/[0.06] text-white/60 hover:bg-white/10 hover:text-white",
                ].join(" ")}
              >
                {preset.label}
              </button>
            ))}
          </div>
          <Input
            id="reminderTime"
            type="time"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
          />
        </div>

        <div>
          {fieldLabel("Day rolls over at (optional)")}
          <Input
            id="dayRolloverTime"
            type="time"
            value={dayRolloverTime}
            onChange={(e) => setDayRolloverTime(e.target.value)}
          />
          <p className="mt-1.5 text-xs text-white/30">
            If you often read after midnight, set this so your streak doesn&apos;t break. Leave empty for midnight rollover.
          </p>
        </div>
      </div>

      {/* ─── Notifications ───────────────────────────── */}
      <div className="space-y-5">
        {sectionHeading("Notifications")}

        <div className="flex items-center justify-between rounded-xl border border-white/15 bg-white/[0.05] px-4 py-3">
          <div>
            <p className="text-sm text-white/80">Email reminder</p>
            <p className="text-xs text-white/35">
              Nudge me if I haven&apos;t completed today&apos;s reading by my reminder time
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={emailReminderEnabled}
            onClick={() => setEmailReminderEnabled(!emailReminderEnabled)}
            className={[
              "relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400",
              emailReminderEnabled ? "bg-indigo-500" : "bg-white/20",
            ].join(" ")}
          >
            <span
              className={[
                "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200",
                emailReminderEnabled ? "translate-x-5" : "translate-x-0",
              ].join(" ")}
            />
          </button>
        </div>

        {emailReminderEnabled && (
          <div>
            {fieldLabel("Reminder frequency")}
            <select
              id="emailReminderFrequency"
              value={emailReminderFrequency}
              onChange={(e) => setEmailReminderFrequency(e.target.value)}
              className={selectClass}
            >
              <option value="daily" className="bg-slate-900 text-white">Every day</option>
              <option value="weekdays" className="bg-slate-900 text-white">Weekdays only</option>
              <option value="off" className="bg-slate-900 text-white">Off</option>
            </select>
          </div>
        )}

        <div className="flex items-center justify-between rounded-xl border border-white/15 bg-white/[0.05] px-4 py-3">
          <div>
            <p className="text-sm text-white/80">Weekly summary</p>
            <p className="text-xs text-white/35">A gentle review of your streak and reflections each week</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={weeklySummaryEnabled}
            onClick={() => setWeeklySummaryEnabled(!weeklySummaryEnabled)}
            className={[
              "relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400",
              weeklySummaryEnabled ? "bg-indigo-500" : "bg-white/20",
            ].join(" ")}
          >
            <span
              className={[
                "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200",
                weeklySummaryEnabled ? "translate-x-5" : "translate-x-0",
              ].join(" ")}
            />
          </button>
        </div>

        <p className="text-xs text-white/30">
          Notification sending is not active yet — your preferences will be used when we enable it.
        </p>
      </div>

      {message && (
        <p className={`text-sm ${message.type === "error" ? "text-red-300" : "text-emerald-300"}`}>
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
