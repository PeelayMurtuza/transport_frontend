import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  MapPin, 
  Trash2, 
  Eye,
  Truck,
  Calendar,
  IndianRupee,
  MoreVertical,
  Download,
  RefreshCw,
  Plus,
  AlertCircle,
  CheckCircle2,
  Clock,
  Menu,
  X,
  Sun,
  Moon
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const MyLoads = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");
  const [selectedLoad, setSelectedLoad] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { theme, isDark, toggleTheme } = useTheme();

  // Mock data with more realistic fields
  const loads = [
    {
      id: 1,
      from: "Mumbai, MH",
      to: "Delhi, DL",
      driver: "Ravi Kumar",
      vehicle: "MH01 AB 1234",
      freight: 25000,
      status: "pending",
      date: "2024-01-15",
      distance: "1400 km",
      type: "Refrigerated"
    },
    {
      id: 2,
      from: "Pune, MH",
      to: "Surat, GJ",
      driver: "Arjun Mehta",
      vehicle: "GJ05 CD 5678",
      freight: 12000,
      status: "completed",
      date: "2024-01-14",
      distance: "400 km",
      type: "Dry Goods"
    },
    {
      id: 3,
      from: "Jaipur, RJ",
      to: "Ahmedabad, GJ",
      driver: "Rahul Verma",
      vehicle: "RJ02 EF 9012",
      freight: 18000,
      status: "active",
      date: "2024-01-16",
      distance: "650 km",
      type: "General"
    },
    {
      id: 4,
      from: "Chennai, TN",
      to: "Bangalore, KA",
      driver: "Suresh Patel",
      vehicle: "TN03 GH 3456",
      freight: 15000,
      status: "pending",
      date: "2024-01-17",
      distance: "350 km",
      type: "Electronics"
    }
  ];

  // Status configurations with theme support
  const statusConfig = {
    pending: { 
      color: isDark ? "bg-yellow-900/30 text-yellow-400 border-yellow-800" : "bg-yellow-100 text-yellow-800 border-yellow-200", 
      icon: Clock 
    },
    active: { 
      color: isDark ? "bg-blue-900/30 text-blue-400 border-blue-800" : "bg-blue-100 text-blue-800 border-blue-200", 
      icon: Truck 
    },
    completed: { 
      color: isDark ? "bg-green-900/30 text-green-400 border-green-800" : "bg-green-100 text-green-800 border-green-200", 
      icon: CheckCircle2 
    },
    cancelled: { 
      color: isDark ? "bg-red-900/30 text-red-400 border-red-800" : "bg-red-100 text-red-800 border-red-200", 
      icon: AlertCircle 
    }
  };

  // Optimized filtering and sorting with useMemo
  const filteredLoads = useMemo(() => {
    let filtered = loads.filter(load => {
      const matchesSearch = 
        load.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        load.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
        load.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
        load.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || load.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Sorting
    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.freight - b.freight);
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.freight - a.freight);
    }

    return filtered;
  }, [searchTerm, statusFilter, sortOrder]);

  const getStatusIcon = (status) => {
    const IconComponent = statusConfig[status]?.icon || AlertCircle;
    return <IconComponent className="size-2 xs:size-3 sm:size-4" />;
  };

  const StatsCard = ({ title, value, color }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`p-2 xs:p-3 sm:p-4 rounded-lg xs:rounded-xl sm:rounded-2xl backdrop-blur-sm border min-h-[60px] xs:min-h-[70px] sm:min-h-[80px] flex flex-col justify-center transition-colors duration-500 ${color}`}
    >
      <div className={`text-lg xs:text-xl sm:text-2xl font-bold leading-tight transition-colors duration-500 ${
        isDark ? 'text-gray-100' : 'text-gray-900'
      }`}>
        {value}
      </div>
      <div className={`text-xs xs:text-sm mt-0.5 xs:mt-1 leading-tight transition-colors duration-500 ${
        isDark ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {title}
      </div>
    </motion.div>
  );

  const MobileFilterMenu = () => (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30 }}
            className={`fixed top-0 right-0 h-full w-64 backdrop-blur-sm z-50 lg:hidden p-3 sm:p-4 transition-colors duration-500 ${
              isDark ? 'bg-gray-800/95' : 'bg-white/95'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className={`font-semibold text-sm sm:text-base transition-colors duration-500 ${
                isDark ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Filters
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className={`p-1 sm:p-2 rounded-lg transition-colors duration-300 ${
                    isDark 
                      ? 'bg-gray-700 hover:bg-gray-600 text-amber-300' 
                      : 'bg-blue-100 hover:bg-blue-200 text-blue-600'
                  }`}
                  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`p-1 sm:p-2 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <X className={`size-4 sm:size-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* Status Filter */}
              <div>
                <h4 className={`font-medium text-sm mb-2 transition-colors duration-500 ${
                  isDark ? 'text-gray-300' : 'text-gray-900'
                }`}>
                  Status
                </h4>
                <div className="space-y-2">
                  {[
                    { value: "all", label: "All" },
                    { value: "pending", label: "Pending" },
                    { value: "active", label: "Active" },
                    { value: "completed", label: "Completed" }
                  ].map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => {
                        setStatusFilter(filter.value);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        statusFilter === filter.value
                          ? "bg-blue-500 text-white"
                          : `${isDark ? 'text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-gray-600 hover:bg-gray-100'}`
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h4 className={`font-medium text-sm mb-2 transition-colors duration-500 ${
                  isDark ? 'text-gray-300' : 'text-gray-900'
                }`}>
                  Sort
                </h4>
                <select
                  value={sortOrder}
                  onChange={(e) => {
                    setSortOrder(e.target.value);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-colors duration-500 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-gray-100' 
                      : 'bg-white border-gray-200 text-gray-900'
                  }`}
                >
                  <option value="none">Sort by Freight</option>
                  <option value="asc">Low to High</option>
                  <option value="desc">High to Low</option>
                </select>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <div className={`min-h-screen p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 transition-colors duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20'
    }`}>
      <MobileFilterMenu />
      
      <div className="max-w-7xl mx-auto space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 xs:gap-3 sm:gap-4"
        >
          <div className="flex-1 min-w-0">
            <h1 className={`text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight transition-colors duration-500 ${
              isDark ? 'text-gray-100' : 'text-gray-900'
            }`}>
              My <span className={`${
                isDark ? 'bg-gradient-to-r from-blue-400 to-purple-400' : 'bg-gradient-to-r from-blue-600 to-purple-600'
              } bg-clip-text text-transparent transition-colors duration-500`}>
                Loads
              </span>
            </h1>
            <p className={`mt-1 text-xs xs:text-sm sm:text-base leading-relaxed transition-colors duration-500 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Manage and track your shipments
            </p>
          </div>
          
          <div className="flex items-center gap-1 xs:gap-2 sm:gap-3 w-full lg:w-auto mt-2 xs:mt-0">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-1 xs:p-2 rounded-lg xs:rounded-xl transition-colors duration-300 ${
                isDark 
                  ? 'bg-gray-700 hover:bg-gray-600 text-amber-300' 
                  : 'bg-blue-100 hover:bg-blue-200 text-blue-600'
              }`}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Mobile Filter Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className={`lg:hidden p-1 xs:p-2 backdrop-blur-sm border rounded-lg sm:rounded-xl hover:shadow-lg transition-all flex items-center gap-1 xs:gap-2 flex-shrink-0 ${
                isDark 
                  ? 'bg-gray-800/80 border-gray-700 text-gray-300' 
                  : 'bg-white/80 border-gray-200 text-gray-700'
              }`}
            >
              <Filter className="size-3 xs:size-4" />
              <span className="text-xs xs:text-sm">Filters</span>
            </button>

            <button className={`flex items-center gap-1 xs:gap-2 backdrop-blur-sm border px-2 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-2 rounded-lg xs:rounded-xl sm:rounded-2xl hover:shadow-lg transition-all text-xs xs:text-sm ${
              isDark 
                ? 'bg-gray-800/80 border-gray-700 text-gray-300 hover:bg-gray-700' 
                : 'bg-white/80 border-gray-200 text-gray-700 hover:bg-white'
            }`}>
              <RefreshCw className="size-3 xs:size-4" />
              <span className="hidden xs:inline">Refresh</span>
            </button>
            <button className={`flex items-center gap-1 xs:gap-2 ${
              isDark ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-blue-500 to-purple-500'
            } text-white px-2 xs:px-3 sm:px-4 py-1 xs:py-2 sm:py-2 rounded-lg xs:rounded-xl sm:rounded-2xl font-semibold hover:shadow-lg transition-all text-xs xs:text-sm`}>
              <Plus className="size-3 xs:size-4" />
              <span className="hidden xs:inline">New Load</span>
              <span className="xs:hidden">New</span>
            </button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 xs:gap-3 sm:gap-4"
        >
          <StatsCard 
            title="Total Loads" 
            value={loads.length} 
            color={`${isDark ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'}`}
          />
          <StatsCard 
            title="Active" 
            value={loads.filter(l => l.status === 'active').length} 
            color={`${isDark ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50/80 border-blue-200'}`}
          />
          <StatsCard 
            title="Pending" 
            value={loads.filter(l => l.status === 'pending').length} 
            color={`${isDark ? 'bg-yellow-900/20 border-yellow-800' : 'bg-yellow-50/80 border-yellow-200'}`}
          />
          <StatsCard 
            title="Completed" 
            value={loads.filter(l => l.status === 'completed').length} 
            color={`${isDark ? 'bg-green-900/20 border-green-800' : 'bg-green-50/80 border-green-200'}`}
          />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`backdrop-blur-sm rounded-lg xs:rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 xs:p-4 sm:p-5 lg:p-6 shadow-lg sm:shadow-xl lg:shadow-2xl border transition-colors duration-500 ${
            isDark ? 'bg-gray-800/80 border-gray-700/50' : 'bg-white/80 border-gray-200/50'
          }`}
        >
          <div className="flex flex-col lg:flex-row gap-3 xs:gap-4 items-start lg:items-center">
            {/* Search */}
            <div className="flex-1 relative w-full">
              <Search className={`absolute left-2 xs:left-3 top-1/2 transform -translate-y-1/2 size-3 xs:size-4 sm:size-5 transition-colors duration-500 ${
                isDark ? 'text-gray-400' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Search loads, drivers, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-7 xs:pl-10 sm:pl-12 pr-3 xs:pr-4 py-2 xs:py-3 border rounded-lg xs:rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-xs xs:text-sm ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            {/* Desktop Filters */}
            <div className="hidden lg:flex items-center gap-2 flex-wrap">
              {[
                { value: "all", label: "All" },
                { value: "pending", label: "Pending" },
                { value: "active", label: "Active" },
                { value: "completed", label: "Completed" }
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setStatusFilter(filter.value)}
                  className={`px-3 xs:px-4 py-1 xs:py-2 rounded-lg xs:rounded-xl text-xs xs:text-sm font-medium transition-all ${
                    statusFilter === filter.value
                      ? "bg-blue-500 text-white shadow-lg"
                      : `${isDark 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Desktop Sort */}
            <div className="hidden lg:block">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className={`px-3 xs:px-4 py-2 xs:py-3 border rounded-lg xs:rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-xs xs:text-sm transition-colors duration-500 ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-gray-100' 
                    : 'bg-white border-gray-200 text-gray-900'
                }`}
              >
                <option value="none">Sort by Freight</option>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
              </select>
            </div>
          </div>

          {/* Mobile Filter Status */}
          <div className="lg:hidden mt-3">
            <div className="flex items-center gap-1 xs:gap-2 flex-wrap">
              <span className={`text-xs transition-colors duration-500 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Status:
              </span>
              {[
                { value: "all", label: "All" },
                { value: "pending", label: "Pending" },
                { value: "active", label: "Active" },
                { value: "completed", label: "Completed" }
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setStatusFilter(filter.value)}
                  className={`px-2 py-1 rounded-lg text-xs font-medium transition-all ${
                    statusFilter === filter.value
                      ? "bg-blue-500 text-white"
                      : `${isDark 
                          ? 'bg-gray-700 text-gray-300' 
                          : 'bg-gray-100 text-gray-700'
                        }`
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Loads Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 md:gap-6"
        >
          <AnimatePresence>
            {filteredLoads.map((load) => (
              <motion.div
                key={load.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -2 }}
                className={`backdrop-blur-sm rounded-lg xs:rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 xs:p-4 sm:p-5 lg:p-6 shadow-lg sm:shadow-xl lg:shadow-2xl border hover:shadow-xl transition-all transition-colors duration-500 ${
                  isDark ? 'bg-gray-800/80 border-gray-700/50' : 'bg-white/80 border-gray-200/50'
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3 xs:mb-4">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg xs:rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Truck className="text-white size-3 xs:size-4 sm:size-5" />
                    </div>
                    <div className="min-w-0">
                      <div className={`font-semibold text-xs xs:text-sm sm:text-base truncate transition-colors duration-500 ${
                        isDark ? 'text-gray-100' : 'text-gray-900'
                      }`}>
                        Load #{load.id}
                      </div>
                      <div className={`text-xs truncate transition-colors duration-500 ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {load.type}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button className={`p-1 xs:p-2 rounded-lg xs:rounded-xl transition-colors ${
                      isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                    }`}>
                      <MoreVertical className={`size-3 xs:size-4 transition-colors duration-500 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`} />
                    </button>
                  </div>
                </div>

                {/* Route */}
                <div className="space-y-2 xs:space-y-3 mb-3 xs:mb-4">
                  <div className="flex items-center justify-between">
                    <div className={`text-xs xs:text-sm font-medium truncate flex-1 text-center transition-colors duration-500 ${
                      isDark ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {load.from}
                    </div>
                    <div className={`text-xs mx-2 flex-shrink-0 transition-colors duration-500 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {load.distance}
                    </div>
                    <div className={`text-xs xs:text-sm font-medium truncate flex-1 text-center transition-colors duration-500 ${
                      isDark ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {load.to}
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className={`w-full h-px relative transition-colors duration-500 ${
                      isDark ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 xs:w-2 xs:h-2 bg-blue-500 rounded-full"></div>
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 xs:w-2 xs:h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-2 xs:gap-3 mb-3 xs:mb-4 text-xs xs:text-sm">
                  <div className="min-w-0">
                    <div className={`text-xs transition-colors duration-500 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Driver
                    </div>
                    <div className={`font-medium truncate transition-colors duration-500 ${
                      isDark ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {load.driver}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className={`text-xs transition-colors duration-500 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Vehicle
                    </div>
                    <div className={`font-medium truncate transition-colors duration-500 ${
                      isDark ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {load.vehicle}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className={`text-xs transition-colors duration-500 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Date
                    </div>
                    <div className={`font-medium truncate transition-colors duration-500 ${
                      isDark ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      {load.date}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className={`text-xs transition-colors duration-500 ${
                      isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Freight
                    </div>
                    <div className={`font-medium flex items-center gap-0.5 transition-colors duration-500 ${
                      isDark ? 'text-gray-100' : 'text-gray-900'
                    }`}>
                      <IndianRupee className="size-2 xs:size-3" />
                      <span className="truncate">{load.freight.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Status and Actions */}
                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-1 xs:gap-2 px-2 xs:px-3 py-1 rounded-full border text-xs font-medium ${statusConfig[load.status]?.color}`}>
                    {getStatusIcon(load.status)}
                    <span className="capitalize truncate">{load.status}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <button className={`p-1 xs:p-2 rounded-lg xs:rounded-xl transition-colors ${
                      isDark ? 'hover:bg-blue-900/30 text-blue-400' : 'hover:bg-blue-50 text-blue-600'
                    }`}>
                      <Eye className="size-3 xs:size-4" />
                    </button>
                    <button className={`p-1 xs:p-2 rounded-lg xs:rounded-xl transition-colors ${
                      isDark ? 'hover:bg-red-900/30 text-red-400' : 'hover:bg-red-50 text-red-600'
                    }`}>
                      <Trash2 className="size-3 xs:size-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredLoads.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 xs:py-10 sm:py-12"
          >
            <div className={`w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 rounded-2xl xs:rounded-3xl flex items-center justify-center mx-auto mb-3 xs:mb-4 transition-colors duration-500 ${
              isDark ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <Truck className={`size-6 xs:size-8 sm:size-10 transition-colors duration-500 ${
                isDark ? 'text-gray-400' : 'text-gray-400'
              }`} />
            </div>
            <h3 className={`text-base xs:text-lg sm:text-xl font-semibold mb-1 xs:mb-2 transition-colors duration-500 ${
              isDark ? 'text-gray-100' : 'text-gray-900'
            }`}>
              No loads found
            </h3>
            <p className={`text-xs xs:text-sm mb-4 xs:mb-6 max-w-xs mx-auto transition-colors duration-500 ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Try adjusting your search or filters
            </p>
            <button 
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setSortOrder("none");
              }}
              className={`${
                isDark ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gradient-to-r from-blue-500 to-purple-500'
              } text-white px-4 xs:px-6 py-2 xs:py-3 rounded-xl xs:rounded-2xl font-semibold hover:shadow-lg transition-all text-xs xs:text-sm`}
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyLoads;