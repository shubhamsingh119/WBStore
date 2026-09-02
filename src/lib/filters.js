export const DEFAULT_PRICE_RANGE = [0, 1000];

/**
 * Reads category / brand / price / search filters out of a URLSearchParams
 * (or ReadonlyURLSearchParams) instance, e.g. ?category=electronics&price=0-1000
 */
export function parseFilters(searchParams) {
  const categoryParam = searchParams.get("category");
  const brandParam = searchParams.get("brand");
  const priceParam = searchParams.get("price");
  const search = searchParams.get("search") || "";

  const categories = categoryParam
    ? categoryParam.split(",").filter(Boolean)
    : [];
  const brands = brandParam ? brandParam.split(",").filter(Boolean) : [];

  let [priceMin, priceMax] = DEFAULT_PRICE_RANGE;
  if (priceParam) {
    const [min, max] = priceParam.split("-").map(Number);
    if (!Number.isNaN(min)) priceMin = min;
    if (!Number.isNaN(max)) priceMax = max;
  }

  return { categories, brands, priceMin, priceMax, search };
}

/** Serializes a filters object back into a "?a=b&c=d" query string. */
export function buildQueryString(filters) {
  const params = new URLSearchParams();

  if (filters.categories?.length) {
    params.set("category", filters.categories.join(","));
  }
  if (filters.brands?.length) {
    params.set("brand", filters.brands.join(","));
  }
  if (
    filters.priceMin !== undefined &&
    filters.priceMax !== undefined &&
    (filters.priceMin !== DEFAULT_PRICE_RANGE[0] ||
      filters.priceMax !== DEFAULT_PRICE_RANGE[1])
  ) {
    params.set("price", `${filters.priceMin}-${filters.priceMax}`);
  }
  if (filters.search) {
    params.set("search", filters.search);
  }

  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

/** Applies the parsed filters to a list of (brand-annotated) products. */
export function applyFilters(products, filters) {
  const search = filters.search.trim().toLowerCase();

  return products.filter((product) => {
    if (
      filters.categories.length &&
      !filters.categories.includes(product.category)
    ) {
      return false;
    }
    if (filters.brands.length && !filters.brands.includes(product.brand)) {
      return false;
    }
    if (product.price < filters.priceMin || product.price > filters.priceMax) {
      return false;
    }
    if (search && !product.title.toLowerCase().includes(search)) {
      return false;
    }
    return true;
  });
}
