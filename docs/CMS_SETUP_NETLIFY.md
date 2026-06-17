# CMS Setup for Netlify

The project uses Decap CMS and stores content in the repository under `content/`.

## Local CMS editing

```bash
npm run cms:local
npm run dev
```

Open `/admin/` and edit products, categories, page copy and policies.

## Netlify CMS editing

1. Deploy the repository to Netlify.
2. Enable Netlify Identity.
3. Enable Git Gateway.
4. Invite the store editor by email.
5. Open `/admin/` on the live site.

CMS collections are intentionally store-focused: site settings, navigation, storefront blocks, pages, product categories, products, FAQs, testimonials and policies.
