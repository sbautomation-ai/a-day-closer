# A Day Closer – Features and Improvements Plan

High-level plan plus **detailed breakdowns** for each feature (one section per feature). Update this doc as we plan and implement.

---

## Priority overview

| Priority | Item | Effort |
|----------|------|--------|
| High | Loading + error UI | Low |
| High | Success feedback (Today + Settings) | Low |
| High | Edit today's entry (journal/mood) | Medium |
| High | Password reset flow | Medium |
| Medium | Progress month navigation | Medium |
| Medium | Timezone consistency (History/Progress) | Low–Medium |
| Medium | History "Load more" / pagination | Low–Medium |
| Later | Email reminder + weekly summary backend | High |
| Later | Share/copy verse, History prev/next, Admin filters | Low–Medium |

---

## Feature 1: Loading UI + Error boundaries (detailed)

**What it fixes:** Navigating between Today / History / Progress / Settings shows no feedback; server errors show the default Next.js error page.

**External dependencies:** None.

**Files to create:**

- `app/app/loading.tsx` – Shared loading skeleton for all `/app/*` routes. GlassCard-shaped pulse blocks (two stacked), `animate-pulse`, matches existing layout.
- `app/app/error.tsx` – Must be `"use client"`. Shows "Something went wrong", optional error message (dev only), and "Try again" button calling `reset()`. Same glass aesthetic.

**Files to touch:** None. App Router picks these up automatically for the `app/app` segment.

**Elaboration:**

- **loading.tsx structure:** One outer `div` with `mx-auto max-w-xl space-y-4` (matches Today layout). Inside: (1) a header row with two pulse divs (title + streak badge); (2) one `GlassCard` with a header block (season + reference placeholders) and a content block (bible text block, explanation lines, journal/button area). Use `animate-pulse` and `bg-white/10` or `bg-white/5` for placeholders. Heights: `h-8`, `h-4`, `h-24`, etc. to approximate real content.
- **error.tsx structure:** Must receive `{ error, reset }` from Next.js. Use `useEffect` to `console.error(error)` in dev. Render a `GlassCard` with `px-6 py-8 text-center`. Title: "Something went wrong". Subtitle: "We couldn't load this page. Please try again." If `process.env.NODE_ENV === "development"` and `error.message`, show it in a small `font-mono` block. `PrimaryButton` with `onClick={reset}` and label "Try again". The `reset` function re-renders the error boundary's children (retries the segment).
- **Testing:** Navigate between Today/History/Progress (throttle network to see loading). Throw an error in a page to trigger the error boundary.

---

## Feature 2: Success feedback (Today save + Settings save) (detailed)

**What it fixes:** After "Save & complete today" or "Save settings" there is no explicit confirmation that the action succeeded.

**External dependencies:** None.

**Today**

- **File:** `app/app/today/TodayClient.tsx`
- **Change:** On `res.ok` after `completeToday()`, set local state (e.g. `showSuccess`) and render a short message near the button (e.g. "Saved. Day completed.") in success colour. Optional: auto-clear after 3–5 seconds.
- **No new components** if kept to one line.

**Settings**

- **File:** `app/app/settings/SettingsForm.tsx`
- **Change:** On success after `saveSettings()`, set state (e.g. `saveSuccess`) and show "Settings saved." near the submit button. Optional auto-dismiss.

**Elaboration:**

- **TodayClient:** Add `const [showSuccess, setShowSuccess] = useState(false)`. In `handleSubmit`, before the `completeToday` call: `setShowSuccess(false)`. On `res.ok`: `setShowSuccess(true)`, `router.refresh()`, `setTimeout(() => setShowSuccess(false), 4000)`. In JSX, above the error block: `{showSuccess && <p className="text-sm text-emerald-300">Saved. Day completed.</p>}`. The success message appears for 4 seconds then fades (or stays until next action). For updates (already completed), same message or "Entry updated." — either is fine.
- **SettingsForm:** Already has `message` state with `type: "error" | "success"` and renders `message.text` in `text-emerald-300` when success. Optional: add `setTimeout` to clear success after 4s so the form doesn't show "Settings saved." indefinitely. Optional: scroll the success message into view if the form is long.

---

## Feature 3: Edit today's entry (journal + mood after save) (detailed)

**What it fixes:** Once a user has completed today, the journal and mood are locked (button shows "Completed today ✓" and is disabled). There is no way to fix a typo or change mood after save.

