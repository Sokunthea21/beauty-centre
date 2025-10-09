"use client";
import { useState } from "react";
import OrderSummary from "../../components/OrderSummary/component";
import CustomerInfo from "../../components/CustomerInfo/component";
import DeliveryAddress from "../../components/DeliveryAddress/component";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  // const [payment, setPayment] = useState<string | null>(null);

  const subtotal = 15.67;
  const deliveryFee = 15.67;

  const handleCheckout = () => {
    // Implement checkout logic here
    console.log("Proceeding to checkout...");
    router.push("/Payment");
  };
  const currentStep = 1;
  const buttonLabel =
    currentStep === 1
      ? "Proceed to Payment" // For the initial info step
      : "Confirm Payment"; // For the final payment step
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left section */}
      <div className="md:col-span-2">
        <div className="text-gray-500 mb-4">
          {/* Home and Cart should navigate externally */}
          <a href="/" className="hover:text-black">
            Home
          </a>{" "}
          &gt;
          <a href="/cart" className="hover:text-black">
            Your cart
          </a>{" "}
          &gt;
          <a href="/checkout" className="hover:text-black">
            Check out
          </a>{" "}
          &gt;
        </div>

        <CustomerInfo
          name={name}
          phone={phone}
          onNameChange={setName}
          onPhoneChange={setPhone}
        />

        <DeliveryAddress address={address} onAddressChange={setAddress} />
      </div>

      {/* Right section */}
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
