import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function Transactions() {
  const {
    transactions,
    search,
    setSearch,
    filter,
    setFilter,
    role,
    addTransaction,
  } = useApp();

  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    type: "expense",
  });

  // Filter
  const filtered = transactions
    .filter((t) =>
      t.category.toLowerCase().includes(search.toLowerCase())
    )
    .filter((t) => (filter === "all" ? true : t.type === filter));

  // Add transaction
  const handleAdd = () => {
    if (!form.date || !form.amount || !form.category) return;

    addTransaction({
      ...form,
      id: Date.now(),
      amount: Number(form.amount),
      category: form.category.trim(),
    });

    setForm({
      date: "",
      amount: "",
      category: "",
      type: "expense",
    });
  };

  return (
    <div className="p-5 rounded-xl shadow border border-[var(--border)] bg-[var(--card)] text-[var(--text)] transition">
      
      <h2 className="text-lg font-semibold mb-4">
        Transactions
      </h2>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <input
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-[var(--border)] p-2 rounded w-full bg-[var(--card)] text-[var(--text)]"
        />

        <select
          onChange={(e) => setFilter(e.target.value)}
          className="border border-[var(--border)] p-2 rounded bg-[var(--card)] text-[var(--text)]"
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/*Table */}
      {filtered.length === 0 ? (
        <p>No transactions found</p>
      ) : (
        <table className="w-full text-sm border border-[var(--border)] rounded-lg overflow-hidden">

          {/* Header */}
          <thead style={{ background: "var(--bg)" }}>
            <tr>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="text-center">Amount</th>
              <th className="text-center">Category</th>
              <th className="text-center">Type</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {filtered.map((t, index) => (
              <tr
                key={t.id}
                style={{
                  background:
                    index % 2 === 0
                      ? "var(--card)"
                      : "rgba(0,0,0,0.03)",
                }}
                className="border-t"
              >
                {/* Date */}
                <td className="py-3 px-4">{t.date}</td>

                {/* Amount */}
                <td
                  className={`text-center font-semibold ${
                    t.type === "income"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  ₹{t.amount.toLocaleString()}
                </td>

                {/* Category */}
                <td className="text-center capitalize">
                  {t.category}
                </td>

                {/* Type */}
                <td className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      t.type === "income"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {t.type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Add Transaction */}
      {role === "admin" && (
        <div className="mt-6 space-y-3">
          <h3>Add Transaction</h3>

          <input
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
            className="border border-[var(--border)] p-2 w-full rounded bg-[var(--card)] text-[var(--text)]"
          />

          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
            className="border border-[var(--border)] p-2 w-full rounded bg-[var(--card)] text-[var(--text)]"
          />

          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            className="border border-[var(--border)] p-2 w-full rounded bg-[var(--card)] text-[var(--text)]"
          />

          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
            className="border border-[var(--border)] p-2 w-full rounded bg-[var(--card)] text-[var(--text)]"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded w-full transition"
          >
            Add Transaction
          </button>
        </div>
      )}
    </div>
  );
}