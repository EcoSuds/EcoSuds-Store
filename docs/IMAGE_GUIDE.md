# Image Guide

## Hero banners

Use 2400x1500 WebP files for hero banners. The current normalized hero files live in:

- `/public/images/hero/home-hero.webp`
- `/public/images/hero/store-hero.webp`
- `/public/images/hero/ecosuds-hero.webp`
- `/public/images/hero/contact-hero.webp`

The hero component uses an 8:5 desktop ratio with `object-cover`. This means future hero replacements should use the same 2400x1500 ratio to avoid awkward cropping or letterboxing.

## Product images

Square product images work best at 1400x1400 WebP. Product cards use `object-contain`, so packaging and product artwork remain visible without harsh cropping.

## Category images

Category tiles are cropped intentionally with `object-cover`. Use clear center-focused images and avoid important text near the edges.
