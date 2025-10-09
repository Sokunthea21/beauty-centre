"use client"; // ✅ client component
import { useEffect, useState } from "react";
import ProductDetails from "@/components/ProductDetails/component";
import { findProductById } from "@/api/product.api";

export default function ProductPage({ params }: { params: { id: number } }) {
  const [productData, setProductData] = useState();

  useEffect(() => {
    async function fetchProduct() {
      const response = await findProductById(params.id);
      setProductData(response.data);
    }
    fetchProduct();
  }, [params.id]);

  if (!productData) return <p>Loading...</p>;

  return (
    <ProductDetails
      product={productData}
    />
  );
}