**External dependencies:** None.

**Backend (action) – already supports update.**  
`completeToday` in `lib/actions/today.ts` already does an **upsert**: when an entry exists for today it only updates `journalText` and `mood` (and does not change streak). So we do **not** need a new `updateEntry` action.

**Timezone fix (recommended):** The action currently uses server `new Date()` for "today", while the Today page uses the user's timezone and day-rollover for display and for loading the existing entry. To avoid updating the wrong calendar day for users in other timezones, the action should accept optional `timezone` and `dayRolloverTime` and use `resolveUserToday(timezone, dayRolloverTime)` from `lib/today.ts` when provided.

**Files to change:**

| File | Change |
|------|--------|
| `lib/actions/today.ts` | Add optional params `timezone?: string \| null`, `dayRolloverTime?: string \| null`. If `timezone` is provided, set `today = resolveUserToday(timezone, dayRolloverTime)` and use that for `entryDate`; otherwise keep current `new Date()` behaviour. Import `resolveUserToday` from `@/lib/today`. |
| `app/app/today/page.tsx` | Pass `timezone={tz}` and `dayRolloverTime={rollover}` into `TodayClient` (you already have `tz` and `rollover` from settings). |
| `app/app/today/TodayClient.tsx` | Add props `timezone?: string \| null`, `dayRolloverTime?: string \| null`. When `alreadyCompleted` is true: **do not** disable the form or button; keep journal and mood editable. Button label: "Update entry" (or "Save changes"). On submit call `completeToday(userId, readingDayId, journalText, mood, timezone, dayRolloverTime)`. When `alreadyCompleted` is false: same as now but pass `timezone` and `dayRolloverTime` into `completeToday`. Optional: after a successful update show the same success message as in Feature 2. |

**UI behaviour:**

- **Not completed yet:** "Save & complete today" (unchanged).
- **Already completed:** Journal and mood remain editable; button "Update entry"; on success refresh and optionally show "Entry updated." (or reuse Feature 2 success state).

**Edge cases:**

- No schema or API changes; `Entry` already has `journalText` and `mood`. Streak and `lastCompletedDate` must not change on update — the existing action already does this (only updates streak when `isNewCompletion`).

**Elaboration:**

- **completeToday signature:** `completeToday(userId, readingDayId, journalText, mood, timezone?, dayRolloverTime?)`. At the top: `const today = timezone != null && timezone !== "" ? resolveUserToday(timezone, dayRolloverTime) : new Date();`. Use `today` for `entryDateStr`, `entryDate`, and `getLiturgicalSeason(today)`. No other logic changes.
- **Today page:** Already has `tz = settings?.timezone ?? null` and `rollover = settings?.dayRolloverTime ?? null`. Add `timezone={tz}` and `dayRolloverTime={rollover}` to `TodayClient`.
- **TodayClient:** Add props with defaults `timezone = null`, `dayRolloverTime = null`. Remove `disabled={loading || alreadyCompleted}` from the button — only `disabled={loading}`. Change button text: when `alreadyCompleted`, show "Update entry" (or "Updating…" when loading); when not, keep "Save & complete today" / "Saving…". Pass `timezone` and `dayRolloverTime` as the 5th and 6th args to `completeToday`.
- **Edge case:** If user has no timezone set, `timezone` is null — action falls back to server `new Date()`, which is acceptable.

---

## Feature 4: Password reset flow (detailed)

**What it fixes:** Users who forget their password have no way to reset it; only "log in" and "sign up" exist.

**External dependencies:** **Supabase Auth only.** No Resend or other email service — Supabase sends the reset email. In Supabase Dashboard → Authentication → URL Configuration, set "Redirect URLs" to include your app's reset-password URL (e.g. `http://localhost:3000/reset-password` and production URL).

**Flow:**

1. **Request reset:** User goes to `/forgot-password`, enters email, submits. App calls `supabase.auth.resetPasswordForEmail(email, { redirectTo: `${origin}/reset-password` })`. Show "Check your email for a link to reset your password."
2. **Set new password:** User clicks link in email; Supabase redirects to `/reset-password` with tokens in the URL (hash or query). On the reset-password page, show a form for "New password" + "Confirm password". Use the Supabase client to complete the recovery (e.g. `supabase.auth.updateUser({ password: newPassword })` after the client has absorbed the session from the redirect). On success, redirect to `/login` or `/app/today`.

**Files to create:**

