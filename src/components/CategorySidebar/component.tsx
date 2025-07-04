export default function CategorySidebar() {
  const categories = [
    "Sunscreen",
    "Oil Cleansers",
    "Toners",
    "Serum",
    "Water Cleansers",
    "Moisturizers",
    "Exfoliators",
    "Cleansing Balms",
    "Masks",
    "Essences",
    "Ampoules",
    "Eye Creams",
  ];

  return (
    <div className="p-5 shadow-sm bg-white mb-5">
      <h2 className="uppercase mb-2 border-b border-b-gray-300 pb-3">CATEGORIES</h2>
      <div className="max-h-50 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-gray-100 scrollbar-thumb-rounded-full">
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li
              key={cat}
              className={`cursor-pointer hover:text-pink-500 ${
                cat === "Sunscreen" ? "text-[var(--primary)] font-medium" : ""
              }`}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
