import SummaryCards from "../components/SummaryCards";
import Charts from "../components/Charts";
import Transactions from "../components/Transactions";
import Insights from "../components/Insights";
import RoleSwitcher from "../components/RoleSwitcher";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Finance Dashboard</h1>
        <RoleSwitcher />
      </div>

      {/* Summary */}
      <SummaryCards />

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <Charts />
      </div>

      {/* Transactions */}
      <Transactions />

      {/* Insights */}
      <Insights />
    </div>
  );
}