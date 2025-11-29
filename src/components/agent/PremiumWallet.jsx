import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wallet, 
  Plus, 
  History, 
  Download, 
  Upload, 
  ArrowUpRight, 
  ArrowDownLeft,
  CreditCard,
  QrCode,
  Shield,
  Zap,
  TrendingUp,
  MoreVertical,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  Smartphone,
  Banknote,
  Gift
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

const PremiumWallet = () => {
  const [balance, setBalance] = useState(14500);
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddingMoney, setIsAddingMoney] = useState(false);
  const [addAmount, setAddAmount] = useState("");
  const [quickActions] = useState([
    { icon: <Plus className="size-3 xs:size-4 sm:size-5" />, label: "Add Money", color: "from-green-500 to-emerald-500" },
    { icon: <Upload className="size-3 xs:size-4 sm:size-5" />, label: "Send", color: "from-blue-500 to-cyan-500" },
    { icon: <Download className="size-3 xs:size-4 sm:size-5" />, label: "Withdraw", color: "from-purple-500 to-pink-500" },
    { icon: <QrCode className="size-3 xs:size-4 sm:size-5" />, label: "Pay", color: "from-orange-500 to-red-500" }
  ]);

  const [transactions, setTransactions] = useState([
    { 
      id: 1, 
      type: "credit", 
      amount: 2000, 
      date: "2025-10-22", 
      description: "Load Completion Bonus",
      status: "completed",
      icon: <CheckCircle className="text-green-500 size-3 xs:size-4" />
    },
    { 
      id: 2, 
      type: "debit", 
      amount: 500, 
      date: "2025-10-21", 
      description: "Fuel Payment",
      status: "completed",
      icon: <XCircle className="text-red-500 size-3 xs:size-4" />
    },
    { 
      id: 3, 
      type: "credit", 
      amount: 1000, 
      date: "2025-10-20", 
      description: "Referral Bonus",
      status: "completed",
      icon: <CheckCircle className="text-green-500 size-3 xs:size-4" />
    },
    { 
      id: 4, 
      type: "credit", 
      amount: 1500, 
      date: "2025-10-19", 
      description: "Weekly Payout",
      status: "pending",
      icon: <Clock className="text-yellow-500 size-3 xs:size-4" />
    }
  ]);

  const [analytics] = useState({
    monthlyEarnings: 24500,
    totalWithdrawals: 10000,
    pendingBalance: 1500,
    growth: 12.5
  });

  const pieData = [
    { name: "Available", value: balance, color: "#10b981" },
    { name: "In Transit", value: 3500, color: "#f59e0b" },
    { name: "Pending", value: 1500, color: "#ef4444" }
  ];

  const COLORS = ["#10b981", "#f59e0b", "#ef4444"];

  const chartData = [
    { day: "Mon", balance: 12000, earnings: 2000 },
    { day: "Tue", balance: 12500, earnings: 2500 },
    { day: "Wed", balance: 13000, earnings: 3000 },
    { day: "Thu", balance: 13500, earnings: 2500 },
    { day: "Fri", balance: 14000, earnings: 3500 },
    { day: "Sat", balance: 14200, earnings: 2000 },
    { day: "Sun", balance: 14500, earnings: 3000 }
  ];

  const handleAddMoney = () => {
    if (addAmount && !isNaN(addAmount)) {
      setBalance(prev => prev + parseInt(addAmount));
      setTransactions(prev => [{
        id: prev.length + 1,
        type: "credit",
        amount: parseInt(addAmount),
        date: new Date().toISOString().split('T')[0],
        description: "Wallet Top-up",
        status: "completed",
        icon: <CheckCircle className="text-green-500 size-3 xs:size-4" />
      }, ...prev]);
      setAddAmount("");
      setIsAddingMoney(false);
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg xs:rounded-xl sm:rounded-2xl p-2 xs:p-3 sm:p-4 shadow-2xl text-xs xs:text-sm">
          <p className="font-semibold text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: ₹{entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-3 xs:space-y-4 sm:space-y-5 md:space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 xs:gap-3 sm:gap-4"
        >
          <div className="flex-1 min-w-0">
            <h1 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Digital <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Wallet</span>
            </h1>
            <p className="text-gray-600 mt-1 text-xs xs:text-sm sm:text-base leading-relaxed">
              Manage your earnings and payments securely
            </p>
          </div>
          
          <div className="flex items-center gap-1 xs:gap-2 sm:gap-3 mt-2 lg:mt-0">
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-2 xs:p-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg xs:rounded-xl sm:rounded-2xl hover:shadow-lg transition-all"
            >
              {showBalance ? <Eye className="size-3 xs:size-4 sm:size-5" /> : <EyeOff className="size-3 xs:size-4 sm:size-5" />}
            </button>
            <button className="p-2 xs:p-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg xs:rounded-xl sm:rounded-2xl hover:shadow-lg transition-all">
              <MoreVertical className="size-3 xs:size-4 sm:size-5" />
            </button>
          </div>
        </motion.div>

        {/* Main Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl xs:rounded-2xl sm:rounded-3xl p-4 xs:p-5 sm:p-6 lg:p-8 text-white shadow-lg sm:shadow-xl lg:shadow-2xl relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-white/10 rounded-full -translate-y-16 xs:-translate-y-20 sm:-translate-y-24 lg:-translate-y-32 translate-x-16 xs:translate-x-20 sm:translate-x-24 lg:translate-x-32" />
          <div className="absolute bottom-0 left-0 w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-white/5 rounded-full -translate-x-12 xs:-translate-x-14 sm:-translate-x-16 lg:-translate-x-24 translate-y-12 xs:translate-y-14 sm:translate-y-16 lg:translate-y-24" />
          
          <div className="relative z-10">
            <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3 xs:gap-4 mb-4 xs:mb-5 sm:mb-6">
              <div className="flex items-center gap-2 xs:gap-3">
                <div className="p-2 xs:p-3 bg-white/20 rounded-lg xs:rounded-xl sm:rounded-2xl backdrop-blur-sm">
                  <Wallet className="size-4 xs:size-5 sm:size-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-blue-100 text-xs xs:text-sm">Total Balance</p>
                  <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold mt-0.5 xs:mt-1 leading-tight">
                    {showBalance ? `₹${balance.toLocaleString()}` : "••••••"}
                  </h2>
                </div>
              </div>
              
              <div className="text-left xs:text-right">
                <div className="flex items-center gap-1 text-green-300 text-xs xs:text-sm">
                  <TrendingUp className="size-3 xs:size-4" />
                  <span>+12.5% this month</span>
                </div>
                <p className="text-blue-100 text-xs xs:text-sm mt-0.5 xs:mt-1">Last updated just now</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 xs:gap-3 sm:gap-4 mt-4 xs:mt-6 sm:mt-8">
              <div className="text-center p-2 xs:p-3 sm:p-4 bg-white/10 rounded-lg xs:rounded-xl sm:rounded-2xl backdrop-blur-sm">
                <p className="text-blue-100 text-xs xs:text-sm">Monthly</p>
                <p className="text-base xs:text-lg sm:text-xl font-semibold mt-0.5 xs:mt-1 leading-tight">₹24.5K</p>
              </div>
              <div className="text-center p-2 xs:p-3 sm:p-4 bg-white/10 rounded-lg xs:rounded-xl sm:rounded-2xl backdrop-blur-sm">
                <p className="text-blue-100 text-xs xs:text-sm">Withdrawn</p>
                <p className="text-base xs:text-lg sm:text-xl font-semibold mt-0.5 xs:mt-1 leading-tight">₹10K</p>
              </div>
              <div className="text-center p-2 xs:p-3 sm:p-4 bg-white/10 rounded-lg xs:rounded-xl sm:rounded-2xl backdrop-blur-sm">
                <p className="text-blue-100 text-xs xs:text-sm">Pending</p>
                <p className="text-base xs:text-lg sm:text-xl font-semibold mt-0.5 xs:mt-1 leading-tight">₹1.5K</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4"
        >
          {quickActions.map((action, index) => (
            <motion.button
              key={action.label}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => action.label === "Add Money" && setIsAddingMoney(true)}
              className={`bg-gradient-to-r ${action.color} text-white p-3 xs:p-4 sm:p-5 lg:p-6 rounded-lg xs:rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-lg sm:shadow-xl lg:shadow-2xl backdrop-blur-sm flex flex-col items-center gap-2 xs:gap-3 transition-all min-h-[80px] xs:min-h-[90px] sm:min-h-[100px]`}
            >
              <div className="p-2 xs:p-3 bg-white/20 rounded-lg xs:rounded-xl">
                {action.icon}
              </div>
              <span className="font-semibold text-xs xs:text-sm text-center leading-tight">{action.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex bg-white/80 backdrop-blur-sm rounded-lg xs:rounded-xl sm:rounded-2xl p-1 border border-gray-200"
        >
          {["overview", "transactions", "analytics"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-2 xs:px-3 sm:px-4 py-2 xs:py-3 rounded-lg xs:rounded-xl text-xs xs:text-sm font-medium capitalize transition-all ${
                activeTab === tab 
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Content based on active tab */}
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6"
            >
              {/* Balance Distribution */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl xs:rounded-2xl sm:rounded-3xl p-3 xs:p-4 sm:p-5 lg:p-6 shadow-lg sm:shadow-xl lg:shadow-2xl border border-gray-200/50">
                <div className="flex items-center justify-between mb-3 xs:mb-4 sm:mb-5 lg:mb-6">
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900">Balance Distribution</h3>
                  <BarChart3 className="size-4 xs:size-5 text-gray-400" />
                </div>
                
                <div className="h-48 xs:h-52 sm:h-56 md:h-60 lg:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-3 gap-2 xs:gap-3 sm:gap-4 mt-3 xs:mt-4">
                  {pieData.map((item, index) => (
                    <div key={item.name} className="text-center">
                      <div className="flex items-center justify-center gap-1 xs:gap-2 mb-1">
                        <div 
                          className="w-2 h-2 xs:w-3 xs:h-3 rounded-full flex-shrink-0" 
                          style={{ backgroundColor: COLORS[index] }}
                        />
                        <span className="text-xs xs:text-sm font-medium text-gray-700 truncate">{item.name}</span>
                      </div>
                      <div className="text-sm xs:text-base sm:text-lg font-bold leading-tight">₹{item.value.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Balance Trend */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl xs:rounded-2xl sm:rounded-3xl p-3 xs:p-4 sm:p-5 lg:p-6 shadow-lg sm:shadow-xl lg:shadow-2xl border border-gray-200/50">
                <div className="flex items-center justify-between mb-3 xs:mb-4 sm:mb-5 lg:mb-6">
                  <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900">Weekly Balance Trend</h3>
                  <TrendingUp className="size-4 xs:size-5 text-gray-400" />
                </div>
                
                <div className="h-48 xs:h-52 sm:h-56 md:h-60 lg:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="day" tick={{ fontSize: 10 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area 
                        type="monotone" 
                        dataKey="balance" 
                        stroke="#3b82f6" 
                        fill="#3b82f6" 
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "transactions" && (
            <motion.div
              key="transactions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl xs:rounded-2xl sm:rounded-3xl p-3 xs:p-4 sm:p-5 lg:p-6 shadow-lg sm:shadow-xl lg:shadow-2xl border border-gray-200/50"
            >
              <div className="flex items-center justify-between mb-3 xs:mb-4 sm:mb-5 lg:mb-6">
                <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900">Transaction History</h3>
                <div className="flex items-center gap-1 xs:gap-2">
                  <button className="p-1 xs:p-2 hover:bg-gray-100 rounded-lg xs:rounded-xl transition-colors">
                    <Download className="size-3 xs:size-4" />
                  </button>
                  <button className="p-1 xs:p-2 hover:bg-gray-100 rounded-lg xs:rounded-xl transition-colors">
                    <MoreVertical className="size-3 xs:size-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 xs:space-y-3">
                {transactions.map((transaction) => (
                  <motion.div
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-2 xs:p-3 sm:p-4 bg-gray-50/50 rounded-lg xs:rounded-xl sm:rounded-2xl hover:bg-gray-100/50 transition-colors group"
                  >
                    <div className="flex items-center gap-2 xs:gap-3 xs:gap-4 min-w-0 flex-1">
                      <div className={`p-2 xs:p-3 rounded-lg xs:rounded-xl ${
                        transaction.type === "credit" 
                          ? "bg-green-500/10" 
                          : "bg-red-500/10"
                      }`}>
                        {transaction.type === "credit" ? 
                          <ArrowDownLeft className="text-green-500 size-3 xs:size-4" /> : 
                          <ArrowUpRight className="text-red-500 size-3 xs:size-4" />
                        }
                      </div>
                      
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-gray-900 text-xs xs:text-sm truncate">
                          {transaction.description}
                        </div>
                        <div className="flex items-center gap-1 xs:gap-2 text-xs text-gray-600 mt-0.5">
                          {transaction.icon}
                          <span>{transaction.date}</span>
                          <span className={`px-1 xs:px-2 py-0.5 xs:py-1 rounded-full text-xs ${
                            transaction.status === "completed" 
                              ? "bg-green-500/20 text-green-700" 
                              : "bg-yellow-500/20 text-yellow-700"
                          }`}>
                            {transaction.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`text-sm xs:text-base font-bold ml-2 ${
                      transaction.type === "credit" ? "text-green-600" : "text-red-600"
                    }`}>
                      {transaction.type === "credit" ? "+" : "-"}₹{transaction.amount.toLocaleString()}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "analytics" && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6"
            >
              {/* Monthly Earnings */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl xs:rounded-2xl sm:rounded-3xl p-3 xs:p-4 sm:p-5 lg:p-6 shadow-lg sm:shadow-xl lg:shadow-2xl border border-gray-200/50">
                <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900 mb-3 xs:mb-4 sm:mb-5 lg:mb-6">Monthly Performance</h3>
                <div className="space-y-2 xs:space-y-3 sm:space-y-4">
                  {[
                    { label: "Total Earnings", value: `₹${analytics.monthlyEarnings.toLocaleString()}`, change: "+12.5%" },
                    { label: "Withdrawals", value: `₹${analytics.totalWithdrawals.toLocaleString()}`, change: "+8.2%" },
                    { label: "Net Growth", value: `₹${(analytics.monthlyEarnings - analytics.totalWithdrawals).toLocaleString()}`, change: "+15.3%" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 xs:p-3 sm:p-4 bg-gray-50/50 rounded-lg xs:rounded-xl sm:rounded-2xl">
                      <div className="min-w-0">
                        <div className="text-xs xs:text-sm text-gray-600">{item.label}</div>
                        <div className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 leading-tight">{item.value}</div>
                      </div>
                      <div className="text-green-500 font-semibold text-xs xs:text-sm">{item.change}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl xs:rounded-2xl sm:rounded-3xl p-3 xs:p-4 sm:p-5 lg:p-6 shadow-lg sm:shadow-xl lg:shadow-2xl border border-gray-200/50">
                <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900 mb-3 xs:mb-4 sm:mb-5 lg:mb-6">Payment Methods</h3>
                <div className="space-y-2 xs:space-y-3 sm:space-y-4">
                  {[
                    { icon: <Banknote className="size-3 xs:size-4 sm:size-5" />, name: "Bank Transfer", status: "Connected" },
                    { icon: <CreditCard className="size-3 xs:size-4 sm:size-5" />, name: "Credit Card", status: "Connected" },
                    { icon: <Smartphone className="size-3 xs:size-4 sm:size-5" />, name: "UPI", status: "Verify" },
                    { icon: <Gift className="size-3 xs:size-4 sm:size-5" />, name: "Rewards", status: "Active" }
                  ].map((method, index) => (
                    <div key={index} className="flex items-center justify-between p-2 xs:p-3 sm:p-4 bg-gray-50/50 rounded-lg xs:rounded-xl sm:rounded-2xl hover:bg-gray-100/50 transition-colors">
                      <div className="flex items-center gap-2 xs:gap-3 min-w-0 flex-1">
                        <div className="p-1 xs:p-2 bg-blue-500/10 rounded-lg xs:rounded-xl">
                          {method.icon}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-gray-900 text-xs xs:text-sm truncate">{method.name}</div>
                          <div className={`text-xs ${
                            method.status === "Connected" ? "text-green-600" : 
                            method.status === "Verify" ? "text-yellow-600" : "text-blue-600"
                          }`}>
                            {method.status}
                          </div>
                        </div>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-xs xs:text-sm ml-2">
                        Manage
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Money Modal */}
        <AnimatePresence>
          {isAddingMoney && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 xs:p-3 sm:p-4 z-50"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                className="bg-white rounded-xl xs:rounded-2xl sm:rounded-3xl p-3 xs:p-4 sm:p-5 lg:p-6 max-w-md w-full shadow-2xl"
              >
                <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4">Add Money to Wallet</h3>
                
                <div className="space-y-3 xs:space-y-4">
                  <div>
                    <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1 xs:mb-2">
                      Amount
                    </label>
                    <input
                      type="number"
                      value={addAmount}
                      onChange={(e) => setAddAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full px-3 xs:px-4 py-2 xs:py-3 border border-gray-300 rounded-lg xs:rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-xs xs:text-sm"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-1 xs:gap-2">
                    {[500, 1000, 2000, 5000, 10000].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setAddAmount(amount.toString())}
                        className="p-2 xs:p-3 border border-gray-300 rounded-lg xs:rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors text-xs xs:text-sm"
                      >
                        ₹{amount}
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex gap-2 xs:gap-3 pt-3 xs:pt-4">
                    <button
                      onClick={() => setIsAddingMoney(false)}
                      className="flex-1 px-3 xs:px-4 py-2 xs:py-3 border border-gray-300 rounded-lg xs:rounded-xl sm:rounded-2xl hover:bg-gray-50 transition-colors text-xs xs:text-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddMoney}
                      className="flex-1 px-3 xs:px-4 py-2 xs:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg xs:rounded-xl sm:rounded-2xl font-semibold hover:shadow-lg transition-all text-xs xs:text-sm"
                    >
                      Add Money
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PremiumWallet;