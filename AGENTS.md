# Jeff's Carpentry — a one-man, make-to-order workshop site

Built from the [Vercel Next.js Commerce](https://github.com/vercel/commerce) template
and converted to a **fully static export** so it can be hosted on **GitHub Pages**
for free, no Node server or Shopify account required.

## What changed from the template

- **No more Shopify at runtime.** The catalog, collections, menus, and static
  pages are defined in `lib/site.ts`. The `lib/shopify/` data access layer
  (kept for reference) now delegates to that local catalog. To wire up a real
  Shopify store later: fill in the SHOPIFY_* env vars and restore the
  `shopifyFetch` resolver (see the comment in `lib/shopify/index.ts`).
- **No cart / checkout (server-side).** GitHub Pages cannot run server
  actions. The make-to-order flow hands off to an Order page with a mailto:
  email link instead of server-side cart state.
- **Static images.** Placeholder wood-tone SVGs live in `public/p/`.
  Replace them with real photos when Jeff has them; just point the
  `images` field in `lib/site.ts` at `/public/p/<name>.jpg` (or any
  extension). No remote-fetch or Next.js image optimizer config needed.
- **No PPR / partial prerender.** `next.config.ts` sets `output: "export"`
  only — no `ppr`, no `useCache`, no `experimental.inlineCss`.

## How to run locally

- Prerequisites: Node.js 20+ and pnpm 9+
- Install dependencies: `pnpm install`
- Run dev server: `pnpm dev` → http://localhost:3000
- Production build & preview: `pnpm build && pnpm start`

## How it deploys to GitHub Pages

A GitHub Actions workflow in `.github/workflows/deploy.yml`:

1. Builds the Next.js app with `output: "export"` into an `out/` folder.
2. Uploads `out/` as the Pages artifact.
3. Deploys via `actions/deploy-pages`.

The `PAGES_SUBPATH` env var (set to `/Jeff-the-carpenter` in CI) ensures
all relative asset paths and Next.js internal routes are rewritten for the
sub-path that GitHub Pages serves the repo at.

If Jeff ever gets a custom domain: go to
`Settings → Pages → Build and deployment` and set
`PAGES_SUBPATH=` to empty string (or configure a custom domain
entry). The workflow will then export to `out/` with correct root-level paths.
