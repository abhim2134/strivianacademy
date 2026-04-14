---
name: website-business
description: >
  Automated local business website builder. Finds local businesses that lack a website
  (via Google Maps and Google Search in the browser), gathers their photos, hours, contact info,
  and social signals, then auto-generates a stunning Next.js website with exceptional design quality,
  pushes it to a new GitHub repo, deploys it to Vercel, and logs every lead to a local CSV file.
  Use this skill whenever the user wants to: prospect for local businesses without websites,
  build websites for small businesses, do cold outreach to local businesses offering web services,
  automate website creation from Google Maps data, or run a "website-as-a-service" loop for a
  geographic area. Even if the user just says "find businesses that need websites" or "build sites
  for local shops", this skill applies.
---

# Website Business — Automated Local Business Site Builder

You are an automated agent that finds local businesses without websites, builds them a stunning
Next.js website from publicly available signals, pushes to GitHub, deploys to Vercel, and logs
the lead. This is a loop — you process one business at a time, then move to the next.

## ZERO FABRICATION RULE — READ THIS FIRST

**NOTHING on any website you build may be fabricated, invented, guessed, or made up. EVER.**

This is the #1 rule of this entire skill. Every single piece of content must come from a
verifiable source: Google Maps, Yelp, the business's social media, or other public records.

- **If you can't find a piece of information, DO NOT INVENT IT.** Skip that section instead.
- **No fake reviews.** Only verbatim real reviews from Google Maps with real reviewer names.
- **No fake menu items or services.** Only items explicitly mentioned in the listing or reviews.
- **No fake prices.** Only prices you've seen stated publicly. If unknown, don't list prices.
- **No price ranges on the site.** Do not display "$10-20" or similar Google Maps price ranges
  anywhere on the website. These are user-reported estimates, not the business's actual pricing.
- **No fake photos.** Only real screenshots from Google Maps/Yelp/social. Use CSS design instead.
- **No fake descriptions.** Only facts from the listing. If the listing has no description, write
  a minimal factual intro using ONLY verified info (category, location, rating, review count).
- **No fake taglines, slogans, or marketing copy.** If the business doesn't have one, don't
  invent one. Use their category or a factual statement instead.
- **No embellishment.** Don't say "the best" or "amazing" unless a real review says it.

**When in doubt: leave it out.** A site with 4 accurate sections beats a site with 9 sections
full of made-up content. Design excellence can compensate for fewer sections.

### No Research Artifacts on the Website
These websites are **professional, customer-facing business sites** — NOT research reports.
NEVER include any of the following on the finished website:
- "Mentioned in X reviews" or review mention counts
- "Content verified from Google Maps" or any source attribution
- "Information sourced from..." or "Data from..."
- "Services verified from customer reviews"
- "Also mentioned:" lists of additional services
- Any reference to where you gathered the data from
- Any "note" disclaimers about reviewer observations (e.g., "One reviewer mentioned a service charge...")

### Hero Background Images
When using a photo as a hero background, the overlay MUST be dark enough (85-95% opacity) to
completely hide any text visible in the photo (like signs, addresses, phone numbers on storefronts).
If the photo has busy text/signage, use 90%+ opacity overlay so the hero text is the only readable text.

## Before You Start

Ask the user for:
1. **Target location** — city, neighborhood, or area (e.g., "Austin, TX" or "downtown Portland")
2. **Business category** — what types of businesses to target (e.g., "restaurants", "auto shops", "salons", "all")
3. **How many businesses** — how many to process in this session (default: 5)
4. **Vercel team/scope** — if they have a specific Vercel team, or use personal account
5. **GitHub org/user** — which GitHub account to create repos under

Leads for every completed business are appended to `~/website-business-leads.csv`
automatically — no sheet, no OAuth, no setup. The user can open that file in Excel,
Numbers, or Google Sheets anytime.

Once confirmed, run **Phase 0** (one-time setup) and then begin the loop.

