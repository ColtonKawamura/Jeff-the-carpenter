import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { getCollection, getCollectionProducts } from "lib/shopify";
import { collectionHandles } from "lib/site";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Pre-render each collection for the static export / GitHub Pages.
export function generateStaticParams() {
  return collectionHandles.map((collection) => ({ collection }));
}

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const collection = await getCollection(params.collection);
  if (!collection) return notFound();
  return {
    title: collection.seo?.title || collection.title,
    description:
       collection.seo?.description ||
        collection.description ||
         `${collection.title} — built by Jeff's Carpentry`,
     };
}

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
}) {
   const params = await props.params;
   const products = await getCollectionProducts({
    collection: params.collection,
     });

  return (
        <section>
           {products.length === 0 ? (
              <p className="py-3 text-lg">No products found in this collection</p>
           ) : (
              <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <ProductGridItems products={products} />
              </Grid>
           )}
        </section>
    );
}
