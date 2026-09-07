import Price from "components/price";
import Prose from "components/prose";
import { Product } from "lib/shopify/types";
import Link from "next/link";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({ product }: { product: Product }) {
  return (
      <>
        <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
          <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
          <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
            <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
            />
            <span className="ml-2">from</span>
          </div>
        </div>
        <VariantSelector options={product.options} variants={product.variants} />
        {product.descriptionHtml ? (
          <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.descriptionHtml}
          />
        ) : null}
        <Link
          href={`/order?item=${product.handle}`}
          className="relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white hover:opacity-90"
        >
          Request this build
        </Link>
        <p className="mt-3 text-center text-xs text-neutral-500 dark:text-neutral-400">
         Made to order &middot; quote after you send us the details
        </p>
      </>
    );
}
