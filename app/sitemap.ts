export const dynamic = "force-static";

import { baseUrl } from "lib/utils";
import { collections, sitePages, allProducts } from "lib/site";

export default function sitemap() {
  const routes = ["", "/search", "/about", "/order"];
  const now = new Date().toISOString();

  return [
        ...routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: now,
        })),
        ...collections().map((c) => ({
        url: `${baseUrl}${c.path}`,
        lastModified: now,
        })),
        ...allProducts().map((p) => ({
        url: `${baseUrl}/product/${p.handle}`,
        lastModified: now,
        })),
        ...sitePages.map((sg) => ({
        url: `${baseUrl}/${sg.handle}`,
        lastModified: now,
        })),
     ];
}
