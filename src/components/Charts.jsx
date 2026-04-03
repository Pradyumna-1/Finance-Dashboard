import { useApp } from "../context/AppContext";
import { Line, Pie } from "react-chartjs-2";
import "chart.js/auto";

export default function Charts() {
  const { transactions, darkMode } = useApp();

  // 🔹 Sort transactions
  const sorted = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // 🔹 Balance Trend
  let balance = 0;
  const balanceData = sorted.map((t) => {
    balance += t.type === "income" ? t.amount : -t.amount;
    return balance;
  });

  const lineData = {
    labels: sorted.map((t) => t.date),
    datasets: [
      {
        label: "Balance",
        data: balanceData,
        borderColor: "#60a5fa",
        backgroundColor: "rgba(96,165,250,0.2)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#60a5fa",
      },
    ],
  };

  // 🔹 Expense Breakdown
  const categoryMap = {};

  sorted.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const pieData = {
    labels: Object.keys(categoryMap),
    datasets: [
      {
        data: Object.values(categoryMap),
        backgroundColor: [
          "#ef4444",
          "#22c55e",
          "#3b82f6",
          "#f59e0b",
          "#8b5cf6",
        ],
        borderWidth: 0,
      },
    ],
  };

  // 🔹 Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: darkMode ? "#ffffff" : "#111827",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? "#ffffff" : "#111827",
        },
        grid: { display: false },
      },
      y: {
        ticks: {
          color: darkMode ? "#ffffff" : "#111827",
        },
        grid: {
          color: darkMode
            ? "rgba(255,255,255,0.08)"
            : "#e5e7eb",
        },
      },
    },
  };

  return (
    <>
      {/* Line Chart */}
      <div className="p-8 rounded-xl shadow border border-[var(--border)] bg-[var(--card)] text-[var(--text)] h-80 transition">
        <h3 className="font-semibold mb-3">
          Balance Trend
        </h3>
        <Line data={lineData} options={options} className=" mt-3" />
      </div>

      {/* Pie Chart */}
      <div className="p-8 rounded-xl shadow border border-[var(--border)] bg-[var(--card)] text-[var(--text)] h-80 transition">
        <h3 className="font-semibold mb-3">
          Spending Breakdown
        </h3>

        {Object.keys(categoryMap).length === 0 ? (
          <p>No expense data</p>
        ) : (
          <Pie data={pieData} options={options}  className="mt-3"/>
        )}
      </div>
    </>
  );
}