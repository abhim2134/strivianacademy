# Gap Catalog — what to detect, how to detect it, what to pitch

Reference catalog used in Phase 4c of the skill. Each entry has:

- **Gap ID** — snake_case, used in JSON output
- **What it is** — short description
- **Detect** — concrete heuristic
- **Severity levers** — what makes it low / medium / high
- **Sell** — service offer(s) that fix it
- **Build** — concrete deliverable(s) behind that offer
- **Price band** — rough range; the user adjusts to their pricing
- **Proof hooks** — the kind of stat/case-study to cite in a pitch

Price bands are conservative one-off / monthly ranges commonly seen in small-business services markets (US, 2025-26). Scale to the user's geography and positioning. Always caveat "rough band" when sharing.

---

## Website & tech

### `no_website`
- **Detect:** no domain in GBP "website" field; WHOIS shows no matching registration; `site:<likely_domain>.com` returns nothing; Facebook page is being used as de-facto web presence.
- **Severity:** always **high** for any B2C local biz except pure walk-in-only one-location food trucks.
- **Sell:** web design + build.
- **Build:** 5-7 page Next.js / WordPress / Squarespace site with GBP-sourced content, mobile-first, booking/contact hooks wired.
- **Price band:** $800–$3500 one-off; $50–$150/mo hosting+care.
- **Proof:** "~30% of calls to a GBP without a website go to a competitor with one" (Google local search behavior reports).

### `website_mobile_broken`
- **Detect:** PageSpeed mobile score < 50 OR no `<meta name="viewport">` OR horizontal-scroll detected on 360px viewport via browser render.
- **Severity:** high if any of the three; otherwise medium.
- **Sell:** mobile rebuild + perf pass.
- **Build:** new responsive theme OR targeted perf fix (image compression, lazy-load, critical CSS).
- **Price band:** $600–$2500 one-off depending on scope.
- **Proof:** Google Core Web Vitals penalty for local pack ranking; 40% mobile bounce > 3s load.

### `website_perf_slow`
- **Detect:** PageSpeed LCP > 4s, or page weight > 4MB on mobile.
- **Severity:** medium (high if LCP > 6s or page weight > 8MB).
- **Sell:** perf optimization pass.
- **Build:** image compression + CDN + critical CSS + render-blocking script deferral.
- **Price band:** $400–$1500 one-off.
- **Proof:** "Every 1s of mobile delay costs ~20% conversion" (Google research).

### `website_stale_tech`
- **Detect:** generator meta shows WordPress < 5.0, old theme, no HTTPS, mixed content warnings, jQuery-only stack, no analytics, no GA4.
- **Severity:** medium (high if no HTTPS or actively broken).
- **Sell:** platform migration or modernization.
- **Build:** migrate to modern CMS or rebuild on Next.js/Astro/Squarespace depending on biz tech appetite.
- **Price band:** $1500–$6000 one-off.
- **Proof:** insurance posture (security), SEO signal, lower maintenance cost.

### `no_https`
- **Detect:** site loads on http only, or http-to-https redirect missing.
- **Severity:** high.
- **Sell:** SSL + security pass.
- **Build:** Let's Encrypt + redirect + HSTS + mixed-content cleanup.
- **Price band:** $200–$600 one-off.
- **Proof:** Chrome flags http as "not secure" — visible trust hit.

---

## Google Business Profile (GBP)

### `gbp_photo_hygiene`
- **Detect:** < 15 photos total, OR no photos added in last 180 days, OR no interior + no team + no product/service photos, OR only stock-looking images.
- **Severity:** medium (high if < 5 photos or none in last year).
- **Sell:** content refresh + monthly cadence.
- **Build:** photo session + monthly GBP post scheduler (Later / Metricool / custom cron).
- **Price band:** $400–$1200 one-off shoot + $150–$400/mo content cadence.
- **Proof:** "GBPs with ≥20 photos receive ~35% more click-to-call" (Google case data).

### `gbp_info_incomplete`
- **Detect:** missing hours, missing or generic categories (primary category not specific, e.g. "Business" or "Store"), no attributes (wheelchair accessible, dine-in, etc.), no services list, no products, no description, no booking/reservation link.
- **Severity:** medium per missing field; stack to high when 3+ missing.
- **Sell:** GBP optimization pass + monthly management.
- **Build:** full profile audit + fill, then monthly check-in + Q&A seeding + post cadence.
- **Price band:** $300–$800 one-off audit + $200–$500/mo mgmt.
- **Proof:** "Fully-completed GBPs get ~7x more views than incomplete ones" (Google).

