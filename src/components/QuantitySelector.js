"use client";

import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({ value, onChange, min = 1, max = 99 }) {
  return (
    <div className="flex items-center rounded-lg border border-gray-300">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="p-2 text-gray-600 hover:bg-gray-50 disabled:opacity-40"
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-8 text-center text-sm font-medium text-gray-900">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="p-2 text-gray-600 hover:bg-gray-50 disabled:opacity-40"
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
