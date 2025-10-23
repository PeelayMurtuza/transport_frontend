import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import { FaTruck, FaWallet, FaChartLine, FaEnvelope, FaPlus, FaMapMarkerAlt, FaClipboardList } from "react-icons/fa";
import { motion } from "framer-motion";

import DashBoard from "./DashBoard";
import MyLoad from "./MyLoad";
import PostLoad from "./PostLoad";
import AfterPosting from "./AfterPosting";
import Wallet from "./Wallet";
import DriverTracking from "./DriverTracking";
import Reports from "./Reports";
import Communication from "./Communication";

const AgentHome = () => {
  const links = [
    { name: "Dashboard", path: "dashboard", icon: <FaChartLine /> },
    { name: "My Load", path: "myload", icon: <FaClipboardList /> },
    { name: "Post Load", path: "postload", icon: <FaPlus /> },
    { name: "After Posting", path: "afterposting", icon: <FaTruck /> },
    { name: "Wallet", path: "wallet", icon: <FaWallet /> },
    { name: "Driver Tracking", path: "drivertracking", icon: <FaMapMarkerAlt /> },
    { name: "Reports", path: "reports", icon: <FaChartLine /> },
    { name: "Communication", path: "communication", icon: <FaEnvelope /> },
  ];

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">
      {/* Sidebar */}
      <motion.div
        className="w-full md:w-64 bg-white shadow-2xl p-6 flex flex-col"
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-extrabold mb-6 text-center text-blue-600">
          Agent Panel
        </h2>
        <nav className="flex flex-col space-y-3">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={`/agent/${link.path}`}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg font-medium transition-colors text-lg ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "hover:bg-blue-100 text-gray-700"
                }`
              }
            >
              <span className="text-xl">{link.icon}</span>
              {link.name}
            </NavLink>
          ))}
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-8">
        {/* Always Visible Content */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg"
        >
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, Agent! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Here's your dashboard overview and quick actions.
          </p>
        </motion.div>

        {/* Main Route Content */}
        <div className="mt-8 bg-white rounded-3xl shadow-2xl p-6">
          <Routes>
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="myload" element={<MyLoad />} />
            <Route path="postload" element={<PostLoad />} />
            <Route path="afterposting" element={<AfterPosting />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="drivertracking" element={<DriverTracking />} />
            <Route path="reports" element={<Reports />} />
            <Route path="communication" element={<Communication />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AgentHome;
