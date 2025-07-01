"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CircleGauge, Package, ShoppingCart, Users } from "lucide-react";

const data = [
  { name: "Week one", store: 10, online: 20 },
  { name: "Week two", store: 70, online: 40 },
  { name: "Week three", store: 40, online: 50 },
  { name: "Week four", store: 100, online: 60 },
];

const Dashboard = () => {
  const [month, setMonth] = useState("December 2025");

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">
      <aside className="w-60 bg-[var(--primary)] text-white p-4">
        <h1 className="text-3xl font-bold mb-6">LAMA</h1>
        <nav className="flex flex-col gap-4">
          <button className="bg-white text-black rounded-lg px-4 py-2">
            Home
          </button>
          <button>Orders</button>
          <button>Product</button>
          <button>Category</button>
          <button>Brand</button>
          <button>Customer</button>
          <button>Setting</button>
        </nav>
        <button className="mt-auto text-sm mt-20">Logout</button>
      </aside>
      <main className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Welcome back 👋</h2>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search"
              className="px-3 py-1 rounded-lg border"
            />
            <span className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
              EM
            </span>
          </div>
        </header>

        <section className="grid grid-cols-4 gap-4 mb-6">
          <Card
            icon={<CircleGauge />}
            label="Revenue"
            value="$50k"
            change="+16%"
          />
          <Card
            icon={<ShoppingCart />}
            label="Orders"
            value="2k"
            change="+16%"
          />
          <Card icon={<Users />} label="Customers" value="5k" change="-16%" />
          <Card icon={<Package />} label="Products" value="2k" change="+16%" />
        </section>

        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 bg-white rounded-xl p-4">
            <div className="flex justify-between mb-4">
              <h3 className="text-lg font-bold">Revenue</h3>
              <select
                className="border px-2 py-1 rounded"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                <option>December 2025</option>
                <option>November 2025</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="store" fill="#000" />
                <Bar dataKey="online" fill="#aaa" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl p-4">
            <h3 className="text-lg font-bold mb-2">Target</h3>
            <div className="flex items-center justify-center mb-2">
              <svg className="w-24 h-24" viewBox="0 0 36 36">
                <path
                  fill="none"
                  stroke="#ccc"
                  strokeWidth="4"
                  d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  fill="none"
                  stroke="#000"
                  strokeWidth="4"
                  strokeDasharray="60, 100"
                  d="M18 2.0845
                     a 15.9155 15.9155 0 0 1 0 31.831
                     a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
            </div>
            <p className="text-center font-bold">$20K / $30K</p>
            <ul className="text-sm mt-2">
              <li>● Store achievement 10K</li>
              <li>● Online achievement 10K</li>
              <li>● Target 10K</li>
            </ul>
          </div>
        </div>

        <section className="mt-6">
          <h3 className="text-lg font-bold mb-2">Recent Orders</h3>
          <div className="bg-white rounded-xl overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-black text-white">
                <tr>
                  <th className="px-4 py-2">Order ID</th>
                  <th className="px-4 py-2">Products</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Method</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {/* Example row */}
                <tr className="border-t">
                  <td className="px-4 py-2">#12345</td>
                  <td className="px-4 py-2">Product A</td>
                  <td className="px-4 py-2">2025-12-15</td>
                  <td className="px-4 py-2">$150</td>
                  <td className="px-4 py-2">Credit Card</td>
                  <td className="px-4 py-2">Shipped</td>
                  <td className="px-4 py-2">View</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

const Card = ({
  icon,
  label,
  value,
  change,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
}) => (
  <div className="bg-white rounded-xl p-4 shadow flex items-center gap-4">
    <div className="text-black bg-gray-100 rounded-full p-2">{icon}</div>
    <div>
      <div className="text-lg font-bold">{value}</div>
      <div className="text-sm text-gray-600">
        {label}{" "}
        <span
          className={change.startsWith("-") ? "text-red-500" : "text-green-500"}
        >
          {change}
        </span>
      </div>
    </div>
  </div>
);

export default Dashboard;
