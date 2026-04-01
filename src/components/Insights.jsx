import { useApp } from "../context/AppContext.jsx";
export default function Insights() {
  const { transactions } = useApp();

  const categorySpend = {};
  transactions.forEach(t => {
    if(t.type === "expense"){
      categorySpend[t.category] = (categorySpend[t.category] || 0) + t.amount;
    }
  });

  const highest = Object.entries(categorySpend).sort((a,b)=>b[1]-a[1])[0];

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold">Insights</h2>
      {highest ? (
        <p>Highest spending: {highest[0]} (₹{highest[1]})</p>
      ) : (
        <p>No insights available</p>
      )}
    </div>
  );
}