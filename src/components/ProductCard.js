"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/api";
import { useCartStore } from "@/store/cartStore";

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  function handleAddToCart(event) {
    event.preventDefault();
    event.stopPropagation();
    addItem(product, 1);
  }

  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex h-full flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="flex h-40 items-center justify-center rounded-lg bg-gray-50">
        <Image
          src={product.image}
          alt={product.title}
          width={140}
          height={140}
          className="h-32 w-32 object-contain transition group-hover:scale-105"
          unoptimized
        />
      </div>

      <h3 className="mt-3 line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-gray-900">
        {product.title}
      </h3>
      <p className="mt-1 text-lg font-bold text-gray-900">
        {formatPrice(product.price)}
      </p>

      <button
        type="button"
        onClick={handleAddToCart}
        className="mt-3 w-full rounded-lg bg-[#0758a8] py-2.5 text-sm font-semibold text-white transition hover:bg-[#054a8c]"
      >
        Add to Cart
      </button>
    </Link>
  );
}
