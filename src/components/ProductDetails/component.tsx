"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import { assets } from "@/app/assets/assets";
import ProductCard from "../ProductCard/component";

// =====================================================================
// 1. INTERFACES & MOCK DATA
// =====================================================================

interface ProductImage {
  id: number;
  productImage: string;
}

interface Brand {
  id: number;
  brand: string;
}

interface Category {
  id: number;
  category: string;
}

interface Product {
  title: string;
  id: number;
  name: string;
  description: string;
  price: string; // comes as string from backend
  stock: number;
  ratingSum: number;
  ratingCount: number;
  productImages: ProductImage[];
  brand?: Brand;
  category?: Category;
  howToUse?: string | string[];
  ingredients?: string;
  recommendedFor?: string;
}

interface ProductDetailsProps {
  product: Product;
}

interface Review {
  id: number;
  customerName: string;
  isVerified: boolean;
  date: string;
  rating: number; // 1 to 5
  title: string; // Added title for reviews as seen in the visual
  comment: string;
  images?: string[]; // Array of image URLs
  avatarUrl?: string; // Changed to avatarUrl for specific images, like Cathy's
  avatarInitial?: string; // Kept as fallback for generic avatars
}

const mockReviews: Review[] = [
  {
    id: 1,
    customerName: "Cathy K.",
    isVerified: true,
    date: "26/02/23", // Updated date to match visual
    rating: 5,
    title: "Very outstanding",
    comment:
      "I didn't know how effective the gel cream would be since I was skeptical of the texture, but my sensitive skin loved it and I didn't even break out when I first started using it. Love it!",
    images: ["uploaded:image_b1d9cd.png-5f663d2d-8d99-45a4-b64c-84dcd0025de4"], // Placeholder image matching the visual
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Example avatar
  },
  {
    id: 2,
    customerName: "Aileen R.",
    isVerified: true, // Assuming Aileen is also verified for the example
    date: "12/02/23",
    rating: 4,
    title: "Really light and not sticky.",
    comment:
      "Really light and not sticky. My skin soaked it right up! I mix it with the green tea products and it helps balance my combo skin.",
    images: [
      "uploaded:image_b1d9cd.png-5f663d2d-8d99-45a4-b64c-84dcd0025de4",
      "uploaded:image_b1d9cd.png-5f663d2d-8d99-45a4-b64c-84dcd0025de4",
    ], // Two placeholder images
    avatarInitial: "A", // Initial for generic avatar
  },
  {
    id: 3,
    customerName: "Cathy K.",
    isVerified: true,
    date: "02/02/23", // Updated date to match visual
    rating: 4,
    title: "Tried the kit since it",
    comment:
      "Tried the kit since it was my first time trying this product line. So far I really am enjoying it and it gives my skin a smooth and fresh look morning and night!",
    images: [],
    avatarInitial: "C",
  },
];

// =====================================================================
// 2. HELPER COMPONENTS (Stars & Review Card)
// =====================================================================

// Product Rating (Average)
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
          i < fullStars
            ? "text-pink-500 fill-pink-500"
            : "text-gray-300 fill-gray-300/50"
        }`}
      />
    ));
  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <div className="flex">{stars}</div>
      <span className="font-medium text-gray-900">{rating.toFixed(1)}</span>
      <span className="text-sm">({reviewCount} reviews)</span>
    </div>
  );
};

// Review Card Stars (Individual Review)
const ReviewStars: React.FC<{ rating: number }> = ({ rating }) => {
  const stars = Array(5)
    .fill(null)
    .map((_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${
          // Slightly smaller stars for individual review
          i < rating
            ? "text-pink-500 fill-pink-500"
            : "text-gray-300 fill-gray-300/50"
        }`}
      />
    ));
  return <div className="flex gap-0.5">{stars}</div>;
};

