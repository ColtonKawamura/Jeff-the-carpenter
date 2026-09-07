// ---------------------------------------------------------------------------
// Site content & catalog for Jeff's Carpentry (first draft)
//
// The original template pulled products, collections, menus and pages from a
// live Shopify store at runtime. GitHub Pages can't run that, so for the
// first draft everything is defined here as static data and rendered as a
// static export. The Shopify code is kept (off by default) so a storefront
// can be wired in later — see lib/catalog.ts `withShopifyFallback`.
//
// Everything the UI reads for branding/content lives in `siteInfo`.
// ---------------------------------------------------------------------------

import type {
  Collection,
  Image,
  Menu,
  Page,
  Product,
  ProductOption,
  ProductVariant,
} from "lib/shopify/types";

export const siteInfo = {
  // Brand shown in the navbar, footer, metadata and OG images.
  SITE_NAME: "Jeff's Carpentry",
  COMPANY_NAME: "Jeff's Carpentry",

  // One-man, make-to-order carpenter in his garage.
  tagline: "One man. One workshop. Built just for you.",
  hero: {
    title: "Handmade furniture, built to order",
    subtitle:
      "Custom pieces crafted in my garage — from a shelf that fits your exact nook to a dining table you and your family will gather at for decades.",
    cta: "Request a build",
  },
  about:
    "I'm Jeff. I build custom woodwork in my garage — one piece at a time, to order. " +
    "Whether it's shelving for a weird corner, a cutting board for the cook in your house, " +
    "or a dining table made to your measurements, I start from the sketch you send and finish it " +
    "by hand. I keep the catalog small on purpose: I'd rather make one thing right than five things off.",
  // A simple, make-to-order process to set expectations.
  process: [
     {
      step: "01",
      title: "Tell me what you need",
      body:
         "Send dimensions, a photo of the space, and what the piece is for. No two jobs are the same, so that's how we start.",
    },
    {
      step: "02",
      title: "Get a sketch & quote",
      body:
         "I'll reply with sketches and a fair, no-pressure quote. When the design looks good, we lock it in.",
    },
    {
      step: "03",
      title: "Built in my garage",
      body:
         "Every piece is cut, joined and finished by hand, then carefully packed for delivery. You get something made for you - not from a store.",
    },
  ],
  // Placeholder contact — replace with Jeff's real details.
  contact: {
    email: "build@jeffscarpentry.example",
    note: "Lead times are typically 2-3 weeks. Local pickup or delivery within ~30 miles.",
    location: "Serves local pickups & delivery (area TBA)",
  },
};

// Make-to-order pieces. `price` is a starting price; final pricing is quoted.
type CatalogProduct = {
  handle: string;
  title: string;
  price: string;
  tagline: string; // short, shown where a description snippet is expected
  bodyHtml: string; // full description
  options: ProductOption[];
  variants: ProductVariant[];
  images: Image[];
  tags?: string[];
};

const currency = "USD";

// A single variant per piece keeps the "make-to-order" flow simple; the
// VariantSelector is left in place so it can handle options later if needed.
function variant(id: string, amount: string, title = "Custom build"): ProductVariant {
  return {
    id,
    title,
    availableForSale: true,
    selectedOptions: [
       { name: "Option", value: "Default" },
    ],
    price: { amount, currencyCode: currency },
   };
}

const singleOption = (name: string, ...values: string[]): ProductOption[] => [
  { id: name.toLowerCase(), name, values },
];

const image = (url: string, alt: string, size = 1000): Image => ({
  url,
  altText: alt,
  width: size,
  height: size,
});

