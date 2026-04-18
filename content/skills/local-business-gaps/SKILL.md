---
name: local-business-gaps
description: Deep, adaptive research on local businesses to find pitchable gaps in their digital presence and operations — then maps each gap to a concrete service or automation you could sell and build. Pulls signals from Google Business Profile, the business's website, PageSpeed, Google SERP, Meta Ad Library, Facebook/Instagram, Yelp/Nextdoor/BBB, LinkedIn, and tech-fingerprint signals using whichever tool yields the best signal for each source (official APIs, Apify actors, direct scraping, or Claude in Chrome browser automation). Adapts the signal stack to the business's industry and the services the user actually offers. Produces a prioritized pitch brief per business — gap severity, what to pitch, what to build, rough price band, and a proof point to cite. At the start of every run, Claude runs INTAKE (user's services / pitch style / targets), then a PREFLIGHT (Chrome + Apify readiness), then RESEARCH + adaptive probing, then PLAN, then EXECUTE. Trigger on — "find gaps I can pitch to <business>", "what can I sell <local business>", "audit <business> for pitches", "scout local businesses I can pitch <service> to", "find me businesses in <area> that need <service>", "what automations can I build for <business>", "local business pitch scout", "gap audit for <business>".
---

# local-business-gaps

An adaptive local-business gap scout. Takes a business (or a discovered list), deep-researches its digital footprint, finds pitchable gaps, and maps each gap to a concrete service or automation the user could build. Every run has five phases: **INTAKE → PREFLIGHT → RESEARCH → PLAN → EXECUTE**. Do not skip phases, do not fabricate signals, do not invent pitches that aren't backed by observed gaps.

The output is not a KB. It is a **pitch brief** — per-business prioritized gaps with concrete sell-and-build actions.

## Phase 1 — INTAKE (two-stage, recommendation-first)

Intake is a short conversation. See `intake.md` for the full structure. The core pattern:

**Stage A — frame the ask (ask up front):**
- **Your services** — what the user actually sells (SEO, Meta ads, Google ads, web design/dev, automations/AI, email/SMS, GBP management, social content, booking systems, …). "Full-stack" is a valid answer. Gaps outside this set are still surfaced but deprioritized.
- **Targets** — one named business, a list, OR a discovery brief ("find 5-15 <category> in <area> with pitchable gaps").
- **Industry / vertical** — context for the gap checks that matter most.
- **Pitch posture** (optional) — cold outbound, warm intro, discovery-call prep, or bulk prospecting.

**Between stages — Claude recommends, doesn't ask:**

Based on services + vertical + target shape, load any matching `recipe-*.md` file and propose a **concrete signal stack with rationale**. Be opinionated:

- Label signals PRIMARY / SECONDARY / SKIP with a one-line reason each
- Pick the tool per signal based purely on which produces the best signal for this goal — Apify actor / official API / direct fetch / `mcp__Claude_in_Chrome`. Tool choice is not a ranked preference; pick what fits.
- Lead with 5-8 high-signal sources. Don't list everything possible — list what'll matter for THIS user + THIS vertical.
- If the user only sells Meta ads, lead with Meta Ad Library + landing-page crawl + FB/IG presence. Don't spend cycles on GBP hygiene they can't pitch.
- If the user sells full-stack, go wide.

Then confirm or amend with the user. Do NOT present as a pick-from-menu.

**Stage B — collect what's needed for the chosen stack only:**
- **API keys** — only for sources confirmed above. For each: ask *"is `<KEY>` in ~/.claude/settings.local.json, or paste it here?"*
  - If pasted, Claude writes it to `~/.claude/settings.local.json` under the `env` block. Confirm by key name, never echo the value. (See "Saving inline API keys" below.)
  - If user wants ephemeral-only: keep in memory, pass as scoped Bash env, never write to disk.
- **Pitch constraints** — if the user has a floor/ceiling price they pitch at, or only wants retainer-size opportunities, capture it. Deprioritize one-off low-revenue gaps when that's the case.
- **Output preferences** — default: per-business markdown pitch brief at `./output/pitches/<slug>.md` + a consolidated cross-target matrix when targets > 1. Ask if they want CSV of gaps, or follow-on outreach drafts.

**Key intake outputs to capture:**

- `services` — what the user sells
- `targets` — named or discovery-brief
- `vertical`, `geography`
- `signals` — confirmed signal stack with tool choice per source
- `api_keys` — which were already set, which were saved this run, which are ephemeral
- `pitch_constraints`
- `output`

**Shortcut invocations:** if the user invokes with structure (e.g. *"gap audit on Luna Salon Austin, I sell Meta ads + automations"*), skip the Stage A questions that were answered inline, jump to the recommendation step, confirm, then Stage B only if anything's missing.

## Phase 1.25 — saving inline API keys (reference procedure)

When the user pastes a key in chat and wants it saved:

1. Read `~/.claude/settings.local.json` — if missing, start with `{}`
2. Ensure a top-level `env` object exists
3. Set `env.<KEY_NAME> = <value>`
4. Write back with 2-space indent
5. Confirm by name: *"`<KEY_NAME>` saved to ~/.claude/settings.local.json env block. Next session loads it automatically."*

Rules:
- **Never** echo the value back in plain text after saving
- **Never** write to the skill directory, shell rc files, or any project-local `.env`
- **Never** commit the settings.local.json file
- If user says "just this run, don't save" — keep in memory, pass as scoped env on the one Bash call that needs it, never touch the file

Common keys this skill uses:
- `APIFY_API_TOKEN` — for Google Maps / Yelp / FB-IG / LinkedIn actors
- `PAGESPEED_API_KEY` — PageSpeed Insights API (optional; works without at lower rate)
- `META_ACCESS_TOKEN` — Meta Ad Library API
- `SERPAPI_API_KEY` or `GOOGLE_SEARCH_API_KEY` — programmatic SERP (optional; Chrome works fine for low volume)

## Phase 1.5 — PREFLIGHT

Check that the tools the chosen signal stack needs are actually available.

### 1.5a — Claude for Chrome

If the stack includes any `mcp__Claude_in_Chrome__*` work (SERP checks, FB/IG pages, GBP browsing, LinkedIn company pages — very common), verify the MCP is wired.

Test by calling `mcp__Claude_in_Chrome__tabs_context_mcp` (or any read-only Chrome MCP tool). If it succeeds, continue. If it fails / the tools aren't present:

> "This run uses Claude for Chrome for [listed signals]. It isn't installed on this machine.
>
> To install:
> 1. Go to **claude.ai/chrome** and follow the extension install flow.
> 2. Sign in with the same Anthropic account you use for Claude Code.
> 3. Open Chrome and grant the permissions the extension asks for.
> 4. Come back here and tell me 'installed' — I'll retest.
>
> Or tell me to skip those signals and work with what's left."

STOP until the user confirms install or agrees to drop those signals. Do NOT try to install the extension programmatically — it's a browser extension install, the user has to click through.

### 1.5b — Apify readiness (only if Apify is in the stack)

If any Apify actors are in the plan, verify `APIFY_API_TOKEN` is set (either in env or in `~/.claude/settings.local.json`). If missing, walk the user through Stage B's key-capture flow before moving on.

### 1.5c — Output dir

Create `./output/pitches/` relative to cwd if missing. Pitches live there.

## Phase 2 — RESEARCH (tool discovery, not execution)

For each signal the user confirmed, research the current best way to pull it **before** writing any code. Tool landscape changes quickly. Use WebSearch, WebFetch, and Apify Store search. Do not rely on memory of which actor was good a year ago.

For each signal, determine and record:

1. **Best tool for the signal** — Apify actor, official API, direct fetch, or `mcp__Claude_in_Chrome__*`. Pick on signal quality + fit + speed, not on a fixed ranking.
2. **If Apify actor**: exact slug, rating, last-updated, issues count, input schema. Prefer actors from `apify`, `compass`, or high-rated long-standing community maintainers.
3. **If official API**: base URL, auth method, rate limits, response shape.
4. **If direct fetch**: does the target render server-side (HTML works) or client-side (need browser)? Check `robots.txt` only if it's plausibly load-bearing.
5. **If browser**: which specific pages Claude will visit. Keep the count bounded — browser is for long-tail gated pages, not bulk.

Research steps:

- **Apify actors**: `apify.com/store?search=<query>`. Read actor page. Verify input schema at `apify.com/actors/<slug>/input-schema`.
- **Official APIs**: WebFetch the current docs. Confirm auth format and free-tier limits. PageSpeed, Meta Ad Library, Places API have all shifted recently — check.
- **Direct fetch**: WebFetch once to see what renders. Small-business marketing sites usually render server-side; modern Shopify/Squarespace sites often hydrate client-side.
- **Claude browser**: great for SERP rank checks, FB/IG page glances, LinkedIn company browsing, GBP live views. 5-30 page visits per target is the sweet spot. Over that, find an API or Apify actor instead.

Record findings in a research log you maintain through the run.

## Phase 3 — PLAN

Present a plan and get confirmation before executing:

```
PLAN for <purpose>

Targets: <N>
  - <target 1> (<known URLs + GBP>)
  - <target 2>
  ...

User sells: <services list>
Pitch constraints: <if any>

Signal stack (per target unless noted):
  1. <signal>: <tool> · <rationale>
  2. ...

Gap categories scored (see gap-catalog.md):
  - <category 1> — <detection method summary>
  - <category 2> — ...
  [filtered to what user can pitch, based on services]

Adaptive probes triggered when:
  - <condition> → <deeper probe>
  e.g. "if no mobile viewport" → run full PageSpeed + screenshot mobile render
  e.g. "if GBP rating < 4.2" → pull full review set, cluster complaint themes

Outputs:
  - ./output/pitches/<slug>.md per target
  - ./output/pitches/_matrix.md (if targets > 1)
  - [follow-on: cold outreach drafts if requested]

Estimated wall-clock: <quick estimate per target>

Proceed?
```

Wait for confirmation. If amended, update the plan, re-confirm.

## Phase 4 — EXECUTE (adaptive, not fixed pipeline)

### 4a. Broad signal sweep (per target)

Run the PRIMARY signals in parallel per target. Where safe, run multiple targets in parallel too. Capture raw data into `./output/pitches/<slug>/raw/` as JSON per source.

Typical broad signals:

- **GBP pull** — listing metadata, categories, hours, photo count, review count + rating, recent reviews, owner-reply rate
- **Website fetch** — home + contact + services/about pages. Record: does a site even exist, redirect chain, page weight, mobile viewport tag, structured data (JSON-LD), contact methods exposed, booking/e-commerce hooks, tech stack clues (CMS fingerprint from HTML comments + generator meta + script src patterns)
- **PageSpeed** — mobile Performance / Accessibility / Best Practices / SEO scores. Core Web Vitals (LCP, CLS, INP).
- **SERP glance** — one or two head queries for the vertical + geography: does the business rank in the local 3-pack? organic top 10? any SERP features they could win?
- **Meta Ad Library** — any active ads for the page name / domain? If yes, snapshot creative + landing URL.
- **Social glance** — Facebook + Instagram: last post date, posting cadence, follower count, link-in-bio target.

Keep each pull small and focused — we're looking for gap signals, not building a data lake.

### 4b. Adaptive deeper probes

Based on what the broad sweep reveals, trigger targeted deeper probes. Examples:

- **No website** detected → probe domain registration (WHOIS), any DIY site builder guesses (facebook.com/<slug> as de-facto site, linktr.ee, Square online, Squarespace parked domain)
- **Slow mobile perf** → pull full PageSpeed field data, screenshot the mobile render, check image sizes
- **Low rating / bad recent reviews** → pull last 40 reviews, cluster complaint themes, note owner-reply rate and tone
- **No GBP photos / old photos** → note photo recency + category coverage (food pics for restaurant, before/after for services, team photo, exterior)
- **No SERP presence** → check if the GBP even appears for the basic category+city query; check top 3 competitors' headline pages for keyword coverage they're missing
- **Running Meta ads** → pull landing page, compare promise (ad creative) to delivery (site). Mismatch = automation + landing-page pitch.
- **Stale social** → check cross-platform: IG dormant but FB active? Opposite? No content at all? Each has a different pitch.
- **Booking gap** → check if booking flow exists (Calendly, Square Appointments, Mindbody, in-house form). If none, note whether vertical typically needs it.
- **High team size + manual intake** → LinkedIn check for staff count; if 10+ staff + no online booking + phone-only contact, automation pitch has legs.

Record each probe's output in `./output/pitches/<slug>/raw/`.

Do not run every possible probe — only probes the broad sweep flagged as worth running. The point is to go deep on what matters, not wide on everything.

### 4c. Score gaps against the catalog

Use `gap-catalog.md` as the reference. For each gap category in scope (filtered by user's services):

1. Apply the detection heuristic
2. Record `present: true/false`, severity (low / medium / high), and the evidence (what specifically signals the gap)
3. If present and severity ≥ medium, generate a pitch block using the catalog's template

The output is a per-target gap list:

```json
{
  "target": "Luna Salon",
  "gaps": [
    {
      "category": "gbp_photo_hygiene",
      "severity": "high",
      "evidence": "4 photos total, most recent 2023-03, no interior or staff pics, no service pics",
      "pitch": {
        "offer": "GBP content refresh + monthly photo post cadence",
        "build": "3-month content pipeline: 12 photo sessions batched + GBP posting automation",
        "price_band": "$600-1200 one-time + $200-400/mo",
        "proof": "GBP listings with ≥20 photos get ~35% more calls (Google case studies)"
      }
    },
    ...
  ]
}
```

### 4d. Compose the per-target pitch brief

Write `./output/pitches/<slug>.md` per target. Structure:

```markdown
# <Business Name> — Pitch Brief
<city / vertical> · <GBP URL> · <website URL or "no website">
Scan date: <YYYY-MM-DD>

## TL;DR
<2-3 sentences — the headline pitch, with the single highest-leverage gap>

## Top 3 pitches (prioritized)

### 1. <Pitch title>
- **The gap:** <what's broken/missing, with evidence>
- **What to sell:** <specific service name>
- **What to build:** <concrete deliverable, with implementation hint>
- **Price band:** <range>
- **Proof point to cite:** <stat or case-study hook>
- **First-call hook:** <one line you could open a call/email with>

### 2. ...
### 3. ...

## Other gaps (lower priority, worth flagging on a call)
- <gap> — <one-line summary>
- ...

## Gaps you don't sell (flagged for awareness)
- <gap> — <one line> · category: <what service would fix it>

## Raw evidence
<compact table — every gap category we scored, severity, evidence snippet>

## Signals we pulled
<bulleted list of sources + timestamps>
```

### 4e. Cross-target matrix (only if targets > 1)

Write `./output/pitches/_matrix.md`:

```markdown
# Pitch Matrix — <batch name> — <YYYY-MM-DD>

| Target | Vertical | Top gap | Pitch | Est. price | Ease |
|---|---|---|---|---|---|
| Luna Salon | beauty | no booking | Booking + SMS reminder | $1.2k + $300/mo | easy |
| ... | | | | | |

## Cross-target whitespace
<1-3 patterns — e.g. "4 of 6 targets have no GBP photo cadence — photo-refresh productized offer is a natural wedge">

## Suggested prospecting order
<sort by (severity × fit with user's services × ease)>
```

### 4f. Deliver

Show the user:
- Paths to all generated pitch briefs
- Matrix path if written
- 3-sentence summary of the strongest target + strongest pitch overall
- Offer: "want me to draft cold outreach for the top N?"

## Rules

- **Intake → Preflight → Research → Plan → Execute. Never skip.**
- **Research is required** — never pick an Apify actor from memory; verify via Apify Store that it still exists and is maintained. Never assume an API hasn't changed.
- **Tool choice = best signal for the goal.** There is no fixed ranking of API > Apify > scrape > browser. Pick whichever yields the best data quality for the specific signal, given volume, gating, and speed. (Browser for 5-30 page visits of gated pages, Apify for bulk structured pulls, APIs when they exist and cover what's needed, direct fetch for marketing sites that render server-side.)
- **Gaps must be evidence-backed.** Every gap in a pitch brief must cite what specifically signaled it. No speculative gaps. No "they probably don't have X" without checking.
- **Pitches must be scoped to what the user sells.** If the user doesn't do SEO, don't lead with SEO pitches — flag SEO gaps in the awareness section but don't pitch them. User can choose to partner / refer / ignore.
- **Never fabricate Apify actor IDs or review/post content.** Always from tool output.
- **Price bands are ranges, not quotes.** Caveat with "rough band, adjust to your pricing."
- **Don't pollute the skill directory.** Outputs go to `./output/` relative to cwd.
- **Claude browser is for long-tail, not bulk.** > 30 page visits per target = find an actor or API instead.
- **If a source returns zero results or 404s, note it but continue.** Don't block the whole brief on one failed pull.
- **If the business is wildly outside the local-biz frame** (Fortune 500 office, e-commerce-only DTC brand, national chain franchise), call it out and ask if the user wants to continue — some gaps still apply, many don't.
- **Volume awareness**: discovery-mode runs with > 15 targets should pause before Phase 4a to confirm.

## Recipes (shortcut flow)

Users can invoke with a recipe: *"use the home-services recipe for ACME Plumbing"*. Load `recipe-<vertical>.md` and skip intake for answers the recipe provides.

Available recipes (sibling files):
- `recipe-home-services.md` — plumbers, HVAC, roofers, electricians, landscaping, pest, cleaning
- `recipe-restaurants-cafes.md` — restaurants, cafes, bars, food trucks
- `recipe-professional-services.md` — accountants, lawyers, realtors, insurance, dentists, clinics

Each recipe contains: typical gap patterns, signal stack priorities, vertical-specific heuristics, price-band hints.

When adding a recipe, include: vertical description, signal stack with rationale, 4-8 gap categories that matter most in this vertical, vertical-specific gotchas, 3-5 example pitches with price bands.
