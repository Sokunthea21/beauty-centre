"use client";
import { useState, useCallback, useMemo } from "react";
import OrderSummary from "../../components/OrderSummary/component";
import PaymentOptions from "../../components/PaymentOptions/component";
import DeliveryOptions from "../../components/DeliveryOptions/component";
import SuccessModal from "@/components/SuccessModal/comment";
// Import the new modal component

// --- Delivery Option Type (if not already defined globally) ---
interface DeliveryOption {
  id: string;
  name: string;
  description: string;
  logo: string;
  fee: number;
}

const INITIAL_DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "5-7 business days",
    logo: "🚚",
    fee: 5.0,
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "1-2 business days",
    logo: "🚀",
    fee: 15.67,
  },
];

export default function PaymentPage() {
  // --- MOCK DATA/STATE ---

  const customer = {
    name: "Mao Sokunthea",
    phone: "+855 12380433",
    address: "Siem Reap Post Office, Pokambor Avenue, Siem Reap",
    email: "maosokunthea@example.com", // Added email for the modal
  };

  const [payment, setPayment] = useState<string | null>(null);
  const [selectedDelivery, setSelectedDelivery] =
    useState<DeliveryOption | null>(INITIAL_DELIVERY_OPTIONS[0]);

  // State to control the visibility of the success modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const subtotal = 15.67;
  const deliveryFee = selectedDelivery ? selectedDelivery.fee : 0;
  const total = useMemo(() => subtotal + deliveryFee, [subtotal, deliveryFee]);

  // --- HANDLERS ---

  const handleConfirmOrder = useCallback((): void => {
    // 1. Validation: Ensure a payment method is selected
    if (!payment) {
      alert("Please select a payment method before confirming.");
      return;
    }

    // 2. Validation: Ensure a delivery option is selected
    if (!selectedDelivery) {
      alert("Please select a delivery option to continue.");
      return;
    }

    // 3. Mock API Call & Payment Processing (If validation passes)
    console.log("Processing payment and finalizing order...");
    console.log(`Payment method: ${payment}`);
    console.log(`Selected Delivery:`, selectedDelivery);

    // 4. Show Success Modal
    setShowSuccessModal(true);
  }, [payment, selectedDelivery]);

  const handleCloseSuccessModal = useCallback(() => {
    setShowSuccessModal(false);
    // You might want to navigate home or to order history after closing
    // Example: router.push('/');
  }, []);

  const buttonLabel = "Confirm Payment";
  const handleProceedToPayment = () => {}; // Not used on this page, but here for completeness

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Left section */}
      <div className="md:col-span-2">
        <div className="text-gray-500 mb-4">
          {/* Linked Breadcrumbs */}
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
          <span className="font-semibold text-black">Payment Method</span>
        </div>

        {/* Customer Info (read-only) */}
        <div className="bg-white p-6 mb-6 border">
          <h2 className="font-semibold mb-4">CUSTOMER INFORMATION</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500 mb-2">Name</p>
              <div className="w-full border p-4">
                <p className="font-medium">{customer.name}</p>
              </div>
            </div>
            <div>
              <p className="text-gray-500 mb-2">Contact</p>
              <div className="w-full border p-4">
                <p className="font-medium">{customer.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Address (read-only) */}
        <div className="bg-white p-6 mb-6 border">
          <h2 className="font-semibold mb-4">DELIVERY ADDRESS</h2>
          <p className="text-sm">{customer.address}</p>
        </div>

        {/* Delivery Options */}

        <DeliveryOptions
          options={INITIAL_DELIVERY_OPTIONS} // Pass your list of options
          selectedDelivery={selectedDelivery ? selectedDelivery.id : null}
          onChange={(newId) => {
            const newDelivery =
              INITIAL_DELIVERY_OPTIONS.find((opt) => opt.id === newId) || null;
            setSelectedDelivery(newDelivery);
          }}
        />
        {/* Payment Options */}
        <PaymentOptions selectedPayment={payment} onChange={setPayment} />
      </div>

      {/* Right section */}
      <div className="mt-10">
        <OrderSummary
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          onCheckout={handleConfirmOrder}
          checkoutLabel={buttonLabel}
        />
      </div>

      {/* Render the Success Modal */}
      <SuccessModal
        isVisible={showSuccessModal}
        onClose={handleCloseSuccessModal}
        customerEmail={customer.email}
        // You would dynamically get this from your payment gateway response
        lastFourCardDigits="3947"
      />
    </div>
  );
}