export const catalog: CatalogProduct[] = [
  {
    handle: "custom-shelving",
     title: "Custom Shelving",
    price: "350.00",
    tagline: "A shelf sized to fit the exact nook you've got.",
    bodyHtml:
      `<p>Tired of a gap you can't use or a bookshelf that's a foot too tall? This is the piece I build most often.</p>
       <p>Send me the empty space - width, height, depth - and I'll design a shelf that goes in perfectly and holds your stuff the way you want it. Floating, freestanding, or a full wall system.</p>
       <p>Every joint is reinforced and the wood is finished so it can take weight and be wiped down. Wood species and finish are yours to choose.</p>`,
    options: singleOption("Wood", "Oak", "Maple", "Walnut"),
    variants: [variant("v-custom-shelving", "350.00")],
    images: [image("p/custom-shelving.svg", "Custom oak shelving built to fit a wall niche")],
    tags: ["featured", "storage"],
   },
  {
    handle: "cutting-boards",
     title: "Cutting Boards",
    price: "65.00",
    tagline: "A daily-use board in the wood and size you want.",
    bodyHtml:
     `<p>A good cutting board is something you use every single day - so it should actually fit your kitchen.</p>
     <p>Pick your size and your wood, and I'll cut, join, and finish it with a food-safe finish that's easy to maintain. Great as a gift, or just for your own counter.</p>
     <p>Charcuterie boards, end-grain chopping blocks, and everyday butchers blocks are all options. Dimensions are flexible - tell me what you need.</p>`,
    options: singleOption("Style", "Butcher block", "End-grain", "Charcuterie"),
    variants: [variant("v-cutting-boards", "65.00")],
    images: [image("p/cutting-boards.svg", "End-grain hardwood cutting board with a juice groove")],
    tags: ["featured", "kitchen"],
   },
  {
    handle: "dining-tables",
     title: "Dining Tables",
    price: "1200.00",
    tagline: "A table made to your measurements - and made to last.",
    bodyHtml:
     `<p>The table the whole family gathers at should be the piece that outlives the house. That's what I promise.</p>
     <p>Tell me the shape (round or rectangular), the size it needs to be for your room and your seating, and the wood you like. I build the top and the base to order, with dovetail and mortise joints that hold for generations.</p>
     <p>Start price is for a modest table; larger and custom finishes are quoted on the design.</p>`,
    options: singleOption("Shape", "Round", "Rectangular"),
    variants: [variant("v-dining-tables", "1200.00")],
    images: [image("p/dining-tables.svg", "Handmade solid-wood dining table with a wide top")],
    tags: ["featured", "living"],
   },
  {
    handle: "coffee-tables",
     title: "Coffee Tables",
    price: "480.00",
    tagline: "A low, sturdy table that goes with your space.",
    bodyHtml:
     `<p>A coffee table sets the whole room, so it should fit the room - not just be dropped in.</p>
     <p>Send me your dimensions and your style, and I'll build a table (square, rectangular, or round) with a top that's sanded smooth and finished to taste. Legs and base range from simple and modern to traditional.</p>`,
    options: singleOption("Shape", "Square", "Rectangular", "Round"),
    variants: [variant("v-coffee-tables", "480.00")],
    images: [image("p/coffee-tables.svg", "Low rectangular coffee table with tapered legs")],
    tags: ["living"],
   },
  {
    handle: "bookcases",
    title: "Bookcases & Cabinets",
    price: "750.00",
    tagline: "Storage that fits your books and your room.",
    bodyHtml:
     `<p>From a low bookcase for a few shelves to a full cabinet with doors and drawers.</p>
     <p>I build these around your space: total height, how many shelves, where you want them (fixed or adjustable), and any doors, drawers, or glass fronts. Shelves are reinforced so they won't sag under a heavy library.</p>`,
    options: singleOption("Style", "Open shelves", "Doored", "Glass front"),
    variants: [variant("v-bookcases", "750.00")],
    images: [image("p/bookcases.svg", "Tall open bookcase with reinforced shelves")],
    tags: ["storage"],
   },
  {
    handle: "floating-quotes",
     title: "Floating Shelves",
    price: "90.00",
    tagline: "Clean lines, hidden supports, built to hold weight.",
    bodyHtml:
     `<p>The classic clean look: a shelf that seems to float, but is engineered to carry real weight.</p>
     <p>Tell me the length and the load it should carry and I'll build it with concealed brackets rated to the specs. Match your wood, pick your finish - two, three, a dozen.</p>`,
    options: singleOption("Finish", "Natural", "Matte black", "Whitewash"),
    variants: [variant("v-floating-quotes", "90.00")],
    images: [image("p/floating-quotes.svg", "Pair of floating wall shelves with a clean edge")],
    tags: ["kitchen"],
   },
  {
    handle: "window-boxes",
     title: "Window Boxes",
    price: "85.00",
    tagline: "Weatherproof boxes for the herbs and flowers on your windows.",
    bodyHtml:
     `<p>Window boxes that actually survive the weather - built from rot-resistant wood and finished to match your trim.</p>
     <p>Send me the window width and I'll build a box that sits on the sill without dripping through. I'll include a drain tray, and I can add a matching cover or trellis.</p>`,
    options: singleOption("Wood", "Cedar", "Redwood", "Teak"),
    variants: [variant("v-window-boxes", "85.00")],
    images: [image("p/window-boxes.svg", "Outdoor cedar window box with a planted edge")],
    tags: ["outdoor"],
   },
  {
    handle: "tool-racks",
     title: "Tool Racks & Pegboards",
    price: "140.00",
    tagline: "Keep your garage organized with a wall built for your gear.",
    bodyHtml:
     `<p>A tool rack built around what you actually own, hung on the wall where you need it.</p>
     <p>Send a photo of your tools and the space and I'll lay out a rack or pegboard that holds everything you use most and leaves room for the occasional thing. Heavy-duty mounting hardware is included.</p>`,
    options: singleOption("Type", "Pegboard", "Slatwall", "Shadow box"),
    variants: [variant("v-tool-racks", "140.00")],
    images: [image("p/tool-racks.svg", "Wall-mounted tool rack in a garage")],
    tags: ["outdoor", "workshop"],
   },
];