// Individual Review Card
const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  const avatarColors = ["bg-gray-400", "bg-pink-400", "bg-blue-400"];
  const colorIndex = review.avatarInitial
    ? review.avatarInitial.charCodeAt(0) % avatarColors.length
    : 0;

  return (
    // Review card background matching the example, with subtle shadow and rounded corners
    <div className="py-6 border-b border-gray-100 last:border-b-0">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          {/* Avatar - conditional rendering for image vs. initial */}
          {review.avatarUrl ? (
            <img
              src={review.avatarUrl}
              alt={review.customerName}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-lg ${avatarColors[colorIndex]}`}
            >
              {review.avatarInitial}
            </div>
          )}

          <div>
            <p className="font-semibold text-gray-800 text-sm">
              {review.customerName}
            </p>
            {review.isVerified && (
              <span className="text-xs text-green-600 font-medium bg-green-50 px-1.5 rounded-full mt-1 inline-block">
                Verified Reviewer
              </span>
            )}
          </div>
        </div>
        <span className="text-xs text-gray-500 mt-1">{review.date}</span>{" "}
        {/* Align date with customer name */}
      </div>

      <div className="pl-14">
        {" "}
        {/* Aligned with the name/rating block */}
        <ReviewStars rating={review.rating} />
        <p className="font-semibold text-gray-900 mt-1 mb-1 text-sm">
          {review.title}
        </p>
        <p className="mt-1 text-gray-700 leading-relaxed text-sm whitespace-pre-line">
          {review.comment}
        </p>
        {/* Review Images */}
        {review.images && review.images.length > 0 && (
          <div className="flex gap-3 mt-3">
            {review.images.map((imgSrc, index) => (
              <div
                key={index}
                className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200"
              >
                <img
                  src={imgSrc} // Use the actual image source now
                  alt={`Review by ${review.customerName} image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Customer Reviews Section
const CustomerReviews: React.FC<{
  reviews: Review[];
  totalReviews: number;
}> = ({ reviews, totalReviews }) => {
  const averageRating =
    totalReviews > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
      : 0;
  const fullStars = Math.round(averageRating);

  const stars = Array(5)
    .fill(null)
    .map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < fullStars
            ? "text-pink-500 fill-pink-500"
            : "text-gray-300 fill-gray-300/50"
        }`}
      />
    ));

  return (
    <div
      className="mt-20 bg-white p-8 pt-12 rounded-xs border border-gray-100"
      style={{ backgroundColor: "#FFF8F8" }}
    >
      {" "}
      {/* Light pink background */}
      <div className="text-center mb-10 relative">
        <div className="flex justify-center items-center gap-2">
          <Image
            src={assets.bloomright}
            alt="Left Bloom"
            className="h-[50px] w-[60px]"
          />
          <h2 className="text-lg font-bold uppercase">CUSTOMER REVIEWS</h2>
          <Image
            src={assets.bloomleft}
            alt="Right Bloom"
            className="h-[50px] w-[60px]"
          />
        </div>
        <p className="text-sm text-pink-500 mb-4 font-medium cursor-pointer hover:underline">
          4 reviews
        </p>{" "}
        {/* Hardcoded count as in visual */}
        {/* Summary Rating */}
        <div className="flex justify-center items-center flex-col">
          <div className="flex">{stars}</div>
        </div>
        {/* Write a review button */}
        <button className="mt-4 px-6 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-white transition-colors">
          Write a Review
        </button>
      </div>
      {/* List of Reviews */}
      <div className="max-w-3xl mx-auto">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

// =====================================================================
// 3. MAIN PRODUCT DETAIL COMPONENT
// =====================================================================

const ProductDetailPage: React.FC<ProductDetailsProps> = ({ product }) => {
  const [quantity, setQuantity] = useState<number>(1);

  // Constants and calculated values
  const BASE_URL: string = "http://localhost:8080";

  const getImageUrl = (path: string): string => {
    return path.startsWith("http") ? path : `${BASE_URL}${path}`;
  };

  const mainImageObj: ProductImage | undefined = product.productImages?.[0];
  const [mainImage, setMainImage] = useState<{ url: string; alt: string }>({
    url: mainImageObj ? getImageUrl(mainImageObj.productImage) : "",
    alt: product.name,
  });

  const brandName: string = product.brand?.brand || "Unknown";
  const categoryName: string = product.category?.category || "Uncategorized";
  const price: number = parseFloat(product.price) || 0;
  const rating: number =
    product.ratingCount && product.ratingCount > 0
      ? product.ratingSum / product.ratingCount
      : 0;
  const reviewCount: number = product.ratingCount || 0;
  const subtotal: number = price * quantity;
  const recommendedFor: string = product.recommendedFor || "N/A";
  const ingredients: string = product.ingredients || "Ingredients not listed.";

  // Quantity handler
  const handleQuantityChange = (delta: number): void => {
    setQuantity((prev) => Math.min(product.stock, Math.max(1, prev + delta)));
  };

  // Price formatting
  const formattedPrice: string = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

  // How To Use formatting
  const howToUseData: string | string[] | undefined = product.howToUse;
  let howToUseSteps: string[] = [];

  if (howToUseData) {
    if (typeof howToUseData === "string") {
      howToUseSteps = howToUseData
        .split("\n")
        .filter((s) => s.trim().length > 0);
      if (howToUseSteps.length === 0) howToUseSteps = [howToUseData];
    } else if (Array.isArray(howToUseData)) {
      howToUseSteps = howToUseData;
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Breadcrumbs */}
      <nav className="text-sm mb-6 text-gray-500">
        <a href="/" className="hover:underline">
          Home
        </a>{" "}
        {/* &gt; <a href="#" className="hover:underline">{categoryName}</a> Added Category link */}
        &gt; <span className="font-semibold">{product.name}</span>
      </nav>

      {/* Product Grid: Image Gallery & Details */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-12">
        {/* Left Column: Images */}
        <div className="flex flex-col gap-6">
          {/* Main Image - (The URL/source comes from the database) */}
          <div className="bg-gray-100 rounded-xs overflow-hidden border border-gray-100">
            {/* Added aspect ratio styling to maintain image layout */}
            <img
              src={mainImage.url}
              alt={mainImage.alt}
              className="w-full h-full object-cover aspect-square"
            />
          </div>

          {/* Thumbnail Gallery */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.productImages?.map((image, index) => (
              <div
                key={index}
                className={`w-20 h-20 flex-shrink-0 border-2 rounded-xs overflow-hidden cursor-pointer transition-colors p-0.5 ${
                  // Added small padding for better border effect
                  getImageUrl(image.productImage) === mainImage.url
                    ? "border-gray-800"
                    : "border-transparent hover:border-gray-300"
                }`}
                onClick={() => {
                  // Use getImageUrl for consistent URL setting
                  setMainImage({
                    url: getImageUrl(image.productImage),
                    alt: product.name,
                  });
                }}
              >
                <img
                  // The original code hardcoded the path, now using getImageUrl to be safer
                  src={getImageUrl(image.productImage)}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Product Info & Actions */}
        <div className="mt-8 lg:mt-0 justify-center">
          {/* Title from database */}
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            {product.name}
          </h1>
          <p className="text-sm text-gray-500 mb-2">
            Brand:{" "}
            <span className="text-gray-900 font-medium">
              {brandName} {/* Used calculated brandName */}
            </span>
          </p>

          {/* Rating and Availability */}
          <div className="flex items-center gap-4 mb-2">
            <RatingStars rating={rating} reviewCount={reviewCount} />
            <span className="text-sm text-gray-500">|</span>
            <span
              className={`text-sm font-medium ${
                product.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stock > 0
                ? `In Stock (${product.stock} left)`
                : "Out of Stock"}
            </span>
          </div>

          <p className="text-sm text-gray-500 mb-4 border-b pb-4">
            Product Type:{" "}
            <span className="text-gray-900 font-medium">
              {categoryName} {/* Used calculated categoryName */}
            </span>
          </p>

          {/* Short description snippet */}
          <p className="text-gray-700 mb-6  leading-relaxed">
            {/* Display full description or a truncated version */}
            {product.description}
          </p>

          <p className="text-3xl font-medium text-gray-900 mb-6">
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
            <div className="flex items-center border border-gray-300 rounded-xs overflow-hidden">
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
                className="w-10 h-10 text-xl text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                disabled={quantity >= product.stock}
              >
                +
              </button>
            </div>
          </div>
          {/* Subtotal moved here based on visual, but formatted to be clear */}
          <p className="text-sm text-gray-700 mt-4 mb-6">
            Subtotal for {quantity} item(s):{" "}
            <span className="font-semibold text-gray-900">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(subtotal)}
            </span>
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              className="flex-1 px-6 py-3 border border-gray-300 bg-white text-black rounded-xs font-medium hover:bg-pink-500 transition-colors disabled:opacity-50 disabled:bg-pink-400"
              disabled={product.stock === 0}
            >
              Add to bag
            </button>
            <button className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xs font-medium hover:bg-gray-50 transition-colors">
              Add to wishlist
            </button>
          </div>
        </div>
      </div>

      {/* -------------------- Description & Details Section -------------------- */}

      <div className="mt-20">
        <div className="flex justify-center items-center gap-2">
          <Image
            src={assets.bloomright}
            alt="Left Bloom"
            className="h-[50px] w-[60px]"
          />
          <h2 className="text-lg font-bold uppercase">Description</h2>
          <Image
            src={assets.bloomleft}
            alt="Right Bloom"
            className="h-[50px] w-[60px]"
          />
        </div>

        <div className="pt-8 space-y-8">
          {/* Full Description & Recommended For */}
          <section className="text-gray-600">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Description:
            </h3>
            <p className="leading-relaxed mb-4">{product.description}</p>
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
              {howToUseSteps.length > 0 ? (
                howToUseSteps.map((step, index) => <li key={index}>{step}</li>)
              ) : (
                <li>No specific usage instructions provided.</li>
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
        <div className="text-center mb-4">
          <div className="flex justify-center items-center gap-2">
            <Image
              src={assets.bloomright}
              alt="Left Bloom"
              className="h-[50px] w-[60px]"
            />
            <h2 className="text-lg font-bold uppercase">Related Products</h2>
            <Image
              src={assets.bloomleft}
              alt="Right Bloom"
              className="h-[50px] w-[60px]"
            />
          </div>
          <a
            href="#"
            className="text-sm text-gray-500 mt-1 cursor-pointer hover:underline"
          >
            See All
          </a>
        </div>

        {/* Related Product Cards Placeholder */}
        <div className="flex mt-8 gap-4 overflow-x-auto scrollbar-hidden snap-x snap-mandatory pb-4">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <ProductCard
                key={`related-product-${i}`}
                productData={{
                  _id: product.id.toString(),
                  name: product.title,
                  price: Number(product.price),
                  description: product.description,
                  offerPrice: Number(product.price),
                  image:
                    product.productImages && product.productImages.length > 0
                      ? [product.productImages[0].productImage]
                      : [""],
                }}
              />
            ))}
        </div>
      </div>
      {/* -------------------- CUSTOMER REVIEWS SECTION -------------------- */}
      <CustomerReviews
        reviews={mockReviews}
        totalReviews={mockReviews.length}
      />
    </div>
  );
};

export default ProductDetailPage;