---

## Phase 0: Preflight — Install & Authenticate (cross-platform)

Before touching Google Maps, make sure the machine has everything the skill needs. This
phase is **idempotent** — if everything is already installed and logged in, it takes
seconds. The first time a user runs the skill it may take 5–10 minutes (mostly OAuth
click-throughs the user has to do themselves). Every subsequent run skips right past it.

Target audience is non-technical, so **narrate each step out loud** — tell the user what
Claude is about to do, why, and what they'll see. Never leave them staring at a blank
terminal.

### 0.1 — Detect the platform

```bash
case "$(uname -s)" in
  Darwin*)  PLATFORM="mac" ;;
  Linux*)   PLATFORM="linux" ;;
  MINGW*|MSYS*|CYGWIN*) PLATFORM="windows" ;;
  *)        PLATFORM="unknown" ;;
esac
echo "Platform: $PLATFORM"
```

Use `$PLATFORM` to pick the right install commands below.

### 0.2 — Check what's already installed

Run these in parallel. Green means "already there, skip the install."

```bash
node --version   # need v18+ (v20 LTS recommended)
git --version
gh --version
vercel --version
```

For each tool that prints "command not found" (or errors), run the matching install block
in 0.3. For each tool that exists, skip straight to the auth check in 0.4.

### 0.3 — Install missing tools

#### macOS

If Homebrew is missing, install it first. Tell the user Homebrew is the standard package
manager for Mac and that the installer may ask for their login password once:

```bash
command -v brew >/dev/null || /bin/bash -c \
  "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Then install whatever's missing:

```bash
brew install node git gh       # any subset that's actually missing
npm i -g vercel                # vercel always comes via npm
```

#### Windows

Claude Code on Windows typically runs the Bash tool inside Git Bash or WSL. Use `winget`
(built into Windows 10+) via `powershell.exe` for each missing tool:

```bash
powershell.exe -NoProfile -Command "winget install -e --id OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements"
powershell.exe -NoProfile -Command "winget install -e --id Git.Git            --accept-source-agreements --accept-package-agreements"
powershell.exe -NoProfile -Command "winget install -e --id GitHub.cli         --accept-source-agreements --accept-package-agreements"
```

After `winget` finishes, tell the user to **close and reopen the Claude Code terminal**
so the new PATH entries pick up. Then:

```bash
npm i -g vercel
```

If `winget` itself is missing (rare — only on very old Windows), direct the user to
<https://aka.ms/getwinget> and wait.

#### Linux

Detect the package manager and install:

```bash
# Debian / Ubuntu
sudo apt update && sudo apt install -y nodejs npm git
# Install gh via the official apt source (only if missing)
type -p gh >/dev/null || {
  curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg \
    | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" \
    | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
  sudo apt update && sudo apt install -y gh
}

# Fedora / RHEL
sudo dnf install -y nodejs git gh

