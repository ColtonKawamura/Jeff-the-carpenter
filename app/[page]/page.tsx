import type { Metadata } from "next";

import Prose from "components/prose";
import { pageHandles, pageByHandle } from "lib/site";
import { notFound } from "next/navigation";

// Pre-render each static page.
export function generateStaticParams() {
  return pageHandles.map((page) => ({ page }));
}

export async function generateMetadata(props: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page } = await props.params;
  const meta = pageByHandle(page);
  if (!meta) return notFound();
  return {
    title: meta.seo?.title || meta.title,
    description: meta.seo?.description || meta.title,
    openGraph: {
      publishedTime: meta.updatedAt,
      modifiedTime: meta.updatedAt,
      type: "article",
    },
  };
}

export default async function Page(props: {
  params: Promise<{ page: string }>;
}) {
  const { page: handle } = await props.params;
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
