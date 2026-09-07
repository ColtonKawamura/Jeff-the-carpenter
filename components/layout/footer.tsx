import Link from "next/link";

import FooterMenu from "components/layout/footer-menu";
import LogoSquare from "components/logo-square";
import { siteInfo } from "lib/site";
import { getMenu } from "lib/shopify";
import { Suspense } from "react";

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const skeleton =
     "w-full h-6 animate-pulse rounded-sm bg-neutral-200 dark:bg-neutral-700";
  const menu = await getMenu("next-js-frontend-footer-menu");
  const copyrightName = siteInfo.COMPANY_NAME || siteInfo.SITE_NAME || "";

  return (
     <footer className="text-sm text-neutral-500 dark:text-neutral-400">
       <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0 dark:border-neutral-700">
         <div>
           <Link
            className="flex items-center gap-2 text-black md:pt-1 dark:text-white"
            href="/"
            >
                <LogoSquare size="sm" />
                <span className="uppercase">{siteInfo.SITE_NAME}</span>
            </Link>
           <p className="mt-3 max-w-xs text-neutral-500 dark:text-neutral-400">
             {siteInfo.tagline}
           </p>
         </div>
         <Suspense
          fallback={
             <div className="flex h-[188px] w-[200px] flex-col gap-2">
               <div className={skeleton} />
               <div className={skeleton} />
               <div className={skeleton} />
               <div className={skeleton} />
               <div className={skeleton} />
               <div className={skeleton} />
             </div>
          }
          >
             <FooterMenu menu={menu} />
          </Suspense>
         <div className="flex flex-col gap-2 md:ml-auto">
           <Link
            className="flex h-8 w-max flex-none items-center justify-center rounded-md border border-neutral-200 bg-white text-xs text-black dark:border-neutral-700 dark:bg-black dark:text-white"
            aria-label="Request a build"
            href="/order"
            >
              <span className="px-3">Request a build</span>
            </Link>
           <a
            className="flex h-8 w-max flex-none items-center justify-center rounded-md border border-neutral-200 bg-white text-xs text-black dark:border-neutral-700 dark:bg-black dark:text-white"
            aria-label="Email Jeff"
            href={`mailto:${siteInfo.contact.email}`}
            >
              <span className="px-3">Email Jeff</span>
            </a>
         </div>
       </div>
       <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
         <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
           <p>
             &copy; {currentYear} {copyrightName}. {siteInfo.contact.location}.
           </p>
           <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
           <p className="text-xs text-neutral-400">
             A workshop project &middot; built to order, one piece at a time.
           </p>
         </div>
       </div>
     </footer>
    );
}
