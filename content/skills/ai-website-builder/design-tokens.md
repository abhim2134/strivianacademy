# Design Tokens by Business Category

Use these as starting points. Adjust based on the business's actual branding if visible from their social media or photos.

## Restaurants & Food

```css
--primary: #D4451A;      /* warm red-orange */
--secondary: #2C1810;    /* dark brown */
--accent: #F5A623;       /* golden */
--bg: #FFF8F0;           /* warm white */
--text: #2C1810;
--font-heading: 'Playfair Display', Georgia, serif;
--font-body: 'Inter', system-ui, sans-serif;
```
Hero: full-width food photo with dark overlay. Menu-style cards for dishes.

## Salons & Beauty

```css
--primary: #8B5E83;      /* muted plum */
--secondary: #2D2D2D;    /* charcoal */
--accent: #D4A574;       /* rose gold */
--bg: #FAF7F5;           /* cream */
--text: #2D2D2D;
--font-heading: 'Cormorant Garant', Georgia, serif;
--font-body: 'Nunito Sans', system-ui, sans-serif;
```
Hero: elegant interior shot. Soft gradients. Services as icon cards.

## Auto Shops & Mechanics

```css
--primary: #1A5276;      /* deep blue */
--secondary: #E74C3C;    /* bold red */
--accent: #F39C12;       /* warning yellow */
--bg: #F8F9FA;           /* clean gray */
--text: #1C1C1C;
--font-heading: 'Montserrat', system-ui, sans-serif;
--font-body: 'Open Sans', system-ui, sans-serif;
```
Hero: shop exterior or mechanic at work. Bold typography. Trust badges (years in business, certifications).

## Retail & Shops

```css
--primary: #2E4057;      /* slate blue */
--secondary: #048A81;    /* teal */
--accent: #FF6B6B;       /* coral */
--bg: #FFFFFF;
--text: #333333;
--font-heading: 'DM Sans', system-ui, sans-serif;
--font-body: 'DM Sans', system-ui, sans-serif;
```
Hero: storefront or product display. Grid layout for products/categories.

## Professional Services (Law, Accounting, Consulting)

```css
--primary: #1B2A4A;      /* navy */
--secondary: #3D5A80;    /* medium blue */
--accent: #C9A96E;       /* gold */
--bg: #FFFFFF;
--text: #1B2A4A;
--font-heading: 'Libre Baskerville', Georgia, serif;
--font-body: 'Source Sans Pro', system-ui, sans-serif;
```
Hero: clean, minimal. Trust-focused layout. Credentials prominent.

## Fitness & Wellness

```css
--primary: #1DB954;      /* energetic green */
--secondary: #191414;    /* near black */
--accent: #FF6B35;       /* orange energy */
--bg: #FAFAFA;
--text: #191414;
--font-heading: 'Bebas Neue', Impact, sans-serif;
--font-body: 'Roboto', system-ui, sans-serif;
```
Hero: action shot. Bold, dynamic layout. Class schedule grid.

## Generic / Fallback

```css
--primary: #2563EB;      /* blue */
--secondary: #1E293B;    /* dark slate */
--accent: #F59E0B;       /* amber */
--bg: #FFFFFF;
--text: #1E293B;
--font-heading: 'Inter', system-ui, sans-serif;
--font-body: 'Inter', system-ui, sans-serif;
```

## Typography Scale

```css
--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.25rem;
--text-2xl: 1.5rem;
--text-3xl: 1.875rem;
--text-4xl: 2.25rem;
--text-5xl: 3rem;
```

## Spacing Scale

```css
--space-1: 0.25rem;
--space-2: 0.5rem;
--space-3: 0.75rem;
--space-4: 1rem;
--space-6: 1.5rem;
--space-8: 2rem;
--space-12: 3rem;
--space-16: 4rem;
--space-24: 6rem;
```

## Responsive Breakpoints

```css
/* Mobile first */
/* sm: 640px */
/* md: 768px */
/* lg: 1024px */
/* xl: 1280px */
```

## Google Fonts CDN Links

Include in the HTML `<head>` — pick the pair that matches the category:

```html
<!-- Restaurants -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">

<!-- Salons -->
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garant:wght@400;600;700&family=Nunito+Sans:wght@400;600&display=swap" rel="stylesheet">

<!-- Auto / Mechanical -->
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">

<!-- Retail -->
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">

<!-- Professional -->
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Source+Sans+Pro:wght@400;600&display=swap" rel="stylesheet">

<!-- Fitness -->
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">

<!-- Fallback -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```
