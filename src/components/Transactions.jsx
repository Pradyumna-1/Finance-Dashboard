    // import { useState } from "react";
    // import { useApp } from "../context/AppContext";
    // export default function Transactions() {
    // const { transactions, search, setSearch, filter, setFilter, role, addTransaction } = useApp();
    // const [form, setForm] = useState({ date:"", amount:"", category:"", type:"expense" });

    // const filtered = transactions
    //     .filter(t => t.category.toLowerCase().includes(search.toLowerCase()))
    //     .filter(t => filter === "all" ? true : t.type === filter);

    // const handleAdd = () => {
    //     if (!form.date || !form.amount || !form.category) return;
    //     addTransaction({ ...form, id: Date.now(), amount: Number(form.amount) });
    //     setForm({ date:"", amount:"", category:"", type:"expense" });
    // };
    // return (
    //     <div className="bg-white p-5 rounded-xl shadow">
    //     <h2 className="text-xl font-semibold mb-3">Transactions</h2>

    //     <div className="flex gap-2 mb-3">
    //         <input
    //         placeholder="Search category"
    //         value={search}
    //         onChange={e=>setSearch(e.target.value)}
    //         className="border p-2 rounded w-full"
    //         />

    //         <select onChange={e=>setFilter(e.target.value)} className="border p-2 rounded">
    //         <option value="all">All</option>
    //         <option value="income">Income</option>
    //         <option value="expense">Expense</option>
    //         </select>
    //     </div>

    //     {filtered.length === 0 && <p className="text-gray-500">No transactions found</p>}

    //     <table className="w-full text-left border rounded overflow-hidden">
    //         <thead className="bg-gray-100">
    //         <tr>
    //             <th className="p-2">Date</th>
    //             <th className="p-2">Amount</th>
    //             <th className="p-2">Category</th>
    //             <th className="p-2">Type</th>
    //         </tr>
    //         </thead>
    //         <tbody>
    //         {filtered.map(t => (
    //             <tr key={t.id} className="border-t hover:bg-gray-50">
    //             <td className="p-2">{t.date}</td>
    //             <td className="p-2">₹{t.amount}</td>
    //             <td className="p-2">{t.category}</td>
    //             <td className="p-2 capitalize">{t.type}</td>
    //             </tr>
    //         ))}
    //         </tbody>
    //     </table>

    //     {role === "admin" && (
    //         <div className="mt-5 space-y-2">
    //         <h3 className="font-semibold">Add Transaction</h3>
    //         <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} className="border p-2 w-full rounded" />
    //         <input type="number" placeholder="Amount" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} className="border p-2 w-full rounded" />
    //         <input placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="border p-2 w-full rounded" />
    //         <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} className="border p-2 w-full rounded">
    //             <option value="income">Income</option>
    //             <option value="expense">Expense</option>
    //         </select>
    //         <button onClick={handleAdd} className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-700">
    //             Add Transaction
    //         </button>
    //         </div>
    //     )}
    //     </div>
    // );
    // }



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

  // 🔹 Filter logic
  const filtered = transactions
    .filter((t) =>
      t.category.toLowerCase().includes(search.toLowerCase())
    )
    .filter((t) => (filter === "all" ? true : t.type === filter));

  // 🔹 Add Transaction with validation
const handleAdd = () => {
  if (!form.date || !form.amount || !form.category) return;

  const category = form.category.toLowerCase().trim();

  // 🚨 Prevent wrong data
  if (form.type === "expense" && category === "income") {
    alert("Invalid entry: 'income' cannot be an expense");
    return;
  }

  if (form.type === "income" && category === "expense") {
    alert("Invalid entry: 'expense' cannot be income");
    return;
  }

  // ✅ Add clean transaction
  addTransaction({
    ...form,
    id: Date.now(),
    amount: Number(form.amount),
    category: form.category.trim(),
  });

  // 🔄 Reset form
  setForm({
    date: "",
    amount: "",
    category: "",
    type: "expense",
  });
};
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4">Transactions</h2>

      {/* 🔍 Filters */}
      <div className="flex gap-3 mb-4">
        <input
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <select
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded focus:outline-none"
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* 📋 Table */}
      {filtered.length === 0 ? (
        <p className="text-gray-500">No transactions found</p>
      ) : (
  <table className="w-full text-sm table-fixed border border-gray-200 rounded-lg overflow-hidden">
  <thead className="bg-gray-50">
    <tr className="text-gray-600">
      <th className="py-3 w-1/4 text-left px-4 font-medium">Date</th>
      <th className="w-1/4 text-center px-4 font-medium">Amount</th>
      <th className="w-1/4 text-center px-4 font-medium">Category</th>
      <th className="w-1/4 text-center px-4 font-medium">Type</th>
    </tr>
  </thead>

  <tbody>
    {filtered.map((t, index) => (
      <tr
        key={t.id}
        className={`border-t transition ${
          index % 2 === 0 ? "bg-white" : "bg-gray-50"
        } hover:bg-blue-50`}
      >
        {/* Date */}
        <td className="py-3 px-4 text-left text-gray-700">
          {t.date}
        </td>

        {/* Amount */}
        <td
          className={`py-3 px-4 text-center font-semibold ${
            t.type === "income"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          ₹{t.amount.toLocaleString()}
        </td>

        {/* Category */}
        <td className="py-3 px-4 text-center text-gray-700 capitalize">
          {t.category}
        </td>

        {/* Type */}
        <td className="py-3 px-4 text-center">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              t.type === "income"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
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

      {/* ➕ Add Transaction */}
      {role === "admin" && (
        <div className="mt-6 space-y-3">
          <h3 className="font-medium text-gray-700">
            Add Transaction
          </h3>

          <input
            type="date"
            value={form.date}
            onChange={(e) =>
              setForm({ ...form, date: e.target.value })
            }
            className="border p-2 w-full rounded"
          />

          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
            className="border p-2 w-full rounded"
          />

          <input
            placeholder="Category (Food, Salary, etc)"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            className="border p-2 w-full rounded"
          />

          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
            className="border p-2 w-full rounded"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded w-full"
          >
            Add Transaction
          </button>
        </div>
      )}
    </div>
  );
}