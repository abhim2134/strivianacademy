import { NextResponse } from "next/server";
import { verifyUnsubscribeToken } from "@/lib/unsubscribe";
import { unsubscribeContact } from "@/lib/audience";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const email = url.searchParams.get("e");
  const token = url.searchParams.get("t");
  if (!email || !token || !verifyUnsubscribeToken(email, token)) {
    return NextResponse.json({ error: "invalid-token" }, { status: 400 });
  }
  const result = await unsubscribeContact(email.trim().toLowerCase());
  if (!result.ok) {
    return NextResponse.json({ error: result.error ?? "failed" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

// Gmail one-click unsubscribe sends a POST to the same URL.
export async function POST(req: Request) {
  return GET(req);
}
