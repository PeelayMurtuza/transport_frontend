import React from "react";
import { motion } from "framer-motion";
import { FaChartBar } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Reports = () => {
  const data = [
    { day: "Mon", jobs: 2, commission: 500 },
    { day: "Tue", jobs: 5, commission: 1200 },
    { day: "Wed", jobs: 3, commission: 800 },
    { day: "Thu", jobs: 6, commission: 1500 },
    { day: "Fri", jobs: 4, commission: 1000 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <motion.div
        className="max-w-6xl mx-auto bg-white p-8 rounded-3xl shadow-2xl space-y-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FaChartBar /> Reports
        </h2>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="jobs" fill="#3b82f6" />
              <Bar dataKey="commission" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-blue-100 p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold">Total Jobs</h3>
            <p className="text-3xl font-bold text-blue-700">20</p>
          </div>
          <div className="bg-green-100 p-6 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold">Total Commission Paid</h3>
            <p className="text-3xl font-bold text-green-700">₹ 5,000</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Reports;