export interface CatalogCollection {
  handle: string;
  title: string;
  description: string;
  tags: string[]; // product tags that belong in this collection
}

export const catalogCollections: CatalogCollection[] = [
  {
    handle: "kitchen",
    title: "Kitchens",
    description: "Cutting boards, shelves, and the little things your kitchen is missing.",
    tags: ["kitchen"],
   },
  {
    handle: "living",
    title: "Living",
    description: "Tables and storage for the main room of the house.",
    tags: ["living"],
   },
  {
    handle: "storage",
    title: "Storage",
    description: "Shelving, bookcases, and organizers, all built to your measurements.",
    tags: ["storage"],
   },
  {
    handle: "outdoor",
    title: "Outdoor & Workshop",
    description: "Weatherproof boxes, tool racks, and the work that holds up outside.",
    tags: ["outdoor", "workshop"],
   },
];

// --- Normalize to the shapes the existing components already expect ---------

function toProduct(p: CatalogProduct): Product {
  return {
    id: p.handle,
    handle: p.handle,
    title: p.title,
    description: p.tagline,
    descriptionHtml: p.bodyHtml,
    availableForSale: true,
    priceRange: {
       minVariantPrice: { amount: p.price, currencyCode: currency },
       maxVariantPrice: { amount: p.price, currencyCode: currency },
    },
    options: p.options,
    variants: p.variants,
    featuredImage: p.images[0],
    images: p.images,
    seo: { title: p.title, description: p.tagline },
    tags: p.tags ?? [],
    updatedAt: new Date().toISOString(),
   } as unknown as Product;
}

export function allProducts(): Product[] {
  return catalog.map(toProduct);
}

export function productByHandle(handle: string): Product | undefined {
  const p = catalog.find((c) => c.handle === handle);
  return p ? toProduct(p) : undefined;
}

// Map a collection that matches a product's tags to a Collection the UI expects.
export function collections(): (Collection & { tags: string[] })[] {
  return catalogCollections.map((c) => {
    const items = allProducts().filter((p) =>
      c.tags.some((tag) => p.tags?.includes(tag)),
    );
    return {
      handle: c.handle,
      title: c.title,
      description: c.description,
      path: `/search/${c.handle}`,
      updatedAt: new Date().toISOString(),
      seo: { title: c.title, description: c.description },
      tags: c.tags,
    } as unknown as Collection & { tags: string[] };
  });
}

