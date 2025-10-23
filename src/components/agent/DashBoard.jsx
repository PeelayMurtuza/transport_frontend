import React from "react";
import { motion } from "framer-motion";
import { FaTruckLoading, FaCheckCircle, FaWallet, FaPlus, FaTruck, FaClipboardList, FaMapMarkerAlt, FaChartLine, FaEnvelope } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const stats = [
    {
      title: "Active Loads",
      value: "12",
      color: "from-blue-500 to-indigo-600",
      icon: <FaTruckLoading size={28} />,
    },
    {
      title: "Completed Jobs",
      value: "35",
      color: "from-green-500 to-emerald-600",
      icon: <FaCheckCircle size={28} />,
    },
    {
      title: "Wallet Balance",
      value: "₹ 14,500",
      color: "from-yellow-400 to-orange-500",
      icon: <FaWallet size={28} />,
    },
  ];

  const chartData = [
    { day: "Mon", active: 5, completed: 2 },
    { day: "Tue", active: 8, completed: 5 },
    { day: "Wed", active: 6, completed: 7 },
    { day: "Thu", active: 10, completed: 8 },
    { day: "Fri", active: 12, completed: 9 },
    { day: "Sat", active: 9, completed: 10 },
    { day: "Sun", active: 7, completed: 12 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-8">
      <motion.div
        className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl p-8 space-y-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Agent Dashboard
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700"
          >
            <FaPlus /> Post New Load
          </motion.button>
        </div>

        {/* Top Stats Cards */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-6 shadow-lg hover:scale-105 transform transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-200 font-medium">Active Loads</p>
                <p className="text-3xl font-bold mt-2">12</p>
              </div>
              <FaTruck size={32} />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl p-6 shadow-lg hover:scale-105 transform transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-200 font-medium">Completed Jobs</p>
                <p className="text-3xl font-bold mt-2">35</p>
              </div>
              <FaClipboardList size={32} />
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl p-6 shadow-lg hover:scale-105 transform transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-200 font-medium">Wallet Balance</p>
                <p className="text-3xl font-bold mt-2">₹14,500</p>
              </div>
              <FaWallet size={32} />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-6 shadow-lg hover:scale-105 transform transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-200 font-medium">Upcoming Loads</p>
                <p className="text-3xl font-bold mt-2">5</p>
              </div>
              <FaMapMarkerAlt size={32} />
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <NavLink
            to="/agent/postload"
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transform transition font-semibold"
          >
            <FaPlus size={24} /> Post New Load
          </NavLink>
          <NavLink
            to="/agent/drivertracking"
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transform transition font-semibold"
          >
            <FaMapMarkerAlt size={24} /> Track Driver
          </NavLink>
          <NavLink
            to="/agent/reports"
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transform transition font-semibold"
          >
            <FaChartLine size={24} /> View Reports
          </NavLink>
          <NavLink
            to="/agent/communication"
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transform transition font-semibold"
          >
            <FaEnvelope size={24} /> Communication
          </NavLink>
        </motion.div>

        {/* Stats Section */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-2xl text-white shadow-lg bg-gradient-to-r ${stat.color}`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium opacity-90">{stat.title}</h3>
                  <p className="text-4xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className="p-3 bg-white/20 rounded-full">{stat.icon}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="bg-white p-6 rounded-2xl shadow-lg mt-8">
          <h2 className="text-xl font-semibold mb-4">Weekly Load Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="active" stroke="#3b82f6" strokeWidth={3} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={3} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Overview */}
        <div className="grid md:grid-cols-2 gap-8 mt-10">
          {/* Recent Activity */}
          <motion.div
            className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white p-6 rounded-2xl shadow-lg"
            whileHover={{ scale: 1.03 }}
          >
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <ul className="space-y-3">
              <li className="bg-white/20 px-4 py-2 rounded-lg flex justify-between">
                <span>Load posted: Mumbai → Delhi</span>
                <span>2 hrs ago</span>
              </li>
              <li className="bg-white/20 px-4 py-2 rounded-lg flex justify-between">
                <span>Job completed: Pune → Surat</span>
                <span>5 hrs ago</span>
              </li>
              <li className="bg-white/20 px-4 py-2 rounded-lg flex justify-between">
                <span>Wallet credited ₹2,000</span>
                <span>1 day ago</span>
              </li>
            </ul>
          </motion.div>

          {/* Upcoming Loads */}
          <motion.div
            className="bg-gradient-to-br from-orange-400 to-red-500 text-white p-6 rounded-2xl shadow-lg"
            whileHover={{ scale: 1.03 }}
          >
            <h2 className="text-xl font-semibold mb-4">Upcoming Loads</h2>
            <ul className="space-y-3">
              <li className="bg-white/20 px-4 py-2 rounded-lg flex justify-between">
                <span>Chennai → Hyderabad</span>
                <span>Tomorrow</span>
              </li>
              <li className="bg-white/20 px-4 py-2 rounded-lg flex justify-between">
                <span>Bangalore → Kochi</span>
                <span>25 Oct</span>
              </li>
              <li className="bg-white/20 px-4 py-2 rounded-lg flex justify-between">
                <span>Ahmedabad → Jaipur</span>
                <span>27 Oct</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
