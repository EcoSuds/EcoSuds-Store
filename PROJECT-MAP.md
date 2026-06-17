# EcoSuds Project Map

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Store homepage with hero banner, categories, trust cues, mosaic, carousel and featured products |
| `/ecosuds/` | EcoSuds brand and product-range story |
| `/store/` | Full filterable product catalog |
| `/store/category/[slug]/` | Static category pages for the five product families |
| `/store/[slug]/` | Static product detail pages with cart and WhatsApp inquiry actions |
| `/contact/` | WhatsApp, email, location and support details |
| `/policies/[slug]/` | Shipping, returns, privacy and terms pages |
| `/admin/` | Decap CMS editor |

## Editable content

| Folder/File | Use |
| --- | --- |
| `content/site.json` | Brand, SEO defaults and contact details |
| `content/navigation.json` | Header and CTA links |
| `content/storefront.json` | Announcement text, hero badges, trust cues, order steps and care notes |
| `content/pages/*.json` | Page copy and hero settings |
| `content/categories/*.json` | Category names, descriptions, images and category URLs |
| `content/products/*.json` | Product catalog data |
| `content/faqs/*.json` | FAQ cards |
| `content/testimonials/*.json` | Customer note cards |
| `content/policies/*.md` | Policy pages |

## Key components

| Component | Use |
| --- | --- |
| `Hero` | Large scalable top banner with overlay content |
| `Navbar` | Header, mobile menu, theme toggle and cart button |
| `MobileDock` | Phone quick actions |
| `CategoryTiles` | Category cards and category navigation |
| `ProductGrid` | Product filters and cards |
| `StoreCart` | Local cart and WhatsApp order message |
| `FeatureBento` | Trust and benefit cards |
| `ProductMosaic` | Premium category mosaic |
| `ShowcaseCarousel` | Visual carousel |
