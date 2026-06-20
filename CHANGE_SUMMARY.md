# EcoSuds update summary

## Home page
- Removed the Featured Products section completely.
- Removed the Why Shop Here block from the Home page.
- Kept Home hero, products/category area, and Customer Reviews.

## About Us page
- Added the Why Shop Here trust cue block after Brand Story.
- Removed the Our Products category grid from About Us.
- Kept the visual picture gallery and renamed the surrounding section to Picture Gallery.

## Cart on mobile
- Kept the cart as a drawer/overlay, but made the cart header sticky and easier to close.
- Added a clear Close cart button for empty cart state.
- Added a Continue shopping button for carts with products.
- Added Escape-key close support and raised the cart overlay above the header/mobile dock.

## Mobile bottom navbar
- Added active tab highlighting for Home, About, and Store based on the current URL.
- Cart tab now highlights while the cart drawer is open.
- Added `aria-current="page"` for active page links and `aria-pressed` for the Cart button.

## Validation
- `npm run typecheck` passed.
- `npm run build` passed.
- `npm run lint` passed.
