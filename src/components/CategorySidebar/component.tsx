import { getCategories } from "@/api/category.api";
import { useEffect, useState } from "react";

export default function CategorySidebar() {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await getCategories();

      setCategoryData(response.data);
    }

    fetchCategories();
  }, []);

  return (
    <div className="p-5 shadow-sm bg-white mb-5">
      <h2 className="uppercase mb-2 border-b border-b-gray-300 pb-3">CATEGORIES</h2>
      <div className="max-h-50 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-gray-100 scrollbar-thumb-rounded-full">
        <ul className="space-y-1">
          {categoryData.map((cat: any) => (
            <li
              key={cat.id}
              className={`cursor-pointer hover:text-pink-500 ${
                cat === "Sunscreen" ? "text-[var(--primary)] font-medium" : ""
              }`}
            >
              {cat.category}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
