/**
 * The shop renders as a fully static site so it can be hosted on
 * GitHub Pages (no Node server, no runtime Shopify calls).
 *
 * GitHub Pages serves the repo at a sub-path (/<repo-name>/), so when CI builds
 * with PAGES_SUBPATH=/Jeff-the-carpenter we set basePath to that sub-path;
 * locally it stays undefined so `pnpm dev` serves from the root.
 */
const subPath = process.env.PAGES_SUBPATH;

export default {
   // Static export -> plain HTML/CSS/JS that a static host (GitHub Pages) serves.
  output: "export",
   // Only apply the base path for the Pages build; keep local dev clean at /.
   ...(subPath ? { basePath: subPath } : {}),
   // No remote image optimization service on a static host; local /public assets
   // are served as plain <img> tags.
   images: {
    unoptimized: true,
    },
} satisfies import("next").NextConfig;
