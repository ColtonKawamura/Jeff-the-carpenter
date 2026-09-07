import Link from "next/link";

export default function NotFound() {
   return (
      <div className="mx-auto my-16 flex max-w-xl flex-col items-center text-center">
          <h2 className="text-3xl font-bold">Page not found</h2>
          <p className="mt-2 text-neutral-500 dark:text-neutral-400">
            That piece isn\'t on the list. It may have moved, or it\'s not built yet.
          </p>
          <div className="mt-6 flex gap-3">
            <Link href="/" className="rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:opacity-90">
             Back home
            </Link>
            <Link href="/order" className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-800">
             Request a build
            </Link>
          </div>
        </div>
     );
}
