import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";

/**
 * Ensures the current auth user has a User row in our DB (creates one if missing).
 * Call from app layout or server actions after verifying auth.
 */
export async function ensureUserRow(userId: string, email: string, name?: string | null) {
  const existing = await prisma.user.findUnique({ where: { id: userId } });
  if (existing) return existing;
  return prisma.user.create({
    data: { id: userId, email, name: name ?? null },
  });
}