- `app/forgot-password/page.tsx` – Forgot-password page (no app shell). Centered layout like login. Form: email input + "Send reset link" button. Uses Supabase client (client component or server + server action that calls client-side Supabase from an action). Link back to login.
- `app/reset-password/page.tsx` – Page users land on after clicking the email link. Client component so the Supabase client can read the URL hash/params and exchange the token. Form: new password, confirm password, submit. On success redirect to login. If no token/session, show "Invalid or expired link" and link to forgot-password.

**Files to touch:**

- `app/login/page.tsx` (or LoginForm / auth UI) – Add a "Forgot password?" link to `/forgot-password`.

**Implementation notes:**

- Use `@/lib/supabase/client` in the forgot-password form. For reset-password, handle the redirect in a client component and call `updateUser` once the session is recovered from the redirect URL (see Supabase docs).
- Optional: rate-limit or cap "Send reset link" per email (Supabase may have built-in limits).

**Elaboration:**

- **forgot-password page:** Layout mirrors `app/login/page.tsx` — centered, `min-h-dvh`, logo link to `/`, "Reset your password" heading. Form: single email input (required, type email), "Send reset link" button. Use a client component (e.g. `ForgotPasswordForm`) because we need `createClient()` from `@/lib/supabase/client`. On submit: `const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` })`. On success: show "Check your email for a link to reset your password." (don't redirect — user might want to try another email). On error: show `error.message`. Link below form: "Back to log in" → `/login`.
- **reset-password page:** Must be a client component. Supabase puts tokens in the URL hash (e.g. `#access_token=...&type=recovery`). On mount, call `supabase.auth.getSession()` — Supabase automatically picks up the hash and establishes a session. If we have a session with `type: 'recovery'`, show the form. Form: "New password" (type password, min 6 chars), "Confirm password". Validate they match. On submit: `await supabase.auth.updateUser({ password: newPassword })`, then `router.push('/login')` or `router.push('/app/today')`. If no recovery session on load, show "Invalid or expired link. Request a new one." with link to `/forgot-password`.
- **Supabase config:** Dashboard → Authentication → URL Configuration → Redirect URLs: add `http://localhost:3000/reset-password` and `https://yourdomain.com/reset-password`. Supabase sends the email; user clicks; redirect goes to your app with tokens in the hash.
- **Login link:** In `LoginForm` or the login page, add below the form: "Forgot password?" linking to `/forgot-password`, styled like the existing "Don't have an account? Sign up" link.

---

## Feature 5: Progress month navigation (detailed)

**What it fixes:** Progress page only shows the **current month**. Users cannot see past or future months' activity.

**External dependencies:** None.

**Approach:** Use **URL searchParams** for the selected month (e.g. `?month=2025-02`) so the Progress page is shareable and back/forward work. Default to current month when no param.

**Files to change:**

- `app/app/progress/page.tsx` – Accept `searchParams: Promise<{ month?: string }>`. Parse `month` as `YYYY-MM`; if invalid or missing, use current year-month. Compute `year` and `month` from that. Fetch entries for that month's date range. Pass `year` and `month` into `buildMonthGrid`. Add a month selector above or inside the calendar card: "← February 2025 →" (or Prev/Next buttons) linking to `/app/progress?month=2025-01` and `/app/progress?month=2025-03`. Stats (current streak, longest streak) stay global; "Days this month" is for the **selected** month.
- **buildMonthGrid:** Refactor to accept `year: number` and `month: number` and build the grid for that month. First weekday from `new Date(year, month, 1).getDay()`.

**Edge cases:** "Days this month" reflects the **selected** month. Disable or hide "Next" when selected month is the current month.

**Elaboration:**

