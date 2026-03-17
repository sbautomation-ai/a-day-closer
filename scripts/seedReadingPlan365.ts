/**
 * Seeds the default 365-day reading plan and all ReadingDay rows.
 * Run: npm run seed:reading-plan
 *
 * Requires DATABASE_URL in env (direct Supabase connection, port 5432).
 * Run "npx prisma migrate dev" first to create the tables.
 */

import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { READING_PLAN_365 } from "../content/readingPlan365";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter } as ConstructorParameters<typeof PrismaClient>[0]);

async function main() {
  const plan = await prisma.readingPlan.upsert({
    where: { slug: "core-365-day-journey" },
    create: {
      name: "Core 365-Day Journey",
      slug: "core-365-day-journey",
      description: "A year of daily readings aligned with the liturgical seasons.",
      isDefault: true,
    },
    update: {
      name: "Core 365-Day Journey",
      description: "A year of daily readings aligned with the liturgical seasons.",
      isDefault: true,
    },
  });

  console.log("Plan:", plan.id, plan.slug);

  let upserted = 0;
  for (const seed of READING_PLAN_365) {
    await prisma.readingDay.upsert({
      where: {
        planId_dayIndex: { planId: plan.id, dayIndex: seed.dayIndex },
      },
      create: {
        planId: plan.id,
        dayIndex: seed.dayIndex,
        season: seed.season,
        bibleReference: seed.bibleReference,
        bibleText: (seed as any).passageText ?? null,
        explanation: seed.explanation,
        reflectionPrompts: seed.reflectionPrompts,
      },
      update: {
        season: seed.season,
        bibleReference: seed.bibleReference,
        bibleText: (seed as any).passageText ?? null,
        explanation: seed.explanation,
        reflectionPrompts: seed.reflectionPrompts,
      },
    });
    upserted++;
  }

  console.log(`Done. Upserted ${upserted} ReadingDay rows.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
