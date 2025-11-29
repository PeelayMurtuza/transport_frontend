import React, { useState } from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import { FaTruck, FaWallet, FaChartLine, FaEnvelope, FaPlus, FaMapMarkerAlt, FaClipboardList, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import DashBoard from "./DashBoard";
import MyLoad from "./MyLoad";
import PostLoad from "./PostLoad";
import AfterPosting from "./AfterPosting";
import Wallet from "./PremiumWallet";
import DriverTracking from "./DriverTracking";
import Reports from "./Reports";

const AgentHome = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { name: "Dashboard", path: "dashboard", icon: <FaChartLine /> },
    { name: "My Load", path: "myload", icon: <FaClipboardList /> },
    { name: "Post Load", path: "postload", icon: <FaPlus /> },
    { name: "After Posting", path: "afterposting", icon: <FaTruck /> },
    { name: "Wallet", path: "wallet", icon: <FaWallet /> },
    { name: "Driver Tracking", path: "drivertracking", icon: <FaMapMarkerAlt /> },
    { name: "Reports", path: "reports", icon: <FaChartLine /> }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200">
      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow-lg p-3 sm:p-4 flex items-center justify-between sticky top-0 z-30">
        <h2 className="text-lg sm:text-xl font-bold text-blue-600 truncate">Agent Panel</h2>
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-lg text-gray-700 hover:bg-blue-100 transition-colors flex-shrink-0"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <FaTimes size={18} className="sm:size-20" /> : <FaBars size={18} className="sm:size-20" />}
        </button>
      </div>

      {/* Sidebar - Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />
            
            {/* Sidebar */}
            <motion.div
              className="fixed top-0 left-0 h-full w-64 bg-white shadow-2xl p-4 sm:p-6 flex flex-col z-50 md:hidden"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-extrabold text-blue-600 truncate">
                  Agent Panel
                </h2>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-lg text-gray-700 hover:bg-blue-100 transition-colors flex-shrink-0"
                  aria-label="Close menu"
                >
                  <FaTimes size={18} className="sm:size-20" />
                </button>
              </div>
              <nav className="flex flex-col space-y-2 sm:space-y-3 flex-1">
                {links.map((link) => (
                  <NavLink
                    key={link.path}
                    to={`/agent/${link.path}`}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg"
                          : "hover:bg-blue-100 text-gray-700"
                      }`
                    }
                  >
                    <span className="text-lg sm:text-xl flex-shrink-0">{link.icon}</span>
                    <span className="truncate">{link.name}</span>
                  </NavLink>
                ))}
              </nav>
              
              {/* Mobile Footer */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Online</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop */}
      <motion.div
        className="hidden md:flex md:w-64 bg-white shadow-2xl p-4 lg:p-6 flex-col sticky top-0 h-screen"
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-xl lg:text-2xl font-extrabold mb-4 lg:mb-6 text-center text-blue-600">
          Agent Panel
        </h2>
        <nav className="flex flex-col space-y-2 lg:space-y-3 flex-1">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={`/agent/${link.path}`}
              className={({ isActive }) =>
                `flex items-center gap-2 lg:gap-3 p-2 lg:p-3 rounded-lg font-medium transition-colors text-sm lg:text-base ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "hover:bg-blue-100 text-gray-700"
                }`
              }
            >
              <span className="text-lg lg:text-xl flex-shrink-0">{link.icon}</span>
              <span className="truncate">{link.name}</span>
            </NavLink>
          ))}
        </nav>
        
        {/* Desktop Footer */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Online</span>
            </div>
            <span className="text-xs">v1.0.0</span>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-2 sm:p-3 md:p-4 lg:p-6 space-y-4 sm:space-y-6 md:space-y-8 min-w-0">
        {/* Always Visible Content */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-md rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg"
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 truncate">
            Welcome, Agent! 👋
          </h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">
            Here's your dashboard overview and quick actions.
          </p>
        </motion.div>

        {/* Main Route Content */}
        <div className="bg-white rounded-lg sm:rounded-xl md:rounded-3xl shadow-lg sm:shadow-xl md:shadow-2xl p-2 sm:p-3 md:p-4 lg:p-6 min-w-0">
          <Routes>
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="myload" element={<MyLoad />} />
            <Route path="postload" element={<PostLoad />} />
            <Route path="afterposting" element={<AfterPosting />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="drivertracking" element={<DriverTracking />} />
            <Route path="reports" element={<Reports />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AgentHome;