// /components/ProductDetails.tsx
import React, { useState } from "react";
import { Star } from "lucide-react";
import { Image, Product } from "@/types/product";
// Adjust the import path

// --- Helper Components ---

const RatingStars: React.FC<{ rating: number; reviewCount: number }> = ({
  rating,
  reviewCount,
}) => {
  const fullStars = Math.round(rating);
  const stars = Array(5)
    .fill(null)
    .map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < fullStars ? "text-pink-500 fill-pink-500" : "text-gray-300"
        }`}
      />
    ));
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <div className="flex">{stars}</div>
      <span className="text-sm">({reviewCount} reviews)</span>
    </div>
  );
};

// --- Main Product Detail Component ---

const ProductDetailPage: React.FC<{ product: Product }> = ({ product }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [mainImage, setMainImage] = useState<Image>(product.images[0]);

  const {
    brand,
    name,
    rating,
    reviewCount,
    availability,
    productType,
    price,
    description,
    images,
    ingredients,
    howToUse,
    recommendedFor,
  } = product;

  // State management functions...

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

  const subtotal = price * quantity;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Breadcrumbs */}
      <nav className="text-sm mb-6 text-gray-500">
        <a href="/" className="hover:underline">
          Home
        </a>{" "}
        &gt; <span className="font-semibold">{name}</span>
      </nav>

      {/* Product Grid: Image Gallery & Details */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-12">
        {/* Left Column: Images */}
        <div className="flex flex-col gap-6">
          {/* Main Image - (The URL/source comes from the database) */}
          <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg border border-gray-100">
            <img
              src={mainImage.url}
              alt={mainImage.alt}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <div
                key={index}
                className={`w-20 h-20 flex-shrink-0 border-2 rounded-lg overflow-hidden cursor-pointer transition-colors ${
                  image.url === mainImage.url
                    ? "border-pink-500"
                    : "border-transparent hover:border-gray-300"
                }`}
                onClick={() => setMainImage(image)}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="mt-8 lg:mt-0">
          {/* Title from database */}
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
          <p className="text-sm text-gray-500 mb-2">
            Brand: <span className="text-gray-900 font-medium">{brand}</span>
          </p>

          {/* Rating and Availability */}
          <div className="flex items-center gap-4 mb-4">
            <RatingStars rating={rating} reviewCount={reviewCount} />
            <span className="text-sm text-gray-500">|</span>
            <span
              className={`text-sm font-medium ${
                availability === "In Stock" ? "text-green-600" : "text-red-600"
              }`}
            >
              Available: {availability}
            </span>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            Product Type:{" "}
            <span className="text-gray-900 font-medium">{productType}</span>
          </p>

          {/* Short description snippet */}
          <p className="text-gray-700 mb-6 border-b pb-4">
            {description.split(".").filter((s) => s.trim().length > 0)[0] + "."}
          </p>

          <p className="text-3xl font-semibold text-gray-900 mb-6">
            {formattedPrice}
          </p>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-8">
            <label
              htmlFor="quantity"
              className="text-sm font-medium text-gray-700"
            >
              Quantity
            </label>
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
              <button
                type="button"
                onClick={() => handleQuantityChange(-1)}
                className="w-10 h-10 text-xl text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                disabled={quantity <= 1}
              >
                −
              </button>
              <input
                type="text"
                id="quantity"
                value={quantity}
                readOnly
                className="w-12 text-center text-gray-800 font-medium focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleQuantityChange(1)}
                className="w-10 h-10 text-xl text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 px-6 py-3 bg-pink-500 text-white rounded-full font-medium shadow-md hover:bg-pink-600 transition-colors">
              Add to bag
            </button>
            <button className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors">
              Add to wishlist
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            Subtotal:{" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(subtotal)}
          </p>
        </div>
      </div>

      {/* -------------------- Description & Details Section -------------------- */}

      <div className="mt-20">
        <h2 className="text-xl font-semibold text-center text-gray-700 uppercase tracking-widest relative pb-4">
          <span className="bg-white px-4 z-10 relative">Description</span>
          <div className="absolute inset-x-0 bottom-0 h-px bg-gray-200"></div>
        </h2>

        <div className="pt-8 space-y-8">
          {/* Full Description & Recommended For */}
          <section className="text-gray-600">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Description:
            </h3>
            <p className="leading-relaxed mb-4">{description}</p>
            <p className="font-semibold text-gray-800">
              Recommended for:{" "}
              <span className="font-normal">{recommendedFor}</span>
            </p>
          </section>

          {/* How to Use */}
          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              How to Use:
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1 pl-4">
              {(Array.isArray(howToUse) ? howToUse : [howToUse]).map(
                (
                  step: string,
                  index: number // <-- Explicitly define types
                ) => (
                  <li key={index}>{step}</li>
                )
              )}
            </ul>
          </section>

          {/* Ingredients */}
          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Ingredients:
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {ingredients}
            </p>
          </section>
        </div>
      </div>

      {/* -------------------- Related Products Section -------------------- */}

      <div className="mt-20">
        <h2 className="text-xl font-semibold text-center text-gray-700 uppercase tracking-widest relative pb-4">
          <span className="bg-white px-4 z-10 relative">Related Products</span>
          <div className="absolute inset-x-0 bottom-0 h-px bg-gray-200"></div>
          <a
            href="#"
            className="absolute top-0 right-0 text-sm text-pink-500 hover:text-pink-600 font-medium"
          >
            see all
          </a>
        </h2>

        {/* Related Product Cards Placeholder */}
        <div className="flex mt-8 gap-4 overflow-x-auto pb-4">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="min-w-[180px] w-1/4 max-w-xs p-4 bg-gray-50 rounded-xl flex-shrink-0 border border-gray-200"
              >
                <div className="h-40 bg-gray-200 rounded-lg mb-3"></div>
                <p className="text-sm font-medium">Product Name {i + 1}</p>
                <p className="text-xs text-gray-500">Brand</p>
                <p className="text-md font-semibold mt-1">$XX.XX</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
