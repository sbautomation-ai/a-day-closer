import { buildReminderEmail } from "@/lib/email/reminder";

describe("buildReminderEmail", () => {
  it("returns correct subject and includes user's first name", () => {
    const { subject, html } = buildReminderEmail("user@example.com", "Luke Smith");
    expect(subject).toMatch(/today/i);
    expect(html).toContain("Luke");
  });

  it("uses 'there' when name is null", () => {
    const { html } = buildReminderEmail("user@example.com", null);
    expect(html).toContain("Hey there");
  });

  it("includes a link to /app/today", () => {
    const { html } = buildReminderEmail("user@example.com", null);
    expect(html).toContain("/app/today");
  });

  it("sets to equal the userEmail", () => {
    const { to } = buildReminderEmail("user@example.com", "Luke");
    expect(to).toBe("user@example.com");
  });
});
