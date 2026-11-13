import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSkill, type Skill } from "@/lib/skills";
import { addContactToAudience } from "@/lib/audience";
import { downloadUrl, unsubscribeUrl } from "@/lib/unsubscribe";

export const runtime = "nodejs";

const FROM = "Abhi <abhi@amullapudi.com>";
const REPLY_TO = "amullapudi.ai@gmail.com";
const HANDLE = "@abhibuilds1";

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

  const audienceResult = await addContactToAudience(cleanEmail, skillId);
  if (audienceResult.error) {
    console.warn("[unlock] audience issue", audienceResult.error);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[unlock] RESEND_API_KEY missing — skipping email send");
    return NextResponse.json({ ok: true, emailSent: false });
  }

  const resend = new Resend(apiKey);
  const unsubUrl = unsubscribeUrl(cleanEmail);

  // The skill ships as a download link, not an attachment: it includes a
  // Windows .ps1 script, which Gmail and others block as an attachment.
  let emailSent = false;
  try {
    const sent = await resend.emails.send({
      from: FROM,
      replyTo: REPLY_TO,
      to: cleanEmail,
      subject: `${skill.title}: your free Claude skill`,
      html: renderUserEmail(skill, downloadUrl(cleanEmail, skill.id), unsubUrl),
      headers: {
        "List-Unsubscribe": `<${unsubUrl}>, <mailto:${REPLY_TO}?subject=unsubscribe>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    });
    emailSent = !sent.error;
    if (sent.error) console.warn("[unlock] send error", sent.error);
  } catch (err) {
    console.warn("[unlock] send threw", err);
  }

  return NextResponse.json({ ok: true, emailSent, recipient: cleanEmail });
}

function renderUserEmail(skill: Skill, dlUrl: string, unsubUrl: string) {
  const folder = skill.zip.replace(/\.zip$/, "");
  return `
  <div style="background:#0a0a0b;color:#f4f1ea;font-family:ui-sans-serif,system-ui,sans-serif;padding:32px 24px;max-width:600px;margin:0 auto">
    <div style="margin-bottom:24px;font-weight:600">${HANDLE}</div>
    <h1 style="font-size:32px;line-height:1.1;margin:0 0 8px 0;letter-spacing:-0.02em">${skill.title}</h1>
    <p style="color:#9a9691;margin:0 0 24px 0;font-size:16px">${skill.tagline}</p>

    <a href="${dlUrl}" style="display:inline-block;background:#ff4500;color:#0a0a0b;font-weight:700;text-decoration:none;padding:14px 22px;border-radius:6px;margin:0 0 24px 0">Download the skill (.zip)</a>

    <div style="background:#121214;border:1px solid rgba(244,241,234,0.08);border-radius:12px;padding:20px;margin:0 0 24px 0">
      <p style="margin:0 0 12px 0;font-weight:600">How to install it</p>
      <ol style="margin:0;padding-left:20px;color:#d4d0c7;font-size:14px;line-height:1.7">
        <li>Unzip it. You get a folder named <code style="color:#ffcc00">${folder}</code>.</li>
        <li>Move that folder into <code style="color:#ffcc00">~/.claude/skills/</code> (Windows: <code style="color:#ffcc00">%USERPROFILE%\\.claude\\skills\\</code>).</li>
        <li>Open a new Claude Code session and say:</li>
      </ol>
      <pre style="background:#0a0a0b;border:1px solid rgba(244,241,234,0.08);border-radius:8px;padding:14px;font-size:13px;color:#ffcc00;margin:12px 0 0 0;white-space:pre-wrap">${skill.prompt}</pre>
      <p style="margin:12px 0 0 0;color:#9a9691;font-size:13px;line-height:1.6">It checks your computer first and asks before installing anything.</p>
    </div>

    <p style="margin:24px 0 0 0;color:#9a9691;font-size:13px;line-height:1.6">
      More free skills coming. Follow <strong style="color:#f4f1ea">${HANDLE}</strong> on YouTube, Instagram and TikTok.
    </p>

    <hr style="border:none;border-top:1px solid rgba(244,241,234,0.08);margin:32px 0 16px 0" />
    <p style="margin:0;color:#6e6a64;font-size:11px;line-height:1.6">
      You received this email because you requested a free skill from
      <a href="https://amullapudi.com" style="color:#9a9691;text-decoration:underline">amullapudi.com</a>.
      You&rsquo;ll also get a heads-up when new free skills drop.<br/>
      <a href="${unsubUrl}" style="color:#9a9691;text-decoration:underline">Unsubscribe</a>
    </p>
  </div>
  `;
}
