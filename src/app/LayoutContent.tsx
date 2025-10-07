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
  const isAuthRoute =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/signup");

  const hideLayout = isAdminRoute || isAuthRoute;

  return (
    <>
      {!hideLayout && <Navbar />}
      <MotionWrapper>{children}</MotionWrapper>
      {!hideLayout && <Footer />}
    </>
  );
}
