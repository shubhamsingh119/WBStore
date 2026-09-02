"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/api";
import EmptyState from "@/components/EmptyState";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 && subtotal < 100 ? 9.99 : 0;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <EmptyState
          title="Your cart is empty"
          message="Browse products and add something you like."
        />
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-[#0758a8] hover:underline"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Your Cart</h1>
        <button
          type="button"
          onClick={clearCart}
          className="text-sm font-medium text-red-600 hover:underline"
        >
          Clear cart
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <ul className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-wrap items-center gap-4 rounded-xl border border-gray-200 bg-white p-4"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={64}
                height={64}
                className="h-16 w-16 object-contain"
                unoptimized
              />

              <div className="min-w-[10rem] flex-1">
                <Link
                  href={`/product/${item.id}`}
                  className="text-sm font-medium text-gray-900 hover:underline"
                >
                  {item.title}
                </Link>
                <p className="mt-1 text-xs uppercase tracking-wide text-gray-400">
                  {item.category}
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {formatPrice(item.price)}
                </p>
              </div>

              <div className="flex items-center rounded-lg border border-gray-300">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="p-2 text-gray-600 hover:bg-gray-50 disabled:opacity-40"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-sm font-medium text-gray-900">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-2 text-gray-600 hover:bg-gray-50"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <p className="w-20 text-right text-sm font-semibold text-gray-900">
                {formatPrice(item.price * item.quantity)}
              </p>

              <button
                type="button"
                onClick={() => removeItem(item.id)}
                aria-label={`Remove ${item.title}`}
                className="p-2 text-gray-400 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>

        <div className="h-fit rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-base font-semibold text-gray-900">
            Order summary
          </h2>
          <dl className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <dt>Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Shipping</dt>
              <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
            </div>
          </dl>
          <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-base font-semibold text-gray-900">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <button
            type="button"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0758a8] px-4 py-3 text-sm font-semibold text-white hover:bg-[#054a8c]"
          >
            <ShoppingBag className="h-4 w-4" />
            Checkout
          </button>
          <Link
            href="/"
            className="mt-3 block text-center text-sm font-medium text-[#0758a8] hover:underline"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
