import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@/app/assets/assets";
import { useAppContext } from "@/context/AppContext";
import { addProductToCart, getCart } from "@/api/cart.api";

type AppContextType = {
  currency: string;
  router: { push: (path: string) => void };
};

type ProductDataType = {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string[];
  offerPrice: number;
  rating?: number;
  ratingCount?: number;
};

type ProductCardProps = {
  productData: ProductDataType;
  isList?: boolean;
  isCompact?: boolean;
  gridCols?: "grid-2" | "grid-3" | "grid-4" | "list";
};

const ProductCard = ({
  productData,
  isList = false,
  isCompact = false,
  gridCols,
}: ProductCardProps) => {
  const { currency, router } = useAppContext() as AppContextType;

  const [inCart, setInCart] = useState(false);

  // Fetch cart and check if the product is already in the cart
  const fetchCartData = async () => {
    try {
      const response = await getCart();
      if (response.success && response.data?.orderItems) {
        const exists = response.data.orderItems.some(
          (item: any) => item.productId === productData._id
        );
        setInCart(exists);
      }
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [productData._id]);

  // Handle adding product to cart
  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (inCart) return;

    try {
      const payload = { productId: Number(productData._id), quantity: 1 };
      const response = await addProductToCart(payload);
      if (!response.success) throw new Error(response.message || "Failed to add to cart");

      setInCart(true);
      alert(response.message || "Product added to bag!");
    } catch (err: any) {
      console.error(err);
      alert("Please Login");
    }
  };

  const handleClick = () => {
    router.push("/product/" + productData._id);
    scrollTo(0, 0);
  };

  const baseStyle = `cursor-pointer bg-white hover:shadow-lg transition-all duration-200`;
  const listStyle = `flex max-w-full w-full gap-1`;
  const compactStyle = `flex flex-col items-start max-w-full w-full gap-3`;
  const gridStyle = `flex flex-col items-start gap-0.5 w-full ${
    gridCols === "grid-4" ? "max-w-[240px]" : "max-w-full"
  }`;

  return (
    <div
      onClick={handleClick}
      className={`${baseStyle} ${
        isList ? listStyle : isCompact ? compactStyle : gridStyle
      } shadow-sm`}
    >
      {/* Image */}
      <div
        className={`relative bg-gray-100 flex items-center justify-center ${
          isList
            ? "min-w-[200px] max-w-[200px] h-[200px]"
            : isCompact
            ? "w-full h-[300px]"
            : "w-full h-52"
        }`}
      >
        <Image
          src={`http://localhost:8080${productData.image[0]}`}
          alt={productData.name}
          className="object-cover w-full h-full"
          width={800}
          height={800}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-6 w-full pt-2">
        <p className="md:text-base font-medium w-full truncate">{productData.name}</p>
        <p className="text-xs mt-2 text-gray-500/70 max-sm:hidden truncate">
          {productData.description}
        </p>

        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Image
                key={index}
                className="h-3 w-3"
                src={index < Math.floor(productData.rating || 0) ? assets.star_icon : assets.star_dull_icon}
                alt="star_icon"
                width={12}
                height={12}
              />
            ))}
          </div>
          {typeof productData.rating === "number" && (
            <p className="text-sm text-gray-500/70 max-sm:hidden">
              {productData.rating} ({productData.ratingCount || 0} reviews)
            </p>
          )}
        </div>

        <p className="text-base mt-2 font-medium">
          {currency}${productData.price}
        </p>

        <div className={`w-full ${isList ? "max-w-[34%]" : ""} flex justify-center`}>
          <button
            onClick={handleAddToCart}
            disabled={inCart}
            className={`mt-2 w-full px-6 py-1.5 text-black border border-black text-xs transition ${
              inCart ? "bg-gray-300 cursor-not-allowed" : "hover:bg-black hover:text-white"
            }`}
          >
            {inCart ? "Added" : "Add to bag"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
