import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTachometerAlt,
  FaTruck,
  FaClipboardList,
  FaCheckCircle,
  FaWallet,
  FaRoad,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

// Import all child components
import DashBoard from "./DashBoard";
import AcceptLoad from "./AcceptLoad";
import ActiveLoad from "./ActiveLoad";
import BrowseLoad from "./BrowseLoad";
import MyJobs from "./MyJobs";
import Wallet from "./Wallet";

const DriverHome = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const { isDark } = useTheme();
  const gradientPrimary = isDark ? "from-purple-600 via-blue-600 to-cyan-500" : "from-blue-500 via-purple-500 to-pink-500";
  const backgroundGradient = isDark ? "from-gray-900 via-blue-900/20 to-purple-900/30" : "from-slate-100 via-gray-50 to-slate-200";
  const surface = isDark ? "bg-gray-800/80 backdrop-blur-xl" : "bg-white/90 backdrop-blur-xl";
  const textClass = isDark ? "text-white" : "text-gray-900";
  const borderClass = isDark ? "border-gray-700/50" : "border-gray-200/50";

  const links = [
    { name: "Dashboard", path: "dashboard", icon: <FaTachometerAlt /> },
    { name: "Browse Load", path: "browseload", icon: <FaTruck /> },
    { name: "Accept Load", path: "acceptload", icon: <FaCheckCircle /> },
    { name: "Active Load", path: "activeload", icon: <FaClipboardList /> },
    { name: "My Jobs", path: "myjobs", icon: <FaRoad /> },
    { name: "Wallet", path: "wallet", icon: <FaWallet /> },
  ];

  // Responsive design classes
  const getResponsiveClasses = {
    // Text sizes
    heading: "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold",
    subheading: "text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold",
    body: "text-sm sm:text-base md:text-lg lg:text-xl",
    small: "text-xs sm:text-sm md:text-base lg:text-lg",
    nav: "text-sm sm:text-base md:text-lg lg:text-xl",
    icon: "text-base sm:text-lg md:text-xl lg:text-2xl",
    
    // Spacing
    container: "p-3 sm:p-4 md:p-6 lg:p-8",
    section: "space-y-4 sm:space-y-6 md:space-y-8",
    card: "p-4 sm:p-6 md:p-8",
    navItem: "p-3 sm:p-4",
  };

  // Close mobile menu on resize or route change
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`min-h-screen flex bg-gradient-to-br ${backgroundGradient}`}>
      {/* Mobile Header (positioned below main navbar) */}
      <div className={`md:hidden fixed top-16 left-0 right-0 ${surface} shadow-lg z-40`}>
        <div className="p-3 flex items-center justify-between">
          <h2 className={`${getResponsiveClasses.subheading} text-indigo-600`}>Driver Panel 🚚</h2>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-600 hover:text-indigo-600 transition-colors rounded-lg hover:bg-indigo-50"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sidebar for Desktop */}
      <motion.aside
        className={`hidden md:flex w-64 lg:w-72 xl:w-80 ${surface} shadow-2xl flex-col p-6`}
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Desktop Title */}
        <h2 className="text-2xl lg:text-3xl font-extrabold mb-8 text-center text-indigo-600">
          Driver Panel 🚚
        </h2>

        <nav className="flex flex-col space-y-3 flex-1">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={`/driver/${link.path}`}
              className={({ isActive }) =>
                `flex items-center gap-4 p-4 rounded-xl font-medium transition-all duration-200 text-lg ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg transform scale-105"
                    : `hover:bg-indigo-50 ${isDark ? 'text-gray-300 hover:text-indigo-300 hover:shadow-md' : 'text-gray-700 hover:text-indigo-600 hover:shadow-md'}`
                }`
              }
            >
              <span className="text-xl lg:text-2xl">
                {link.icon}
              </span>
              <span>{link.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Desktop Footer */}
        <div className={`mt-8 pt-6 border-t ${borderClass}`}>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'} text-center`}>
            Safe driving! 🛣️
          </p>
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.aside
              className={`${surface} md:hidden fixed inset-0 z-40 shadow-2xl flex flex-col p-6`}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, type: "spring", damping: 25 }}
            >
              {/* Mobile Header inside sidebar */}
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-extrabold text-indigo-600">
                  Driver Panel 🚚
                </h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-gray-600 hover:text-indigo-600 transition-colors rounded-lg hover:bg-indigo-50"
                  aria-label="Close menu"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex flex-col space-y-3 flex-1">
                {links.map((link) => (
                  <NavLink
                    key={link.path}
                    to={`/driver/${link.path}`}
                    className={({ isActive }) =>
                      `flex items-center gap-4 p-4 rounded-xl font-medium transition-all duration-200 text-lg ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-lg transform scale-105"
                          : "hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 hover:shadow-md"
                      }`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-xl">
                      {link.icon}
                    </span>
                    <span>{link.name}</span>
                  </NavLink>
                ))}
              </nav>

              <div className={`mt-8 pt-6 border-t ${borderClass}`}>
                <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'} text-center`}>
                  Tap outside to close
                </p>
              </div>
            </motion.aside>

            {/* Overlay for mobile menu */}
            <motion.div 
              className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className={`flex-1 w-full ${getResponsiveClasses.container} ${getResponsiveClasses.section} pt-16 md:pt-0`}>
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`${surface} rounded-2xl shadow-lg overflow-hidden`}
        >
          <div className={getResponsiveClasses.card}>
            <h1 className={`${getResponsiveClasses.heading} ${textClass}`}>
              Welcome, Driver! 👋
            </h1>
            <p className={`${getResponsiveClasses.body} ${isDark ? 'text-gray-300' : 'text-gray-600'} mt-4`}>
              Manage your active loads, browse new jobs, and track your earnings.
            </p>
          </div>
        </motion.div>

        {/* Routes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`${surface} rounded-2xl shadow-xl overflow-hidden`}
        >
          <div className={getResponsiveClasses.card}>
            <Routes>
              <Route path="dashboard" element={<DashBoard />} />
              <Route path="browseload" element={<BrowseLoad />} />
              <Route path="acceptload" element={<AcceptLoad />} />
              <Route path="activeload" element={<ActiveLoad />} />
              <Route path="myjobs" element={<MyJobs />} />
              <Route path="wallet" element={<Wallet />} />
            </Routes>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default DriverHome;