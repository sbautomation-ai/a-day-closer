"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

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
      <Card>
        <CardContent className="overflow-x-auto p-0">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/50">
                <th className="px-4 py-2 font-medium">Day</th>
                <th className="px-4 py-2 font-medium">Season</th>
                <th className="px-4 py-2 font-medium">Reference</th>
                <th className="max-w-[200px] px-4 py-2 font-medium">Explanation</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => setSelected(row)}
                  className="cursor-pointer border-b border-zinc-100 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50"
                >
                  <td className="px-4 py-2">{row.dayIndex}</td>
                  <td className="px-4 py-2">{row.season}</td>
                  <td className="px-4 py-2">{row.bibleReference}</td>
                  <td className="max-w-[200px] truncate px-4 py-2 text-zinc-500 dark:text-zinc-400">
                    {row.explanationPreview}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {selected && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <h2 className="text-lg font-medium">
              Day {selected.dayIndex} · {selected.season} · {selected.bibleReference}
            </h2>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-400"
            >
              Close
            </button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="mb-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Explanation
              </h3>
              <p className="whitespace-pre-wrap text-zinc-800 dark:text-zinc-200">
                {selected.explanation || "(empty)"}
              </p>
            </div>
            <div>
              <h3 className="mb-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Reflection prompts
              </h3>
              {selected.reflectionPrompts.length === 0 ? (
                <p className="text-zinc-500 dark:text-zinc-400">(none)</p>
              ) : (
                <ul className="list-inside list-disc space-y-1 text-zinc-800 dark:text-zinc-200">
                  {selected.reflectionPrompts.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
