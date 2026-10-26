import { NextResponse } from "next/server";

/**
 * Retired endpoint. The health-assessment form it served no longer exists;
 * contact requests go to /api/leads/demo. Kept as an explicit 410 (instead of
 * deleting the file) so stale clients get a clear answer, not a 404.
 */
export async function POST() {
  return NextResponse.json(
    { ok: false, message: "This endpoint has moved to /api/leads/demo.", error_code: "GONE" },
    { status: 410 }
  );
}
