import "dotenv/config";
import { defineConfig } from "prisma/config";

/**
 * Prisma 7 config.
 * For migrations the Prisma CLI uses DIRECT_URL (port 5432, direct Supabase connection).
 * At runtime the app uses DATABASE_URL (pooled) via the PrismaPg driver adapter in lib/db.ts.
 * If you only have one URL, set both DATABASE_URL and DIRECT_URL to the same value.
 *
 * Passwords containing special characters (@, #, !, %, etc.) are automatically encoded
 * when the password does not already contain "@" (otherwise encode the password yourself in .env).
 */
function getDatabaseUrl(): string {
  const raw =
    process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "";
  if (!raw) return "";

  // Only one @ in URL => password has no @; we can safely extract and encode it.
  const atCount = (raw.match(/@/g) || []).length;
  if (atCount === 1) {
    const match = raw.match(/^(postgres(?:ql)?:\/\/)([^:]+):([^@]+)@(.+)$/);
    if (match) {
      const [, prefix, user, password, hostAndPath] = match;
      const encodedPassword = encodeURIComponent(password);
      return `${prefix}${user}:${encodedPassword}@${hostAndPath}`;
    }
  }

  return raw;
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: getDatabaseUrl(),
  },
});
