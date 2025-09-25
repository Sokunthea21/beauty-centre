import StatsCard from "./components/StatsCard";
import RevenueChart from "./components/RevenueChart";
import RevenueOrderTable from "./components/RevenueOrderTable";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard title="Revenue" value="78,6489" change="+10%" />
        <StatsCard title="Orders" value="65,2377" change="-10%" />
        <StatsCard title="Customers" value="50,3467" change="+10%" />
        <StatsCard title="Products" value="78,6489" change="+10%" />
      </div>

      {/* Chart */}
      <RevenueChart />

      {/* Orders Table */}
      <RevenueOrderTable />
    </div>
  );
}
