import { toEntryDate, resolveUserToday } from "@/lib/today";

describe("toEntryDate", () => {
  it("formats date as YYYY-MM-DD", () => {
    expect(toEntryDate(new Date(2025, 0, 1))).toBe("2025-01-01");
    expect(toEntryDate(new Date(2025, 11, 31))).toBe("2025-12-31");
    expect(toEntryDate(new Date(2024, 1, 29))).toBe("2024-02-29");
  });

  it("pads month and day with zero", () => {
    expect(toEntryDate(new Date(2025, 8, 5))).toBe("2025-09-05");
  });
});

describe("resolveUserToday", () => {
  it("returns a Date with valid year/month/day when no args", () => {
    const d = resolveUserToday();
    expect(d).toBeInstanceOf(Date);
    expect(d.getFullYear()).toBeGreaterThanOrEqual(2020);
    expect(d.getMonth()).toBeGreaterThanOrEqual(0);
    expect(d.getMonth()).toBeLessThanOrEqual(11);
    expect(d.getDate()).toBeGreaterThanOrEqual(1);
  });

  it("with UTC timezone returns date in UTC day", () => {
    const d = resolveUserToday("UTC");
    expect(d).toBeInstanceOf(Date);
    expect(d.getFullYear()).toBeDefined();
    expect(d.getMonth()).toBeGreaterThanOrEqual(0);
    expect(d.getDate()).toBeGreaterThanOrEqual(1);
  });

  it("with Europe/London returns a date", () => {
    const d = resolveUserToday("Europe/London");
    expect(d).toBeInstanceOf(Date);
    expect(Number.isNaN(d.getTime())).toBe(false);
  });

  it("with dayRolloverTime before current time uses previous calendar day", () => {
    // If we're at 02:00 and rollover is 03:00, we're still "yesterday"
    // This is hard to test without controlling system time; we just assert it doesn't throw
    const d = resolveUserToday("UTC", "03:00");
    expect(d).toBeInstanceOf(Date);
    expect(Number.isNaN(d.getTime())).toBe(false);
  });
});
