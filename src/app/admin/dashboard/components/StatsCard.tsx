interface Props {
  title: string;
  value: string;
  change: string;
}

export default function StatsCard({ title, value, change }: Props) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <h3 className="text-gray-500 text-sm">{title}</h3>
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
