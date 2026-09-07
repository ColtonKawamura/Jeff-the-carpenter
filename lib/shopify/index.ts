/**
 * Data access layer for Jeff's Carpentry.
 *
 * The original template fetched products, collections, menus and pages from a
 * live Shopify store at runtime with a storefront token. GitHub Pages / a
 * static export can't make that call, so this first draft serves everything
 * from the hand-authored local catalog in `lib/site.ts`.
 *
 * WIRING UP SHOPIFY LATER (the "keep the entry point" intent):
 *   1. Fill in SHOPIFY_STORE_DOMAIN / SHOPIFY_STOREFRONT_ACCESS_TOKEN in
 *      .env.example (and GitHub secrets).
 *   2. Restore the shopifyFetch resolver + reshape helpers and the original
 *      function bodies from git history of lib/shopify/index.ts. Every function
 *      here keeps the exact same signature, so the UI does not change.
 *   3. getCart / createCart stay undefined by default — a static host cannot
 *      hold a server-side cart; they wire back to Shopify when connected.
 */
import {
   Cart,
   Collection,
   Menu,
   Page,
   Product,
} from "./types";
import {
   allProducts,
   collectionByHandle,
   collections as localCollections,
   homepageProducts,
   navMenu,
   pageByHandle,
   productByHandle,
   productsForCollection,
   productsWithTag,
   relatedProducts,
   sitePageById,
} from "lib/site";

// When a store is configured later, prefer it; otherwise the local catalog.
function shopifyConfigured(): boolean {
  return Boolean(
     process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN &&
       process.env.SHOPIFY_STORE_DOMAIN,
    );
}

/**
 * Cart/checkout are server-side and don't exist in a static build. The
 * make-to-order flow hands off to the "Order" page instead.
 */
export async function getCart(): Promise<Cart | undefined> {
   return undefined;
}
export async function createCart(): Promise<Cart | undefined> {
   return undefined;
}

// -- Products ------------------------------------------------------------------
export async function getProduct(handle: string): Promise<Product | undefined> {
   return productByHandle(handle);
}

export async function getProducts({
  query,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
   return productsWithTag(query);
}

export async function getCollectionProducts({
  collection,
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
   return productsForCollection(collection);
}

export async function getProductRecommendations(
  productId: string,
): Promise<Product[]> {
   return relatedProducts(productId);
}

export { homepageProducts };

// -- Collections ---------------------------------------------------------------
export async function getCollection(
  handle: string,
): Promise<Collection | undefined> {
   return collectionByHandle(handle) as Collection | undefined;
}

export async function getCollections(): Promise<Collection[]> {
   return localCollections() as Collection[];
}

// -- Menus ---------------------------------------------------------------------
export async function getMenu(_handle: string): Promise<Menu[]> {
   return navMenu();
}

// -- Pages ---------------------------------------------------------------------
export async function getPage(handle: string): Promise<Page> {
   return sitePageById(handle) as unknown as Page;
}

export async function getPages(): Promise<Page[]> {
   return Promise.resolve([] as Page[]);
}
