import Prose from "components/prose";
import { siteInfo, sitePages } from "lib/site";
import { Suspense } from "react";
import { OrderClient } from "./order-client";

export const metadata = {
  title: "Order a custom piece",
  description: "Start a make-to-order build with Jeff's Carpentry.",
};

export default function OrderPage() {
  const page = sitePages.find((p) => p.handle === "order");

  const body =
     page?.bodyHtml ||
     "<p>Send me what you have in mind and I'll get back to you with a sketch and a quote.</p>";

  return (
        <section className="mx-auto max-w-3xl px-4 py-8">
          <h1 className="mb-8 text-4xl font-bold md:text-5xl">Order a piece</h1>
          <p className="mb-8 text-lg text-neutral-600 dark:text-neutral-400">
           Built to order, in a garage, one at a time. Have a piece you're already looking at? Start there.
          </p>

           <Suspense fallback={null}>
             <OrderClient />
           </Suspense>

           <Prose
          className="text-base leading-7 text-neutral-800 dark:text-neutral-200"
          html={body}
          />

            <div className="mt-8 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-black">
              <h2 className="mb-2 text-2xl font-semibold">Start your build</h2>
              <ul className="mb-6 space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
                {siteInfo.process.map((step) => (
                 <li key={step.step} className="flex gap-4">
                   <span className="text-lg font-bold text-blue-600">{step.step}</span>
                   <div>
                     <h3 className="font-semibold text-black dark:text-white">{step.title}</h3>
                     <p className="text-neutral-500 dark:text-neutral-400">{step.body}</p>
                  </div>
               </li>
              ))}
              </ul>

              <a
              href={`mailto:${siteInfo.contact.email}`}
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
               >
                Start by sending an email
              </a>
              <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
                 {siteInfo.contact.email} &middot; {siteInfo.contact.note}
              </p>
            </div>
        </section>
      );
}
