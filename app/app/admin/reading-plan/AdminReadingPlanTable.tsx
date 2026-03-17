"use client";

import { useState } from "react";
import { GlassCard, GlassCardContent, GlassCardHeader } from "@/components/ui/GlassCard";

type Row = {
  id: string;
  dayIndex: number;
  season: string;
  bibleReference: string;
  explanationPreview: string;
  explanation: string;
  reflectionPrompts: string[];
};

export function AdminReadingPlanTable({ rows }: { rows: Row[] }) {
  const [selected, setSelected] = useState<Row | null>(null);

  return (
    <div className="space-y-4">
      <GlassCard>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.04]">
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-white/40">Day</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-white/40">Season</th>
                <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-white/40">Reference</th>
                <th className="hidden px-4 py-3 text-xs font-medium uppercase tracking-wider text-white/40 sm:table-cell">
                  Explanation
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr
                  key={row.id}
                  onClick={() => setSelected(row)}
                  className={[
                    "cursor-pointer transition-colors duration-100 hover:bg-white/[0.05]",
                    idx < rows.length - 1 ? "border-b border-white/[0.06]" : "",
                    selected?.id === row.id ? "bg-indigo-500/10" : "",
                  ].join(" ")}
                >
                  <td className="px-4 py-3 text-white/60">{row.dayIndex}</td>
                  <td className="px-4 py-3 text-white/80">{row.season}</td>
                  <td className="px-4 py-3 font-medium text-white">{row.bibleReference}</td>
                  <td className="hidden max-w-[220px] truncate px-4 py-3 text-white/40 sm:table-cell">
                    {row.explanationPreview}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {selected && (
        <GlassCard>
          <GlassCardHeader className="flex flex-row items-center justify-between">
            <h2 className="text-base font-semibold text-white">
              Day {selected.dayIndex} · {selected.season} · {selected.bibleReference}
            </h2>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="rounded-full px-3 py-1 text-xs text-white/40 hover:text-white hover:bg-white/10 transition-colors"
            >
              Close
            </button>
          </GlassCardHeader>
          <GlassCardContent className="space-y-5">
            <div>
              <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-white/40">
                Explanation
              </p>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/70">
                {selected.explanation || "(empty)"}
              </p>
            </div>
            <div>
              <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-white/40">
                Reflection prompts
              </p>
              {selected.reflectionPrompts.length === 0 ? (
                <p className="text-sm text-white/35">(none)</p>
              ) : (
                <ul className="space-y-1.5">
                  {selected.reflectionPrompts.map((p, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-white/65">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-indigo-400" />
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </GlassCardContent>
        </GlassCard>
      )}
    </div>
  );
}
