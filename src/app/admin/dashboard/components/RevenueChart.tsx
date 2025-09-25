"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Mon", online: 100, offline: 80 },
  { name: "Tue", online: 120, offline: 90 },
  { name: "Wed", online: 200, offline: 50 },
  { name: "Thu", online: 140, offline: 100 },
  { name: "Fri", online: 80, offline: 60 },
  { name: "Sat", online: 160, offline: 110 },
  { name: "Sun", online: 180, offline: 120 },
];

export default function RevenueChart() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h3 className="text-lg font-semibold mb-4">Revenue</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="online" fill="#00C49F" />
          <Bar dataKey="offline" fill="#FF4081" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
