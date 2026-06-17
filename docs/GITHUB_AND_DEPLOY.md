# GitHub and Deployment

## GitHub

```bash
git init
git add .
git commit -m "Build EcoSuds online store"
git branch -M main
git remote add origin <your-repository-url>
git push -u origin main
```

A GitHub Actions workflow is included at `.github/workflows/quality.yml` to run linting, type checking and production build checks on pushes and pull requests.

## Vercel

- Framework: Next.js
- Build command: `npm run build`
- Output directory: `out`
- Node version: 20

Add `NEXT_PUBLIC_SITE_URL` in project environment variables when a live domain is ready.

## Netlify

The included `netlify.toml` uses:

- Build command: `npm run build`
- Publish directory: `out`
- Node version: 20

To use the CMS on Netlify, enable Identity and Git Gateway, then visit `/admin/` after deployment.
