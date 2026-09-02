import { Suspense } from "react";
import HomeContent from "@/components/HomeContent";

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-gray-500">
          Loading products...
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
