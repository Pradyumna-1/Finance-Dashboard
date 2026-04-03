import SummaryCards from "../components/SummaryCards";
import Charts from "../components/Charts";
import Transactions from "../components/Transactions";
import Insights from "../components/Insights";
import RoleSwitcher from "../components/RoleSwitcher";
import { useApp } from "../context/AppContext";

export default function Dashboard() {
  const { darkMode, setDarkMode } = useApp();

  return (
<div className="min-h-screen p-6 space-y-6 bg-[var(--bg)] text-[var(--text)] transition">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Finance Dashboard</h1>

        <div className="flex items-center gap-4">
          {/*  FIXED BUTTON */}
          <button
  onClick={() => setDarkMode(prev => !prev)}
  className="px-3 py-1 rounded border "
>
  {darkMode ? "Light Mode" : "Dark Mode"}
</button>

          <RoleSwitcher />
        </div>
      </div>

      {/* Summary */}
      <SummaryCards />

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Charts />
      </div>

      {/* Transactions */}
      <Transactions />

      {/* Insights */}
      <Insights />
    </div>
  );
}