import type { Metadata } from "next";

import Prose from "components/prose";
import { pageHandles, pageByHandle } from "lib/site";
import { notFound } from "next/navigation";

// Pre-render each static page.
export function generateStaticParams() {
  return pageHandles.map((page) => ({ page }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const params = await params;
  const page = pageByHandle(params.page);
  if (!page) return notFound();
  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.title,
    openGraph: {
      publishedTime: page.updatedAt,
      modifiedTime: page.updatedAt,
      type: "article",
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page: handle } = await params;
  const page = pageByHandle(handle);
  if (!page) return notFound();

  return (
     <>
       <h1 className="mb-8 text-5xl font-bold">{page.title}</h1>
       <Prose className="mb-8" html={page.bodyHtml} />
       <p className="text-sm italic">
        {`This page was last updated ${new Intl.DateTimeFormat(undefined, {
         year: "numeric",
         month: "long",
         day: "numeric",
        }).format(new Date(page.updatedAt))}.`}
       </p>
     </>
     );
}
