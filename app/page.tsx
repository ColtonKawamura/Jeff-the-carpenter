import { Carousel } from "components/carousel";
import { ThreeItemGrid } from "components/grid/three-items";
import Footer from "components/layout/footer";
import { siteInfo } from "lib/site";
import Link from "next/link";

export const metadata = {
   description:
    "Jeff's Carpentry — custom furniture and woodwork built to order, one piece at a time, in a garage.",
   openGraph: {
    type: "website",
    },
};

export default function HomePage() {
  return (
      <>
        {/* Hero */}
        <section className="mx-auto max-w-(--breakpoint-2xl) px-4 py-12 text-center md:py-20">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
           {siteInfo.tagline}
          </p>
          <h1 className="mx-auto max-w-3xl text-5xl font-bold leading-tight md:text-6xl">
            {siteInfo.hero.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
            {siteInfo.hero.subtitle}
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link
            href="/order"
            className="rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              {siteInfo.hero.cta}
            </Link>
            <Link
            href="/about"
            className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-neutral-100 dark:border-neutral-600 dark:text-white dark:hover:bg-neutral-800"
            >
             Meet Jeff
            </Link>
          </div>
        </section>

        <ThreeItemGrid />
        <Carousel />

            {/* How it works */}
        <section className="mx-auto max-w-5xl px-4 py-12">
          <h2 className="mb-8 text-center text-3xl font-bold">How a build works</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {siteInfo.process.map((step) => (
                     <div key={step.step} className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-black">
                      <p className="text-3xl font-bold text-blue-600">{step.step}</p>
                      <h3 className="mb-2 mt-1 text-lg font-semibold">{step.title}</h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">{step.body}</p>
                </div>
              ))}
          </div>
        </section>

        <Footer />
      </>
    );
}
