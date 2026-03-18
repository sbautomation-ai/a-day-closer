/**
 * Validates the incoming cron request's Authorization header against CRON_SECRET.
 * Returns true if the request is authorized; false otherwise.
 *
 * Usage:
 *   if (!authorizeCronRequest(request)) {
 *     return new Response("Unauthorized", { status: 401 });
 *   }
 */
export function authorizeCronRequest(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    console.error("CRON_SECRET is not set. Cron routes are unprotected.");
    return false;
  }
  const auth = request.headers.get("authorization");
  return auth === `Bearer ${secret}`;
}
