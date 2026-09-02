"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import ProductGrid from "@/components/ProductGrid";
import EmptyState from "@/components/EmptyState";
import { getProducts, getCategories } from "@/lib/api";
import {
  parseFilters,
  buildQueryString,
  applyFilters,
} from "@/lib/filters";

export default function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filters = parseFilters(searchParams);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | error | ready
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setStatus("loading");
        const [productList, categoryList] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        if (!cancelled) {
          setProducts(productList);
          setCategories(categoryList);
          setStatus("ready");
        }
      } catch (error) {
        if (!cancelled) setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const brands = useMemo(() => {
    const unique = new Set(products.map((product) => product.brand));
    return Array.from(unique).sort();
  }, [products]);

  const filteredProducts = useMemo(
    () => applyFilters(products, filters),
    [products, filters]
  );

  function updateFilters(partial) {
    const next = { ...filters, ...partial };
    router.push(`/${buildQueryString(next)}`);
  }

  function clearFilters() {
    router.push("/");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-center justify-between lg:hidden">
        <h1 className="text-lg font-bold text-blue-900">Product Listing</h1>
        <button
          type="button"
          onClick={() => setMobileFiltersOpen((open) => !open)}
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700"
        >
          {mobileFiltersOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <SlidersHorizontal className="h-4 w-4" />
          )}
          Filters
        </button>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <div className={`${mobileFiltersOpen ? "block" : "hidden"} lg:block`}>
          <Sidebar
            categories={categories}
            brands={brands}
            filters={filters}
            onChange={updateFilters}
            onClear={clearFilters}
          />
        </div>

        <div className="flex-1">
          <h1 className="mb-4 hidden text-2xl font-bold text-blue-900 lg:block">
            Product Listing
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({filteredProducts.length})
            </span>
          </h1>

          {status === "loading" && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-72 animate-pulse rounded-xl bg-gray-100"
                />
              ))}
            </div>
          )}

          {status === "error" && (
            <EmptyState
              title="Something went wrong"
              message="We couldn't load products right now. Please try again shortly."
            />
          )}

          {status === "ready" && filteredProducts.length === 0 && <EmptyState />}

          {status === "ready" && filteredProducts.length > 0 && (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </div>
    </div>
  );
}
