"use client";

import Link from "next/link";
import { useRef, useSyncExternalStore } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { parseFilters, buildQueryString } from "@/lib/filters";

// Returns false during SSR / the initial client render and true once
// mounted on the client, without calling setState from an effect.
function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("search") || "";
  const inputRef = useRef(null);
  const mobileInputRef = useRef(null);
  const mounted = useIsMounted();
  const totalItems = useCartStore((state) => state.totalItems());

  function handleSubmit(event, ref) {
    event.preventDefault();
    const filters = parseFilters(searchParams);
    filters.search = ref.current?.value.trim() || "";
    router.push(`/${buildQueryString(filters)}`);
  }

  return (
    <header className="bg-[#0758a8]">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0 text-xl font-bold text-white sm:text-2xl">
          Whatbytes<span className="text-blue-200">Store</span>
        </Link>

        <form
          onSubmit={(event) => handleSubmit(event, inputRef)}
          className="relative mx-auto hidden w-full max-w-md flex-1 sm:block"
        >
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
          <input
            key={initialQuery}
            ref={inputRef}
            type="text"
            defaultValue={initialQuery}
            placeholder="Search for products..."
            aria-label="Search products"
            className="w-full rounded-full border border-white/50 bg-transparent py-2.5 pl-9 pr-4 text-sm text-white outline-none placeholder:text-white/70 focus:border-white focus:bg-white/10"
          />
        </form>

        <Link
          href="/cart"
          aria-label="View cart"
          className="ml-auto flex shrink-0 items-center gap-2 rounded-full bg-[#002b5a] px-4 py-2 text-sm font-medium text-white hover:bg-[#001f42]"
        >
          <ShoppingCart className="h-4 w-4" />
          Cart
          {mounted && totalItems > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-500 px-1 text-xs font-semibold text-white">
              {totalItems}
            </span>
          )}
        </Link>
      </div>

      <form
        onSubmit={(event) => handleSubmit(event, mobileInputRef)}
        className="relative px-4 pb-4 sm:hidden"
      >
        <Search className="pointer-events-none absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 text-white/70" />
        <input
          key={initialQuery}
          ref={mobileInputRef}
          type="text"
          defaultValue={initialQuery}
          placeholder="Search for products..."
          aria-label="Search products"
          className="w-full rounded-full border border-white/50 bg-transparent py-2.5 pl-9 pr-4 text-sm text-white outline-none placeholder:text-white/70 focus:border-white focus:bg-white/10"
        />
      </form>
    </header>
  );
}
