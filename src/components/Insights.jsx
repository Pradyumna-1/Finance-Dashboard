import { useApp } from "../context/AppContext";

export default function Insights() {
  const { transactions } = useApp();

  const categorySpend = {};

  transactions.forEach((t) => {
    if (
      t.type === "expense" &&
      t.category.toLowerCase() !== "income"
    ) {
      categorySpend[t.category] =
        (categorySpend[t.category] || 0) + t.amount;
    }
  });

  const highest = Object.entries(categorySpend).sort(
    (a, b) => b[1] - a[1]
  )[0];

  return (
<div className="bg-[var(--card)] border border-[var(--border)] p-5 rounded-xl shadow">      <h2 className="text-lg font-semibold">Insights</h2>

      {highest ? (
        <p className="mt-2">
          Highest spending: <b>{highest[0]}</b> (₹
          {highest[1].toLocaleString()})
        </p>
      ) : (
        <p className="text-gray-500">No insights available</p>
      )}
    </div>
  );
}