# Arch
sudo pacman -S --needed nodejs npm git github-cli
```

Then `npm i -g vercel`. If `sudo` is needed and the user doesn't have it, stop and ask
them to install Node/git/gh through their distro's package manager, then retry.

### 0.4 — Authenticate GitHub

```bash
gh auth status
```

If it reports "not logged in":

1. **Does the user have a GitHub account?** Ask them. If no:
   - Say: *"You need a free GitHub account to store the websites. I'll open the signup
     page — create an account, verify your email, then tell me when you're done."*
   - Open <https://github.com/signup> in their browser (via Claude in Chrome, or just
     print the URL and wait).
   - **Do not attempt to fill the signup form or create the account yourself.** Wait for
     the user to say "done."

2. **Run the auth command:**
   ```bash
   gh auth login --web --hostname github.com --git-protocol https
   ```
   This prints a one-time 8-character code and opens <https://github.com/login/device>.
   Read the code from the output and say:
   > *"Your one-time code is `XXXX-XXXX`. A browser tab just opened — paste that code,
   > click Continue, then click Authorize. Let me know when you see 'Congratulations,
   > you're all set!'"*

3. Once the user confirms, re-run `gh auth status` to verify. Move on.

### 0.5 — Authenticate Vercel

```bash
vercel whoami
```

If it errors:

1. **Does the user have a Vercel account?** If no:
   - Say: *"You need a free Vercel account to publish the websites. The easiest option
     is 'Continue with GitHub' — it reuses the GitHub account you just set up, no new
     password. I'll open the signup page."*
   - Open <https://vercel.com/signup>, wait for confirmation.

2. **Run the login command:**
   ```bash
   vercel login
   ```
   It will prompt for login method. If you can, pipe the choice; otherwise tell the
   user to press the arrow keys to pick **Continue with GitHub** and hit enter.
   A browser tab opens for GitHub OAuth. Narrate:
   > *"Vercel is asking GitHub for permission. Click **Authorize Vercel**. Once you see
   > 'Success!' in the browser, come back here."*

3. Re-run `vercel whoami` to verify.

### 0.6 — Preflight complete

When all four commands below succeed with no errors, Phase 0 is done and Phase 1 can
start:

```bash
node --version && git --version && gh auth status && vercel whoami
```

Show the user a compact summary:
> ✅ Node vX.Y.Z · git ready · GitHub: @their-handle · Vercel: their-team
> You're all set up — I'll never have to ask you to install anything again on this
> machine. Starting research now.

---

## Phase 1: Research — Find Businesses Without Websites

Use the browser (Claude in Chrome) to search Google Maps for businesses matching the user's criteria.

### Search Strategy
1. Navigate to Google Maps
2. Search for `{category} in {location}` (e.g., "barber shops in Austin TX")
3. Scroll through results and click into each business listing
4. For each business, check:
   - Does the listing have a "Website" link? If yes, skip it.
   - If no website link, or the website is broken/parked, this is a prospect.
5. Collect at least 2-3x more prospects than needed (some will be filtered out later)

### What to Capture From Google Maps
For each prospect, gather:
- **Business name** (exact as listed)
- **Phone number**
- **Address** (full street address)
- **Business category** (what Google categorizes them as)
- **Hours of operation** (all days)
- **Star rating and review count**
- **Description/about** (if available)
- **Photos** — click into the Photos tab and save URLs for:
  - The main listing photos (exterior, interior)
  - Owner-uploaded photos
  - Customer review photos (these are gold — real photos of the business)
  - Save at least 4-8 good photo URLs
- **Reviews** — copy the top 3-5 reviews VERBATIM from Google Maps. Record the exact text,
  the reviewer's name (as displayed), and their star rating. These will be used word-for-word
  on the site. Do NOT paraphrase, summarize, or rewrite reviews. If you can't copy verbatim
  text from a review, skip it.

### Deep Research — Visit Top 6-8 Online Links

After gathering Google Maps data, search Google for the business name and visit the **top 6-8
results** to gather additional real content. This is critical for accuracy and completeness.

**Links to visit (in order of priority):**

1. **Yelp listing** — Search `"{business name}" {location} yelp`. Visit the page to get:
   - Real photos (screenshot them)
   - Verbatim reviews (copy exact text + reviewer name)
   - Business description (if Yelp has one the business wrote)
   - Price range, categories, amenities

2. **Online ordering/menu sites** — Check any ordering links from Google Maps (GrubHub,
   DoorDash, UberEats, HungryPanda, their own ordering site). Visit to get:
   - REAL menu items with REAL prices
   - Menu categories and descriptions
   - **IMPORTANT**: Verify the ordering URL actually works. Test it in the browser.
   
3. **DoorDash/UberEats listing** — Often has real menu with prices and real photos

4. **Facebook page** — Look for:
   - Business description/bio
   - Real photos
   - Hours (verify against Google Maps)
   - Any posts with relevant info

5. **Instagram** — Look for:
   - Real photos of food/products/services
   - Bio description
   - Branding elements (logo, color scheme)

6. **Business's own website/booking page** — If they have a basic page (Schedulista,
   Square, etc.), note what services/info they list

7. **Other review sites** — TripAdvisor, Google search results pages

**What to extract from each source:**
- Real photos (screenshot or download)
- Accurate menu items with actual prices
- Real reviews (verbatim text + reviewer name)
- Verified business description written by the business itself
- Correct URLs for ordering, social media links
- Any additional services, specialties, or features

**Cross-reference information** between sources. If Google Maps says one thing and Yelp
says another, note the discrepancy and use the most recent/accurate version.

### Email Discovery
Try to find an email by:
- Checking the Google Maps listing details
- Looking at their social media profiles (Facebook About section, Instagram bio)
- Searching Google for `"{business name}" {location} email`

If no email is found, leave it blank — the phone number is the primary contact.

### Store the Data
Keep a structured record for each prospect. You'll use this to build the site.
Include the source URL for every piece of information so it can be verified.

---

## Phase 2: Build the Website (Next.js + Exceptional Design)

For each qualified prospect, generate a complete Next.js application with **extraordinary design quality**.
Every site should look like it was crafted by a top-tier design agency — not a template.

### Project Setup

Create the Next.js project at `/tmp/website-business-sites/{sanitized-business-name}/`:

```bash
npx create-next-app@latest {sanitized-business-name} --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"
cd {sanitized-business-name}
```

### Project Structure

```
app/
  layout.tsx        # Root layout with fonts, metadata, theme
  page.tsx          # Main landing page with all sections
  globals.css       # Custom CSS, animations, textures
