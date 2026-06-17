# Domain Migration

When the live domain is ready:

1. Update `siteUrl` in `content/site.json`.
2. Add `NEXT_PUBLIC_SITE_URL` to the host environment variables.
3. Rebuild and deploy.
4. Check canonical links in page source.
5. Submit the new `/sitemap.xml` in Google Search Console.
6. Update Instagram, Facebook and WhatsApp profile links if needed.
