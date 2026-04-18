# Recipe: Restaurants / cafes / bars / food trucks gap audit

**Invoke with:** *"use the restaurants-cafes recipe for Luna's Tacos Austin"*

**Covers:** restaurants (all service styles), cafes, bars, food trucks, bakeries, ghost kitchens, catering-forward.

## Why this vertical is different
Restaurants are unique on three dimensions:

1. **IG is primary discovery** — for most foodservice under 3 years old, IG does more work than Google. GBP matters too, but social does pre-visit conditioning.
2. **Delivery platforms complicate pitch surface** — DoorDash / Uber Eats / Grubhub / Toast take ownership of orders. Online ordering pitches need to account for whether the biz has direct ordering vs relies on third-party.
3. **Menu is the core content asset** — menu freshness, photo quality, allergen/dietary labeling — this IS their marketing, not a separate thing.

## Signal stack

| # | Signal | Best tool | Why |
|---|---|---|---|
| 1 | GBP (listing + photos + menu link + reservations) | Apify Google Maps actor | Listing hygiene, photo count, menu presence, reservation integration |
| 2 | Instagram page | `mcp__Claude_in_Chrome` | PRIMARY signal — posting cadence, content quality, engagement, link-in-bio, reel count |
| 3 | Website fetch | WebFetch + site_crawl | Menu presence, online ordering link, reservations integration, email capture |
| 4 | Reservations / ordering presence | browser check | Resy / OpenTable / Tock / direct ordering / DoorDash-only — huge pitch variance |
| 5 | Yelp | Apify or browser | Still meaningful in food, especially in coastal US + NYC metros |
| 6 | Meta Ad Library | Direct API | Usually off; when on, creative + LP quality is often weak |
| 7 | TikTok (for biz < 3 yrs old or in trendy segments) | browser search of @handle or hashtag | Cultural signal — if a trendy biz isn't on TikTok, that's the pitch |
| 8 | PageSpeed mobile | API | Foodservice sites are often image-heavy and slow |

## Adaptive probes specific to foodservice

- **If IG is dormant** → huge pitch, lead with content package. Food photo + reel content cadence is the retainer shape.
- **If IG active but menu-pic-spam** (same shots recycled, no reels, no stories) → content upgrade pitch, not volume pitch.
- **If website has menu but it's a PDF or image** → menu modernization (text menu with structured data for SEO + AI search engines) is a real pitch.
- **If delivery platforms are the only ordering path** → direct-ordering pitch (Toast, Square, Slice for pizza) saves 15-30% per order.
- **If biz is a "new opening" — GBP < 12 months old** → the launch package pitch: IG bootstrap + first 30 reviews campaign + neighborhood awareness ads.
- **If multi-location** → franchise-grade pitches scale (menu-sync, GBP-at-scale tools, cross-location reporting).
- **If no reservation system on a dinner-service restaurant** → Resy / OpenTable / Tock setup, with data capture.

## Gap categories that matter most

Priority for foodservice (filter by user services):

1. `social_dormant` / `social_missing_platform` — content/social retainer is the bread-and-butter pitch here
2. `gbp_photo_hygiene` + `gbp_posts_dormant` — food photography + GBP cadence
3. `no_online_booking` (reservations) — Resy/OpenTable setup; or direct ordering setup
4. `ads_running_but_bad` — neighborhood awareness ads often under-performed
5. `no_email_list` — email is huge for repeat visits in coffee/bakery/neighborhood restaurants
6. `website_mobile_broken` / `website_perf_slow` — heavy food imagery kills mobile perf
7. `link_in_bio_broken` — IG traffic lands on a broken link tree
8. `gbp_reviews_low_volume` + `gbp_owner_reply_rate_low` — review cadence post-meal

## Gotchas

- **IG posting cadence ≠ engagement** — 4 posts/week with 5 likes each is worse than 1 post/week with 200 likes. Score on engagement, not volume alone.
- **Reel rate matters** — IG's algorithm heavily favors reels for discovery. If a biz posts only static grid, that's a pitch even if volume is fine.
- **Menu photography quality** varies wildly. A biz with professional photos on the site but iPhone shots on IG = inconsistent brand, pitch the IG content upgrade.
- **Delivery platform ratings** (DoorDash, Uber Eats) are separate from GBP/Yelp and often reveal different complaints. Pull them if user can pitch operational advisory.
- **Happy hour / special menu content** — if a bar or restaurant has specials but they're only visible on a chalkboard in-store, there's a content and SEO pitch ("best happy hour <city>" keyword).
- **Catering pages** — if biz caters but has a weak catering page or no page, there's a B2B lead-gen pitch (corporate event catering = high-margin).
- **Ghost kitchens** — if the biz is delivery-only / no storefront, gap profile inverts (no GBP value, all IG + delivery platform).

## Example pitch bundles

**Single-location new opening (0-2 years, solo/small team):**
- IG content package (12-16 posts/mo + 4-8 reels) → $1500-3000/mo
- GBP launch optimization → $600 one-off + $300/mo
- Review generation first 90 days → $400 setup + $200/mo
- Reservation system setup (Resy / OpenTable / Tock) → $600 setup

**Established independent (5+ years, 10-30 staff):**
- Content modernization (reels + brand shoot quarterly) → $2500-5000/mo
- Email + SMS program (loyalty + repeat visits) → $1500 setup + $800/mo
- Direct online ordering migration → $1500 setup + platform fee passthrough
- Local paid (Meta + Google) for neighborhood awareness → $2000 setup + $1500/mo + spend

**Multi-location (3+ locations):**
- Multi-location GBP management → $500-1000 per location per month
- Brand content system + per-location localization → $4000-10000/mo
- Catering lead-gen funnel (B2B) → $3000 setup + $2000/mo + spend

## Price-band caveats

Foodservice is margin-thin. Owners often push back on monthly retainers > $2k. Lead with one-off projects and let retainers grow out of those. Content pricing varies 3x between local stringers and agency-quality — price to what you actually deliver.
