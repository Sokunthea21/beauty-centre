"use client";
import Headerslider from "@/components/HeaderSlider/component";
import Category from "@/components/Categories/component";
import Brand from "@/components/Brand/component";
import NewArrivals from "@/components/NewArrivals/component";
import Trending from "@/components/Trand/component";
import Spotlight from "@/components/Spotlight/component";
import Newsletter from "@/components/Newsletter/component";
import Bestseller from "@/components/Bestseller/components";
// import Categorieslist from "@/components/Categorieslist/Categorieslist";
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
