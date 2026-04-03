import { createContext, useContext, useEffect, useState } from "react";
import data from "../data/transactions.json";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Transactions
  const [transactions, setTransactions] = useState(() => {
    const stored = localStorage.getItem("transactions");
    return stored ? JSON.parse(stored) : data;
  });

  // Role
  const [role, setRole] = useState("viewer");

  // Theme State
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // Filters
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  // Save transactions
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  //  GLOBAL THEME CONTROL (MAIN FIX)
  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");

      // DARK COLORS
      root.style.setProperty("--bg", "#111827");
      root.style.setProperty("--card", "#1f2937");
      root.style.setProperty("--text", "#f9fafb");
      root.style.setProperty("--border", "#374151");
    } else {
      root.classList.remove("dark");

      // LIGHT COLORS
      root.style.setProperty("--bg", "#f9fafb");
      root.style.setProperty("--card", "#ffffff");
      root.style.setProperty("--text", "#111827");
      root.style.setProperty("--border", "#e5e7eb");
    }

    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const addTransaction = (tx) => {
    setTransactions((prev) => [...prev, tx]);
  };

  return (
    <AppContext.Provider
      value={{
        transactions,
        addTransaction,
        search,
        setSearch,
        filter,
        setFilter,
        darkMode,
        setDarkMode,
        role,
        setRole,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);