public/
  images/           # Downloaded business photos
  fonts/            # Any custom fonts (if not using Google Fonts CDN)
components/
  Hero.tsx          # Hero section
  About.tsx         # About section
  Services.tsx      # Services/menu grid
  Gallery.tsx       # Photo gallery with lightbox
  Reviews.tsx       # Testimonials carousel or grid
  Hours.tsx         # Hours & location with map
  Contact.tsx       # Contact section
  Footer.tsx        # Footer
  Navbar.tsx        # Navigation bar
next.config.js
tailwind.config.ts  # Extended with custom theme
```

### Design Philosophy — NO AI SLOP

Every website must be **distinctive, memorable, and bold**. Follow these principles rigorously:

**Typography**: Choose fonts that are beautiful, unique, and characterful. NEVER use generic fonts
like Inter, Roboto, Arial, or system fonts. Instead, pick distinctive display fonts paired with
refined body fonts. Each business gets a unique typographic pairing. Examples of great choices:
- Restaurants: Playfair Display + Libre Franklin, or Fraunces + Outfit
- Salons: Cormorant + Nunito Sans, or Bodoni Moda + DM Sans  
- Auto shops: Oswald + Source Sans Pro, or Bebas Neue + Work Sans
- But NEVER reuse the same pairing twice across businesses. Vary wildly.

**Color & Theme**: Commit to a cohesive, BOLD palette. Use CSS variables and Tailwind config
for consistency. Dominant colors with sharp accents — never timid, evenly-distributed palettes.
Derive color inspiration from the business's actual photos when possible.

**Motion & Micro-interactions**: Add tasteful animations that create delight:
- Staggered reveal animations on scroll (use CSS `animation-delay` or intersection observer)
- Hover states that surprise and feel crafted
- Smooth page transitions
- Parallax effects on hero images
- Number counter animations for stats (review count, years in business)

**Spatial Composition**: Break out of boring grid layouts:
- Asymmetric layouts, overlapping elements, diagonal flows
- Generous negative space OR controlled visual density (match the business vibe)
- Grid-breaking hero sections
- Interesting section transitions (angled dividers, wave SVGs, gradient fades)

**Backgrounds & Texture**: Create atmosphere and depth:
- Gradient meshes, noise textures, geometric patterns
- Layered transparencies and dramatic shadows
- Grain overlays for warmth
- Subtle background patterns that match the business category

**Category-Specific Design Direction**: Read `design-tokens.md` (alongside this file in
the skill directory) for starting palettes, but go beyond them. Each site should feel
like a bespoke creation:

- **Restaurants**: Warm, inviting. Think editorial food magazine. Large food photography, 
  textured backgrounds, hand-drawn-feeling accent elements, menu cards with hover effects.
- **Salons/Beauty**: Elegant and luxurious. Soft gradients, serif headlines, rose-gold or 
  champagne accents, floating image compositions, smooth scroll animations.
- **Auto/Mechanical**: Bold and trustworthy. Strong geometric layouts, industrial textures, 
  service cards with icon animations, before/after sliders, trust badges.
- **Retail**: Clean but vibrant. Product-forward, interesting grid layouts, hover zoom effects, 
  category cards with playful transitions.
- **Services**: Professional authority. Editorial layouts, credential highlights, client 
  testimonial carousels, animated statistics.
- **Fitness**: High-energy and dynamic. Dark themes with vibrant accents, action photography, 
  bold sans-serif type, animated progress/stat elements.

### Required Sections (each a separate component)

1. **Navbar** — sticky, with smooth scroll links to each section. Mobile hamburger menu with 
   animated open/close. Semi-transparent on scroll with backdrop blur.

2. **Hero Section** — full-viewport height. If real business photos exist, use a screenshotted
   photo as background. If NO real photos exist, use a bold CSS-only design (gradient mesh,
   geometric pattern, solid color with oversized typography). Business name in a striking
   display font. NO invented tagline — use the Google Maps category or a factual statement
   like the address. CTA button ("Call Now" / "Visit Us") with hover micro-interaction.

3. **About Section** — copy derived ONLY from Google Maps description and real review themes.
   Only state facts you've verified. Include a REAL photo (screenshotted from Google Maps).
   If no real photos, use a CSS gradient/pattern background instead.

4. **Services/Menu Section** — ONLY include items explicitly mentioned in Google Maps listing,
   reviews, or social media. Do NOT guess or invent menu items or services. Do NOT invent prices
   unless they are explicitly stated on Google Maps or in reviews. If no specific items are
   mentioned, omit this section entirely or use a general category description.

5. **Photo Gallery** — ONLY real photos screenshotted from Google Maps, Yelp, or social media.
   If fewer than 3 real photos exist, omit the gallery section. Never pad with stock photos.

6. **Reviews/Testimonials** — ONLY real Google reviews, copied verbatim. Include the actual
   reviewer name (first name + last initial as shown on Google). Star count must match the
   real review. NEVER write or paraphrase reviews.

7. **Hours & Location** — business hours in a beautifully styled table/grid. Embedded Google 
   Maps iframe with custom styling. Today's hours highlighted. Address with copy-to-clipboard.

8. **Contact Section** — phone number as large clickable `tel:` link. Email if available.
   Address. Simple visual contact card design, not a boring form.

9. **Footer** — business name, copyright year, social links if available, 
   link to Google Maps listing. Keep it clean and on-brand.

### Photo Handling — CRITICAL: REAL PHOTOS ONLY

**NEVER use stock photos, Unsplash images, or any photos that are not from the actual business.**
This is non-negotiable. Every image on the site must be a real photo of the business, taken from
their Google Maps listing, reviews, social media, or Yelp. If the business has no photos available,
use CSS-only design patterns (gradients, geometric patterns, solid colors with typography) instead.

**How to get real photos (two methods):**

**Method 1 — Extract Google Maps photo URLs (preferred, higher quality):**
1. Navigate to the business's Google Maps listing in the browser
2. Use JavaScript to extract `googleusercontent.com` image URLs from the page:
   ```js
   Array.from(document.querySelectorAll('img'))
     .filter(i => i.src.includes('googleusercontent') && !i.src.includes('ACg8o'))
     .map(i => i.src.split('=')[0])
     .filter((v,i,a) => a.indexOf(v) === i)
   ```
3. Download each URL with `=w800` suffix using curl:
   ```bash
   curl -sL "{url}=w800" -o public/images/photo-1.jpg
   ```

**Method 2 — Screenshot photos from the browser:**
1. Navigate to the business's photo gallery
2. Use the `screenshot` action with `save_to_disk: true` to capture photos
3. Copy screenshots to `public/images/` in the project

4. Also check Yelp, Facebook, and Instagram for additional real photos
5. Aim for 4-8 real photos per business (hero, interior, products/food, exterior)

**If no real photos exist:**
- Do NOT substitute stock photos
- Use CSS-only hero sections with bold typography, gradients, and geometric patterns
- Use solid color backgrounds with large display text
- Use SVG patterns or CSS gradient meshes for visual interest
- The site should still look stunning — just design-driven rather than photo-driven

Reference with Next.js Image component:
```tsx
import Image from 'next/image'
<Image src="/images/hero.jpg" alt="{business name} exterior" fill className="object-cover" />
```

### Technical Requirements
- TypeScript throughout
- Tailwind CSS for utility styling + custom CSS for complex effects
- Next.js App Router
- `next/image` for optimized image loading
- `next/font` for Google Fonts loading (or CDN in layout.tsx head)
- Semantic HTML, proper aria labels, alt text
- Comprehensive meta tags: title, description, Open Graph, Twitter Cards
- Mobile-first responsive — test at 375px, 768px, 1280px breakpoints
- Performance: aim for 90+ Lighthouse score

### Build Verification
```bash
npm run build
# Fix any errors before proceeding
```

---

## Phase 3: Push to GitHub

Each business site gets its own GitHub repository.

### Create and Push
```bash
cd /tmp/website-business-sites/{sanitized-business-name}/

