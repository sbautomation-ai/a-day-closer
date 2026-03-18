const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://adaycloser.app";

type WeeklySummaryData = {
  userEmail: string;
  name: string | null;
  daysCompleted: number;
  currentStreak: number;
  longestStreak: number;
};

export function buildWeeklySummaryEmail({
  userEmail,
  name,
  daysCompleted,
  currentStreak,
  longestStreak,
}: WeeklySummaryData) {
  const displayName = name?.split(" ")[0] ?? "there";
  const subject = "Your weekly summary — A Day Closer";

  const encouragement =
    daysCompleted === 7
      ? "You completed every day this week. That&apos;s incredible!"
      : daysCompleted >= 5
      ? "Fantastic week — keep it up!"
      : daysCompleted >= 3
      ? "Good progress this week. Every day counts."
      : "Every day you read is a step closer. Let&apos;s make next week even better.";

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f1117;font-family:system-ui,sans-serif;color:#e2e8f0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f1117;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:480px;">
        <tr><td style="padding-bottom:24px;">
          <p style="margin:0;font-size:18px;font-weight:600;color:#fff;">a day closer</p>
        </td></tr>
        <tr><td style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:16px;padding:32px 28px;">
          <p style="margin:0 0 4px;font-size:16px;font-weight:600;color:#fff;">Hey ${displayName} — your week in review</p>
          <p style="margin:0 0 24px;font-size:14px;color:rgba(255,255,255,0.5);">${encouragement}</p>

          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
            <tr>
              <td style="text-align:center;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:16px;">
                <p style="margin:0;font-size:28px;font-weight:700;color:#fff;">${daysCompleted}</p>
                <p style="margin:4px 0 0;font-size:11px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.05em;">Days this week</p>
              </td>
              <td width="10"></td>
              <td style="text-align:center;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:16px;">
                <p style="margin:0;font-size:28px;font-weight:700;color:#fff;">${currentStreak}</p>
                <p style="margin:4px 0 0;font-size:11px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.05em;">Current streak</p>
              </td>
              <td width="10"></td>
              <td style="text-align:center;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:16px;">
                <p style="margin:0;font-size:28px;font-weight:700;color:#a5b4fc;">${longestStreak}</p>
                <p style="margin:4px 0 0;font-size:11px;color:rgba(255,255,255,0.4);text-transform:uppercase;letter-spacing:0.05em;">Best streak</p>
              </td>
            </tr>
          </table>

          <a href="${APP_URL}/app/today"
             style="display:inline-block;background:linear-gradient(to right,#6366f1,#818cf8);color:#fff;font-size:14px;font-weight:600;padding:12px 24px;border-radius:9999px;text-decoration:none;">
            Open A Day Closer →
          </a>
        </td></tr>
        <tr><td style="padding-top:20px;">
          <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.25);line-height:1.5;">
            You&apos;re receiving this because you enabled weekly summaries in your
            <a href="${APP_URL}/app/settings" style="color:rgba(255,255,255,0.4);">A Day Closer settings</a>.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { to: userEmail, subject, html };
}
