import { NextResponse } from "next/server";
import { getOnChainStats } from "@/lib/helius";

export const revalidate = 60;
export const runtime = "nodejs";

export async function GET() {
  try {
    const stats = await getOnChainStats();
    return NextResponse.json(stats, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch {
    return NextResponse.json(
      {
        slot: 0,
        credentialCount: 0,
        latestTxSignature: null,
        latestTxTime: null,
        wallet: process.env.LUCAS_WALLET ?? "",
        error: "unavailable",
      },
      { status: 200 },
    );
  }
}
