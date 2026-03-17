import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
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
      <Card>
        <CardContent className="pt-6">
          <p className="text-zinc-600 dark:text-zinc-400">
            Default plan not found. Run seed:reading-plan.
          </p>
        </CardContent>
      </Card>
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
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
        Reading plan (admin)
      </h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Default plan: {plan.name}. Read-only viewer for content review.
      </p>
      <AdminReadingPlanTable rows={rows} />
    </div>
  );
}