### `gbp_posts_dormant`
- **Detect:** no GBP post in last 30 days; or never used the "posts" feature.
- **Severity:** medium.
- **Sell:** weekly GBP post cadence.
- **Build:** Airtable/Sheets content calendar + automated publishing (Zapier → GBP API, or a tool like LocalViking / Localo).
- **Price band:** $200–$600/mo.
- **Proof:** "Weekly GBP posters show ~17% higher direction-request rates" (third-party local SEO tools).

### `gbp_reviews_low_volume`
- **Detect:** < 25 reviews total OR < 2 reviews/month over last 6 months.
- **Severity:** medium; high if < 10 total and biz is > 1 year old.
- **Sell:** review generation system.
- **Build:** post-service SMS/email review ask (Twilio + SendGrid OR a tool like Birdeye/Podium/NiceJob); card-with-QR handout for in-person.
- **Price band:** $400–$1200 setup + $100–$300/mo per location.
- **Proof:** "Review count is the #2 local pack ranking factor after proximity" (Whitespark local search ranking factors study).

### `gbp_rating_drag`
- **Detect:** rating < 4.3 OR recent 20 reviews average below overall (trend negative) OR specific complaint clusters in last 90 days.
- **Severity:** medium; high if < 4.0.
- **Sell:** reputation rehab + response system.
- **Build:** review-response automation (drafts for owner approval), complaint-theme playbook, operational fix recommendations surfaced to owner.
- **Price band:** $500–$1500 one-off audit + fix-plan + $200–$500/mo response mgmt.
- **Proof:** "~94% of consumers have avoided a business because of a bad review" (BrightLocal consumer review survey).

### `gbp_owner_reply_rate_low`
- **Detect:** owner-reply rate on last 50 reviews < 40%, OR zero replies to negative reviews.
- **Severity:** medium.
- **Sell:** review response service.
- **Build:** reply-drafter workflow (Claude/LLM drafts + owner 1-click approves) or fully-managed response.
- **Price band:** $150–$400/mo.
- **Proof:** "Businesses that respond to reviews are ~1.7x more likely to be considered trustworthy" (Harvard Business Review study on review-response effects).

---

## SEO & local search

### `not_in_local_pack`
- **Detect:** Google SERP (browser) for `<vertical> <city>` and `<vertical> near me` does not show this business in the top 3 local pack.
- **Severity:** high if the biz isn't even in the top 20; medium otherwise.
- **Sell:** local SEO + GBP optimization.
- **Build:** GBP deep fill + citation audit (NAP consistency) + review generation + local link outreach + on-page local signals.
- **Price band:** $800–$2500 one-off audit + $500–$2000/mo.
- **Proof:** "Top 3 local pack captures ~44% of clicks on local-intent queries" (Moz local pack CTR studies).

### `thin_or_no_meta`
- **Detect:** homepage `<title>` missing / generic / > 60 chars / doesn't include city+service; meta description missing or default.
- **Severity:** low-medium.
- **Sell:** on-page SEO pass.
- **Build:** title + meta rewrite for home + top 5 service pages; schema markup (LocalBusiness JSON-LD).
- **Price band:** $300–$900 one-off.
- **Proof:** "Local businesses with proper LocalBusiness schema see ~30% higher rich result rates."

### `no_service_pages`
- **Detect:** site has homepage + maybe an About, but no dedicated page per service offered (check GBP services list + crawl site — mismatch).
- **Severity:** medium.
- **Sell:** content expansion + programmatic SEO.
- **Build:** one page per service × geo modifier (e.g. "drain cleaning in <neighborhood>") with consistent template.
- **Price band:** $600–$3000 one-off; can recur as content retainer.
- **Proof:** "Long-tail service+geo queries convert ~2–3x better than head terms" (HubSpot / Ahrefs long-tail studies).

### `citations_inconsistent`
- **Detect:** NAP (Name / Address / Phone) across Yelp / BBB / YellowPages / Apple Maps / Bing Places varies, OR the biz is absent from major directories.
- **Severity:** medium (citation effect is weaker than it was, still worth a pitch).
- **Sell:** citation cleanup + directory submission.
- **Build:** Yext / Moz Local / BrightLocal subscription OR manual 20-directory pass.
- **Price band:** $300–$800 one-off + $50–$150/mo (if tool-based).
- **Proof:** "Citation consistency remains a meaningful local pack signal" (Whitespark top factors — still listed, weight has dropped).

---

## Paid media

