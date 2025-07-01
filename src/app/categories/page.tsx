"use client";
import Layout from "../../components/Layout";
import CategorySidebar from "../../components/CategorySidebar/page";
import BrandFilter from "../../components/BrandFilter/page";
import Filters from "../../components/Filters/page";
import ProductGrid from "../../components/ProductGrid";

export default function Home() {
  return (
    <Layout title="Sunscreen">
      <div className=" container flex">
        <div className="sticky top-6 h-fit w-[19%] mr-5 space-y-6 bg-white z-10">
          <CategorySidebar />
          <BrandFilter />
          <Filters />
        </div>
        <div className="w-[80%]">
          <ProductGrid />
        </div>
      </div>
    </Layout>
  );
}
