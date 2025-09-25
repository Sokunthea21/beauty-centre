const orders = [
  { id: "123456", product: "Analog Table Clock", date: "24/09/2025", price: "$15.00", method: "Cash", status: "Delivered" },
  { id: "123457", product: "Analog Table Clock", date: "24/09/2025", price: "$15.00", method: "Cash", status: "Processing" },
  // ...repeat
];

export default function RevenueOrderTable() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="text-lg font-semibold mb-4">Revenue Order</h3>
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b">
            <th className="p-2">Order ID</th>
            <th className="p-2">Product</th>
            <th className="p-2">Date</th>
            <th className="p-2">Price</th>
            <th className="p-2">Method</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="p-2">{order.id}</td>
              <td className="p-2">{order.product}</td>
              <td className="p-2">{order.date}</td>
              <td className="p-2">{order.price}</td>
              <td className="p-2">{order.method}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
