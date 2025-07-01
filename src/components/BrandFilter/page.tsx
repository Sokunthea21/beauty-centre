export default function BrandFilter() {
  const brands = [
    "Anua",
    "Beauty of joseon",
    "Mary & May",
    "Skin1004",
    "Innisfree",
    "COSRX",
    "Etude House",
    "Dr. Jart+",
    "Laneige",
    "Missha",
    "The Face Shop",
    "Banila Co",
  ];

  return (
    <div className="border border-gray-100 rounded-sm p-5 shadow-sm bg-white mb-5">
      <h2 className="font-semibold mb-2">BRAND</h2>
      <div className="max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-gray-100 scrollbar-thumb-rounded-full">
        <ul className="space-y-1">
          {brands.map((brand) => (
            <li
              key={brand}
              className="cursor-pointer hover:text-pink-500 transition"
            >
              {brand}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
