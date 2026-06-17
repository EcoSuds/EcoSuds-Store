# EcoSuds Online Store

A static-first Next.js store for EcoSuds organic soaps, bath salts, bath bombs, aroma stones and shower steamers. The project keeps the organic visual identity, adds mobile-safe navigation, uses large scalable hero banners, and provides a lightweight WhatsApp cart for order confirmation.

## What is included

- Store-only site structure: Home, EcoSuds, Store, Contact, category pages, product detail pages and policy pages.
- Five editable product categories: Organic Soaps, Bath Salts, Bath Bombs, Aroma Stones and Shower Steamers.
- Product catalog with filters, add-to-cart buttons, product pages, related products and JSON-LD product structured data.
- Normalized 2400x1500 hero image set for consistent banner framing across the main pages.
- High-contrast light/dark navigation CTA and mobile-safe cart layering.
- Mobile quick-action dock for Home, EcoSuds, Store, Cart and WhatsApp chat.
- Decap CMS at `/admin/` for novice-friendly edits to site settings, navigation, pages, categories, products, FAQs, testimonials and policies.
- Static export configuration for Vercel, Netlify and other hosts that can serve the `out` folder.

## Commands

```bash
npm ci
npm run dev
npm run lint
npm run typecheck
npm run build
```

The production build exports static files into `out/`.

## CMS workflow

Local CMS editing:

```bash
npm run cms:local
npm run dev
```

Then open `/admin/`. For live CMS editing on Netlify, enable Identity and Git Gateway, then connect the repository. The CMS edits JSON and Markdown files inside `content/`.

## Deployment

Vercel and Netlify are both configured:

- Build command: `npm run build`
- Output directory: `out`
- Node version: `20`

For another host, run `npm run build` and upload the generated `out/` folder.