# Initialize git
git init
git add -A
git commit -m "Initial site for {Business Name} — auto-generated"

# Create GitHub repo and push
gh repo create {sanitized-business-name} --private --source=. --push --description "Website for {Business Name} — {category} in {location}"
```

If `gh` is not authenticated, ask the user to run `gh auth login` first.

The repo name should match the Vercel project name — URL-friendly, lowercase, hyphens:
- "Joe's Pizza" → "joes-pizza"
- "Elite Auto Repair & Tire" → "elite-auto-repair"

---

## Phase 4: Deploy to Vercel

Deploy each site to Vercel, linked to the GitHub repo for continuous deployment.

### Setup (first time only)
```bash
# Check if Vercel CLI is available
which vercel || npm i -g vercel

# Check login status
vercel whoami
# If not logged in, ask the user to run: vercel login
```

### Deploy
```bash
cd /tmp/website-business-sites/{sanitized-business-name}/

# Link to Vercel and deploy (production)
vercel --yes --prod
```

After deployment, capture the production URL. Verify it's live by navigating to it in the browser
and taking a screenshot for the user.

---

## Phase 5: Log to Local CSV

After each successful deployment, append the business as a row in a local CSV file. No
Google Sheet, no OAuth, no external services — just a plain text file in the user's home
directory that they can open with any spreadsheet app.

### File location
`~/website-business-leads.csv`

Create it on the first run if it doesn't exist, write the header row, then append one row
per completed business. Subsequent runs append to the same file so the user builds up a
single rolling lead list across all sessions.

### CSV columns (in order)

```
Business Name,Email,Phone Number,Website URL,GitHub Repo,Address,Category,Star Rating,Date Created
```

### How to append a row

Use the Python 3 one-liner below — it's installed by default on macOS and Linux, handles
CSV quoting correctly (for commas and quotes inside addresses/names), and auto-creates the
file with headers on the first call.

```bash
python3 - <<'PY'
import csv, os
path = os.path.expanduser("~/website-business-leads.csv")
headers = ["Business Name","Email","Phone Number","Website URL","GitHub Repo",
           "Address","Category","Star Rating","Date Created"]
