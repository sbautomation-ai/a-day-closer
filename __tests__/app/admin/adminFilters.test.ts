type Row = { id: string; dayIndex: number; season: string; bibleReference: string };

function applyFilters(
  rows: Row[],
  filterSeason: string,
  filterDayMin: number,
  filterDayMax: number
): Row[] {
  return rows.filter((d) => {
    if (filterSeason && d.season !== filterSeason) return false;
    if (!Number.isNaN(filterDayMin) && d.dayIndex < filterDayMin) return false;
    if (!Number.isNaN(filterDayMax) && d.dayIndex > filterDayMax) return false;
    return true;
  });
}

const rows: Row[] = [
  { id: "1", dayIndex: 1, season: "Advent", bibleReference: "Isa 1:1" },
  { id: "2", dayIndex: 2, season: "Advent", bibleReference: "Isa 2:1" },
  { id: "3", dayIndex: 10, season: "Lent", bibleReference: "Matt 4:1" },
  { id: "4", dayIndex: 11, season: "Lent", bibleReference: "Matt 4:2" },
  { id: "5", dayIndex: 20, season: "Ordinary", bibleReference: "Ps 23:1" },
];

describe("admin reading plan filter logic", () => {
  it("returns all rows when no filter is applied", () => {
    expect(applyFilters(rows, "", NaN, NaN)).toHaveLength(5);
  });

  it("filters by season", () => {
    const result = applyFilters(rows, "Advent", NaN, NaN);
    expect(result).toHaveLength(2);
    expect(result.every((r) => r.season === "Advent")).toBe(true);
  });

  it("filters by dayMin", () => {
    const result = applyFilters(rows, "", 10, NaN);
    expect(result).toHaveLength(3);
    expect(result.every((r) => r.dayIndex >= 10)).toBe(true);
  });

  it("filters by dayMax", () => {
    const result = applyFilters(rows, "", NaN, 10);
    expect(result).toHaveLength(3);
    expect(result.every((r) => r.dayIndex <= 10)).toBe(true);
  });

  it("filters by season and day range", () => {
    const result = applyFilters(rows, "Lent", 10, 10);
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe("3");
  });

  it("returns empty array when no rows match", () => {
    const result = applyFilters(rows, "Easter", NaN, NaN);
    expect(result).toHaveLength(0);
  });
});
