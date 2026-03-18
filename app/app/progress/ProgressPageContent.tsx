"use client";

import Link from "next/link";

type MonthNavigatorProps = {
  year: number;
  month: number;
  userTodayYear: number;
  userTodayMonth: number;
};

function monthParam(year: number, month: number): string {
  const m = month + 1;
  return `${year}-${String(m).padStart(2, "0")}`;
}

export function MonthNavigator({
  year,
  month,
  userTodayYear,
  userTodayMonth,
}: MonthNavigatorProps) {
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  const isCurrentMonth = year === userTodayYear && month === userTodayMonth;

  return (
    <div className="flex items-center justify-between gap-2">
      <Link
        href={`/app/progress?month=${monthParam(prevYear, prevMonth)}`}
        className="rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        aria-label="Previous month"
      >
        <span className="inline-block h-5 w-5 text-center leading-5">←</span>
      </Link>
      <span className="text-sm font-medium text-white/80">
        {new Date(year, month).toLocaleString(undefined, {
          month: "long",
          year: "numeric",
        })}
        {isCurrentMonth && (
          <span className="ml-1.5 text-xs font-normal text-white/40">(this month)</span>
        )}
      </span>
      <Link
        href={isCurrentMonth ? "#" : `/app/progress?month=${monthParam(nextYear, nextMonth)}`}
        className={`rounded-full p-2 transition-colors ${
          isCurrentMonth
            ? "cursor-default text-white/25"
            : "text-white/60 hover:bg-white/10 hover:text-white"
        }`}
        aria-label="Next month"
        onClick={isCurrentMonth ? (e) => e.preventDefault() : undefined}
      >
        <span className="inline-block h-5 w-5 text-center leading-5">→</span>
      </Link>
    </div>
  );
}
