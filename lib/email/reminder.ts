const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://adaycloser.app";

export function buildReminderEmail(userEmail: string, name: string | null) {
  const displayName = name?.split(" ")[0] ?? "there";
  const subject = "Time for today's reading — A Day Closer";

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
          <p style="margin:0 0 8px;font-size:16px;font-weight:600;color:#fff;">Hey ${displayName},</p>
          <p style="margin:0 0 20px;font-size:14px;color:rgba(255,255,255,0.65);line-height:1.6;">
            You haven&apos;t completed today&apos;s reading yet. Take a few minutes to reflect and keep your streak going.
          </p>
          <a href="${APP_URL}/app/today"
             style="display:inline-block;background:linear-gradient(to right,#6366f1,#818cf8);color:#fff;font-size:14px;font-weight:600;padding:12px 24px;border-radius:9999px;text-decoration:none;">
            Open today&apos;s reading →
          </a>
        </td></tr>
        <tr><td style="padding-top:20px;">
          <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.25);line-height:1.5;">
            You&apos;re receiving this because you enabled daily reminders in your
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
