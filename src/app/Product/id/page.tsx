import ProductGallery from "@/components/ProductGallery/component";
import ProductDetails from "@/components/ProductDetails/component";
import ProductTabs from "@/components/ProductTabs/component";
import { Product } from "@/types";
import { notFound } from "next/navigation";
import { mockProducts } from "@/mock/product";


export async function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = mockProducts.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-10">
      <ProductGallery images={product.images ?? []} />
      <div>
        <ProductDetails product={product} />
        <ProductTabs
          usage={product.usage ?? ""}
          skinType={product.skinType ?? ""}
          ingredients={product.ingredients ?? ""}
        />
      </div>
    </div>
  );
}
