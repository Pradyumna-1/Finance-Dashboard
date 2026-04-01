// import { useApp } from "../context/AppContext";

// export default function SummaryCards() {
//   const { transactions } = useApp();

//   const income = transactions.filter(t => t.type === "income").reduce((a,b)=>a+b.amount,0);
//   const expense = transactions.filter(t => t.type === "expense").reduce((a,b)=>a+b.amount,0);
//   const balance = income - expense;

//   return (
//     <div className="grid md:grid-cols-3 gap-4">
//       <Card title="Balance" value={balance} color="text-blue-600" />
//       <Card title="Income" value={income} color="text-green-600" />
//       <Card title="Expenses" value={expense} color="text-red-600" />
//     </div>
//   );
// }

// function Card({ title, value, color }) {
//   return (
//     <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
//       <p className="text-gray-500">{title}</p>
//       <h2 className={`text-2xl font-bold ${color}`}>₹{value}</h2>
//     </div>
//   );
// }

import { useApp } from "../context/AppContext";

export default function SummaryCards() {
  const { transactions } = useApp();

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Card title="Balance" value={balance} color="text-blue-600" />
      <Card title="Income" value={income} color="text-green-600" />
      <Card title="Expenses" value={expense} color="text-red-600" />
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <p className="text-gray-500">{title}</p>
      <h2 className={`text-xl font-bold ${color}`}>
        ₹{value.toLocaleString()}
      </h2>
    </div>
  );
}