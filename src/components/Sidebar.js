"use client";

import { DEFAULT_PRICE_RANGE } from "@/lib/filters";

export default function Sidebar({ categories, brands, filters, onChange, onClear }) {
  const selectedCategory = filters.categories[0] || "";
  const selectedBrand = filters.brands[0] || "";
  const [rangeMin, rangeMax] = DEFAULT_PRICE_RANGE;
  const pricePercent =
    ((filters.priceMax - rangeMin) / (rangeMax - rangeMin)) * 100;

  return (
    <aside className="w-full shrink-0 space-y-4 lg:w-64">
      <div className="rounded-lg bg-[#0758a8] p-5 text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Filters</h2>
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-medium text-blue-100 hover:text-white hover:underline"
          >
            Clear all
          </button>
        </div>

        <div className="mt-4">
          <h3 className="mb-2 text-sm font-semibold">Category</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === ""}
                  onChange={() => onChange({ categories: [] })}
                  className="h-4 w-4 accent-white"
                />
                All
              </label>
            </li>
            {categories.map((category) => (
              <li key={category}>
                <label className="flex cursor-pointer items-center gap-2 capitalize">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === category}
                    onChange={() => onChange({ categories: [category] })}
                    className="h-4 w-4 accent-white"
                  />
                  {category}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5">
          <h3 className="mb-2 text-sm font-semibold">Price</h3>
          <input
            type="range"
            min={rangeMin}
            max={rangeMax}
            step={10}
            value={filters.priceMax}
            onChange={(event) => onChange({ priceMax: Number(event.target.value) })}
            style={{
              background: `linear-gradient(to right, #ffffff ${pricePercent}%, rgba(255,255,255,0.35) ${pricePercent}%)`,
            }}
            className="w-full cursor-pointer"
            aria-label="Maximum price"
          />
          <div className="mt-1 flex justify-between text-xs text-blue-100">
            <span>{rangeMin}</span>
            <span>{filters.priceMax}</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-5">
        <h3 className="mb-3 text-sm font-semibold text-gray-900">Brand</h3>
        {brands.length === 0 && (
          <p className="text-xs text-gray-400">Loading brands...</p>
        )}
        <ul className="space-y-2 text-sm text-gray-700">
          <li>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="brand"
                checked={selectedBrand === ""}
                onChange={() => onChange({ brands: [] })}
                className="h-4 w-4 text-[#0758a8] focus:ring-[#0758a8]"
              />
              All
            </label>
          </li>
          {brands.map((brand) => (
            <li key={brand}>
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="brand"
                  checked={selectedBrand === brand}
                  onChange={() => onChange({ brands: [brand] })}
                  className="h-4 w-4 text-[#0758a8] focus:ring-[#0758a8]"
                />
                {brand}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
