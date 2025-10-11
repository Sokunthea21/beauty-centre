"use client";

import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import { assets } from "@/app/assets/assets";
import ProductCard from "../ProductCard/component";
import { addOrRemoveProductWhiteList, getWhiteList } from "@/api/whitelist.api";
import { addProductToCart, getCart } from "@/api/cart.api";
import { getAllProducts } from "@/api/product.api"; // Import the API function

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
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  avatarUrl?: string;
  avatarInitial?: string;
}

const mockReviews: Review[] = [
  {
    id: 1,
    customerName: "Cathy K.",
    isVerified: true,
    date: "26/02/23",
    rating: 5,
    title: "Very outstanding",
    comment:
      "I didn't know how effective the gel cream would be since I was skeptical of the texture, but my sensitive skin loved it and I didn't even break out when I first started using it. Love it!",
    images: ["uploaded:image_b1d9cd.png-5f663d2d-8d99-45a4-b64c-84dcd0025de4"],
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: 2,
    customerName: "Aileen R.",
    isVerified: true,
    date: "12/02/23",
    rating: 4,
    title: "Really light and not sticky.",
    comment:
      "Really light and not sticky. My skin soaked it right up! I mix it with the green tea products and it helps balance my combo skin.",
    images: [
      "uploaded:image_b1d9cd.png-5f663d2d-8d99-45a4-b64c-84dcd0025de4",
      "uploaded:image_b1d9cd.png-5f663d2d-8d99-45a4-b64c-84dcd0025de4",
    ],
    avatarInitial: "A",
  },
  {
    id: 3,
    customerName: "Cathy K.",
    isVerified: true,
    date: "02/02/23",
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

const ReviewStars: React.FC<{ rating: number }> = ({ rating }) => {
  const stars = Array(5)
    .fill(null)
    .map((_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${
          i < rating
            ? "text-pink-500 fill-pink-500"
            : "text-gray-300 fill-gray-300/50"
        }`}
      />
    ));
  return <div className="flex gap-0.5">{stars}</div>;
};

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
  const avatarColors = ["bg-gray-400", "bg-pink-400", "bg-blue-400"];
  const colorIndex = review.avatarInitial
    ? review.avatarInitial.charCodeAt(0) % avatarColors.length
    : 0;

  return (
    <div className="py-6 border-b border-gray-100 last:border-b-0">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
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
        <span className="text-xs text-gray-500 mt-1">{review.date}</span>
      </div>

      <div className="pl-14">
        <ReviewStars rating={review.rating} />
        <p className="font-semibold text-gray-900 mt-1 mb-1 text-sm">
          {review.title}
        </p>
        <p className="mt-1 text-gray-700 leading-relaxed text-sm whitespace-pre-line">
          {review.comment}
        </p>
        {review.images && review.images.length > 0 && (
          <div className="flex gap-3 mt-3">
            {review.images.map((imgSrc, index) => (
              <div
                key={index}
                className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200"
              >
                <img
                  src={imgSrc}
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
          {totalReviews} reviews
        </p>
        <div className="flex justify-center items-center flex-col">
          <div className="flex">{stars}</div>
        </div>
        <button className="mt-4 px-6 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-white transition-colors">
          Write a Review
        </button>
      </div>
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
  const [wishlist, setWishlist] = useState<boolean>(false);
  const [inCart, setInCart] = useState<boolean>(false);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loadingRelated, setLoadingRelated] = useState<boolean>(true);
  const BASE_URL: string = "http://localhost:8080";

  const getImageUrl = (path: string): string =>
    path.startsWith("http") ? path : `${BASE_URL}${path}`;

  const mainImageObj: ProductImage | undefined = product.productImages?.[0];
  const [mainImage, setMainImage] = useState<{ url: string; alt: string }>({
    url: mainImageObj ? getImageUrl(mainImageObj.productImage) : "",
    alt: product.name,
  });

  const price: number = parseFloat(product.price) || 0;
  const subtotal: number = price * quantity;

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.min(product.stock, Math.max(1, prev + delta)));
  };

  const formattedPrice: string = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

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

  // ===================== FETCH RELATED PRODUCTS =====================
  const fetchRelatedProducts = async () => {
    setLoadingRelated(true);
    try {
      const params: any = {};

      // Prioritize same category
      if (product.category?.id) {
        params.categoryId = product.category.id;
      }
      // Or same brand if no category
      else if (product.brand?.id) {
        params.brandId = product.brand.id;
      }

      const response = await getAllProducts(params);

      if (response.success && response.data) {
        // Filter out current product and limit to 6 items
        const filtered = response.data
          .filter((p: any) => p.id !== product.id)
          .slice(0, 6);

        setRelatedProducts(filtered);
      }
    } catch (error) {
      console.error("Failed to fetch related products:", error);
      setRelatedProducts([]);
    } finally {
      setLoadingRelated(false);
    }
  };

  // ===================== FETCH WISHLIST =====================
  const fetchWishlist = async () => {
    try {
      const response = await getWhiteList();
      if (response.success && response.data) {
        const isAdded = response.data.some(
          (item: any) => item.products.id === product.id
        );
        setWishlist(isAdded);
      }
    } catch (err: any) {
      console.error("Failed to fetch wishlist:", err);
    }
  };

  // ===================== FETCH CART =====================
  const fetchCart = async () => {
    try {
      const response = await getCart();
      if (response.success && response.data?.orderItems) {
        const isInCart = response.data.orderItems.some(
          (item: any) => item.productId === product.id
        );
        setInCart(isInCart);
      }
    } catch (err: any) {
      console.error("Failed to fetch cart:", err);
    }
  };

  useEffect(() => {
    fetchWishlist();
    fetchCart();
    fetchRelatedProducts();
  }, [product.id]);

  // ===================== HANDLERS =====================
  const handleAddToWishlist = async () => {
    try {
      const response = await addOrRemoveProductWhiteList(product.id);
      if (!response.success)
        throw new Error(response.message || "Failed to update wishlist");
      setWishlist((prev) => !prev);
      alert(
        response.message ||
          (wishlist ? "Removed from wishlist" : "Added to wishlist")
      );
    } catch (err: any) {
      console.error(err);
      alert("Please Login");
    }
  };

  const handleAddToBag = async () => {
    try {
      const payload = {
        productId: product.id,
        quantity: quantity,
      };
      const response = await addProductToCart(payload);
      if (!response.success)
        throw new Error(response.message || "Failed to add to cart");
      setInCart(true);
      alert(response.message || "Product added to bag!");
    } catch (err: any) {
      console.error(err);
      alert("Please Login");
    }
  };

  // ====================================================

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Breadcrumbs */}
      <nav className="text-sm mb-6 text-gray-500">
        <a href="/" className="hover:underline">
          Home
        </a>{" "}
        &gt; <span className="font-semibold">{product.name}</span>
      </nav>

      <div className="lg:grid lg:grid-cols-2 lg:gap-12">
        {/* Left Column */}
        <div className="flex flex-col gap-6">
          <div className="bg-gray-100 rounded-xs overflow-hidden border border-gray-100">
            <img
              src={mainImage.url}
              alt={mainImage.alt}
              className="w-full h-full object-cover aspect-square"
            />
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.productImages?.map((image, index) => (
              <div
                key={index}
                className={`w-20 h-20 flex-shrink-0 border-2 rounded-xs overflow-hidden cursor-pointer transition-colors p-0.5 ${
                  getImageUrl(image.productImage) === mainImage.url
                    ? "border-gray-800"
                    : "border-transparent hover:border-gray-300"
                }`}
                onClick={() =>
                  setMainImage({
                    url: getImageUrl(image.productImage),
                    alt: product.name,
                  })
                }
              >
                <img
                  src={getImageUrl(image.productImage)}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="mt-8 lg:mt-0 justify-center">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">
            {product.name}
          </h1>

          <p className="text-sm text-gray-500 mb-2">
            Brand:{" "}
            <span className="text-gray-900 font-medium">
              {product.brand?.brand || "Unknown"}
            </span>
          </p>

          <div className="flex items-center gap-4 mb-2">
            <RatingStars
              rating={
                product.ratingCount > 0
                  ? product.ratingSum / product.ratingCount
                  : 0
              }
              reviewCount={product.ratingCount}
            />
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

          <p className="text-sm text-gray-700 mt-4 mb-6">
            Subtotal for {quantity} item(s):{" "}
            <span className="font-semibold text-gray-900">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(subtotal)}
            </span>
          </p>

          <div className="flex gap-4">
            <button
              className={`flex-1 px-6 py-3 border rounded-xs font-medium transition-colors ${
                inCart
                  ? "bg-gray-400 text-white cursor-not-allowed border-gray-400"
                  : "bg-white text-black hover:bg-pink-500 border-gray-300"
              }`}
              disabled={inCart || product.stock === 0}
              onClick={handleAddToBag}
            >
              {inCart ? "Already in Bag" : "Add to Bag"}
            </button>

            <button
              className={`flex-1 px-6 py-3 border rounded-xs font-medium transition-colors ${
                wishlist
                  ? "bg-pink-500 text-white hover:bg-pink-600 border-pink-500"
                  : "bg-white text-gray-700 hover:bg-gray-50 border-gray-300"
              }`}
              onClick={handleAddToWishlist}
            >
              {wishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>

      {/* Description Section */}
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
          <section className="text-gray-600">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Description:
            </h3>
            <p className="leading-relaxed mb-4">{product.description}</p>
            <p className="font-semibold text-gray-800">
              Recommended for:{" "}
              <span className="font-normal">
                {product.recommendedFor || "N/A"}
              </span>
            </p>
          </section>

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

          <section>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Ingredients:
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {product.ingredients || "Ingredients not listed."}
            </p>
          </section>
        </div>
      </div>

      {/* Related Products */}
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
          {product.category && (
            <p className="text-sm text-gray-500 mt-1">
              More from {product.category.category}
            </p>
          )}
        </div>

        {loadingRelated ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-pink-500"></div>
          </div>
        ) : relatedProducts.length > 0 ? (
          <div className="flex mt-8 gap-4 overflow-x-auto scrollbar-hidden snap-x snap-mandatory pb-4">
            {relatedProducts.map((relatedProduct) => (
              <div className="min-w-[300px] max-w-[300px] sm:min-w-[350px] sm:max-w-[350px] snap-center">
                <ProductCard
                  key={`related-product-${relatedProduct.id}`}
                  productData={{
                    _id: relatedProduct.id.toString(),
                    name: relatedProduct.name,
                    price: Number(relatedProduct.price),
                    description: relatedProduct.description,
                    offerPrice: Number(relatedProduct.price),
                    rating: relatedProduct.ratingSum,
                    ratingCount: relatedProduct.ratingCount,
                    image:
                      relatedProduct.productImages &&
                      relatedProduct.productImages.length > 0
                        ? [relatedProduct.productImages[0].productImage]
                        : [""],
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No related products found
          </div>
        )}
      </div>

      {/* Customer Reviews */}
      <CustomerReviews
        reviews={mockReviews}
        totalReviews={mockReviews.length}
      />
    </div>
  );
};

export default ProductDetailPage;
