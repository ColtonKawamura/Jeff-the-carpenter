import { Suspense } from "react";
import { SearchClient } from "./search-client";

// Static export: the catalog is prerendered and filtered client-side by ?q=.
export const metadata = {
  title: "Search",
  description: "Search for pieces built by Jeff's Carpentry.",
};

export default function SearchPage() {
  return (
        <Suspense fallback={null}>
          <SearchClient />
        </Suspense>
    );
}
