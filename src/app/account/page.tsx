"use client";

import { useState } from "react";
import Sidebar from "@/components/account/Sidebar";
import ProfileForm from "@/components/account/ProfileForm";
import DeliveryAddress from "@/components/account/DeliveryAddress";
import MyOrders from "@/components/account/MyOrders";
import MyWishlist from "@/components/account/MyWishlist";
import ChangePassword from "@/components/account/ChangePassword";

export default function AccountPage() {
  const [selected, setSelected] = useState("profile");

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      <Sidebar selected={selected} onSelect={setSelected} />

      <div className="flex-1">
        {selected === "profile" && <ProfileForm />}
        {selected === "address" && <DeliveryAddress />}
        {selected === "orders" && <MyOrders />}
        {selected === "wishlist" && <MyWishlist />}
        {selected === "password" && <ChangePassword />}
      </div>
    </div>
  );
}
