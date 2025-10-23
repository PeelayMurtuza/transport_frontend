import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaWallet, FaPlus, FaHistory } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const Wallet = () => {
  const [balance, setBalance] = useState(14500);
  const [transactions, setTransactions] = useState([
    { id: 1, type: "Credit", amount: 2000, date: "2025-10-22" },
    { id: 2, type: "Debit", amount: 500, date: "2025-10-21" },
    { id: 3, type: "Credit", amount: 1000, date: "2025-10-20" },
  ]);

  const pieData = [
    { name: "Used", value: 5000 },
    { name: "Available", value: balance },
  ];
  const COLORS = ["#f87171", "#34d399"];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <motion.div
        className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-2xl space-y-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <FaWallet /> Wallet
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-xl shadow-lg hover:bg-green-700"
          >
            <FaPlus /> Add Money
          </motion.button>
        </div>

        {/* Balance Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-r from-green-400 to-teal-500 p-6 rounded-2xl text-white shadow-lg flex justify-between items-center"
        >
          <div>
            <p className="text-lg opacity-90">Available Balance</p>
            <p className="text-3xl font-bold">₹ {balance}</p>
          </div>
        </motion.div>

        {/* Chart */}
        <div className="h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Transactions */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FaHistory /> Transaction History
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3">Type</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr
                    key={txn.id}
                    className="border-b hover:bg-gray-50 transition duration-150"
                  >
                    <td className="p-3">{txn.type}</td>
                    <td className="p-3">₹ {txn.amount}</td>
                    <td className="p-3">{txn.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Wallet;
