import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { GlassCard, GlassCardContent } from "@/components/ui/GlassCard";
import { AdminReadingPlanTable } from "./AdminReadingPlanTable";

const DEFAULT_PLAN_SLUG = "core-365-day-journey";

function truncate(s: string, max: number): string {
  if (!s || s.length <= max) return s || "(empty)";
  return s.slice(0, max) + "…";
}

export default async function AdminReadingPlanPage() {
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

  const readingDays = await prisma.readingDay.findMany({
    where: { planId: plan.id },
    orderBy: { dayIndex: "asc" },
  });

  type ReadingDayRow = {
    id: string;
    dayIndex: number;
    season: string;
    bibleReference: string;
    explanation: string;
    reflectionPrompts: unknown;
  };
  const rows = readingDays.map((d: ReadingDayRow) => ({
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
      <AdminReadingPlanTable rows={rows} />
    </div>
  );
}