export function collectionByHandle(handle: string) {
  return collections().find((c) => c.handle === handle);
}

export function productsForCollection(
  handle: string,
): Product[] {
  const col = catalogCollections.find((c) => c.handle === handle);
  if (!col) return [];
  return allProducts().filter((p) => col.tags.some((tag) => p.tags?.includes(tag)));
}

export function productsWithTag(query?: string): Product[] {
  if (!query) return allProducts();
  const q = query.trim();
  return allProducts().filter((p) =>
    (p.title + " " + p.description + " " + (p.tags ?? []).join(" ") + " " + p.tagline)
      .toLowerCase()
      .includes(q.toLowerCase()),
  );
}

export function featuredProducts(): Product[] {
  const items = catalog.filter((c) => c.tags?.includes("featured")).map(toProduct);
  return items.length >= 3 ? items.slice(0, 3) : allProducts().slice(0, 3);
}

export function homepageProducts(): Product[] {
  return allProducts();
}

export function relatedProducts(id: string): Product[] {
  const current = catalog.find((c) => c.handle === id);
  if (!current) return [];
  const sameTag = catalog.filter(
    (c) =>
      c.handle !== id &&
      current.tags?.some((t) => c.tags?.includes(t)),
  );
  return (sameTag.length ? sameTag : catalog.filter((c) => c.handle !== id))
    .slice(0, 5)
    .map(toProduct);
}

// --- Menus & static pages --------------------------------------------------

export function navMenu(): Menu[] {
  const items: Menu[] = [
     { title: "All", path: "/search" },
    ...catalogCollections.map((c) => ({ title: c.title, path: `/search/${c.handle}` })),
    { title: "About", path: "/about" },
    { title: "Order", path: "/order" },
   ];
  return items;
}

export function footerMenu(): Menu[] {
  return navMenu();
}

export interface SitePage {
  handle: string;
  title: string;
  bodyHtml: string;
  updatedAt: string;
  seo?: { title: string; description: string };
}

export const sitePages: SitePage[] = [
  {
    handle: "about",
    title: "About Jeff",
    bodyHtml:
     `<p>${siteInfo.about}</p>
      <p>What I don't do is rush it. A custom piece is worth waiting for. Most jobs take two to three weeks from the first sketch to the finished thing in your hands.</p>
      <p>Woodwork is as much about the way it's joined and finished as it is about how it looks. I use solid hardwood, reinforced joints, and finishes that actually stand up to daily life.</p>`,
    updatedAt: new Date().toISOString(),
    seo: {
      title: "About Jeff",
      description: "One man building custom furniture in his garage.",
    },
   },
  {
    handle: "order",
    title: "Order a piece",
    bodyHtml:
     `<p>How to start a custom build:</p>
      <ol>
        <li>Send me an email with the piece you have in mind - a photo of the space and rough dimensions help a lot.</li>
        <li>I'll send back sketches and a quote. No obligation.</li>
        <li>Once we're both happy, I build it and we arrange pickup or delivery.</li>
      </ol>
      <p>Every piece starts from your sketch. If it's not in the catalog, that's the whole point - I'll build it.</p>
      <p class="text-neutral-500">${siteInfo.contact.email} &middot; ${siteInfo.contact.note}</p>`,
    updatedAt: new Date().toISOString(),
    seo: {
      title: "Order a custom piece",
      description: "Start a make-to-order custom build with Jeff.",
    },
   },
];

export function pageByHandle(handle: string): SitePage | undefined {
  return sitePages.find((p) => p.handle === handle);
}

// Alias used by lib/shopify/index.ts.
export const sitePageById = pageByHandle;

// Handle lists for generateStaticParams in the static export.
export const catalogHandles = catalog.map((c) => c.handle);
export const collectionHandles = catalogCollections.map((c) => c.handle);
export const pageHandles = sitePages.filter((sp) => sp.handle !== "order").map((sp) => sp.handle);
