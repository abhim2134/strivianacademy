import { Resend } from "resend";

type AddResult = {
  added: boolean;
  alreadyExisted: boolean;
  error?: string;
};

export async function addContactToAudience(
  email: string,
  _skillId: string
): Promise<AddResult> {
  void _skillId;
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    return {
      added: false,
      alreadyExisted: false,
      error: "missing-audience-config",
    };
  }

  const resend = new Resend(apiKey);

  try {
    const res = await resend.contacts.create({
      email,
      audienceId,
      unsubscribed: false,
    });

    if (!res.error) {
      return { added: true, alreadyExisted: false };
    }

    const msg = res.error.message?.toLowerCase() ?? "";
    const isDuplicate =
      msg.includes("already exists") ||
      msg.includes("duplicate") ||
      msg.includes("contact already");

    if (!isDuplicate) {
      console.warn("[audience] create error", res.error);
      return { added: false, alreadyExisted: false, error: res.error.message };
    }

    // Contact already in audience — re-subscribe them in case they had unsubscribed.
    const update = await resend.contacts.update({
      email,
      audienceId,
      unsubscribed: false,
    });
    if (update.error) {
      console.warn("[audience] re-subscribe error", update.error);
      return {
        added: false,
        alreadyExisted: true,
        error: update.error.message,
      };
    }
    return { added: false, alreadyExisted: true };
  } catch (err) {
    console.warn("[audience] threw", err);
    return {
      added: false,
      alreadyExisted: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export async function unsubscribeContact(
  email: string
): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    return { ok: false, error: "missing-audience-config" };
  }

  const resend = new Resend(apiKey);

  try {
    const res = await resend.contacts.update({
      email,
      audienceId,
      unsubscribed: true,
    });
    if (res.error) {
      const msg = res.error.message?.toLowerCase() ?? "";
      if (msg.includes("not found")) {
        return { ok: true };
      }
      console.warn("[audience] unsubscribe error", res.error);
      return { ok: false, error: res.error.message };
    }
    return { ok: true };
  } catch (err) {
    console.warn("[audience] unsubscribe threw", err);
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
