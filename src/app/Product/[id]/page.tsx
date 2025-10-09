"use client"; // ✅ client component
import { useEffect, useState } from "react";
import ProductDetails from "@/components/ProductDetails/component";
import { findProductById } from "@/api/product.api";

const STATIC_PRODUCT = {
  id: 1,
  name: "Sample Product",
  description: "This is a sample product for testing.",
  price: "10.00",
  stock: 5,
  ratingSum: 20,
  ratingCount: 4,
  productImages: [
    { id: 1, productImage: "/images/sample1.png" },
    { id: 2, productImage: "/images/sample2.png" },
  ],
  brand: { id: 1, brand: "Test Brand" },
  category: { id: 1, category: "Test Category" },
  howToUse: ["Step 1", "Step 2"],
  ingredients: "Water, Sugar",
  recommendedFor: "All skin types",
};

export default function ProductPage({ params }: { params: { id: number } }) {
  const [productData, setProductData] = useState<any>(STATIC_PRODUCT);

  // useEffect(() => {
  //   async function fetchProduct() {
  //     const response = await findProductById(params.id);
  //     setProductData(response.data);
  //   }
  //   fetchProduct();
  // }, [params.id]);

  if (!productData) return <p>Loading...</p>;

  return (
    <ProductDetails
      product={{
        ...productData,
        category: productData.category?.category,
        brand: productData.brand?.brand,
      }}
    />
  );
}
