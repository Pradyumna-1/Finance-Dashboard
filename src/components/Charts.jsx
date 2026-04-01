import { useApp } from "../context/AppContext";
import { Line, Pie } from "react-chartjs-2";
import "chart.js/auto";

export default function Charts() {
  const { transactions } = useApp();

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
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // 🔹 FIXED: Only valid expenses
  const categoryMap = {};

  sorted.forEach((t) => {
    if (
      t.type === "expense" &&
      t.category.toLowerCase() !== "income"
    ) {
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
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
    },
  };

  return (
    <>
      <div className="bg-white p-5 rounded-xl shadow h-80">
        <h3 className="font-semibold mb-2">Balance Trend</h3>
        <Line data={lineData} options={options} />
      </div>

      <div className="bg-white p-5 rounded-xl shadow h-80">
        <h3 className="font-semibold mb-2">Spending Breakdown</h3>

        {Object.keys(categoryMap).length === 0 ? (
          <p className="text-gray-500">No expense data</p>
        ) : (
          <Pie data={pieData} options={options} />
        )}
      </div>
    </>
  );
}