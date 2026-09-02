const BASE_URL = "https://fakestoreapi.com";

/**
 * Small, deterministic list of mock brand names.
 * FakeStoreAPI does not return a "brand" field on products, but the
 * assignment's design calls for a brand filter in the sidebar. We derive a
 * stable brand per product (based on its id) purely for demo/filtering
 * purposes so the UI matches the reference design.
 */
export const MOCK_BRANDS = [
  "Nova",
  "Zenith",
  "Urban Craft",
  "Pulse",
  "Everline",
  "Solace",
  "Nimbus",
  "Artisan",
];

function attachBrand(product) {
  const brand = MOCK_BRANDS[product.id % MOCK_BRANDS.length];
  return { ...product, brand };
}

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const products = await res.json();
  return products.map(attachBrand);
}

export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }
  const product = await res.json();
  return attachBrand(product);
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }
  return res.json();
}

export function formatPrice(value) {
  return `$${Number(value).toFixed(2)}`;
}
