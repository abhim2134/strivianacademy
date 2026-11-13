import { createHmac, timingSafeEqual } from "crypto";

function secret(): string {
  const s = process.env.UNSUBSCRIBE_SECRET;
  if (!s) throw new Error("UNSUBSCRIBE_SECRET env var is not set");
  return s;
}

function siteUrl(): string {
  return (
    process.env.SITE_URL?.replace(/\/$/, "") ?? "https://amullapudi.com"
  );
}

function sign(email: string): string {
  return createHmac("sha256", secret())
    .update(email.toLowerCase().trim())
    .digest("base64url");
}

export function verifyUnsubscribeToken(
  email: string,
  token: string
): boolean {
  try {
    const expected = sign(email);
    const a = Buffer.from(expected);
    const b = Buffer.from(token);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function unsubscribeUrl(email: string): string {
  const params = new URLSearchParams({ e: email, t: sign(email) });
  return `${siteUrl()}/unsubscribe?${params.toString()}`;
}

// Download links reuse the same secret with a different message, so an
// unsubscribe token can never be used as a download token (or the reverse).
function signDownload(email: string, skillId: string): string {
  return createHmac("sha256", secret())
    .update(`download:${skillId}:${email.toLowerCase().trim()}`)
    .digest("base64url");
}

export function downloadUrl(email: string, skillId: string): string {
  const params = new URLSearchParams({
    s: skillId,
    e: email,
    t: signDownload(email, skillId),
  });
  return `${siteUrl()}/api/download?${params.toString()}`;
}

export function verifyDownloadToken(
  email: string,
  skillId: string,
  token: string
): boolean {
  try {
    const a = Buffer.from(signDownload(email, skillId));
    const b = Buffer.from(token);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

export function unsubscribeApiUrl(email: string): string {
  const params = new URLSearchParams({ e: email, t: sign(email) });
  return `${siteUrl()}/api/unsubscribe?${params.toString()}`;
}
