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
  Sparkles
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

const PremiumDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("week");
  const [connectionStatus, setConnectionStatus] = useState("online");
  const [batteryLevel, setBatteryLevel] = useState(100);

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

  // Enhanced stats data
  const stats = [
    {
      title: "Active Loads",
      value: "12",
      change: "+2",
      changeType: "increase",
      color: "from-blue-500 to-cyan-500",
      icon: <Truck size={24} />,
      description: "Currently in transit"
    },
    {
      title: "Completed Jobs",
      value: "35",
      change: "+8",
      changeType: "increase",
      color: "from-green-500 to-emerald-500",
      icon: <Package size={24} />,
      description: "This month"
    },
    {
      title: "Revenue",
      value: "₹1,45,500",
      change: "+12%",
      changeType: "increase",
      color: "from-purple-500 to-pink-500",
      icon: <DollarSign size={24} />,
      description: "Monthly earnings"
    },
    {
      title: "On-time Rate",
      value: "94.2%",
      change: "+2.1%",
      changeType: "increase",
      color: "from-orange-500 to-red-500",
      icon: <Clock size={24} />,
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
      icon: <Truck className="text-blue-500" />
    },
    {
      id: 2,
      type: "completion",
      message: "Job completed: Pune → Surat",
      time: "5 hours ago",
      status: "completed",
      icon: <CheckCircle2 className="text-green-500" />
    },
    {
      id: 3,
      type: "payment",
      message: "Payment received: ₹2,000",
      time: "1 day ago",
      status: "payment",
      icon: <DollarSign className="text-purple-500" />
    },
    {
      id: 4,
      type: "alert",
      message: "Delay alert: Bangalore → Hyderabad",
      time: "2 days ago",
      status: "alert",
      icon: <AlertCircle className="text-orange-500" />
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

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl p-4 shadow-2xl">
          <p className="font-semibold text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const StatusBar = () => (
    <div className="flex items-center justify-between text-sm mb-6">
      <div className="flex items-center gap-4">
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
          connectionStatus === "online" 
            ? "bg-green-500/20 text-green-400" 
            : "bg-red-500/20 text-red-400"
        }`}>
          <Wifi size={14} />
          <span className="capitalize">{connectionStatus}</span>
        </div>
        
        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400">
          <Battery size={14} />
          <span>{batteryLevel}%</span>
        </div>

        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/20 text-purple-400">
          <Cloud size={14} />
          <span>Live Sync</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-gray-500">
        <Sparkles size={14} />
        <span>TransConnect Premium</span>
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            TransConnect
          </div>
          <div className="text-gray-500 mt-2">Loading your dashboard...</div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Status Bar */}
        <StatusBar />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Rajesh!</span>
            </h1>
            <p className="text-gray-600 mt-2">Here's what's happening with your logistics today</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex bg-white/80 backdrop-blur-sm rounded-2xl p-1 border border-gray-200">
              {["overview", "analytics", "drivers", "reports"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                    activeTab === tab 
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg" 
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <button className="p-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl hover:shadow-lg transition-all">
              <Filter size={20} />
            </button>
          </div>
        </motion.div>

        {/* Main Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`bg-gradient-to-br ${stat.color} text-white rounded-3xl p-6 shadow-2xl backdrop-blur-sm relative overflow-hidden`}
            >
              {/* Background pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                    {stat.icon}
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                    stat.changeType === "increase" 
                      ? "bg-green-500/30 text-green-100" 
                      : "bg-red-500/30 text-red-100"
                  }`}>
                    {stat.changeType === "increase" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {stat.change}
                  </div>
                </div>
                
                <div className="space-y-1">
                  <p className="text-white/80 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-white/60 text-xs">{stat.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Performance Chart */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-gray-200/50"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Load Performance</h3>
                <p className="text-gray-600 text-sm">Weekly overview of active and completed loads</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <Download size={18} />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" />
                <YAxis />
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
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-gray-200/50"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Revenue Analytics</h3>
                <p className="text-gray-600 text-sm">Monthly revenue and profit trends</p>
              </div>
              <div className="flex bg-gray-100 rounded-xl p-1">
                {["week", "month", "quarter"].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium capitalize ${
                      timeRange === range 
                        ? "bg-white text-gray-900 shadow-sm" 
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="revenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Load Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-gray-200/50"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Load Distribution</h3>
              <Eye size={18} className="text-gray-400" />
            </div>
            
            <div className="flex items-center justify-center h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={loadDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {loadDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Driver Performance */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-gray-200/50"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Top Drivers</h3>
              <Users size={18} className="text-gray-400" />
            </div>
            
            <div className="space-y-4">
              {driverPerformanceData.map((driver, index) => (
                <div key={driver.driver} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-2xl hover:bg-gray-100/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white font-semibold text-sm">
                      {driver.driver.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{driver.driver}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <span>⭐ {driver.rating}</span>
                        <span>•</span>
                        <span>{driver.loads} loads</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-semibold text-green-600">{driver.onTime}%</div>
                    <div className="text-xs text-gray-600">On-time</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-gray-200/50"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <RefreshCw size={18} className="text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>
            
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-4 p-4 bg-gray-50/50 rounded-2xl hover:bg-gray-100/50 transition-colors group">
                  <div className="p-2 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
                    {activity.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{activity.message}</div>
                    <div className="text-sm text-gray-600">{activity.time}</div>
                  </div>
                  
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-gray-200 rounded-xl transition-colors">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 hover:bg-gray-200 rounded-xl transition-colors">
                      <MessageCircle size={16} />
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
            className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-3xl p-6 shadow-2xl relative overflow-hidden"
          >
            {/* Background pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -translate-x-8 translate-y-8" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Upcoming Loads</h3>
                <Calendar size={20} className="text-white/80" />
              </div>
              
              <div className="space-y-4">
                {upcomingLoads.map((load) => (
                  <div key={load.id} className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold">{load.route}</div>
                      <div className="text-white/80 text-sm">{load.value}</div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-white/70">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{load.date}</span>
                      </div>
                      <div>{load.driver}</div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-3">
                      <button className="flex-1 bg-white/20 hover:bg-white/30 text-white py-2 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-1">
                        <Phone size={14} />
                        Call
                      </button>
                      <button className="flex-1 bg-white/20 hover:bg-white/30 text-white py-2 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-1">
                        <Mail size={14} />
                        Message
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

export default PremiumDashboard;