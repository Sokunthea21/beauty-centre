"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { LuCalendarDays } from "react-icons/lu"; // Requires 'react-icons'
import type { LegendProps } from "recharts";

// Data remains the same as it's not a style change
const data = [
  { name: "Monday", online: 13500, offline: 12000 },
  { name: "Tuesday", online: 16500, offline: 11500 },
  { name: "Wednesday", online: 5800, offline: 21800 },
  { name: "Thursday", online: 15500, offline: 6000 },
  { name: "Friday", online: 12000, offline: 11000 },
  { name: "Saturday", online: 16200, offline: 13500 },
  { name: "Sunday", online: 20500, offline: 10800 },
];

// Custom tooltip content to format values
const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{
    color: string;
    name: string;
    value: number;
  }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      // Adjusted shadow and border color for a slightly cleaner look
      <div className="p-2 bg-white border border-gray-300 rounded-lg shadow-xl text-sm">
        <p className="font-semibold mb-1 text-gray-800">{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value.toLocaleString()} `}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Custom legend content to match image style
const CustomLegend = (props: LegendProps) => {
  const { payload } = props;
  return (
    <ul className="flex justify-center gap-x-6 mt-4 text-sm text-gray-500">
      {payload && payload.map((entry, index) => (
        <li key={`item-${index}`} className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full" // Smaller circle
            style={{ backgroundColor: entry.color }}
          ></span>
          {entry.value === "online" ? "Online" : "Offline"}
        </li>
      ))}
    </ul>
  );
};

export default function RevenueChart() {

  return (
    // Tighter shadow and slightly larger padding on container
    <div className="bg-white p-7 rounded-2xl border border-gray-500 mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Revenue</h3>
        {/* Adjusted button style: lighter pink, font-medium */}
        <button className="flex items-center gap-2 bg-pink-50 text-pink-500 py-2 px-3 rounded-xl text-sm font-medium">
          <LuCalendarDays className="h-4 w-4" />
          December 2025
          <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 0, left: -20, bottom: 5 }} // Moved left margin slightly to accommodate y-axis ticks
          barGap={6} // Slightly smaller gap between bars in a group
          barCategoryGap="15%" // Adjusted category gap
        >
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9ca3af", fontSize: 12 }} // Gray-400 for a lighter text color
            interval={0}
            className="capitalize"
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value / 1000}k`}
            tick={{ fill: "#9ca3af", fontSize: 12 }} // Gray-400 for a lighter text color
            domain={[0, 'auto']}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.03)' }} />
          <Legend content={<CustomLegend />} layout="horizontal" verticalAlign="bottom" align="center" />
          {/* Lighter pink/primary color for the smaller bar */}
          <Bar dataKey="offline" fill="#f6a5c1" radius={[6, 6, 0, 0]} /> 
          {/* Darker/more distinct pink for the dominant bar */}
          <Bar dataKey="online" fill="#EC4899" radius={[6, 6, 0, 0]} /> 
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}