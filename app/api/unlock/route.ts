import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSkill } from "@/lib/skills";
import { readSkillFile } from "@/lib/skillFiles";
import { addContactToAudience } from "@/lib/audience";
import { unsubscribeUrl } from "@/lib/unsubscribe";

export const runtime = "nodejs";

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

  const attachments = await Promise.all(
    skill.files.map(async (f) => ({
      filename: f,
      content: await readSkillFile(skillId, f),
    }))
  );

  const unsubUrl = unsubscribeUrl(cleanEmail);

  const listUnsubscribeHeaders = {
    "List-Unsubscribe": `<${unsubUrl}>, <mailto:abhi@strivianacademy.com?subject=unsubscribe>`,
    "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
  };

  const subjectUser = `${skill.title} — your free Claude skill`;
  const htmlUser = renderUserEmail(skill.title, skill.files.length, unsubUrl);

  let emailSent = false;

  try {
    const user = await resend.emails.send({
      from: FROM,
      to: cleanEmail,
      subject: subjectUser,
      html: htmlUser,
      attachments,
      headers: listUnsubscribeHeaders,
    });
    emailSent = !user.error;
    if (user.error) console.warn("[unlock] user send error", user.error);
  } catch (err) {
    console.warn("[unlock] user send threw", err);
  }

  const res = NextResponse.json({
    ok: true,
    emailSent,
    recipient: cleanEmail,
  });
  res.cookies.set(`unlocked_${skillId}`, "1", {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}

function renderUserEmail(title: string, fileCount: number, unsubUrl: string) {
  const countWord = (n: number) =>
    ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"][n] ?? String(n);
  const fileNoun = fileCount === 1 ? "file" : "files";
  const attachedPhrase = `${countWord(fileCount)} markdown ${fileNoun}`;
  const dragPhrase = fileCount === 1 ? "the attached file" : `all ${countWord(fileCount)} attached ${fileNoun}`;
  const installPrompt = `Create a Claude skill from ${fileCount === 1 ? "this file" : "these files"}.`;
  return `
  <div style="background:#0a0a0b;color:#f4f1ea;font-family:ui-sans-serif,system-ui,sans-serif;padding:32px 24px;max-width:600px;margin:0 auto">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:24px">
      <span style="display:inline-block;width:8px;height:8px;background:#d4ff3a;border-radius:999px"></span>
      <span style="font-weight:600">Strivian Academy</span>
    </div>
    <h1 style="font-size:32px;line-height:1.1;margin:0 0 8px 0;letter-spacing:-0.02em">
      ${title}
    </h1>
    <p style="color:#9a9691;margin:0 0 24px 0;font-size:16px">
      Your skill is attached as ${attachedPhrase}.
    </p>

    <div style="background:#121214;border:1px solid rgba(244,241,234,0.08);border-radius:12px;padding:20px;margin:0 0 24px 0">
      <p style="margin:0 0 12px 0;font-weight:600;color:#f4f1ea">How to install it</p>
      <p style="margin:0 0 10px 0;color:#d4d0c7;font-size:14px;line-height:1.6">
        Open Claude Code, drag ${dragPhrase} into the chat, and say:
      </p>
      <pre style="background:#0a0a0b;border:1px solid rgba(244,241,234,0.08);border-radius:8px;padding:14px;font-size:13px;color:#d4ff3a;overflow:auto;margin:0;white-space:pre-wrap">${installPrompt}</pre>
      <p style="margin:12px 0 0 0;color:#9a9691;font-size:13px;line-height:1.6">
        Claude will set up the skill folder in <code style="color:#d4ff3a">~/.claude/skills/</code> for you. Restart Claude Code and invoke it by describing what you want.
      </p>
    </div>

    <p style="margin:24px 0 0 0;color:#9a9691;font-size:13px;line-height:1.6">
      Built by a software engineer. Not another prompt bro.<br/>
      More free skills coming — follow <strong style="color:#f4f1ea">@abhi_ai26</strong> on Instagram, TikTok, and YouTube.
    </p>

    <hr style="border:none;border-top:1px solid rgba(244,241,234,0.08);margin:32px 0 16px 0" />
    <p style="margin:0;color:#6e6a64;font-size:11px;line-height:1.6">
      You received this email because you requested a free skill from
      <a href="https://strivianacademy.com" style="color:#9a9691;text-decoration:underline">strivianacademy.com</a>.
      You&rsquo;ll also get a heads-up when new free skills drop.<br/>
      <a href="${unsubUrl}" style="color:#9a9691;text-decoration:underline">Unsubscribe</a>
      · Strivian LLC
    </p>
  </div>
  `;
}
