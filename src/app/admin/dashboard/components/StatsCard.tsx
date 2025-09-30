import React from "react";

interface Props {
  title: string;
  value: string;
  change: string;
  /** The icon component to display, e.g., an SVG or a component from an icon library. */
  icon: React.ReactNode;
}

export default function StatsCard({ title, value, change, icon }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-500 ">
      {/* Changed 'gap-36' to 'justify-between' for proper spacing */}
      <div className="flex items-center justify-between">
        <h3 className="text-gray-500 text-sm mb-2">{title}</h3>
        {/* Render the icon passed in as a prop */}
        <div>{icon}</div>
      </div>
      <p className="text-2xl font-semibold">{value}</p>
      <p
        className={`text-sm ${
          change.startsWith("+") ? "text-green-500" : "text-red-500"
        }`}
      >
        {change} from last month
      </p>
    </div>
  );
}
