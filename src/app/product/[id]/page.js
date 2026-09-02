"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import ImageCarousel from "@/components/ImageCarousel";
import QuantitySelector from "@/components/QuantitySelector";
import EmptyState from "@/components/EmptyState";
import { getProductById, formatPrice } from "@/lib/api";
import { useCartStore } from "@/store/cartStore";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | error | ready
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setStatus("loading");
        const data = await getProductById(id);
        if (!cancelled) {
          setProduct(data);
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
  }, [id]);

  function handleAddToCart() {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  if (status === "loading") {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="h-96 animate-pulse rounded-xl bg-gray-100" />
          <div className="space-y-4">
            <div className="h-6 w-3/4 animate-pulse rounded bg-gray-100" />
            <div className="h-4 w-1/4 animate-pulse rounded bg-gray-100" />
            <div className="h-24 w-full animate-pulse rounded bg-gray-100" />
          </div>
        </div>
      </div>
    );
  }

  if (status === "error" || !product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <EmptyState
          title="Product not found"
          message="This product may have been removed or the link is incorrect."
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <ImageCarousel images={[product.image]} alt={product.title} />

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            {product.title}
          </h1>

          {product.rating && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span>{product.rating.rate}</span>
              <span className="text-gray-400">
                ({product.rating.count} reviews)
              </span>
            </div>
          )}

          <p className="text-3xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </p>
          <p className="text-sm leading-relaxed text-gray-600">
            {product.description}
          </p>
          <div className="text-sm text-gray-600">
            <p className="font-semibold text-gray-900">Category</p>
            <p className="capitalize">{product.category}</p>
          </div>

          <p className="text-xs text-gray-500">
            Brand: <span className="font-medium text-gray-700">{product.brand}</span>
          </p>

          <div className="mt-2 flex items-center gap-4">
            <QuantitySelector value={quantity} onChange={setQuantity} />
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0758a8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#054a8c] sm:flex-none"
            >
              <ShoppingCart className="h-4 w-4" />
              {added ? "Added!" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
