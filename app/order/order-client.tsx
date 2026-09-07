"use client";

import { useSearchParams } from "next/navigation";
import { productByHandle } from "lib/site";
import { GridTileImage } from "components/grid/tile";
import Link from "next/link";

export function OrderClient() {
  const searchParams = useSearchParams();
  const item = searchParams.get("item");
  const product = item ? productByHandle(item) : undefined;
  if (!product) return null;

  const amount = product.priceRange.maxVariantPrice.amount;
  const currency = product.priceRange.maxVariantPrice.currencyCode;

  return (
        <div className="mb-8 flex items-center gap-4 rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-black">
          <div className="h-24 w-24 flex-none overflow-hidden rounded-md">
            <GridTileImage
            src={product.featuredImage?.url}
            alt={product.title}
            width={96}
            height={96}
            />
          </div>
          <div>
            <p className="text-lg font-semibold">{product.title}</p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              <Link
                href={`/product/${product.handle}`}
                className="text-blue-600 hover:underline"
                prefetch={false}
                >
                 View details
                </Link>{" "}
                {amount} {currency} from
             </p>
          </div>
        </div>
    );
}
