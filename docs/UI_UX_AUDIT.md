# UI/UX Audit Notes

## Hero banner

The main UI problem was inconsistent source image dimensions. The previous hero used `object-contain`, which made the browser preserve each image ratio inside the same banner. That created visible empty space and inconsistent framing. The updated hero uses normalized 2400x1500 local assets, an 8:5 desktop container, `object-cover`, and overlay copy that remains legible.

## Header CTA

The **Shop Now** CTA now uses `.nav-cta`, a purpose-built contrast class rather than one-off light/dark Tailwind colors. It keeps dark green text contrast in light mode and warm cream contrast in dark mode.

## Layout consistency

Cards now use equal-height grids, better responsive breakpoints and controlled text clamping. The feature grid no longer leaves empty columns for four items, the care steps use three columns when there are three items, and product cards keep actions aligned.

## Mobile shopping

The cart overlay now appears above the mobile dock and locks page scroll while open. The header menu and cart both close on Escape. Product filters and mobile quick actions remain touch-friendly.

## Maintainability

The largest components were refactored around typed props, helper functions and a tiny `cn()` class helper. This keeps the code readable without adding a heavy dependency.