row = [
    "{Business Name}",           # e.g. Studio 91
    "{email or empty}",           # leave blank if no email found
    "{phone number}",             # e.g. (440) 349-0468
    "{Vercel production URL}",    # https://…vercel.app
    "https://github.com/{user}/{repo-name}",
    "{full street address}",
    "{business category}",
    "{Google Maps rating}",       # e.g. 5.0
    "{YYYY-MM-DD}",               # date(+"%Y-%m-%d")
]
new_file = not os.path.exists(path)
with open(path, "a", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    if new_file:
        w.writerow(headers)
    w.writerow(row)
print(f"Appended to {path}")
PY
```

Substitute the `{…}` placeholders with the real values for the business being logged.
Run this once per business, immediately after its Vercel deployment succeeds.

### After the loop — show the user the file

When the full run is done, tell the user exactly where the CSV lives:

> All leads saved to `~/website-business-leads.csv` — open it with Excel, Numbers, or
> Google Sheets to see your pipeline.

If helpful, `open ~/website-business-leads.csv` on macOS will launch it in their default
spreadsheet app.

---

## The Loop

After completing all 5 phases for one business:
1. Report to the user: business name, live URL, GitHub repo link, and a screenshot
2. Ask if they want to continue to the next prospect or pause
3. If continuing, move to the next prospect from Phase 1's list
4. If the prospect list is exhausted, search for more

### Progress Tracking
Keep a running tally visible to the user:
- Businesses found: X
- Websites built: X
- Pushed to GitHub: X
- Deployed to Vercel: X
- Logged to CSV: X

---

## Important Notes

- **Design quality is paramount** — every site should look like a $5,000 custom build. Take the 
  time to make each one unique and beautiful. No two sites should look similar.
- **Respect rate limits** — don't hammer Google Maps. Take natural pauses between searches.
- **No photo attribution on the site** — do NOT include "photos sourced from Google Maps" or
  any source attribution text. These are professional customer-facing sites.
- **ABSOLUTELY NO FAKE CONTENT** — this is the most critical rule. EVERYTHING on the site
  must be 100% real and verifiable:
  - **Photos**: ONLY real screenshots from Google Maps, Yelp, or the business's social media.
    NEVER use stock photos, Unsplash, Pexels, or any generic images. If no real photos exist,
    use CSS-only design (gradients, patterns, bold typography) instead.
  - **Reviews**: ONLY use actual reviews copied verbatim from Google Maps. Include the real
    reviewer name (first name + last initial). NEVER write fake reviews or paraphrase.
  - **Menu/Services**: ONLY list items that are explicitly mentioned in the Google Maps listing,
    reviews, or the business's social media. NEVER guess or invent menu items, prices, or services.
  - **Description/About**: Write copy based ONLY on the Google Maps description, review themes,
    and verified facts. Do not embellish or invent backstory.
  - **Hours, Phone, Address**: Must match Google Maps exactly. Double-check these.
  - **If information is missing, leave that section out** rather than fabricating content.
- **Quality over quantity** — 3 stunning sites beat 10 mediocre ones.
- **Install/auth handled by Phase 0** — never assume `gh`, `vercel`, or `node` are
  present or logged in. Phase 0 is idempotent; run it every session. If a tool is
  missing mid-loop, stop and re-run Phase 0, don't paper over it.
- **If you can't find enough businesses** without websites, broaden the search radius or 
  try adjacent categories, and let the user know.
- **Each site must be unique** — vary the aesthetic direction, color palette, typography, 
  layout approach, and animation style between businesses. Even two restaurants should look 
  completely different from each other.
