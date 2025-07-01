"use client";
import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import Headerslider from "@/components/HeaderSlider/Headerslider";
import Footer from "@/components/Footer/Footer";
import Category from "@/components/Categories/Category";
import Brand from "@/components/Brand/Brand";
import NewArrivals from "@/components/NewArrivals/NewArrivals";
import Trending from "@/components/Trand/Tranding";
import Spotlight from "@/components/Spotlight/Spotlight";
import Newsletter from "@/components/Newsletter/Newsletter";
import Bestseller from "@/components/Bestseller/Bestseller";
import Categories from "@/components/Categories/Category";
import Categorieslist from "@/components/Categorieslist/Categorieslist";
export default function Home() {
  return (
    <>
      <Headerslider />
      <Category />
      <Brand />
      <NewArrivals />
      <Bestseller />
      <Trending />
      <Spotlight />
      <Newsletter />
    </>
  );
}
