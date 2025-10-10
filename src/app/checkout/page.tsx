"use client";
import { useState, useEffect } from "react";
import OrderSummary from "../../components/OrderSummary/component";
import CustomerInfo from "../../components/CustomerInfo/component";
import DeliveryAddress from "../../components/DeliveryAddress/component";
import { useRouter } from "next/navigation";
import { getCart, checkOut } from "@/api/cart.api";
import { Product } from "@/types";

export default function CheckoutPage() {
  const router = useRouter();

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState(11.5564); // default lat for map
  const [longitude, setLongitude] = useState(104.9282); // default lng
  const [comment, setComment] = useState("");

  // Cart states
  const [products, setProducts] = useState<Product[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [orderId, setOrderId] = useState<number>(0);

  // Fetch cart data
  const fetchCartData = async () => {
    try {
      const response = await getCart();
      if (response.success && response.data) {
        const cartData = response.data;

        setOrderId(cartData.id);
        setComment(cartData.comment || "");
        setDeliveryFee(Number(cartData.deliveryFee) || 0);

        // Fill in name and contact
        if (cartData.pickerName) setName(cartData.pickerName);
        if (cartData.pickerContact) setPhone(cartData.pickerContact);

        // Fill in address
        if (cartData.deliveryAddress) setAddress(cartData.deliveryAddress);

        // Map orderItems to Product[]
        const fetchedProducts: Product[] = cartData.orderItems.map((item: any) => ({
          id: item.product.id,
          name: item.product.name,
          image: "", // Add product image if available
          price: Number(item.product.price),
          quantity: Number(item.quantity),
        }));

        setProducts(fetchedProducts);
        setSubtotal(
          fetchedProducts.reduce((acc, item: any) => acc + item.price * item.quantity, 0)
        );
      }
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  // Handle map/address changes
  const handleAddressChange = (lat: number, lng: number, addr: string) => {
    setLatitude(lat);
    setLongitude(lng);
    setAddress(addr);
  };

  // Checkout button
  const handleCheckout = async () => {
    if (!address) {
      alert("Please select a delivery address.");
      return;
    }

    try {
      const payload = {
        orderId,
        pickerName: name,
        pickerContact: phone,
        deliveryAddress: address,
        subTotal: subtotal,
        latitude: latitude.toString(), // number
        longitude: longitude.toString(), // number
      };

      const response = await checkOut(payload);
      if (response.success) {
        console.log("Checkout success:", response);
        router.push("/Payment");
      } else {
        alert(response.message || "Checkout failed");
      }
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong");
    }
  };

  const currentStep = 1;
  const buttonLabel = currentStep === 1 ? "Proceed to Payment" : "Confirm Payment";

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <div className="text-gray-500 mb-4">
          <a href="/" className="hover:text-black">Home</a> &gt;
          <a href="/cart" className="hover:text-black">Your cart</a> &gt;
          <a href="/checkout" className="hover:text-black">Check out</a> &gt;
        </div>

        <CustomerInfo
          name={name}
          phone={phone}
          onNameChange={setName}
          onPhoneChange={setPhone}
        />

        <DeliveryAddress
          address={address}
          latitude={latitude}
          longitude={longitude}
          onAddressChange={handleAddressChange}
        />
      </div>

      <div className="mt-10">
        <OrderSummary
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          onCheckout={handleCheckout}
          checkoutLabel={buttonLabel}
        />
      </div>
    </div>
  );
}
