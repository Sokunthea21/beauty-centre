"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar/component";
import Footer from "@/components/Footer/component";
import MotionWrapper from "../components/MotionWrapper";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <MotionWrapper>{children}</MotionWrapper>
      {!isAdminRoute && <Footer />}
    </>
  );
}
