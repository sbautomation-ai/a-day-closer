import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { GlassCard, GlassCardContent } from "@/components/ui/GlassCard";
import { AdminReadingPlanTable } from "./AdminReadingPlanTable";
import { AdminFilters } from "./AdminFilters";

const DEFAULT_PLAN_SLUG = "core-365-day-journey";

function truncate(s: string, max: number): string {
  if (!s || s.length <= max) return s || "(empty)";
  return s.slice(0, max) + "…";
}

type Props = {
  searchParams: Promise<{ season?: string; dayMin?: string; dayMax?: string }>;
};

export default async function AdminReadingPlanPage({ searchParams }: Props) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail && user.email !== adminEmail) {
    redirect("/app/today");
  }

  const plan = await prisma.readingPlan.findUnique({
    where: { slug: DEFAULT_PLAN_SLUG },
  });
  if (!plan) {
    return (
      <GlassCard>
        <GlassCardContent>
          <p className="text-white/60">
            Default plan not found. Run seed:reading-plan.
          </p>
        </GlassCardContent>
      </GlassCard>
    );
  }

  const params = await searchParams;
  const filterSeason = params.season?.trim() ?? "";
  const filterDayMin = parseInt(params.dayMin ?? "", 10);
  const filterDayMax = parseInt(params.dayMax ?? "", 10);

  const readingDays = await prisma.readingDay.findMany({
    where: { planId: plan.id },
    orderBy: { dayIndex: "asc" },
  });

  const allSeasons = [...new Set(readingDays.map((d) => d.season))].sort();

  type ReadingDayRow = {
    id: string;
    dayIndex: number;
    season: string;
    bibleReference: string;
    explanation: string;
    reflectionPrompts: unknown;
  };

  const filtered = (readingDays as ReadingDayRow[]).filter((d) => {
    if (filterSeason && d.season !== filterSeason) return false;
    if (!Number.isNaN(filterDayMin) && d.dayIndex < filterDayMin) return false;
    if (!Number.isNaN(filterDayMax) && d.dayIndex > filterDayMax) return false;
    return true;
  });

  const rows = filtered.map((d) => ({
    id: d.id,
    dayIndex: d.dayIndex,
    season: d.season,
    bibleReference: d.bibleReference,
    explanationPreview: truncate(d.explanation, 100),
    explanation: d.explanation,
    reflectionPrompts: Array.isArray(d.reflectionPrompts)
      ? (d.reflectionPrompts as string[])
      : [],
  }));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-white">Reading plan</h1>
        <p className="mt-1 text-sm text-white/40">
          {plan.name} — read-only viewer
        </p>
      </div>

      <Suspense>
        <AdminFilters
          seasons={allSeasons}
          currentSeason={filterSeason}
          currentDayMin={Number.isNaN(filterDayMin) ? "" : String(filterDayMin)}
          currentDayMax={Number.isNaN(filterDayMax) ? "" : String(filterDayMax)}
        />
      </Suspense>

      {rows.length === 0 ? (
        <GlassCard>
          <GlassCardContent>
            <p className="text-sm text-white/40">
              No reading days match the current filters.
            </p>
          </GlassCardContent>
        </GlassCard>
      ) : (
        <AdminReadingPlanTable rows={rows} />
      )}

      <p className="text-xs text-white/25">
        Showing {rows.length} of {readingDays.length} day{readingDays.length !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
