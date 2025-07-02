import { productData } from "@/app/assets/productData";

type ProductDetailProps = {
  id: number;
};

export default function ProductDetail({ id }: ProductDetailProps) {
  const product = productData.find((p) => p.id === id);

  if (!product) return <div>Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={typeof product.Image === "string" ? product.Image : product.Image.src}
          alt={product.title}
          className="w-full md:w-1/2 object-cover rounded"
        />
        <div className="space-y-3 md:w-1/2">
          <h1 className="text-2xl font-bold">{product.title}</h1>
          <p>{product.description}</p>
          <p className="text-lg font-semibold">{product.price}</p>
          <p className="text-yellow-500">⭐ {product.rating}</p>
          <button className="mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-800">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