### `no_ads_but_should`
- **Detect:** Meta Ad Library empty + no visible Google Ads presence (no "Sponsored" for their brand or vertical+geo) + vertical is one where paid is table-stakes (home services, dental, real estate, legal, med-spa, boutique fitness).
- **Severity:** medium, high if vertical is paid-saturated.
- **Sell:** Google / Meta ads management.
- **Build:** account setup + landing pages + creative + campaign build + ongoing optimization.
- **Price band:** $1000–$3000 setup + $800–$3000/mo management + ad spend (separate).
- **Proof:** ticket-size × local search volume math (Claude can run this calc using SERP-surfaced volume hints).

### `ads_running_but_bad`
- **Detect:** Meta Ad Library shows active ads BUT: creative > 90 days old + no rotation, no LP match (landing URL is the homepage), no offer / single CTA, no UGC, generic stock imagery.
- **Severity:** medium-high.
- **Sell:** creative refresh + LP build + full funnel rebuild.
- **Build:** new creative batch (5–10 variants, UGC-style), dedicated landing page per offer, pixel + conversion events, weekly optimization.
- **Price band:** $1500–$4000 setup + $1500–$4000/mo mgmt (ad spend separate).
- **Proof:** "Ad creative fatigue reduces CTR ~50% by day 60" (Meta ad creative studies); homepage LPs convert ~30% worse than dedicated LPs.

### `ads_no_landing_page`
- **Detect:** ads link direct to homepage or a service-list page, not an offer-specific LP with a single CTA.
- **Severity:** medium.
- **Sell:** landing page builds + CRO.
- **Build:** dedicated LP per ad offer (Framer / Webflow / Next.js) with form + pixel.
- **Price band:** $500–$2000 per LP.
- **Proof:** "Dedicated LPs convert ~2x vs homepage on paid traffic" (Unbounce conversion benchmark studies).

---

## Lead capture & automation

### `no_lead_capture`
- **Detect:** website has no contact form / no chat / no CTA beyond a phone number; or form exists but posts into the void (no confirmation, no CRM).
- **Severity:** high if website is the main acquisition channel.
- **Sell:** lead capture + CRM automation.
- **Build:** form → CRM (HubSpot free / Pipedrive / ActiveCampaign / Airtable) + instant-text-back automation + owner notification.
- **Price band:** $800–$2500 setup + $200–$600/mo.
- **Proof:** "~78% of leads go to the business that responds first" (Harvard Business Review lead response time study — the <5-minute rule).

### `slow_lead_response`
- **Detect:** via mystery-shop (send a test lead) — if response takes > 30 min, score high. Or infer from absence of any automation.
- **Severity:** high.
- **Sell:** instant-response automation.
- **Build:** Twilio SMS / email autoresponder triggered on form submit with booking link; route to owner's phone simultaneously.
- **Price band:** $500–$1500 setup + $100–$300/mo.
- **Proof:** HBR <5-min rule.

### `no_online_booking`
- **Detect:** vertical typically uses booking (salons, gyms, clinics, restaurants, services) but the site/GBP only exposes a phone number.
- **Severity:** high in booking-native verticals (beauty, wellness, dental, med-spa); medium elsewhere.
- **Sell:** booking system setup.
- **Build:** Square Appointments / Calendly / Mindbody / Acuity / Vagaro install + calendar sync + reminders.
- **Price band:** $500–$1500 setup + platform fee passthrough.
- **Proof:** "~60% of bookings for personal-service verticals happen outside business hours" (Square / Mindbody booking data).

### `manual_intake_automatable`
- **Detect:** LinkedIn shows 10+ staff + no online booking + no CRM fingerprint + no form automation. Infer: humans are answering phones/emails all day.
- **Severity:** medium (high if biz is clearly growth-constrained by this — indirect signal from hiring posts, growing team).
- **Sell:** intake automation.
- **Build:** Twilio IVR / AI voice agent / form-to-CRM flow / SMS triage bot. Claude.ai / Vapi / Synthflow for voice agents; n8n / Zapier / Make for workflow.
- **Price band:** $2000–$8000 setup + $500–$2000/mo depending on volume.
- **Proof:** case-studies on AI voice agents reducing missed-call rate by 40-70%.

### `no_email_list`
- **Detect:** no newsletter signup visible on site; no "thanks for signing up" in sitemap; no Mailchimp / Klaviyo / ConvertKit script.
- **Severity:** low-medium (depends on vertical — restaurants, gyms, beauty benefit most).
- **Sell:** email list + nurture automation.
- **Build:** Mailchimp/Klaviyo setup + welcome series + monthly offer email + segmentation.
- **Price band:** $800–$2500 setup + $300–$1000/mo content + platform.
- **Proof:** "Email delivers ~$36 per $1 spent" (Litmus email marketing ROI survey).

---

## Social presence

