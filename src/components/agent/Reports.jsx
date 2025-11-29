import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Filter,
  Calendar,
  DollarSign,
  Package,
  Users,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  MoreVertical,
  PieChart,
  LineChart,
  Activity,
  CheckCircle
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart as ReLineChart,
  Line,
  PieChart as RePieChart,
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

const Reports = () => {
  const [timeRange, setTimeRange] = useState("week");
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  // Enhanced data with more metrics
  const weeklyData = [
    { day: "Mon", jobs: 2, commission: 500, revenue: 25000, distance: 800 },
    { day: "Tue", jobs: 5, commission: 1200, revenue: 42000, distance: 1200 },
    { day: "Wed", jobs: 3, commission: 800, revenue: 38000, distance: 950 },
    { day: "Thu", jobs: 6, commission: 1500, revenue: 55000, distance: 1600 },
    { day: "Fri", jobs: 4, commission: 1000, revenue: 48000, distance: 1100 },
    { day: "Sat", jobs: 7, commission: 1800, revenue: 62000, distance: 1400 },
    { day: "Sun", jobs: 3, commission: 900, revenue: 35000, distance: 900 },
  ];

  const monthlyData = [
    { month: "Jan", jobs: 18, commission: 4500, revenue: 125000 },
    { month: "Feb", jobs: 22, commission: 5800, revenue: 142000 },
    { month: "Mar", jobs: 25, commission: 6500, revenue: 165000 },
    { month: "Apr", jobs: 20, commission: 5200, revenue: 138000 },
    { month: "May", jobs: 28, commission: 7200, revenue: 185000 },
    { month: "Jun", jobs: 24, commission: 6200, revenue: 158000 },
  ];

  const performanceData = [
    { name: "Completed", value: 75, color: "#10b981" },
    { name: "In Progress", value: 15, color: "#3b82f6" },
    { name: "Pending", value: 8, color: "#f59e0b" },
    { name: "Cancelled", value: 2, color: "#ef4444" },
  ];

  const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444"];

  // Stats with trends
  const stats = [
    {
      title: "Total Revenue",
      value: "₹1,85,000",
      change: "+12.5%",
      changeType: "increase",
      icon: <DollarSign className="text-green-500 size-4 xs:size-5 sm:size-6" />,
      description: "This month"
    },
    {
      title: "Completed Jobs",
      value: "28",
      change: "+8.2%",
      changeType: "increase",
      icon: <Package className="text-blue-500 size-4 xs:size-5 sm:size-6" />,
      description: "Active loads"
    },
    {
      title: "Driver Partners",
      value: "15",
      change: "+3",
      changeType: "increase",
      icon: <Users className="text-purple-500 size-4 xs:size-5 sm:size-6" />,
      description: "Active drivers"
    },
    {
      title: "Avg Commission",
      value: "₹6,200",
      change: "+5.1%",
      changeType: "increase",
      icon: <TrendingUp className="text-orange-500 size-4 xs:size-5 sm:size-6" />,
      description: "Per job"
    }
  ];

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg xs:rounded-xl sm:rounded-2xl p-2 xs:p-3 sm:p-4 shadow-2xl text-xs xs:text-sm">
          <p className="font-semibold text-gray-900 mb-1 xs:mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.name.includes('₹') ? '₹' : ''}{entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const currentData = timeRange === "week" ? weeklyData : monthlyData;

  const StatCard = ({ stat, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-white/80 backdrop-blur-sm rounded-xl xs:rounded-2xl sm:rounded-3xl p-3 xs:p-4 sm:p-5 lg:p-6 shadow-lg sm:shadow-xl lg:shadow-2xl border border-gray-200/50"
    >
      <div className="flex items-center justify-between mb-2 xs:mb-3 sm:mb-4">
        <div className="p-2 xs:p-3 bg-gray-50 rounded-lg xs:rounded-xl">
          {stat.icon}
        </div>
        <div className={`flex items-center gap-1 text-xs xs:text-sm font-medium ${
          stat.changeType === "increase" ? "text-green-600" : "text-red-600"
        }`}>
          {stat.changeType === "increase" ? <ArrowUpRight className="size-3 xs:size-4" /> : <ArrowDownRight className="size-3 xs:size-4" />}
          {stat.change}
        </div>
      </div>
      
      <div className="space-y-0.5 xs:space-y-1">
        <div className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">{stat.value}</div>
        <div className="text-xs xs:text-sm font-medium text-gray-600">{stat.title}</div>
        <div className="text-gray-500 text-xs">{stat.description}</div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 xs:gap-3 sm:gap-4"
        >
          <div className="flex-1 min-w-0">
            <h1 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Analytics & <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Reports</span>
            </h1>
            <p className="text-gray-600 mt-1 text-xs xs:text-sm sm:text-base leading-relaxed">
              Comprehensive insights into your logistics performance
            </p>
          </div>
          
          <div className="flex items-center gap-1 xs:gap-2 sm:gap-3 w-full lg:w-auto mt-2 lg:mt-0">
            <div className="flex bg-white/80 backdrop-blur-sm rounded-lg xs:rounded-xl sm:rounded-2xl p-1 border border-gray-200 flex-1 lg:flex-none">
              {["week", "month", "quarter"].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`flex-1 px-2 xs:px-3 sm:px-4 py-1 xs:py-2 rounded-lg xs:rounded-xl text-xs xs:text-sm font-medium capitalize transition-all ${
                    timeRange === range 
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg" 
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
            
            <button className="p-2 xs:p-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg xs:rounded-xl sm:rounded-2xl hover:shadow-lg transition-all flex-shrink-0">
              <Download className="size-3 xs:size-4 sm:size-5" />
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6"
        >
          {stats.map((stat, index) => (
            <StatCard key={stat.title} stat={stat} index={index} />
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex bg-white/80 backdrop-blur-sm rounded-lg xs:rounded-xl sm:rounded-2xl p-1 border border-gray-200 overflow-x-auto"
        >
          {[
            { id: "overview", label: "Overview", icon: <BarChart3 className="size-3 xs:size-4" /> },
            { id: "performance", label: "Performance", icon: <Activity className="size-3 xs:size-4" /> },
            { id: "revenue", label: "Revenue", icon: <TrendingUp className="size-3 xs:size-4" /> },
            { id: "drivers", label: "Drivers", icon: <Users className="size-3 xs:size-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 xs:gap-2 flex-1 min-w-0 px-2 xs:px-3 sm:px-4 py-2 xs:py-3 rounded-lg xs:rounded-xl text-xs xs:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.icon}
              <span className="truncate">{tab.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Charts Section */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 xl:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6"
            >
              {/* Revenue & Jobs Chart */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl xs:rounded-2xl sm:rounded-3xl p-3 xs:p-4 sm:p-5 lg:p-6 shadow-lg sm:shadow-xl lg:shadow-2xl border border-gray-200/50">
                <div className="flex items-center justify-between mb-3 xs:mb-4 sm:mb-5 lg:mb-6">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900">Revenue & Jobs Trend</h3>
                    <p className="text-gray-600 text-xs xs:text-sm mt-0.5">Weekly performance overview</p>
                  </div>
                  <div className="flex items-center gap-1 xs:gap-2 flex-shrink-0 ml-2">
                    <button className="p-1 xs:p-2 hover:bg-gray-100 rounded-lg xs:rounded-xl transition-colors">
                      <Eye className="size-3 xs:size-4" />
                    </button>
                    <button className="p-1 xs:p-2 hover:bg-gray-100 rounded-lg xs:rounded-xl transition-colors">
                      <MoreVertical className="size-3 xs:size-4" />
                    </button>
                  </div>
                </div>
                
                <div className="h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={currentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey={timeRange === "week" ? "day" : "month"} tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="revenue" fill="#8b5cf6" radius={[2, 2, 0, 0]} name="Revenue (₹)" />
                      <Bar dataKey="jobs" fill="#3b82f6" radius={[2, 2, 0, 0]} name="Jobs" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Commission Trend */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl xs:rounded-2xl sm:rounded-3xl p-3 xs:p-4 sm:p-5 lg:p-6 shadow-lg sm:shadow-xl lg:shadow-2xl border border-gray-200/50">
                <div className="flex items-center justify-between mb-3 xs:mb-4 sm:mb-5 lg:mb-6">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900">Commission Trend</h3>
                    <p className="text-gray-600 text-xs xs:text-sm mt-0.5">Earnings over time</p>
                  </div>
                  <DollarSign className="text-gray-400 size-3 xs:size-4 sm:size-5 flex-shrink-0" />
                </div>
                
                <div className="h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={currentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey={timeRange === "week" ? "day" : "month"} tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="commission" 
                        stroke="#10b981" 
                        fill="#10b981" 
                        fillOpacity={0.2}
                        strokeWidth={2}
                        name="Commission (₹)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "performance" && (
            <motion.div
              key="performance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6"
            >
              {/* Performance Distribution */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl xs:rounded-2xl sm:rounded-3xl p-3 xs:p-4 sm:p-5 lg:p-6 shadow-lg sm:shadow-xl lg:shadow-2xl border border-gray-200/50">
                <div className="flex items-center justify-between mb-3 xs:mb-4 sm:mb-5 lg:mb-6">
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900">Job Distribution</h3>
                  <PieChart className="text-gray-400 size-3 xs:size-4 sm:size-5 flex-shrink-0" />
                </div>
                
                <div className="h-48 xs:h-52 sm:h-56 md:h-60 lg:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={performanceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {performanceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4 mt-3 xs:mt-4">
                  {performanceData.map((item, index) => (
                    <div key={item.name} className="text-center">
                      <div className="flex items-center justify-center gap-1 xs:gap-2 mb-1">
                        <div 
                          className="w-2 h-2 xs:w-3 xs:h-3 rounded-full flex-shrink-0" 
                          style={{ backgroundColor: COLORS[index] }}
                        />
                        <span className="text-xs xs:text-sm font-medium text-gray-700 truncate">{item.name}</span>
                      </div>
                      <div className="text-sm xs:text-base sm:text-lg font-bold leading-tight">{item.value}%</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Distance Covered */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl xs:rounded-2xl sm:rounded-3xl p-3 xs:p-4 sm:p-5 lg:p-6 shadow-lg sm:shadow-xl lg:shadow-2xl border border-gray-200/50">
                <div className="flex items-center justify-between mb-3 xs:mb-4 sm:mb-5 lg:mb-6">
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900">Distance Covered</h3>
                  <TrendingUp className="text-gray-400 size-3 xs:size-4 sm:size-5 flex-shrink-0" />
                </div>
                
                <div className="h-48 xs:h-52 sm:h-56 md:h-60 lg:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReLineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Line 
                        type="monotone" 
                        dataKey="distance" 
                        stroke="#f59e0b" 
                        strokeWidth={2}
                        dot={{ fill: '#f59e0b', strokeWidth: 2, r: 3 }}
                        activeDot={{ r: 5, fill: '#f59e0b' }}
                        name="Distance (km)"
                      />
                    </ReLineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "revenue" && (
            <motion.div
              key="revenue"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl xs:rounded-2xl sm:rounded-3xl p-3 xs:p-4 sm:p-5 lg:p-6 shadow-lg sm:shadow-xl lg:shadow-2xl border border-gray-200/50"
            >
              <div className="flex items-center justify-between mb-3 xs:mb-4 sm:mb-5 lg:mb-6">
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900">Revenue Analytics</h3>
                  <p className="text-gray-600 text-xs xs:text-sm mt-0.5">Monthly revenue breakdown and trends</p>
                </div>
                <div className="flex items-center gap-1 xs:gap-2 flex-shrink-0 ml-2">
                  {["revenue", "commission", "jobs"].map((metric) => (
                    <button
                      key={metric}
                      onClick={() => setSelectedMetric(metric)}
                      className={`px-2 xs:px-3 py-1 rounded-lg text-xs xs:text-sm font-medium capitalize ${
                        selectedMetric === metric
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {metric}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="h-64 xs:h-72 sm:h-80 md:h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <ReLineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      type="monotone" 
                      dataKey={selectedMetric === "revenue" ? "revenue" : selectedMetric === "commission" ? "commission" : "jobs"} 
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                      dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 3 }}
                      activeDot={{ r: 5, fill: '#8b5cf6' }}
                      name={selectedMetric === "revenue" ? "Revenue (₹)" : selectedMetric === "commission" ? "Commission (₹)" : "Jobs"}
                    />
                  </ReLineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-sm rounded-xl xs:rounded-2xl sm:rounded-3xl p-3 xs:p-4 sm:p-5 lg:p-6 shadow-lg sm:shadow-xl lg:shadow-2xl border border-gray-200/50"
        >
          <div className="flex items-center justify-between mb-3 xs:mb-4 sm:mb-5 lg:mb-6">
            <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900">Recent Activity</h3>
            <Calendar className="text-gray-400 size-3 xs:size-4 sm:size-5 flex-shrink-0" />
          </div>
          
          <div className="space-y-2 xs:space-y-3 sm:space-y-4">
            {[
              { action: "New load posted", amount: "₹25,000", time: "2 hours ago", type: "revenue" },
              { action: "Commission earned", amount: "₹1,200", time: "5 hours ago", type: "commission" },
              { action: "Job completed", amount: "Mumbai → Delhi", time: "1 day ago", type: "completion" },
              { action: "Payment received", amount: "₹18,500", time: "2 days ago", type: "payment" }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-2 xs:p-3 sm:p-4 bg-gray-50/50 rounded-lg xs:rounded-xl sm:rounded-2xl hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center gap-2 xs:gap-3 xs:gap-4 min-w-0 flex-1">
                  <div className={`w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-lg xs:rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    activity.type === "revenue" ? "bg-blue-500/10" :
                    activity.type === "commission" ? "bg-green-500/10" :
                    activity.type === "completion" ? "bg-purple-500/10" : "bg-orange-500/10"
                  }`}>
                    {activity.type === "revenue" && <Package className="text-blue-500 size-3 xs:size-4" />}
                    {activity.type === "commission" && <DollarSign className="text-green-500 size-3 xs:size-4" />}
                    {activity.type === "completion" && <CheckCircle className="text-purple-500 size-3 xs:size-4" />}
                    {activity.type === "payment" && <TrendingUp className="text-orange-500 size-3 xs:size-4" />}
                  </div>
                  
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-gray-900 text-xs xs:text-sm truncate">{activity.action}</div>
                    <div className="text-gray-600 text-xs mt-0.5">{activity.time}</div>
                  </div>
                </div>
                
                <div className="text-right ml-2 flex-shrink-0">
                  <div className="font-semibold text-gray-900 text-xs xs:text-sm truncate">{activity.amount}</div>
                  <div className="text-gray-600 text-xs capitalize">{activity.type}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Reports;