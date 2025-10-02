"use client";

interface Order {
  id: string;
  date: string;
  total: number;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
}

const mockOrders: Order[] = [
  { id: "ORD001", date: "2025-09-10", total: 49.99, status: "Delivered" },
  { id: "ORD002", date: "2025-09-12", total: 29.5, status: "Shipped" },
  { id: "ORD003", date: "2025-09-15", total: 99.99, status: "Pending" },
  { id: "ORD004", date: "2025-09-16", total: 19.99, status: "Cancelled" },
];

export default function MyOrders() {
  return (
    <div className="bg-white p-6 w-full">
      <h2 className="text-lg font-semibold mb-4">My Orders</h2>

      {mockOrders.length === 0 ? (
        <p className="text-gray-500">You have no orders yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
          {mockOrders.map((order) => (
            <div
              key={order.id}
              className="border border-[#E3E3E3] p-4 flex flex-col gap-2"
            >
              <div className="flex justify-between text-gray-700">
                <span>Order ID:</span>
                <span className="font-medium">{order.id}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Date:</span>
                <span className="font-medium">{order.date}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Total:</span>
                <span className="font-medium">${order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span
                  className={`font-medium ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Shipped"
                      ? "text-blue-600"
                      : order.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
