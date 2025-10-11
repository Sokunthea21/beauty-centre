import { getCategories } from "@/api/category.api";
import { useEffect, useState } from "react";

interface CategorySidebarProps {
  selectedCategory: number | null;
  onSelectCategory: (id: number | null) => void;
}

export default function CategorySidebar({
  selectedCategory,
  onSelectCategory,
}: CategorySidebarProps) {
  const [categoryData, setCategoryData] = useState<any[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await getCategories();
        setCategoryData(response.data || []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div className="p-5 shadow-sm bg-white mb-5 rounded-lg">
      <h2 className="uppercase mb-2 border-b border-b-gray-300 pb-3 font-semibold">
        CATEGORIES
      </h2>

      <div className="max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-gray-100 scrollbar-thumb-rounded-full">
        <ul className="space-y-1">
          {categoryData.map((cat: any) => (
            <li key={cat.id}>
              <button
                onClick={() =>
                  onSelectCategory(selectedCategory === cat.id ? null : cat.id)
                }
                className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                  selectedCategory === cat.id
                    ? "bg-pink-500 text-white font-medium"
                    : "text-gray-700 hover:bg-pink-50 hover:text-pink-500"
                }`}
              >
                {cat.category}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
