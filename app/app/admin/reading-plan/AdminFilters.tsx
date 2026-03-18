"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type AdminFiltersProps = {
  seasons: string[];
  currentSeason: string;
  currentDayMin: string;
  currentDayMax: string;
};

const selectClass =
  "block rounded-xl border border-white/20 bg-white/[0.08] px-3 py-2 text-sm text-white backdrop-blur-sm focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/25 transition-colors duration-150";

const inputClass =
  "block w-20 rounded-xl border border-white/20 bg-white/[0.08] px-3 py-2 text-sm text-white placeholder:text-white/25 backdrop-blur-sm focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/25 transition-colors duration-150";

export function AdminFilters({
  seasons,
  currentSeason,
  currentDayMin,
  currentDayMax,
}: AdminFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      }
      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  function handleClear() {
    router.push("?");
  }

  const hasFilters = currentSeason || currentDayMin || currentDayMax;

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div>
        <label
          htmlFor="season-filter"
          className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/40"
        >
          Season
        </label>
        <select
          id="season-filter"
          value={currentSeason}
          onChange={(e) => updateParams({ season: e.target.value })}
          className={selectClass}
        >
          <option value="" className="bg-slate-900 text-white">
            All seasons
          </option>
          {seasons.map((s) => (
            <option key={s} value={s} className="bg-slate-900 text-white">
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="day-min"
          className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/40"
        >
          From day
        </label>
        <input
          id="day-min"
          type="number"
          min={1}
          placeholder="1"
          value={currentDayMin}
          onChange={(e) => updateParams({ dayMin: e.target.value })}
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="day-max"
          className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-white/40"
        >
          To day
        </label>
        <input
          id="day-max"
          type="number"
          min={1}
          placeholder="365"
          value={currentDayMax}
          onChange={(e) => updateParams({ dayMax: e.target.value })}
          className={inputClass}
        />
      </div>

      {hasFilters && (
        <button
          type="button"
          onClick={handleClear}
          className="rounded-xl border border-white/15 bg-white/[0.06] px-3 py-2 text-sm text-white/50 transition-all duration-150 hover:bg-white/[0.12] hover:text-white"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
