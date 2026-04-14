import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSkill } from "@/lib/skills";
import { saveEmail } from "@/lib/emailStore";
import { buildSkillZip, readSkillFile } from "@/lib/skillFiles";

export const runtime = "nodejs";

const OWNER_EMAIL = "abhiram.mullapudi04@gmail.com";
const FROM = "Abhi · Strivian Academy <abhi@strivianacademy.com>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid-json" }, { status: 400 });
  }

  const { email, skillId } = (body ?? {}) as {
    email?: string;
    skillId?: string;
  };

  if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return NextResponse.json({ error: "invalid-email" }, { status: 400 });
  }
  if (!skillId || typeof skillId !== "string") {
    return NextResponse.json({ error: "missing-skill" }, { status: 400 });
  }
  const skill = getSkill(skillId);
  if (!skill || !skill.available) {
    return NextResponse.json({ error: "skill-not-found" }, { status: 404 });
  }

  const cleanEmail = email.trim().toLowerCase();

  await saveEmail({
    email: cleanEmail,
    skillId,
    at: new Date().toISOString(),
    ua: req.headers.get("user-agent") ?? undefined,
    ip:
      req.headers.get("x-forwarded-for") ??
      req.headers.get("x-real-ip") ??
      undefined,
  });

  const apiKey = process.env.RESEND_API_KEY;
  const downloadUrl = `/api/skills/${skillId}/download`;

  if (!apiKey) {
    console.warn("[unlock] RESEND_API_KEY missing — skipping email send");
    return NextResponse.json({ ok: true, downloadUrl, emailSent: false });
  }

  const resend = new Resend(apiKey);

  const attachments = await Promise.all(
    skill.files.map(async (f) => ({
      filename: f,
      content: await readSkillFile(skillId, f),
    }))
  );

  const subjectUser = `${skill.title} — your free Claude skill from Strivian`;
  const htmlUser = renderUserEmail(skill.title, skill.tagline, skillId);

  const subjectOwner = `[Strivian] New unlock: ${cleanEmail} → ${skill.title}`;
  const htmlOwner = `
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;max-width:560px">
      <h2 style="margin:0 0 12px 0">New skill unlock</h2>
      <p style="margin:0 0 4px 0"><strong>Email:</strong> ${cleanEmail}</p>
      <p style="margin:0 0 4px 0"><strong>Skill:</strong> ${skill.title} (${skillId})</p>
      <p style="margin:0 0 4px 0"><strong>At:</strong> ${new Date().toISOString()}</p>
      <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
      <p style="color:#666;font-size:12px">Files attached for your records.</p>
    </div>
  `;

  let emailSent = false;
  let ownerEmailSent = false;

  try {
    const owner = await resend.emails.send({
      from: FROM,
      to: OWNER_EMAIL,
      subject: subjectOwner,
      html: htmlOwner,
      attachments,
    });
    ownerEmailSent = !owner.error;
    if (owner.error) console.warn("[unlock] owner send error", owner.error);
  } catch (err) {
    console.warn("[unlock] owner send threw", err);
  }

  try {
    const user = await resend.emails.send({
      from: FROM,
      to: cleanEmail,
      subject: subjectUser,
      html: htmlUser,
      attachments,
    });
    emailSent = !user.error;
    if (user.error) console.warn("[unlock] user send error", user.error);
  } catch (err) {
    console.warn("[unlock] user send threw", err);
  }

  const res = NextResponse.json({
    ok: true,
    downloadUrl,
    emailSent,
    ownerEmailSent,
  });
  res.cookies.set(`unlocked_${skillId}`, "1", {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}

function renderUserEmail(title: string, tagline: string, skillId: string) {
  return `
  <div style="background:#0a0a0b;color:#f4f1ea;font-family:ui-sans-serif,system-ui,sans-serif;padding:32px 24px;max-width:600px;margin:0 auto">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:24px">
      <span style="display:inline-block;width:8px;height:8px;background:#d4ff3a;border-radius:999px"></span>
      <span style="font-weight:600">Strivian Academy</span>
    </div>
    <h1 style="font-size:32px;line-height:1.1;margin:0 0 8px 0;letter-spacing:-0.02em">
      ${title}
    </h1>
    <p style="color:#9a9691;margin:0 0 24px 0;font-size:16px">${tagline}</p>
    <p style="margin:0 0 16px 0">Your skill is attached to this email as markdown files.</p>
    <p style="margin:0 0 8px 0;font-weight:600">Install it in Claude:</p>
    <pre style="background:#121214;border:1px solid rgba(244,241,234,0.08);border-radius:8px;padding:12px;font-size:13px;color:#d4ff3a;overflow:auto">mkdir -p ~/.claude/skills/${skillId}
# drop the attached files into that folder</pre>
    <p style="margin:24px 0 0 0;color:#9a9691;font-size:13px">
      Built by a software engineer. Not another prompt bro.<br/>
      More free skills coming — follow @abhi_ai26 on Instagram, TikTok, YouTube.
    </p>
  </div>
  `;
}

// Debug/helper: return the skill zip size without triggering email send
export async function GET() {
  const zip = await buildSkillZip("ai-website-business");
  return NextResponse.json({ bytes: zip.length });
}
