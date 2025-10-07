interface OrderSummaryProps {
  subtotal: number;
  deliveryFee: number;
}

export default function OrderSummary({
  subtotal,
  deliveryFee,
}: OrderSummaryProps) {
  const total = (subtotal + deliveryFee).toFixed(2);

  return (
    <div className="border border-[#E3E3E3] p-8 bg-white">
      <h2 className="font-bold mb-4 border-b border-[#E3E3E3] pb-4">
        ORDER SUMMARY
      </h2>
      <div className="flex justify-between border-b border-[#E3E3E3] pb-4">
        <span>items:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between pt-4">
        <span>Subtotal:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Delivery Fee:</span>
        <span>${deliveryFee.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold border-t border-[#E3E3E3] pt-4 mt-2">
        <span>Total:</span>
        <span>${total}</span>
      </div>
      <div className="mt-6">
        <a href="/checkout">
          <button className="mt-4 w-full bg-[var(--primary)] text-white py-2 ">
            Proceed to Checkout
          </button>
        </a>
        <button className="mt-2 w-full border py-2 ">Cancel</button>
      </div>
    </div>
  );
}
