import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaTachometerAlt,
  FaTruck,
  FaClipboardList,
  FaCheckCircle,
  FaWallet,
  FaRoad,
} from "react-icons/fa";

// Import all child components
import DashBoard from "./DashBoard";
import AcceptLoad from "./AcceptLoad";
import ActiveLoad from "./ActiveLoad";
import BrowseLoad from "./BrowseLoad";
import MyJobs from "./MyJobs";
import Wallet from "./Wallet";

const DriverHome = () => {
  const links = [
    { name: "Dashboard", path: "dashboard", icon: <FaTachometerAlt /> },
    { name: "Browse Load", path: "browseload", icon: <FaTruck /> },
    { name: "Accept Load", path: "acceptload", icon: <FaCheckCircle /> },
    { name: "Active Load", path: "activeload", icon: <FaClipboardList /> },
    { name: "My Jobs", path: "myjobs", icon: <FaRoad /> },
    { name: "Wallet", path: "wallet", icon: <FaWallet /> },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-slate-100 via-gray-50 to-slate-200">
      {/* Sidebar */}
      <motion.aside
        className="w-full md:w-64 bg-white shadow-2xl p-6 flex flex-col"
        initial={{ x: -150 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-extrabold mb-6 text-center text-indigo-600">
          Driver Panel 🚚
        </h2>

        <nav className="flex flex-col space-y-3">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={`/driver/${link.path}`}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg font-medium transition-colors text-lg ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "hover:bg-indigo-100 text-gray-700"
                }`
              }
            >
              <span className="text-xl">{link.icon}</span>
              {link.name}
            </NavLink>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 space-y-8">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-md"
        >
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, Driver! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your active loads, browse new jobs, and track your earnings.
          </p>
        </motion.div>

        {/* Routes Section */}
        <div className="mt-6 bg-white rounded-3xl shadow-2xl p-6">
          <Routes>
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="browseload" element={<BrowseLoad />} />
            <Route path="acceptload" element={<AcceptLoad />} />
            <Route path="activeload" element={<ActiveLoad />} />
            <Route path="myjobs" element={<MyJobs />} />
            <Route path="wallet" element={<Wallet />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default DriverHome;
