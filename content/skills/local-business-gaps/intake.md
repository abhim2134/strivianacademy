# Intake — two-stage, recommendation-first

Intake is a short conversation, not a form. Goal: get to a concrete plan fast. Recommend rather than ask open-ended once context is sufficient.

## Flow

```
Stage A: frame the ask  (4 questions, one message)
    ↓
Claude proposes recipe match + concrete signal stack with rationale
    ↓
User confirms/amends sources
    ↓
Preflight (Chrome extension, Apify token readiness)
    ↓
Stage B: collect what's needed for the chosen sources only
    ↓
Claude goes to Phase 2 (Research)
```

## Stage A — frame the ask

Ask these up front, numbered, in one message:

**1. Your services.** What do you sell? (SEO / Meta ads / Google ads / web design / web dev / automations/AI / email/SMS / GBP management / social content / booking systems / reputation mgmt / full-stack.) Multiple answers fine. This filters what gaps become pitches vs awareness-only flags.

**2. Target(s).** One of:
- Named business(es) — names + cities, or URLs/GBP links if you have them
- A discovery brief — "find 5-15 <category> in <area> with pitchable gaps in <service>"
- A list file path (CSV / line-separated names)

**3. Vertical / industry.** Broad category. If discovery mode, also the geographic scope (city / metro / neighborhood).

**4. Pitch posture (optional).** Cold outbound? Warm intro? Pre-call prep? Bulk prospecting? Changes how aggressive the brief should be — pre-call prep wants every gap flagged, bulk cold outreach wants one sharp hook per target.

## Claude's recommendation step

After Stage A, Claude does NOT ask "which sources do you want." Instead:

1. If a matching `recipe-*.md` file exists for the vertical, load it.
2. Propose a concrete signal stack tuned to the user's services + vertical:

```
Based on services=[<user's services>], vertical=<v>, targets=<shape>, I recommend:

PRIMARY (will yield the gaps you can actually pitch)
  1. <Signal>: <Tool> — <why this matters for THIS user>
  2. <Signal>: <Tool> — ...

SECONDARY (worth a quick check, skip if tight on time)
  3. ...

SKIP (won't yield pitchable signal for your services)
  - <Signal> because <reason>

Tool choices (picked for best signal, not a fixed ranking):
  - Apify for <signals> — <why Apify here>
  - Official API for <signals> — <why>
  - mcp__Claude_in_Chrome for <signals> — <why browser is right here>
  - Direct fetch for <signals> — <why>

Confirm, or tell me what to add/drop.
```

Be opinionated. Examples:

- **User sells only Meta ads + automations, target is a restaurant**: lead with Meta Ad Library + website fetch (for landing page quality) + IG scan (is IG even active — if not, ads will fail). Skip deep SEO probes. Skip LinkedIn.
- **User sells full-stack, target is a 15-person HVAC company**: go wide — GBP, website, PageSpeed, SERP, Meta ads, FB/IG, BBB, reviews deep-pull, LinkedIn for team size signal (automation pitch lever).
- **User sells only web design/dev, target is a boutique with no website**: confirm no website via multiple signals (domain WHOIS, facebook page check, google.com/search for the name), check what competitors in the vertical have, check GBP photo hygiene. Skip ads, skip LinkedIn.

Don't list every possible source — pick what'll produce pitchable gaps for THIS user.

## Stage B — collect what the chosen sources need

Once the stack is confirmed, ask ONLY for what those sources need:

**5. API keys.**
   - List each needed for the confirmed sources, e.g.:
     - "Google Maps reviews via Apify → need `APIFY_API_TOKEN`"
     - "PageSpeed API → `PAGESPEED_API_KEY` (or I can run without, slower rate)"
     - "Meta Ad Library → `META_ACCESS_TOKEN` (free at developers.facebook.com)"
   - For each: *"Is `<KEY>` in ~/.claude/settings.local.json, or do you want to paste it here and I'll save it?"*
   - **If pasted**: write to `~/.claude/settings.local.json` under `env`. Confirm by name, never echo value.
   - **If "just this run"**: keep in memory, pass as scoped env on Bash calls, don't write to disk.

**6. Pitch constraints (optional).**
   - Minimum retainer size? (e.g. "only flag pitches that justify $1k+/mo")
   - One-offs OK? (some users only want recurring work)
   - Industries to exclude? (e.g. "no bars, no cannabis")

**7. Output preferences.**
   - Default: per-target markdown brief in `./output/pitches/` + cross-target matrix if targets > 1.
   - Ask if user wants:
     - CSV of gaps (for pipeline spreadsheet)
     - Cold-outreach drafts immediately (hand off to existing email/LinkedIn skills)
     - A one-slide Canva-ready summary per target

## Shortcut invocations

If the user invokes with enough structure, skip most of Stage A:

> "Gap audit on ACME Plumbing Austin, I sell Meta ads + automations, use the home-services recipe. Apify key is set."

Parse, jump to the recommendation step (propose the tuned signal stack for confirmation), skip Stage A questions answered inline.

## Saving keys — implementation

When user pastes a key in chat:

1. Read `~/.claude/settings.local.json` (create `{}` if missing)
2. Ensure top-level `env` object
3. Add / update key under `env`
4. Write back with 2-space indent
5. Confirm by name: *"`APIFY_API_TOKEN` saved to ~/.claude/settings.local.json env block."*

Never:
- Write keys to the skill directory
- Echo the key after saving
- Write to shell rc files or project `.env`

## When to push back on the user

- **Vague target** — "local businesses near me" without category or radius. Ask for category + 1-2 zip codes or a city name.
- **Ambiguous business name** — "Smith Plumbing" (many match). Ask for the GBP URL or city+state.
- **Target is not a local business** — national chain, e-commerce DTC brand, Fortune 500 office. Flag and ask if user wants to proceed (most gap categories won't apply).
- **User services don't match target vertical** — e.g. user sells dental SaaS, target is a plumber. Surface the mismatch, offer to proceed or stop.
- **Discovery brief too broad** — "all businesses in Austin." Ask for a tighter category + geographic scope, or cap at first 10 and ask them to narrow.
