import { PackageSearch } from "lucide-react";

export default function EmptyState({
  title = "No products found",
  message = "Try adjusting your filters or search term.",
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
      <PackageSearch className="h-10 w-10 text-gray-300" />
      <p className="text-base font-medium text-gray-700">{title}</p>
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
}