### `social_dormant`
- **Detect:** Instagram or Facebook last post > 60 days old, OR < 6 posts in last year.
- **Severity:** medium.
- **Sell:** social content service.
- **Build:** content calendar + monthly shoot + batched posts + community mgmt (light).
- **Price band:** $600–$2500/mo.
- **Proof:** "62% of consumers check a business's social before visiting" (BrightLocal consumer surveys — slightly variable across regions).

### `social_missing_platform`
- **Detect:** no presence on a platform the vertical needs (restaurants without IG, service businesses without Nextdoor, boutique retail without TikTok in the last 18 months).
- **Severity:** medium.
- **Sell:** platform launch + content.
- **Build:** account setup + bio + link-in-bio + first 10 posts.
- **Price band:** $500–$2000 setup + ongoing content retainer.
- **Proof:** vertical-specific: IG for food/beauty, TikTok for beauty/retail discovery.

### `link_in_bio_broken`
- **Detect:** IG/TikTok link-in-bio goes to homepage (not an offer), or is a Linktree with 12 dead links, or is missing entirely.
- **Severity:** low.
- **Sell:** link-in-bio build.
- **Build:** custom link page (Framer / Beacons / Stan Store) with offers + booking + forms.
- **Price band:** $200–$800 one-off + optional mgmt.
- **Proof:** "link-in-bio CTR 2–4x when reduced to 1-2 featured offers."

---

## Reputation beyond Google

### `yelp_neglect` / `bbb_neglect`
- **Detect:** listing exists but no owner claim (Yelp "Claim this business" visible), no responses, photos not owner-uploaded.
- **Severity:** low-medium (depends on geography — Yelp matters more in northeastern US metros).
- **Sell:** reputation management across platforms.
- **Build:** claim, fill, consolidate into a review-response tool (Birdeye / NiceJob).
- **Price band:** $300–$800 setup + $150–$400/mo.

### `negative_theme_cluster`
- **Detect:** last 40 reviews have a recurring complaint theme (parking, wait times, pricing surprise, specific staff, specific service quality).
- **Severity:** medium-high if 4+ reviews mention the same theme.
- **Sell:** operational advisory + review response playbook + optionally, the operational fix itself if the user offers that.
- **Build:** theme report + response templates + (if user scope) ops recommendations.
- **Price band:** $500–$2000 one-off audit; recurring if ongoing.
- **Proof:** specific to the biz — Claude cites the actual reviews.

---

## Tech fingerprint → automation opportunities

### `no_crm_fingerprint`
- **Detect:** site has no HubSpot / Intercom / Drift / ActiveCampaign / Klaviyo / Mailchimp / GA4 / Meta Pixel script.
- **Severity:** varies — the absence of pixel is a separate ads-infra pitch; CRM absence is an automation pitch.
- **Sell:** tracking + CRM foundation.
- **Build:** GA4 + Meta Pixel + CRM install + event taxonomy + form routing.
- **Price band:** $800–$2500 setup + training.

### `pixel_missing`
- **Detect:** no Meta Pixel / Google Ads tag / GA4. Especially damning if ads are running without a pixel.
- **Severity:** high if running ads without pixel; medium otherwise.
- **Sell:** analytics + pixel setup.
- **Build:** Pixel + GTM + conversion events + Google Ads tag; server-side where useful.
- **Price band:** $500–$1500 setup.
- **Proof:** "Optimizing Meta ads without a pixel is effectively flying blind — CPAs ~2-3x higher."

### `stack_modernization_candidate`
- **Detect:** mix of old signals — PHP-era site + no CRM + manual email + no booking + no automation anywhere.
- **Severity:** this is a meta-gap used to size the retainer opportunity rather than a distinct pitch.
- **Sell:** "digital ops transformation" retainer — a bundle.
- **Build:** site rebuild + CRM + booking + email + pixel + basic automations, delivered in 90-day sprint.
- **Price band:** $8k–$30k project-based; $1500–$5000/mo ongoing.
- **Proof:** bundle ROI math per business.

---

## Pitch filtering

After scoring gaps, filter by **user services**:

- If gap's `sell` matches anything in user's services list → keep as PITCH
- If gap is real but user doesn't sell that → keep as AWARENESS (in the "gaps you don't sell" section)
- If gap is low severity AND user doesn't sell that → drop

Then sort PITCH gaps by a rough `leverage_score`:
- severity (low=1, med=2, high=3)
- × ease of build (trivial=3, moderate=2, heavy=1)
- × user's revenue ceiling for that offer (retainer-shape=3, one-off-shape=1, depends on `pitch_constraints`)

Top 3 by leverage_score → brief's Top 3 pitches section. Rest → Other gaps.
