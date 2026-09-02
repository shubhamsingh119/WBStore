"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ImageCarousel({ images, alt }) {
  const [active, setActive] = useState(0);
  const hasMultiple = images.length > 1;

  function prev() {
    setActive((index) => (index === 0 ? images.length - 1 : index - 1));
  }

  function next() {
    setActive((index) => (index === images.length - 1 ? 0 : index + 1));
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex h-80 items-center justify-center rounded-xl border border-gray-200 bg-white p-6 sm:h-96">
        <Image
          src={images[active]}
          alt={alt}
          width={320}
          height={320}
          className="h-full w-full object-contain"
          unoptimized
        />
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-1.5 shadow hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-1.5 shadow hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="flex gap-2">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              className={`h-16 w-16 shrink-0 rounded-lg border p-1 ${
                index === active ? "border-[#0758a8]" : "border-gray-200"
              }`}
            >
              <Image
                src={image}
                alt={`${alt} thumbnail ${index + 1}`}
                width={56}
                height={56}
                className="h-full w-full object-contain"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
