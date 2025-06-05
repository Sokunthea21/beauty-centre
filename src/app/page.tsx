"use client";
import Image from "next/image";
import Navbar from "@/components/Nabar/Navbar";
import Headerslider from "@/components/HeaderSlider/Headerslider";
import Footer from "@/components/Footer/Footer";
import Category from "@/components/Categories/Category";
import Brand from "@/components/Brand/Brand";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32">
        <Headerslider />
        <Category />
        <Brand />
      </div>
      <Footer />
    </>
  );
}
