import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Truck, 
  Package, 
  DollarSign, 
  MapPin, 
  TrendingUp, 
  Users, 
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  Download,
  Filter,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  MessageCircle,
  Phone,
  Mail,
  Shield,
  Cpu,
  Wifi,
  Battery,
  Cloud,
  Sparkles,
  Menu,
  X,
  Sun,
  Moon
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("week");
  const [connectionStatus, setConnectionStatus] = useState("online");
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { theme, isDark, toggleTheme } = useTheme();

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Monitor connection and battery
  useEffect(() => {
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        setBatteryLevel(Math.round(battery.level * 100));
        battery.addEventListener('levelchange', () => {
          setBatteryLevel(Math.round(battery.level * 100));
        });
      });
    }

    window.addEventListener('online', () => setConnectionStatus("online"));
    window.addEventListener('offline', () => setConnectionStatus("offline"));
  }, []);

  // Enhanced stats data with theme-based colors
  const stats = [
    {
      title: "Active Loads",
      value: "12",
      change: "+2",
      changeType: "increase",
      color: isDark ? "from-blue-600 to-cyan-600" : "from-blue-500 to-cyan-500",
      icon: <Truck className="size-4 xs:size-5 sm:size-6" />,
      description: "Currently in transit"
    },
    {
      title: "Completed Jobs",
      value: "35",
      change: "+8",
      changeType: "increase",
      color: isDark ? "from-green-600 to-emerald-600" : "from-green-500 to-emerald-500",
      icon: <Package className="size-4 xs:size-5 sm:size-6" />,
      description: "This month"
    },
    {
      title: "Revenue",
      value: "₹1,45,500",
      change: "+12%",
      changeType: "increase",
      color: isDark ? "from-purple-600 to-pink-600" : "from-purple-500 to-pink-500",
      icon: <DollarSign className="size-4 xs:size-5 sm:size-6" />,
      description: "Monthly earnings"
    },
    {
      title: "On-time Rate",
      value: "94.2%",
      change: "+2.1%",
      changeType: "increase",
      color: isDark ? "from-orange-600 to-red-600" : "from-orange-500 to-red-500",
      icon: <Clock className="size-4 xs:size-5 sm:size-6" />,
      description: "Delivery performance"
    }
  ];

  // Multiple chart datasets
  const performanceData = [
    { day: "Mon", active: 5, completed: 2, revenue: 25000 },
    { day: "Tue", active: 8, completed: 5, revenue: 42000 },
    { day: "Wed", active: 6, completed: 7, revenue: 38000 },
    { day: "Thu", active: 10, completed: 8, revenue: 55000 },
    { day: "Fri", active: 12, completed: 9, revenue: 61000 },
    { day: "Sat", active: 9, completed: 10, revenue: 48000 },
    { day: "Sun", active: 7, completed: 12, revenue: 45000 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 125000, profit: 45000 },
    { month: "Feb", revenue: 142000, profit: 52000 },
    { month: "Mar", revenue: 138000, profit: 48000 },
    { month: "Apr", revenue: 156000, profit: 58000 },
    { month: "May", revenue: 165000, profit: 62000 },
    { month: "Jun", revenue: 145500, profit: 55000 },
  ];

  const loadDistributionData = [
    { name: "Refrigerated", value: 35, color: "#3b82f6" },
    { name: "Dry Goods", value: 25, color: "#10b981" },
    { name: "Liquids", value: 20, color: "#f59e0b" },
    { name: "Hazardous", value: 12, color: "#ef4444" },
    { name: "Oversized", value: 8, color: "#8b5cf6" },
  ];

  const driverPerformanceData = [
    { driver: "Raj Kumar", rating: 4.9, loads: 45, onTime: 98 },
    { driver: "Amit Sharma", rating: 4.8, loads: 38, onTime: 96 },
    { driver: "Suresh Patel", rating: 4.7, loads: 42, onTime: 94 },
    { driver: "Vikram Singh", rating: 4.6, loads: 35, onTime: 92 },
    { driver: "Rohit Mehta", rating: 4.5, loads: 28, onTime: 90 },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "load",
      message: "New load posted: Mumbai → Delhi",
      time: "2 hours ago",
      status: "active",
      icon: <Truck className={`${isDark ? 'text-blue-400' : 'text-blue-500'} size-3 xs:size-4 sm:size-5`} />
    },
    {
      id: 2,
      type: "completion",
      message: "Job completed: Pune → Surat",
      time: "5 hours ago",
      status: "completed",
      icon: <CheckCircle2 className={`${isDark ? 'text-green-400' : 'text-green-500'} size-3 xs:size-4 sm:size-5`} />
    },
    {
      id: 3,
      type: "payment",
      message: "Payment received: ₹2,000",
      time: "1 day ago",
      status: "payment",
      icon: <DollarSign className={`${isDark ? 'text-purple-400' : 'text-purple-500'} size-3 xs:size-4 sm:size-5`} />
    },
    {
      id: 4,
      type: "alert",
      message: "Delay alert: Bangalore → Hyderabad",
      time: "2 days ago",
      status: "alert",
      icon: <AlertCircle className={`${isDark ? 'text-orange-400' : 'text-orange-500'} size-3 xs:size-4 sm:size-5`} />
    }
  ];

  const upcomingLoads = [
    {
      id: 1,
      route: "Chennai → Hyderabad",
      date: "Tomorrow, 10:00 AM",
      driver: "Raj Kumar",
      status: "scheduled",
      value: "₹15,000"
    },
    {
      id: 2,
      route: "Bangalore → Kochi",
      date: "25 Oct, 2:00 PM",
      driver: "Amit Sharma",
      status: "confirmed",
      value: "₹18,500"
    },
    {
      id: 3,
      route: "Ahmedabad → Jaipur",
      date: "27 Oct, 9:00 AM",
      driver: "Suresh Patel",
      status: "pending",
      value: "₹12,000"
    }
  ];

  // Theme-based chart colors
  const chartColors = {
    grid: isDark ? '#374151' : '#f0f0f0',
    text: isDark ? '#d1d5db' : '#6b7280',
    tooltipBg: isDark ? '#1f2937' : '#ffffff',
    tooltipText: isDark ? '#ffffff' : '#111827',
    tooltipBorder: isDark ? '#374151' : '#e5e7eb',
  };

  // Custom tooltip for charts with theme support
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`${isDark ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm border ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        } rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 shadow-2xl text-xs sm:text-sm`}>
          <p className={`font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'} text-xs sm:text-sm`}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-xs sm:text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const StatusBar = () => (
    <div className="flex items-center justify-between text-xs xs:text-sm mb-3 sm:mb-4 md:mb-6">
      <div className="flex items-center gap-1 xs:gap-2 sm:gap-3 md:gap-4 flex-wrap">
        <div className={`flex items-center gap-1 px-2 py-1 xs:px-2 xs:py-1 sm:px-3 sm:py-1 rounded-full text-xs ${
          connectionStatus === "online" 
            ? `${isDark ? 'bg-green-600/20' : 'bg-green-500/20'} ${isDark ? 'text-green-400' : 'text-green-600'}` 
            : `${isDark ? 'bg-red-600/20' : 'bg-red-500/20'} ${isDark ? 'text-red-400' : 'text-red-600'}`
        }`}>
          <Wifi className="size-2 xs:size-3 sm:size-3 md:size-4" />
          <span className="capitalize hidden xs:inline">{connectionStatus}</span>
          <span className="capitalize xs:hidden">Online</span>
        </div>
        
        <div className={`flex items-center gap-1 px-2 py-1 xs:px-2 xs:py-1 sm:px-3 sm:py-1 rounded-full text-xs ${
          isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-500/20 text-blue-600'
        }`}>
          <Battery className="size-2 xs:size-3 sm:size-3 md:size-4" />
          <span>{batteryLevel}%</span>
        </div>

        <div className={`flex items-center gap-1 px-2 py-1 xs:px-2 xs:py-1 sm:px-3 sm:py-1 rounded-full text-xs ${
          isDark ? 'bg-purple-600/20 text-purple-400' : 'bg-purple-500/20 text-purple-600'
        }`}>
          <Cloud className="size-2 xs:size-3 sm:size-3 md:size-4" />
          <span className="hidden sm:inline">Live Sync</span>
          <span className="sm:hidden">Sync</span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`flex items-center gap-1 px-2 py-1 xs:px-2 xs:py-1 sm:px-3 sm:py-1 rounded-full text-xs ${
            isDark ? 'bg-amber-600/20 text-amber-400' : 'bg-blue-500/20 text-blue-600'
          }`}
        >
          {isDark ? (
            <Sun className="size-2 xs:size-3 sm:size-3 md:size-4" />
          ) : (
            <Moon className="size-2 xs:size-3 sm:size-3 md:size-4" />
          )}
          <span className="hidden xs:inline">{isDark ? 'Light' : 'Dark'}</span>
        </button>
      </div>
      
      <div className="flex items-center gap-1 text-xs xs:text-sm">
        <Sparkles className={`size-2 xs:size-3 sm:size-3 md:size-4 ${isDark ? 'text-purple-400' : 'text-purple-500'}`} />
        <span className={`hidden xs:inline ${isDark ? 'text-purple-300' : 'text-purple-600'}`}>TransConnect Premium</span>
        <span className={`xs:hidden ${isDark ? 'text-purple-300' : 'text-purple-600'}`}>Premium</span>
      </div>
    </div>
  );

  const MobileMenu = () => (
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
            className={`fixed top-0 right-0 h-full w-64 ${isDark ? 'bg-gray-800/95' : 'bg-white/95'} backdrop-blur-sm z-50 lg:hidden p-3 sm:p-4`}
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className={`font-semibold ${isDark ? 'text-gray-100' : 'text-gray-900'} text-sm sm:text-base`}>Menu</h3>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`p-1 sm:p-2 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg sm:rounded-xl`}
              >
                <X className={`size-4 sm:size-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
              </button>
            </div>
            
            <div className="space-y-1 sm:space-y-2">
              {["overview", "analytics", "drivers", "reports"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium capitalize transition-all ${
                    activeTab === tab 
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white" 
                      : `${isDark ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-3 sm:p-4 transition-colors duration-500 ${
        isDark ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 to-blue-50'
      }`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className={`w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 border-3 xs:border-4 ${
            isDark ? 'border-blue-400' : 'border-blue-500'
          } border-t-transparent rounded-full animate-spin mx-auto mb-2 xs:mb-3 sm:mb-4`}></div>
          <div className={`text-lg xs:text-xl sm:text-2xl font-bold ${
            isDark ? 'bg-gradient-to-r from-blue-400 to-purple-400' : 'bg-gradient-to-r from-blue-600 to-purple-600'
          } bg-clip-text text-transparent transition-colors duration-500`}>
            TransConnect
          </div>
          <div className={`${isDark ? 'text-gray-400' : 'text-gray-500'} mt-1 xs:mt-2 text-xs xs:text-sm sm:text-base transition-colors duration-500`}>
            Loading your dashboard...
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 transition-colors duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30'
    }`}>
      <MobileMenu />
      
      <div className="max-w-7xl mx-auto space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
        {/* Status Bar */}
        <StatusBar />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 xs:gap-3 sm:gap-4"
        >
          <div className="flex-1 min-w-0">
            <h1 className={`text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ${
              isDark ? 'text-gray-100' : 'text-gray-900'
            } leading-tight transition-colors duration-500`}>
              Welcome back,{" "}
              <span className={`${
                isDark ? 'bg-gradient-to-r from-blue-400 to-purple-400' : 'bg-gradient-to-r from-blue-600 to-purple-600'
              } bg-clip-text text-transparent block xs:inline transition-colors duration-500`}>
                Rajesh!
              </span>
            </h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1 text-xs xs:text-sm sm:text-base leading-relaxed transition-colors duration-500`}>
              Here's what's happening with your logistics today
            </p>
          </div>
          
          <div className="flex items-center gap-1 xs:gap-2 sm:gap-3 w-full lg:w-auto mt-2 xs:mt-0">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className={`lg:hidden p-1 xs:p-2 ${
                isDark ? 'bg-gray-800/80 hover:bg-gray-700' : 'bg-white/80 hover:bg-white'
              } backdrop-blur-sm border ${
                isDark ? 'border-gray-700' : 'border-gray-200'
              } rounded-lg sm:rounded-xl hover:shadow-lg transition-all flex-shrink-0`}
            >
              <Menu className={`size-3 xs:size-4 sm:size-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
            </button>

            {/* Desktop Tabs */}
            <div className={`hidden lg:flex ${
              isDark ? 'bg-gray-800/80' : 'bg-white/80'
            } backdrop-blur-sm rounded-xl p-1 border ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            } transition-colors duration-500`}>
              {["overview", "analytics", "drivers", "reports"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2 xs:px-3 py-1 xs:py-2 rounded-lg text-xs xs:text-sm font-medium capitalize transition-all ${
                    activeTab === tab 
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg" 
                      : `${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <button className={`p-1 xs:p-2 sm:p-3 ${
              isDark ? 'bg-gray-800/80 hover:bg-gray-700' : 'bg-white/80 hover:bg-white'
            } backdrop-blur-sm border ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            } rounded-lg sm:rounded-xl lg:rounded-2xl hover:shadow-lg transition-all flex-shrink-0`}>
              <Filter className={`size-3 xs:size-4 sm:size-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
            </button>
          </div>
        </motion.div>

        {/* Main Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.title}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`bg-gradient-to-br ${stat.color} text-white rounded-lg xs:rounded-xl sm:rounded-2xl lg:rounded-3xl p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 shadow-lg sm:shadow-xl lg:shadow-2xl backdrop-blur-sm relative overflow-hidden min-h-[80px] xs:min-h-[90px] sm:min-h-[110px] md:min-h-[120px] lg:min-h-[140px]`}
            >
              {/* Background pattern */}
              <div className="absolute top-0 right-0 w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-white/10 rounded-full -translate-y-6 xs:-translate-y-8 sm:-translate-y-10 lg:-translate-y-16 translate-x-6 xs:translate-x-8 sm:translate-x-10 lg:translate-x-16" />
              
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex items-center justify-between mb-1 xs:mb-2 sm:mb-3 lg:mb-4">
                  <div className="p-1 xs:p-2 sm:p-2 lg:p-3 bg-white/20 rounded-lg xs:rounded-xl lg:rounded-2xl backdrop-blur-sm">
                    {stat.icon}
                  </div>
                  <div className={`flex items-center gap-0.5 xs:gap-1 px-1 xs:px-2 py-0.5 xs:py-1 rounded-full text-xs font-semibold ${
                    stat.changeType === "increase" 
                      ? "bg-green-500/30 text-green-100" 
                      : "bg-red-500/30 text-red-100"
                  }`}>
                    {stat.changeType === "increase" ? 
                      <ArrowUpRight className="size-2 xs:size-3" /> : 
                      <ArrowDownRight className="size-2 xs:size-3" />
                    }
                    <span className="text-xs">{stat.change}</span>
                  </div>
                </div>
                
                <div className="space-y-0.5 xs:space-y-1">
                  <p className="text-white/80 text-xs xs:text-sm font-medium truncate">{stat.title}</p>
                  <p className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold truncate leading-tight">
                    {stat.value}
                  </p>
                  <p className="text-white/60 text-xs truncate">{stat.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
          {/* Performance Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`${isDark ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm rounded-lg xs:rounded-xl sm:rounded-2xl lg:rounded-3xl p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 shadow-lg sm:shadow-xl lg:shadow-2xl border ${
              isDark ? 'border-gray-700/50' : 'border-gray-200/50'
            } transition-colors duration-500`}
          >
            <div className="flex items-center justify-between mb-3 xs:mb-4 sm:mb-5 lg:mb-6">
              <div className="min-w-0 flex-1">
                <h3 className={`text-sm xs:text-base sm:text-lg font-semibold ${
                  isDark ? 'text-gray-100' : 'text-gray-900'
                } truncate transition-colors duration-500`}>
                  Load Performance
                </h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs xs:text-sm truncate mt-0.5 transition-colors duration-500`}>
                  Weekly overview of active and completed loads
                </p>
              </div>
              <div className="flex items-center gap-1 xs:gap-2 flex-shrink-0 ml-2">
                <button className={`p-1 xs:p-2 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg xs:rounded-xl transition-colors`}>
                  <Download className={`size-3 xs:size-4 sm:size-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                </button>
                <button className={`p-1 xs:p-2 ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg xs:rounded-xl transition-colors`}>
                  <MoreVertical className={`size-3 xs:size-4 sm:size-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                </button>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={180} className="text-xs">
              <AreaChart data={performanceData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: chartColors.text }} />
                <YAxis tick={{ fontSize: 10, fill: chartColors.text }} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="active" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
                <Area type="monotone" dataKey="completed" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className={`${isDark ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm rounded-lg xs:rounded-xl sm:rounded-2xl lg:rounded-3xl p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 shadow-lg sm:shadow-xl lg:shadow-2xl border ${
              isDark ? 'border-gray-700/50' : 'border-gray-200/50'
            } transition-colors duration-500`}
          >
            <div className="flex items-center justify-between mb-3 xs:mb-4 sm:mb-5 lg:mb-6">
              <div className="min-w-0 flex-1">
                <h3 className={`text-sm xs:text-base sm:text-lg font-semibold ${
                  isDark ? 'text-gray-100' : 'text-gray-900'
                } truncate transition-colors duration-500`}>
                  Revenue Analytics
                </h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs xs:text-sm truncate mt-0.5 transition-colors duration-500`}>
                  Monthly revenue and profit trends
                </p>
              </div>
              <div className={`flex ${
                isDark ? 'bg-gray-700' : 'bg-gray-100'
              } rounded-lg xs:rounded-xl p-0.5 xs:p-1 flex-shrink-0 ml-2 transition-colors duration-500`}>
                {["week", "month", "quarter"].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-1 xs:px-2 py-0.5 xs:py-1 rounded-md xs:rounded-lg text-xs font-medium capitalize ${
                      timeRange === range 
                        ? `${isDark ? 'bg-gray-600 text-gray-100' : 'bg-white text-gray-900'} shadow-sm` 
                        : `${isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'}`
                    } transition-colors duration-300`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={180} className="text-xs">
              <BarChart data={revenueData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: chartColors.text }} />
                <YAxis tick={{ fontSize: 10, fill: chartColors.text }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="revenue" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
                <Bar dataKey="profit" fill="#10b981" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Load Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`${isDark ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm rounded-lg xs:rounded-xl sm:rounded-2xl lg:rounded-3xl p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 shadow-lg sm:shadow-xl lg:shadow-2xl border ${
              isDark ? 'border-gray-700/50' : 'border-gray-200/50'
            } transition-colors duration-500`}
          >
            <div className="flex items-center justify-between mb-3 xs:mb-4 sm:mb-5 lg:mb-6">
              <h3 className={`text-sm xs:text-base sm:text-lg font-semibold ${
                isDark ? 'text-gray-100' : 'text-gray-900'
              } transition-colors duration-500`}>
                Load Distribution
              </h3>
              <Eye className={`size-3 xs:size-4 sm:size-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
            </div>
            
            <div className="flex items-center justify-center h-32 xs:h-36 sm:h-40 md:h-48 lg:h-56 xl:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={loadDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={45}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {loadDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Driver Performance */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`${isDark ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm rounded-lg xs:rounded-xl sm:rounded-2xl lg:rounded-3xl p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 shadow-lg sm:shadow-xl lg:shadow-2xl border ${
              isDark ? 'border-gray-700/50' : 'border-gray-200/50'
            } transition-colors duration-500`}
          >
            <div className="flex items-center justify-between mb-3 xs:mb-4 sm:mb-5 lg:mb-6">
              <h3 className={`text-sm xs:text-base sm:text-lg font-semibold ${
                isDark ? 'text-gray-100' : 'text-gray-900'
              } transition-colors duration-500`}>
                Top Drivers
              </h3>
              <Users className={`size-3 xs:size-4 sm:size-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
            </div>
            
            <div className="space-y-2 xs:space-y-2 sm:space-y-3 md:space-y-4">
              {driverPerformanceData.map((driver) => (
                <div key={driver.driver} className={`flex items-center justify-between p-2 xs:p-3 sm:p-4 rounded-lg xs:rounded-xl sm:rounded-2xl hover:${
                  isDark ? 'bg-gray-700/50' : 'bg-gray-100/50'
                } transition-colors ${
                  isDark ? 'bg-gray-700/30' : 'bg-gray-50/50'
                }`}>
                  <div className="flex items-center gap-2 xs:gap-3 min-w-0 flex-1">
                    <div className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg xs:rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-semibold text-xs xs:text-sm flex-shrink-0">
                      {driver.driver.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className={`font-semibold ${
                        isDark ? 'text-gray-100' : 'text-gray-900'
                      } text-xs xs:text-sm truncate transition-colors duration-500`}>
                        {driver.driver}
                      </div>
                      <div className="flex items-center gap-1 text-xs mt-0.5">
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>⭐ {driver.rating}</span>
                        <span className={isDark ? 'text-gray-600' : 'text-gray-400'}>•</span>
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>{driver.loads} loads</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right flex-shrink-0 ml-2">
                    <div className={`font-semibold ${
                      isDark ? 'text-green-400' : 'text-green-600'
                    } text-xs xs:text-sm transition-colors duration-500`}>
                      {driver.onTime}%
                    </div>
                    <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-500`}>
                      On-time
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`lg:col-span-2 ${
              isDark ? 'bg-gray-800/80' : 'bg-white/80'
            } backdrop-blur-sm rounded-lg xs:rounded-xl sm:rounded-2xl lg:rounded-3xl p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 shadow-lg sm:shadow-xl lg:shadow-2xl border ${
              isDark ? 'border-gray-700/50' : 'border-gray-200/50'
            } transition-colors duration-500`}
          >
            <div className="flex items-center justify-between mb-3 xs:mb-4 sm:mb-5 lg:mb-6">
              <h3 className={`text-sm xs:text-base sm:text-lg font-semibold ${
                isDark ? 'text-gray-100' : 'text-gray-900'
              } transition-colors duration-500`}>
                Recent Activity
              </h3>
              <RefreshCw className={`size-3 xs:size-4 sm:size-5 ${
                isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
              } cursor-pointer transition-colors duration-300`} />
            </div>
            
            <div className="space-y-2 xs:space-y-2 sm:space-y-3 md:space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className={`flex items-center gap-2 xs:gap-3 p-2 xs:p-3 sm:p-4 rounded-lg xs:rounded-xl sm:rounded-2xl hover:${
                  isDark ? 'bg-gray-700/50' : 'bg-gray-100/50'
                } transition-colors group ${
                  isDark ? 'bg-gray-700/30' : 'bg-gray-50/50'
                }`}>
                  <div className={`p-1 xs:p-2 ${
                    isDark ? 'bg-gray-800' : 'bg-white'
                  } rounded-lg xs:rounded-xl shadow-sm group-hover:shadow-md transition-shadow flex-shrink-0`}>
                    {activity.icon}
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <div className={`font-medium ${
                      isDark ? 'text-gray-100' : 'text-gray-900'
                    } text-xs xs:text-sm sm:text-base truncate transition-colors duration-500`}>
                      {activity.message}
                    </div>
                    <div className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs xs:text-sm mt-0.5 transition-colors duration-500`}>
                      {activity.time}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <button className={`p-1 xs:p-2 ${
                      isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                    } rounded-lg xs:rounded-xl transition-colors`}>
                      <Eye className={`size-2 xs:size-3 sm:size-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                    </button>
                    <button className={`p-1 xs:p-2 ${
                      isDark ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                    } rounded-lg xs:rounded-xl transition-colors`}>
                      <MessageCircle className={`size-2 xs:size-3 sm:size-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Loads */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className={`bg-gradient-to-br ${
              isDark ? 'from-blue-600 to-purple-700' : 'from-blue-500 to-purple-600'
            } text-white rounded-lg xs:rounded-xl sm:rounded-2xl lg:rounded-3xl p-2 xs:p-3 sm:p-4 md:p-5 lg:p-6 shadow-lg sm:shadow-xl lg:shadow-2xl relative overflow-hidden`}
          >
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-white/10 rounded-full -translate-y-4 xs:-translate-y-6 sm:-translate-y-8 translate-x-4 xs:translate-x-6 sm:translate-x-8" />
            <div className="absolute bottom-0 left-0 w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white/5 rounded-full -translate-x-4 xs:-translate-x-6 sm:-translate-x-8 translate-y-4 xs:translate-y-6 sm:translate-y-8" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3 xs:mb-4 sm:mb-5 lg:mb-6">
                <h3 className="text-sm xs:text-base sm:text-lg font-semibold">Upcoming Loads</h3>
                <Calendar className="size-3 xs:size-4 sm:size-5 text-white/80" />
              </div>
              
              <div className="space-y-2 xs:space-y-2 sm:space-y-3 md:space-y-4">
                {upcomingLoads.map((load) => (
                  <div key={load.id} className="p-2 xs:p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-lg xs:rounded-xl sm:rounded-2xl border border-white/20 hover:bg-white/15 transition-colors">
                    <div className="flex items-center justify-between mb-1 xs:mb-2">
                      <div className="font-semibold text-xs xs:text-sm sm:text-base truncate flex-1 mr-2">
                        {load.route}
                      </div>
                      <div className="text-white/80 text-xs xs:text-sm flex-shrink-0">
                        {load.value}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-white/70 mb-2 xs:mb-3">
                      <div className="flex items-center gap-1 truncate flex-1">
                        <Clock className="size-2 xs:size-3 flex-shrink-0" />
                        <span className="truncate">{load.date}</span>
                      </div>
                      <div className="text-xs truncate ml-2 flex-shrink-0">{load.driver}</div>
                    </div>
                    
                    <div className="flex items-center gap-1 xs:gap-2">
                      <button className="flex-1 bg-white/20 hover:bg-white/30 text-white py-1 xs:py-2 rounded-lg xs:rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1">
                        <Phone className="size-2 xs:size-3" />
                        <span className="hidden xs:inline">Call</span>
                        <span className="xs:hidden">Call</span>
                      </button>
                      <button className="flex-1 bg-white/20 hover:bg-white/30 text-white py-1 xs:py-2 rounded-lg xs:rounded-xl text-xs font-medium transition-colors flex items-center justify-center gap-1">
                        <Mail className="size-2 xs:size-3" />
                        <span className="hidden xs:inline">Message</span>
                        <span className="xs:hidden">Msg</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;