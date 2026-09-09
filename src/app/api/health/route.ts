import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const startedAt = Date.now();
  try {
    const database = await connectToDatabase();
    if (!database) throw new Error("database unavailable");
    await database.connection.db?.admin().ping();
    return NextResponse.json(
      { status: "ok", database: "connected", latencyMs: Date.now() - startedAt, timestamp: new Date().toISOString() },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json(
      { status: "degraded", database: "unavailable", latencyMs: Date.now() - startedAt, timestamp: new Date().toISOString() },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }
}
