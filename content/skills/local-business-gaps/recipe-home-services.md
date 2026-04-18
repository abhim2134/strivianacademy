# Recipe: Home services gap audit

**Invoke with:** *"use the home-services recipe for ACME Plumbing Austin"*

**Covers:** plumbers, HVAC, electricians, roofers, landscaping, pest control, cleaning services, handyman, painters, pool service.

## Why this vertical is a goldmine for pitches
Home services businesses are buying-ready for every category of service: they're usually ad-dependent (high CAC, high ticket), rating-sensitive (trust-driven purchase), and operationally-strained (phone-first, small office staff, missed calls = lost revenue). The gap distribution:

- ~70% have a website but it's a mid-2010s template — low-hanging perf / mobile / CRO work
- ~60% run ads but run them poorly — refreshable creative, homepage LPs, no pixel
- ~80% have unclaimed review opportunities — GBP post cadence near zero
- ~50% have missed-call problems — IVR / AI voice agent pitch lands hard

## Signal stack (lead with these)

| # | Signal | Best tool | Why |
|---|---|---|---|
| 1 | GBP (listing + reviews + photos + hours) | Apify — research latest Google Maps actor at runtime | Primary — home services live on GBP |
| 2 | Website fetch (home + services + contact) | WebFetch + optional `site_crawl.py` | Tech stack, mobile viewport, CRO, forms |
| 3 | PageSpeed mobile | PageSpeed Insights API | Mobile perf is table-stakes, poor perf = easy pitch |
| 4 | SERP rank (local pack + top 10 organic) | `mcp__Claude_in_Chrome` for `<vertical> <city>` + `<vertical> near me` + brand query | Actual ranking evidence, not inferred |
| 5 | Meta Ad Library | Direct API | Are they advertising? Ad creative quality. Landing page they send to. |
| 6 | Facebook / Instagram page | `mcp__Claude_in_Chrome` | Content cadence (usually dormant), link-in-bio, engagement |
| 7 | BBB profile | WebFetch or browser | Complaint history, license status, long-term trust signal |
| 8 | Yelp listing (if present) | Apify or browser | Secondary reviews + alt-complaint pattern |

## Adaptive probes specific to home services

- **If running ads + no pixel detected** → very high-leverage pitch. Document both gaps together ("they're flying blind on $X/mo in ad spend").
- **If GBP rating < 4.3** → pull last 40 reviews, cluster complaint themes. Often reveals ops issues (dispatch, pricing surprise, rework) — either pitch the fix or refer out.
- **If the business has a dispatcher / 24-hour emergency promise in ads or GBP** → probe the phone experience by mystery-shop lead (send a test form or call during the "24-hour emergency window" off-hours). Slow response = automation pitch lands.
- **If LinkedIn shows 10+ staff + no online booking + no form automation** → AI voice agent / missed-call-text-back is the hero pitch.
- **If website is WordPress pre-5.0 or custom PHP, no HTTPS, no GA4** → pitch stack modernization retainer, not piecemeal fixes.

## Gap categories that matter most (from gap-catalog.md)

Priority order for home services (filter by user services):

1. `ads_running_but_bad` / `no_ads_but_should` — paid media is table-stakes; huge pitch surface
2. `slow_lead_response` / `no_lead_capture` — missed-call text-back + instant-response automation
3. `gbp_reviews_low_volume` + `gbp_owner_reply_rate_low` + `gbp_rating_drag` — review generation system
4. `website_mobile_broken` / `website_perf_slow` — mobile perf affects ad LPs and local pack
5. `gbp_photo_hygiene` + `gbp_posts_dormant` — GBP management retainer
6. `not_in_local_pack` / `no_service_pages` — local SEO
7. `manual_intake_automatable` — AI voice agent for larger shops (10+ staff)
8. `pixel_missing` — analytics hygiene if ads are running

## Gotchas

- **Seasonal businesses** (roofing, HVAC, pool, landscaping) have review volume swings. Don't score "thin review volume" without factoring seasonality — pull 18-month windows, not 6-month.
- **Franchised vs independent** — many home services brands are franchises (Mr Rooter, Roto-Rooter, Mosquito Joe). The local franchisee controls GBP + local ads but the franchisor owns the website. Gaps scoped to website/CRO may not be actionable by the local owner. Flag this in the brief.
- **Emergency-service claims** — claims like "24/7 emergency" in ad copy vs phone actually going to voicemail at 10pm = the promise-delivery gap pitch. Mystery-shop if the biz actively ads this.
- **Licensing matters** — for trades, LicenseStatus is a trust signal. Missing or lapsed license on BBB = ops issue, not digital.
- **Dispatcher vs direct-to-tech answering** — how the phone gets answered reveals a lot. If answered by "dispatch" → bigger shop, automation pitch scales. If answered by the owner at 7pm → 1-3 person shop, smaller pitch surface.

## Example pitch bundles (typical)

**Solo operator (1-3 staff, $200k-$800k revenue):**
- GBP optimization + review generation → $800 setup + $300/mo
- Basic Google Ads setup (local service ads or search) → $1500 setup + $800/mo + spend
- Missed-call text-back → $600 setup + $150/mo

**Mid-size (5-15 staff, $1M-$5M):**
- Google Ads refresh + dedicated LPs + pixel + conversion tracking → $3000 setup + $2000/mo + spend
- Meta Ads for brand awareness / retargeting → $1500 setup + $1500/mo + spend
- Review generation + response automation → $800 setup + $400/mo
- AI voice agent for after-hours / overflow → $4000 setup + $1000/mo
- Monthly GBP post cadence + photo content → $500/mo

**Large (20+ staff, $5M+):**
- Stack modernization (site rebuild + CRM + pixel + dashboards) → $20k project + $3k/mo retainer
- Paid media refresh across Google + Meta → $4k setup + $3k+/mo mgmt
- Full reputation + social retainer → $1500/mo

## Price-band caveats

Home services pricing varies a lot by metro (Tier-1 coastal metros pay 1.5-2x national averages). These bands assume a mid-market US metro. Always caveat in the brief.
