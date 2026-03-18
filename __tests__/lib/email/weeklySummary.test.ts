import { buildWeeklySummaryEmail } from "@/lib/email/weeklySummary";

describe("buildWeeklySummaryEmail", () => {
  it("returns correct subject", () => {
    const { subject } = buildWeeklySummaryEmail({
      userEmail: "user@example.com",
      name: "Luke",
      daysCompleted: 5,
      currentStreak: 10,
      longestStreak: 20,
    });
    expect(subject).toMatch(/weekly summary/i);
  });

  it("includes daysCompleted in html", () => {
    const { html } = buildWeeklySummaryEmail({
      userEmail: "user@example.com",
      name: "Luke",
      daysCompleted: 5,
      currentStreak: 10,
      longestStreak: 20,
    });
    expect(html).toContain("5");
    expect(html).toContain("10");
    expect(html).toContain("20");
  });

  it("shows perfect week message when 7 days completed", () => {
    const { html } = buildWeeklySummaryEmail({
      userEmail: "user@example.com",
      name: null,
      daysCompleted: 7,
      currentStreak: 7,
      longestStreak: 7,
    });
    expect(html).toMatch(/every day this week/i);
  });

  it("uses first name only", () => {
    const { html } = buildWeeklySummaryEmail({
      userEmail: "user@example.com",
      name: "Luke Smith",
      daysCompleted: 3,
      currentStreak: 3,
      longestStreak: 10,
    });
    expect(html).toContain("Luke");
    expect(html).not.toContain("Smith");
  });

  it("uses there when name is null", () => {
    const { html } = buildWeeklySummaryEmail({
      userEmail: "user@example.com",
      name: null,
      daysCompleted: 1,
      currentStreak: 1,
      longestStreak: 5,
    });
    expect(html).toContain("Hey there");
  });
});
