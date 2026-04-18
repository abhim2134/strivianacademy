# Recipe: Professional services gap audit

**Invoke with:** *"use the professional-services recipe for Smith & Co Law Firm Austin"*

**Covers:** law firms, accountants / CPAs, insurance brokers, financial advisors, realtors / real estate brokerages, dentists, medical clinics, chiropractors, physical therapy, vet clinics, consultancies (local B2B).

## Why this vertical is different
Professional services buyers:

- research heavily before a first call — website trust cues matter more than IG
- buy on **trust signals** (credentials, reviews, about/team pages, press mentions)
- have **higher LTV per client** → higher ad LTV math → bigger retainer pitch surface
- have **compliance constraints** (healthcare HIPAA, legal advertising rules, financial FINRA) that affect what ads + content can say

Gap distribution:

- ~80% have a website but it's template-heavy with stock imagery and weak trust signals
- ~60% have a GBP but no review generation system — CAC math heavily rewards fixing this
- ~70% have no email nurture despite LTV economics screaming for it
- ~90% have no lead-capture beyond a form that emails the owner

## Signal stack

| # | Signal | Best tool | Why |
|---|---|---|---|
| 1 | GBP (listing + reviews + photos + Q&A) | Apify Google Maps actor | Review count and specialist-category accuracy matter |
| 2 | Website fetch — home + about/team + services + reviews/testimonials + contact | WebFetch + site_crawl | Trust cues, credential display, team-page quality, form/CRM fingerprint |
| 3 | PageSpeed | API | Mobile perf + accessibility matter for professional trust |
| 4 | SERP rank for specialist queries | `mcp__Claude_in_Chrome` for `<specialty> <city>` + practice-area keywords | Rank is the CAC lever |
| 5 | Review profiles beyond GBP — Avvo (law), Healthgrades (medical), Zillow (realtors), Yelp | Vertical-specific | Each profession has a specialist review platform with high weight |
| 6 | Press / credentials | Web search | Bar admissions, board certifications, awards, press mentions — for trust signals |
| 7 | LinkedIn (company + lead attorney / partner / practitioner) | `mcp__Claude_in_Chrome` | Thought leadership posture, team visibility |
| 8 | Tech fingerprint (CRM / pixel / chat / GA4) | WebFetch HTML | Automation pitch sizing |

## Vertical-specific review/listing platforms

When the target's specialty surfaces, swap Yelp for the specialist platform:

- **Law:** Avvo, Martindale, Justia. Also state bar directories.
- **Dental / medical:** Healthgrades, Zocdoc, RateMDs, WebMD. State medical board.
- **Realtors:** Zillow agent profile, Realtor.com, Redfin reviews.
- **Financial advisors:** FINRA BrokerCheck, SEC IAPD.
- **Accountants:** AICPA directories, state board listings.

These should be CORE signals, not secondary — buyers actually read them.

## Adaptive probes specific to professional services

- **If website has no team/about page with real photos + credentials** → huge trust pitch. Professional services sites without visible people convert ~2x worse.
- **If no testimonials / case studies** (case anonymization is fine for legal/medical) → testimonial collection + content system is a pitch.
- **If one practitioner is the brand but has no LinkedIn presence / public thought leadership** → personal-brand content pitch (founder-led content, newsletter, speaking).
- **If compliance-sensitive vertical** (law/medical/financial) → probe whether they have compliant disclaimers on site + ads. Missing disclaimers are a risk pitch, not a marketing pitch — sell as risk mitigation.
- **If running ads in a restricted category** (personal injury law, weight loss, DUI, financial "get rich") → Meta / Google restricted-category compliance is a real service.
- **If specialty has referral economics** (dentist referring to ortho, PCP to specialist) → B2B referral program + CRM is a pitch, not just B2C marketing.

## Gap categories that matter most

Priority for professional services (filter by user services):

1. `gbp_reviews_low_volume` + `gbp_rating_drag` — reviews are primary trust signal, extreme LTV math
2. `no_service_pages` / `thin_or_no_meta` — practice-area SEO is the lead-gen engine
3. `no_ads_but_should` / `ads_running_but_bad` — high-LTV verticals can afford and should run paid
4. `no_lead_capture` + `slow_lead_response` — first-responder wins in trust-critical purchases
5. `no_online_booking` — Zocdoc / SimplePractice / Calendly / vertical-specific scheduling
6. `no_email_list` — nurture for long-sales-cycle verticals (accounting annual, insurance renewal, legal matter follow-up)
7. `website_stale_tech` + `website_mobile_broken` — template-heavy sites dragging trust
8. `no_crm_fingerprint` — missing CRM = missing retention/referral system

## Gotchas

- **Compliance**: HIPAA for medical/dental (no PHI in ads, BAAs with vendors, patient testimonial rules vary). FINRA for financial advisors (communications must be preserved, testimonial rules recently changed but still strict). State bar rules for lawyers vary — some states restrict specific ad language.
- **Testimonials/reviews** for legal/medical/financial often have specific disclaimer requirements ("past results do not guarantee future outcomes" etc.). Don't recommend aggressive review generation without checking state/specialty rules.
- **Franchise / group practices** — many dental DSOs and medical groups control digital centrally. Local gaps may not be actionable by the local practitioner. Ask who owns the website.
- **Credential validation** — claimed credentials should appear in state board / licensing databases. Not a pitch per se, but flag a mismatch (that's a bigger issue than marketing).
- **Vertical keyword nuance** — "accident attorney" vs "personal injury lawyer" vs "injury attorney" — same intent, different CPC and keyword difficulty. Don't optimize for one without checking.
- **Google's Local Service Ads (LSA)** — for law, medical, home services — LSA is a separate pitch from regular Google Ads. If they haven't claimed LSA, that's a gap.

## Example pitch bundles

**Solo practitioner / small office (1-3 pros):**
- Website rebuild with credentials + team + testimonials → $2500-5000 one-off
- Review generation + response → $500 setup + $300/mo
- GBP + specialty directory optimization (Avvo/Healthgrades/Zillow) → $800 setup + $300/mo
- Local Service Ads setup → $1500 setup + ongoing optimization
- Contact form + CRM (HubSpot free / HIPAA-compliant if medical) → $1200 setup

**Mid-size firm / practice (5-20 pros, multi-specialty):**
- Full site rebuild with per-specialty practice-area pages → $8k-$20k
- Paid media (Google + LSA + Meta) → $3k setup + $2500-5000/mo + spend
- Email nurture for consultations that didn't close → $2500 setup + $1500/mo
- Review generation at scale across platforms → $1000 setup + $800/mo
- Thought-leadership content (blog + LinkedIn) for lead practitioner → $3000/mo
- CRM + intake automation (HIPAA/FINRA-compliant as needed) → $4k setup + $1500/mo

**Larger firm / multi-location practice:**
- Stack modernization + marketing ops system → $30k+ project + $5k+/mo retainer
- Multi-location SEO + GBP → $1500/location/month
- Full paid media program across LSA + Google + Meta with dedicated LPs per practice area → $10k+/mo mgmt

## Price-band caveats

Professional services LTV is high so retainer-size capacity is high. $3k-$10k/mo retainers are normal for this vertical at mid-size. Don't under-price yourself on a CPA firm doing $5M revenue.
