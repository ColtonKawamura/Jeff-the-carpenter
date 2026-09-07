"use client";

import { useSearchParams } from "next/navigation";
import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { allProducts } from "lib/site";

// Filters the local catalog by the ?q= query string, client-side
// (a static GitHub Pages export has no server to query on it).
export function SearchClient() {
  const searchParams = useSearchParams();
  const q = (searchParams.get("q") || "").trim();

  let products;
  if (!q) {
    products = allProducts();
   } else {
    const needle = q.toLowerCase();
    products = allProducts().filter((p) =>
      (p.title + " " + p.description + " " + (p.tags || []).join(" "))
       .toLowerCase()
       .includes(needle),
    );
   }
  const resultsText = products.length > 1 ? "results" : "result";

  return (
       <>
         {q ? (
            <p className="mb-4">
              {products.length === 0
                 ? "There are no pieces that match "
                 : `Showing ${products.length} ${resultsText} for `}
              <span className="font-bold">&quot;{q}&quot;</span>
            </p>
         ) : null}
         {products.length > 0 ? (
            <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <ProductGridItems products={products} />
            </Grid>
         ) : null}
       </>
   );
}
