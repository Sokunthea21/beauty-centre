// /mock/products.ts
import { Product } from "@/types";

export const mockProducts: Product[] = [
  {
    id: "1",
    _id: "1", // For cart usage
    title: "COSRX Aloe Soothing Suncream SPF50+/PA+++",
    description:
      "Experience ultimate sun protection with the Aloe Soothing Sun Cream SPF50+/PA+++. Lightweight and hydrating formula, enriched with botanical extracts.",
    price: 7.5,
    offerPrice: 7.5,
    vendor: "COSRX",
    category: "Sunscreen",
    mainImage: "/images/suncream/main.jpg",
    images: [
      "/images/suncream/1.jpg",
      "/images/suncream/2.jpg",
      "/images/suncream/3.jpg",
    ],
    usage:
      "Apply generously as the last step of skincare, before sun exposure.",
    skinType: "All skin types, especially sensitive skin.",
    ingredients: "Aloe Barbadensis Leaf Extract, Glycerin, Water, etc.",
  },
];
