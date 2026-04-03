import { useApp } from "../context/AppContext";

export default function SummaryCards() {
  const { transactions } = useApp();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expenses;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <Card title="Balance" value={balance} color="blue" />
      <Card title="Income" value={income} color="green" />
      <Card title="Expenses" value={expenses} color="red" />
    </div>
  );
}

function Card({ title, value, color }) {
  const colorMap = {
    blue: "text-blue-500",
    green: "text-green-500",
    red: "text-red-500",
  };

  return (
<div className="p-5 rounded-xl shadow border border-[var(--border)] bg-[var(--card)] transition">

      <h3 className="text-sm text-gray-500 dark:text-gray-400 mb-1">
        {title}
      </h3>

      <p className={`text-xl font-bold ${colorMap[color]}`}>
        ₹{value.toLocaleString()}
      </p>
    </div>
  );
}