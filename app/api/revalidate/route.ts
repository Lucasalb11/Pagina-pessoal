import { revalidateTag } from "next/cache";
import { timingSafeEqual } from "node:crypto";
import { PORTFOLIO_TAG } from "@/lib/portfolio";

/**
 * Called by a project's GitHub Action after a successful production deploy
 * (see .github/workflow-templates/notify-portfolio.yml). Expires the cached
 * GitHub/Vercel lookups so the new live link shows up on the next request.
 */
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  const given = req.headers.get("x-revalidate-secret") ?? "";
  if (!secret || given.length !== secret.length || !timingSafeEqual(Buffer.from(given), Buffer.from(secret))) {
    return Response.json({ error: "Missing or wrong x-revalidate-secret header." }, { status: 401 });
  }
  revalidateTag(PORTFOLIO_TAG, { expire: 0 });
  return Response.json({ revalidated: true, at: new Date().toISOString() });
}
