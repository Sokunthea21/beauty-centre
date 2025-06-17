import React from "react";
import Image from "next/image";
import { assets } from "@/app/assets/assets";
import { useAppContext } from "@/context/AppContext";

type AppContextType = {
  currency: string;
  router: { push: (path: string) => void };
};

type ProductDataType = {
  _id: string;
  name: string;
  price: number;
  // Assuming the productData has these fields, adjust as necessary
  description: string;
  image: string[];
  offerPrice: number;
  // Add other fields as needed
};

type ProductCardProps = {
  productData: ProductDataType;
};

const ProductCard = ({ productData }: ProductCardProps) => {
  const { currency, router } = useAppContext() as AppContextType;

  return (
    <div
      onClick={() => {
        router.push("/product/" + productData._id);
        scrollTo(0, 0);
      }}
      className="flex flex-col items-start gap-0.5 max-w-[240px] w-full cursor-pointer bg-white hover:shadow-lg transition-all duration-200"
    >
      <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center">
        <Image
          src={productData.image[0]}
          alt={productData.name}
          className=" object-cover w-4/5 h-4/5 md:w-full md:h-full"
          width={800}
          height={800}
        />
        <button className="absolute top-2 right-2 p-2">
          <svg
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.371865 8.59832C-0.701135 5.24832 0.552865 1.41932 4.06987 0.286322C5.91987 -0.310678 7.96187 0.0413219 9.49987 1.19832C10.9549 0.0733218 13.0719 -0.306678 14.9199 0.286322C18.4369 1.41932 19.6989 5.24832 18.6269 8.59832C16.9569 13.9083 9.49987 17.9983 9.49987 17.9983C9.49987 17.9983 2.09787 13.9703 0.371865 8.59832Z"
              fill="#B0A6BD"
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-col items-start justify-between w-full p-4 pt-1">
        <p className="md:text-base font-medium pt-2 w-full truncate">
          {productData.name}
        </p>

        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Image
                key={index}
                className="h-3 w-3"
                src={
                  index < Math.floor(4.5)
                    ? assets.star_icon
                    : assets.star_dull_icon
                }
                alt="star_icon"
                width={12}
                height={12}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500/70 max-sm:hidden">
            {productData.price}
          </p>
        </div>
        <p className="w-full text-xs mt-2 text-gray-500/70 max-sm:hidden truncate">
          {productData.description}
        </p>
        <p className="text-base mt-2 font-medium">
          {currency}
          {productData.price}
        </p>

        <div className="flex items-end justify-between w-full mt-6">
          <button className="max-sm:hidden px-19 py-1.5 text-black hover:text-white border border-black rounded-sm text-xs hover:bg-black transition">
            Add to bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
