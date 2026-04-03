# 📊 Finance Dashboard
 
A modern, responsive Finance Dashboard built using **React**, **Tailwind CSS**, and **Chart.js** to track income, expenses, and overall financial health with interactive visualizations.
 
---
 
## 🚀 Overview
 
This application allows users to:
 
- Monitor financial balance
- Visualize spending trends
- Manage transactions
- Switch between Light & Dark themes
- Experience a clean, responsive UI
 
---
 
## ✨ Features
 
### ✅ Core Features
 
- **📈 Balance Trend (Line Chart)** — Displays running balance over time
- **🥧 Spending Breakdown (Pie Chart)** — Category-wise expense distribution
- **💰 Summary Cards** — Total Balance, Total Income, Total Expenses
- **📋 Transactions Table** — Search by category, Filter by All / Income / Expense
 
---
 
## 🔐 Role-Based Access
 
| Role | Permissions |
|------|-------------|
| **Viewer** | Can view all data |
| **Admin** | Can view all data + add new transactions |
 
### ➕ Admin Features
 
Admins can add new transactions with:
- Date
- Amount
- Category
- Type (Income / Expense)
 
---
 
## 🌙 UI Enhancements
 
- **🌗 Dark / Light Mode Toggle** — Implemented using global theme variables with 🌙 / ☀️ icons
- **💾 Local Storage Persistence** — Transactions and theme are saved across sessions
- **📱 Fully Responsive Design** — Works on mobile, tablet, and desktop
- **🎨 Clean UI** with consistent spacing and layout
- **⚡ Smooth transitions** and hover effects
 
---
 
## 🛠️ Tech Stack
 
| Technology | Purpose |
|---|---|
| React.js | Frontend framework |
| Tailwind CSS | Styling |
| Chart.js | Charts & visualizations |
| React-Chartjs-2 | Chart integration |
| LocalStorage | Data persistence |
 
---
 
## 📂 Project Structure
 
```
src/
├── components/
│   ├── Charts.jsx
│   ├── SummaryCards.jsx
│   ├── Transactions.jsx
│   ├── Insights.jsx
│   └── RoleSwitcher.jsx
│
├── context/
│   └── AppContext.jsx
│
├── data/
│   └── transactions.json
│
├── pages/
│   └── Dashboard.jsx
│
├── App.jsx
└── main.jsx
```
 
---
 
## ⚙️ Setup Instructions
 
```bash
# Clone the repository
git clone <your-repo-link>
 
# Navigate into project folder
cd finance-dashboard
 
# Install dependencies
npm install
 
# Start development server
npm run dev
```
 
---
 
## 📊 Sample Data Format
 
```json
{
  "id": 1,
  "date": "2026-03-01",
  "amount": 5000,
  "category": "Salary",
  "type": "income"
}
```
 
---
 
## 🧠 Key Functional Logic
 
### 🔹 Balance Calculation
 
```
Balance = Total Income - Total Expenses
```
 
### 🔹 Chart Logic
 
- **Line Chart** — Shows cumulative balance over time
- **Pie Chart** — Includes only valid expense categories; filters out incorrect data (e.g., income inside expenses)
 
### 🔹 Filtering
 
- **Search** — Filters by category name
- **Dropdown** — Filters by transaction type
 
### 🔹 Theme System
 
Implemented using Tailwind `darkMode: "class"` and global CSS variables (`--bg`, `--card`, `--text`, `--border`).
 
Applies to: Cards · Tables · Inputs · Charts
 
---
 
## 🎯 Improvements & Fixes Done
 
- Fixed incorrect balance calculation issues
- Prevented invalid category mapping
- Implemented global theme system (light/dark)
- Removed hardcoded styling for better consistency
- Improved spacing and alignment
- Made UI responsive and clean
 
---
 
## 📌 Future Enhancements
 
-  Export transactions (CSV / JSON)
-  API integration (backend support)
-  Date range filtering
-  Authentication system
-  Dashboard analytics improvements
 
---
 
## 👨‍💻 Author
 
**Pradyumna Kumar Naik**
 
---
 
## 📄 License
 
This project is created for assignment/demo purposes.
