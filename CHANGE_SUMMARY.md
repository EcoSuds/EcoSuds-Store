# EcoSuds requested updates

Updated sections and files for the EcoSuds store request.

## Main changes

- Home page now keeps Header, Hero, Products, Why Shop Here, Featured Products, Customer Reviews, and Footer.
- Removed the visible Home "Online Store" and "Order Flow" sections.
- About page navigation/content is renamed from EcoSuds to About Us while keeping the existing `/ecosuds/` route.
- About Us keeps Hero, Brand Story, Brand Strengths, and Our Products.
- About Us uses the converted EcoSuds banner image and moves the visual slideshow into the Our Products section.
- Removed About Us Care Notes, Short-form Product Content, and Featured Products sections.
- Product detail pages now show category-specific care notes separately per product.
- Turmeric soap video is moved to the Turmeric product detail page.
- Store page now places the product catalog where Shop by Categories was, renames the visible product heading to Our Products, removes the Store trust-cues section, and keeps How Ordering Works and Order Flow.
- Header uses the converted EcoSuds logo WebP and the tagline "Organic • Handmade • Pure • Natural".
- Header cart, theme and menu controls were raised above page overlays and made explicitly pointer/touch enabled for mobile.
- Mobile dropdown Shop Now now shares the same header CTA styling.

## Validation

- `npm run typecheck` passed.
- `npm run build` passed.
- `npm run lint` passed.
