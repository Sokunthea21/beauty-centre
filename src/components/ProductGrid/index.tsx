import { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { productData } from "@/app/assets/productData";
import { LayoutGrid, List, Square, Rows } from "lucide-react";

type ViewMode = "grid-2" | "grid-3" | "grid-4" | "list";

export default function ProductGrid() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid-4");

  const getGridCols = () => {
    switch (viewMode) {
      case "grid-2":
        return "grid-cols-2";
      case "grid-3":
        return "grid-cols-3";
      case "grid-4":
        return "grid-cols-4";
      case "list":
        return "grid-cols-1";
      default:
        return "grid-cols-4";
    }
  };

  return (
    <div className="w-full">
      {/* Header with view mode icons */}
      <div className="flex items-center justify-between mb-4 border-b border-gray-200 pb-2">
        <h2 className="uppercase text-sm text-pink-400 tracking-wide font-semibold">Sunscreen</h2>

        <div className="flex items-center gap-2 text-gray-600">
          <span className="text-xs font-medium tracking-wide">VIEW AS</span>

          <button onClick={() => setViewMode("grid-2")}>
            <LayoutGrid size={18} className={viewMode === "grid-2" ? "text-black" : ""} />
          </button>
          <button onClick={() => setViewMode("grid-4")}>
            <Rows size={18} className={viewMode === "grid-4" ? "text-black" : ""} />
          </button>
          <button onClick={() => setViewMode("grid-3")}>
            <Square size={18} className={viewMode === "grid-3" ? "text-black" : ""} />
          </button>
          <button onClick={() => setViewMode("list")}>
            <List size={18} className={viewMode === "list" ? "text-black" : ""} />
          </button>
        </div>
      </div>

      {/* Responsive product grid */}
      <div className={`grid ${getGridCols()} gap-5`}>
        {productData.map((product, index) => (
          <ProductCard
            productData={{
              _id: product.id?.toString() ?? "",
              name: product.title ?? "Unnamed Product",
              price: 0,
              description: product.description ?? "",
              image: [
                typeof product.Image === "string"
                  ? product.Image
                  : product.Image?.src ?? "",
              ],
              offerPrice: 0,
            }}
            key={product.title + index}
            {...product}
            isList={viewMode === "list"} // optional prop if ProductCard supports list styling
          />
        ))}
      </div>
    </div>
  );
}