- **searchParams:** Page signature: `ProgressPage({ searchParams }: { searchParams: Promise<{ month?: string }> })`. Await params: `const { month } = await searchParams;`. Parse: if `month` matches `/^\d{4}-\d{2}$/`, split and use; else use `resolveUserToday` or server `now` for default. Result: `year: number`, `monthIndex: number` (0–11).
- **buildMonthGrid refactor:** `buildMonthGrid(entries: Date[], year: number, monthIndex: number): DayCell[]`. Compute `end = new Date(year, monthIndex + 1, 0)`, loop `day` from 1 to `end.getDate()`, build cells. `firstWeekday = new Date(year, monthIndex, 1).getDay()`.
- **Month selector UI:** Above the calendar card, a row: `← January 2025 | February 2025 | March 2025 →`. Prev link: `/app/progress?month=${prevYear}-${String(prevMonth).padStart(2,'0')}`. Next link: same. When selected month equals current month (in user's timezone if Feature 6 done), either hide Next or show it but it goes to "future" (empty grid — acceptable). Prev always works for past months.
- **Stats:** "Days this month" = `monthEntries.length` for the selected month. "Current streak" and "Longest streak" stay from `UserPlanProgress` (global).
- **Integration with Feature 6:** When no `?month=`, default `year`/`month` should come from `resolveUserToday(settings?.timezone, settings?.dayRolloverTime)` so the first view is the user's current month.

---

## Feature 6: Timezone consistency (History/Progress) (detailed)

**What it fixes:** "This month" and calendar boundaries on History and Progress use the server's `new Date()`. For users in another timezone (or with custom day rollover), "this month" and "today" should match their settings.

**External dependencies:** None. Use existing `UserSettings.timezone`, `UserSettings.dayRolloverTime`, and `resolveUserToday` / `toEntryDate` from `lib/today.ts`.

**Files to change:**

- **History** (`app/app/history/page.tsx`): Load user settings. Compute "user's today" with `resolveUserToday(settings?.timezone, settings?.dayRolloverTime)` and derive the user's current calendar month. Use that month's start (and end) for the `entriesThisMonth` count. Only the "This month" stat reflects the user's month.
- **Progress** (`app/app/progress/page.tsx`): When **no** `?month=` param is present, use user's "today" from `resolveUserToday(...)` to set the default month (year + month). When `?month=` is present, keep using it (Feature 5).

**Elaboration:**

- **History:** Fetch `UserSettings` for the user (or reuse if already loaded). `const userToday = resolveUserToday(settings?.timezone ?? null, settings?.dayRolloverTime ?? null);`. Derive month: `const y = userToday.getFullYear(); const m = userToday.getMonth();`. `startOfMonth = new Date(y, m, 1); endOfMonth = new Date(y, m + 1, 0);`. Use these for `entriesThisMonth` count: `prisma.entry.count({ where: { userId, entryDate: { gte: startOfMonth, lte: endOfMonth } } })`. The stat label "This month" is correct as-is.
- **Progress:** When `searchParams.month` is absent, don't use `new Date()`. Load settings, then `userToday = resolveUserToday(...)`, and set `year = userToday.getFullYear()`, `monthIndex = userToday.getMonth()`. Use those for the default calendar and "Days this month". When `?month=2025-02` is present, parse it and use that — no settings needed for the selected month.
- **Fallback:** If user has no settings (timezone null), `resolveUserToday(null, null)` uses UTC. That's acceptable.

---

## Feature 7: History "Load more" / pagination (detailed)

**What it fixes:** History loads the last 100 entries in one go. No way to see older entries or reduce initial load.

**External dependencies:** None.

**Approach (recommended):** Initial load small (e.g. 20 entries). Add "Load more" that fetches the next page via a server action. **Cursor-based** pagination: cursor = last `entryDate` + `id`; next page = entries before that cursor.

**Files to change:**

- `lib/actions/history.ts` (new) – Export `getHistoryPage(userId, cursor: { entryDate: string, id: string } | null, limit)`. Query `Entry` where `userId`, orderBy `entryDate desc, id desc`; if cursor, add where clause so we get rows "before" cursor. Return `{ entries, nextCursor }`.
- `app/app/history/page.tsx` – Fetch only first page (e.g. 20). Pass initial entries and user id to a new client component.
- `app/app/history/HistoryEntryList.tsx` (new, client) – Renders list, holds state for appended entries, "Load more" button. On click, call `getHistoryPage(userId, cursor, 20)`, append results, update cursor. Hide "Load more" when nextCursor is null.

**Elaboration:**

- **getHistoryPage action:** `export async function getHistoryPage(userId: string, cursor: { entryDate: string; id: string } | null, limit: number)`. Prisma: `entry.findMany({ where: { userId }, orderBy: [{ entryDate: 'desc' }, { id: 'desc' }], take: limit + 1, ... })`. If cursor: add `where: { AND: [{ OR: [{ entryDate: { lt: cursor.entryDate } }, { entryDate: cursor.entryDate, id: { lt: cursor.id } }] }] }` — actually Prisma's cursor is simpler: use `cursor: { entryDate_id: { entryDate: cursor.entryDate, id: cursor.id } }, skip: 1`. Or use raw: `where: entryDate < cursor.entryDate OR (entryDate = cursor.entryDate AND id < cursor.id)`. Return `{ entries: rows.slice(0, limit), nextCursor: rows.length > limit ? { entryDate: rows[limit-1].entryDate, id: rows[limit-1].id } : null }`.
- **History page:** Change `take: 100` to `take: 20`. Pass `initialEntries`, `userId` to `HistoryEntryList`. The Overview stats card stays server-rendered; only the "Past entries" list moves to the client component.
- **HistoryEntryList:** Props: `initialEntries: Entry[]`, `userId: string`. State: `entries`, `cursor`, `loading`. Initialize `entries = initialEntries`, `cursor = initialEntries.length >= 20 ? { entryDate: last.entryDate, id: last.id } : null`. Render the list (reuse the same `Link` structure as current History). At bottom: `{cursor && <button onClick={loadMore} disabled={loading}>Load more</button>}`. `loadMore` calls `getHistoryPage(userId, cursor, 20)`, appends to `entries`, sets new `cursor` from result.
- **Cursor format:** `entryDate` must be a string `YYYY-MM-DD` for the Prisma query. When reading from `entry.entryDate` (a Date), use `entry.entryDate.toISOString().slice(0, 10)`.

---

## Feature 8: Email reminders + weekly summary (backend) (detailed)

**What it fixes:** Settings store `emailReminderEnabled`, `emailReminderFrequency`, `preferredReminderTime`, and `weeklySummaryEnabled`, but no job sends emails.

**External dependencies:**

- **Email sending:** A transactional email provider (e.g. **Resend**, SendGrid, Postmark). Add SDK and env var (e.g. `RESEND_API_KEY`). Resend has a generous free tier.
- **Scheduling:** Vercel Cron (if on Vercel), Supabase pg_cron, Inngest, or external cron hitting a protected API route. Env: `CRON_SECRET` to protect the route.

**Email reminder:** Cron runs periodically (e.g. hourly). For each user with `emailReminderEnabled` and `preferredReminderTime`, check if "now" is their reminder time (in their timezone). If they have not completed today (use `resolveUserToday` + entry lookup), send one reminder via Resend. Respect `emailReminderFrequency`.

**Weekly summary:** Cron runs once per day. For each user with `weeklySummaryEnabled`, send a digest (streak, days in last 7, link). Query entries for last 7 days (user timezone if available).

**Files to add:** `app/api/cron/reminders/route.ts` and `app/api/cron/weekly-summary/route.ts` (or one route with a key). Protect with `CRON_SECRET`. Optional: `lib/email/reminder.ts` and `lib/email/weeklySummary.ts` for subject + body. Env: `RESEND_API_KEY`, `CRON_SECRET`, `APP_URL`.

**Elaboration:**

- **Resend setup:** `npm install resend`. Env: `RESEND_API_KEY`. Create a Resend account, verify your domain (or use their sandbox domain for testing). `const resend = new Resend(process.env.RESEND_API_KEY);` then `await resend.emails.send({ from: 'A Day Closer <noreply@yourdomain.com>', to: user.email, subject: '...', html: '...' })`.
- **Reminder cron logic:** Query: `User` join `UserSettings` where `emailReminderEnabled = true` and `preferredReminderTime` is not null. For each user: get `timezone` (default UTC) and `preferredReminderTime` (e.g. "07:00"). In that timezone, is the current hour (and maybe minute) at or past the reminder time? If yes, compute `userToday = resolveUserToday(timezone, dayRolloverTime)`, check if an entry exists for that date. If not, send reminder. Track "last reminder sent" per user per day (e.g. in a small table or in-memory for the run) to avoid duplicate sends if cron runs multiple times.
- **Weekly summary cron logic:** Query users with `weeklySummaryEnabled = true`. For each: get `timezone`, compute "7 days ago" in that timezone, query `Entry` count and `UserPlanProgress` for streak. Build email: "Your week: X days read, Y day streak. Keep it up!" with link to app.
- **Cron route protection:** `const authHeader = request.headers.get('authorization'); if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) return new Response('Unauthorized', { status: 401 });`. Vercel Cron: add to `vercel.json` a `crons` array with `path` and `schedule` (e.g. `0 * * * *` for hourly). Vercel sends the request with a header you can verify.
- **Email templates:** Keep them simple — plain HTML with inline styles or a minimal template. Subject examples: "You haven't completed today's reading yet" (reminder), "Your weekly summary from A Day Closer" (summary).

---

## Feature 9: Share/copy verse, History prev/next, Admin filters (detailed)

**External dependencies:** None for 9a and 9b. Clipboard API and optional Web Share API for 9a.

**9a. Share / copy verse**

- **Where:** Today page (and optionally History entry detail). Add "Copy verse" or "Copy" button near the scripture reference.
- **Behaviour:** On click, build string (reference + blank line + bible text; optional "From A Day Closer" + URL). `navigator.clipboard.writeText(...)`. Show "Copied!". Optional: "Share" using `navigator.share` on supported devices.
- **Files:** Small client component (e.g. `CopyVerseButton`) receiving `reference` and `bibleText`; use on Today page and optionally on History `[id]` page.
- **Effort:** Low.

**9b. History: previous / next entry**

- **Where:** `app/app/history/[id]/page.tsx`.
- **Behaviour:** "← Previous" and "Next →" at top or bottom. Previous = entry with next-smaller `entryDate` (then `id`); Next = next-greater. Link to `/app/history/{id}`.
- **Implementation:** After loading current entry, two queries: one for prev (orderBy desc, take 1 with where entryDate &lt; current or same date and id &lt; current), one for next (orderBy asc). Pass `prevId` and `nextId`; hide link when none.
- **Effort:** Low.

**9c. Admin: filter by season or day index**

- **Where:** `app/app/admin/reading-plan/page.tsx`.
- **Behaviour:** Filters above table: Season dropdown (All, Advent, Christmas, Lent, etc.) and optionally day index range. URL searchParams (e.g. `?season=Advent`) for shareability.
- **Implementation:** Page accepts `searchParams`. Add to Prisma query `where: { planId, season?: season, dayIndex?: { gte, lte } }`. Filter UI as server links or client component updating URL.
- **Effort:** Low–Medium.

**Elaboration for 9a (Copy verse):**

- **CopyVerseButton:** Client component. Props: `reference: string`, `bibleText: string`, optional `appUrl?: string`. On click: `const text = `${reference}\n\n${bibleText}${appUrl ? `\n\nFrom A Day Closer — ${appUrl}` : ''}`; await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000)`. Render: a button or icon (e.g. copy icon from a simple SVG or Unicode "⎘"). When `copied`, show "Copied!" next to it. Place it in the Today card, e.g. next to the scripture reference or at the bottom of the bible text block. For History `[id]`, same component with the entry's reference and bibleText.
- **Web Share (optional):** If `navigator.share`, show a "Share" button. `navigator.share({ title: reference, text: bibleText, url: appUrl })`. Fallback: hide Share on desktop if not supported.

**Elaboration for 9b (Prev/Next):**

- **Prev query:** `prisma.entry.findFirst({ where: { userId, OR: [{ entryDate: { lt: current.entryDate } }, { entryDate: current.entryDate, id: { lt: current.id } }] }, orderBy: [{ entryDate: 'desc' }, { id: 'desc' }], take: 1, select: { id: true } })`. Actually for "previous" (older in the list = smaller date): we want the entry with the next-smaller date. So `entryDate < current` OR `(entryDate = current AND id < current)`, orderBy desc, take 1. That gives us the one "above" in the list.
- **Next query:** `entryDate > current` OR `(entryDate = current AND id > current)`, orderBy asc, take 1.
- **UI:** Two links or buttons: "← Previous" (href when prevId exists) and "Next →" (href when nextId exists). When no prev/next, render a disabled span or hide. Place them below the back-to-History link, or at the bottom of the card.

**Elaboration for 9c (Admin filters):**

- **Seasons:** Get unique seasons from the plan: `const seasons = [...new Set(readingDays.map(d => d.season))].sort()`. Filter UI: dropdown or tabs. Options: "All" + each season. When "Advent" selected, `where: { planId, season: 'Advent' }`.
- **Day index range:** Optional. Two inputs: "From day" and "To day". `where: { planId, dayIndex: { gte: dayMin, lte: dayMax } }`. Combine with season filter with `AND`.
- **URL:** `?season=Advent&dayMin=1&dayMax=50`. Page reads `searchParams`, applies to query. Filter controls can be a client component that uses `useRouter` and `useSearchParams` to update the URL on change, triggering a server re-render.

---

*Last updated: as we add each feature’s detailed plan.*
