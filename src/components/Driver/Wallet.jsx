import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet as WalletIcon, Plus, TrendingUp, TrendingDown,
  Download, Filter, Clock, CheckCircle2, XCircle, RefreshCw,
  CreditCard, Shield, Eye, EyeOff, ArrowUpRight, ArrowDownLeft,
  Calendar, Search, Building, Smartphone, Zap, BarChart3,
  History, Receipt, Coins, PiggyBank
} from 'lucide-react';

function Wallet() {
  const [activeTab, setActiveTab] = useState('transactions');
  const [showBalance, setShowBalance] = useState(true);
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [filter, setFilter] = useState('all');

  // Mock wallet data
  const walletData = {
    balance: 12450.75,
    available: 8450.25,
    onHold: 4000.50,
    weeklyGrowth: 12.5,
    totalEarnings: 89245.00,
    commissionPaid: 3123.58,
    refundsReceived: 450.00
  };

  const transactions = [
    {
      id: 1,
      type: 'credit',
      amount: 5400.00,
      description: 'Load #LD-2847-XP - LA to SF',
      date: '2024-01-18 14:30',
      status: 'completed',
      category: 'load_payment'
    },
    {
      id: 2,
      type: 'debit',
      amount: 189.00,
      description: 'Platform Commission',
      date: '2024-01-18 14:30',
      status: 'completed',
      category: 'commission'
    },
    {
      id: 3,
      type: 'credit',
      amount: 3200.00,
      description: 'Load #LD-2834-AB - Chicago to Miami',
      date: '2024-01-17 11:15',
      status: 'completed',
      category: 'load_payment'
    },
    {
      id: 4,
      type: 'debit',
      amount: 112.00,
      description: 'Platform Commission',
      date: '2024-01-17 11:15',
      status: 'completed',
      category: 'commission'
    },
    {
      id: 5,
      type: 'debit',
      amount: 250.00,
      description: 'Fuel - Truck Stop #45',
      date: '2024-01-16 16:45',
      status: 'completed',
      category: 'expense'
    },
    {
      id: 6,
      type: 'credit',
      amount: 450.00,
      description: 'Refund - Overcharged Commission',
      date: '2024-01-15 09:20',
      status: 'completed',
      category: 'refund'
    },
    {
      id: 7,
      type: 'credit',
      amount: 1000.00,
      description: 'Added via Credit Card',
      date: '2024-01-14 13:10',
      status: 'completed',
      category: 'deposit'
    },
    {
      id: 8,
      type: 'debit',
      amount: 500.00,
      description: 'Withdrawal to Account',
      date: '2024-01-13 10:30',
      status: 'processing',
      category: 'withdrawal'
    }
  ];

  const commissions = [
    {
      id: 1,
      loadId: 'LD-2847-XP',
      amount: 189.00,
      rate: '3.5%',
      date: '2024-01-18',
      status: 'completed',
      loadAmount: 5400.00
    },
    {
      id: 2,
      loadId: 'LD-2834-AB',
      amount: 112.00,
      rate: '3.5%',
      date: '2024-01-17',
      status: 'completed',
      loadAmount: 3200.00
    },
    {
      id: 3,
      loadId: 'LD-2821-CD',
      amount: 157.50,
      rate: '3.5%',
      date: '2024-01-15',
      status: 'completed',
      loadAmount: 4500.00
    }
  ];

  const refunds = [
    {
      id: 1,
      reason: 'Overcharged Commission',
      amount: 450.00,
      date: '2024-01-15',
      status: 'completed',
      originalCommission: 189.00
    },
    {
      id: 2,
      reason: 'Load Cancellation Fee',
      amount: 250.00,
      date: '2024-01-10',
      status: 'completed',
      originalCommission: 112.00
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true;
    return transaction.category === filter;
  });

  const getCategoryColor = (category) => {
    const colors = {
      load_payment: 'text-green-600 bg-green-50 border-green-200',
      commission: 'text-blue-600 bg-blue-50 border-blue-200',
      expense: 'text-amber-600 bg-amber-50 border-amber-200',
      refund: 'text-purple-600 bg-purple-50 border-purple-200',
      deposit: 'text-cyan-600 bg-cyan-50 border-cyan-200',
      withdrawal: 'text-gray-600 bg-gray-50 border-gray-200'
    };
    return colors[category] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getStatusIcon = (status) => {
    return status === 'completed' ? 
      <CheckCircle2 className="w-4 h-4 text-green-500" /> : 
      <Clock className="w-4 h-4 text-amber-500" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50/30">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20 py-2">
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
              <div className="p-2 sm:p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl sm:rounded-2xl shadow-lg">
                <WalletIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Wallet</h1>
                <p className="text-gray-600 text-xs sm:text-sm hidden xs:block">
                  Manage your earnings and transactions
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
              <button 
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 sm:p-3 bg-gray-100 hover:bg-gray-200 rounded-xl sm:rounded-2xl transition-colors"
              >
                {showBalance ? <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" /> : <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />}
              </button>
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold shadow-lg text-sm sm:text-base">
                JD
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column - Balance & Quick Actions */}
          <div className="space-y-4 sm:space-y-6">
            {/* Balance Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-gray-200 overflow-hidden"
            >
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">Total Balance</h2>
                  <div className="flex items-center space-x-1 sm:space-x-2 text-green-600 bg-green-50 px-2 sm:px-3 py-1 rounded-full">
                    <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm font-semibold">+{walletData.weeklyGrowth}%</span>
                  </div>
                </div>

                <div className="text-center mb-4 sm:mb-6">
                  {showBalance ? (
                    <div className="space-y-1 sm:space-y-2">
                      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                        ₹{walletData.balance.toLocaleString()}
                      </div>
                      <div className="text-green-600 font-semibold text-sm sm:text-base lg:text-lg">
                        +₹{walletData.weeklyGrowth} this week
                      </div>
                    </div>
                  ) : (
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 blur-md select-none">
                      ₹12,450.75
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
                  <div className="text-center p-3 sm:p-4 bg-green-50 rounded-xl sm:rounded-2xl border border-green-200">
                    <div className="text-green-600 font-bold text-lg sm:text-xl">
                      ₹{walletData.available.toLocaleString()}
                    </div>
                    <div className="text-gray-600 text-xs sm:text-sm font-medium">Available</div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-amber-50 rounded-xl sm:rounded-2xl border border-amber-200">
                    <div className="text-amber-600 font-bold text-lg sm:text-xl">
                      ₹{walletData.onHold.toLocaleString()}
                    </div>
                    <div className="text-gray-600 text-xs sm:text-sm font-medium">On Hold</div>
                  </div>
                </div>

                <div className="flex flex-col xs:flex-row space-y-2 xs:space-y-0 xs:space-x-2 sm:space-x-3">
                  <button 
                    onClick={() => setShowAddMoney(true)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-base"
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Add Money</span>
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 text-sm sm:text-base">
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Withdraw</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-gray-200 p-4 sm:p-6"
            >
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6 flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <span>Earnings Overview</span>
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { label: 'Total Earnings', value: `₹${walletData.totalEarnings.toLocaleString()}`, color: 'text-green-600', icon: TrendingUp, bg: 'bg-green-50' },
                  { label: 'Commission Paid', value: `₹${walletData.commissionPaid.toLocaleString()}`, color: 'text-blue-600', icon: TrendingDown, bg: 'bg-blue-50' },
                  { label: 'Refunds Received', value: `₹${walletData.refundsReceived.toLocaleString()}`, color: 'text-purple-600', icon: RefreshCw, bg: 'bg-purple-50' }
                ].map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 sm:p-4 hover:bg-gray-50 rounded-xl sm:rounded-2xl transition-colors group">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl ${stat.bg}`}>
                        <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
                      </div>
                      <span className="text-gray-700 font-semibold text-sm sm:text-base">{stat.label}</span>
                    </div>
                    <span className={`font-bold text-base sm:text-lg ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Payment Methods */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-gray-200 p-4 sm:p-6"
            >
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6 flex items-center space-x-2">
                <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600" />
                <span>Payment Methods</span>
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { type: 'Credit Card', last4: '4242', primary: true, icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { type: 'Digital Wallet', last4: 'PayPal', primary: false, icon: Smartphone, color: 'text-green-600', bg: 'bg-green-50' },
                  { type: 'Bank Transfer', last4: '7284', primary: false, icon: Building, color: 'text-purple-600', bg: 'bg-purple-50' }
                ].map((method, index) => (
                  <div key={index} className="flex items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-xl sm:rounded-2xl hover:border-gray-300 transition-colors group hover:shadow-sm">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl ${method.bg}`}>
                        <method.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${method.color}`} />
                      </div>
                      <div className="min-w-0">
                        <div className="text-gray-900 font-semibold text-sm sm:text-base truncate">{method.type}</div>
                        <div className="text-gray-500 text-xs sm:text-sm">**** {method.last4}</div>
                      </div>
                    </div>
                    {method.primary && (
                      <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 text-xs sm:text-sm font-medium rounded-full border border-green-200 whitespace-nowrap">
                        Primary
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Transactions & History */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Main Tabs Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-gray-200 overflow-hidden"
            >
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
                  {/* Tabs */}
                  <div className="flex space-x-1 bg-gray-100 rounded-xl sm:rounded-2xl p-1 overflow-x-auto">
                    {[
                      { id: 'transactions', label: 'Transactions', icon: Receipt },
                      { id: 'commissions', label: 'Commissions', icon: Coins },
                      { id: 'refunds', label: 'Refunds', icon: PiggyBank }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all whitespace-nowrap text-xs sm:text-sm ${
                          activeTab === tab.id
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <tab.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Search and Filter */}
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
                      <input
                        type="text"
                        placeholder="Search transactions..."
                        className="pl-7 sm:pl-10 pr-3 sm:pr-4 py-2 border border-gray-300 rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                      />
                    </div>
                    <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                      <Filter className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Filter Chips */}
                <div className="flex flex-wrap gap-1 sm:gap-2 mt-3 sm:mt-4">
                  {[
                    { id: 'all', label: 'All' },
                    { id: 'load_payment', label: 'Load Payments' },
                    { id: 'commission', label: 'Commissions' },
                    { id: 'expense', label: 'Expenses' },
                    { id: 'refund', label: 'Refunds' }
                  ].map((chip) => (
                    <button
                      key={chip.id}
                      onClick={() => setFilter(chip.id)}
                      className={`px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                        filter === chip.id
                          ? 'bg-blue-500 text-white shadow-sm'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Area */}
              <div className="p-4 sm:p-6">
                <AnimatePresence mode="wait">
                  {/* Transactions Tab */}
                  {activeTab === 'transactions' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3 sm:space-y-4"
                    >
                      {filteredTransactions.map((transaction) => (
                        <motion.div
                          key={transaction.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-between p-3 sm:p-4 lg:p-5 border border-gray-200 rounded-xl sm:rounded-2xl hover:border-gray-300 transition-colors group hover:shadow-sm"
                        >
                          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 min-w-0 flex-1">
                            <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl border-2 ${getCategoryColor(transaction.category)} flex-shrink-0`}>
                              {transaction.type === 'credit' ? (
                                <ArrowDownLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                              ) : (
                                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-gray-900 font-semibold text-sm sm:text-base truncate">
                                {transaction.description}
                              </div>
                              <div className="flex items-center space-x-2 sm:space-x-3 text-gray-500 text-xs sm:text-sm mt-1">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                <span className="truncate">{transaction.date}</span>
                                {getStatusIcon(transaction.status)}
                              </div>
                            </div>
                          </div>
                          <div className={`text-right ml-2 sm:ml-4 flex-shrink-0 ${
                            transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            <div className="font-bold text-base sm:text-lg lg:text-xl">
                              {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                            </div>
                            <div className="text-gray-500 text-xs sm:text-sm capitalize font-medium">
                              {transaction.type}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* Commissions Tab */}
                  {activeTab === 'commissions' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3 sm:space-y-4"
                    >
                      {commissions.map((commission) => (
                        <motion.div
                          key={commission.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-between p-3 sm:p-4 lg:p-5 border border-gray-200 rounded-xl sm:rounded-2xl hover:border-gray-300 transition-colors group hover:shadow-sm"
                        >
                          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 min-w-0 flex-1">
                            <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl border-2 border-blue-200 bg-blue-50 flex-shrink-0">
                              <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-gray-900 font-semibold text-sm sm:text-base truncate">
                                Commission - Load #{commission.loadId}
                              </div>
                              <div className="text-gray-500 text-xs sm:text-sm mt-1">
                                Rate: {commission.rate} • Load: ₹{commission.loadAmount.toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <div className="text-right ml-2 sm:ml-4 flex-shrink-0">
                            <div className="text-red-600 font-bold text-base sm:text-lg lg:text-xl">
                              -₹{commission.amount.toLocaleString()}
                            </div>
                            <div className="text-gray-500 text-xs sm:text-sm font-medium">
                              Completed
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}

                  {/* Refunds Tab */}
                  {activeTab === 'refunds' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-3 sm:space-y-4"
                    >
                      {refunds.map((refund) => (
                        <motion.div
                          key={refund.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-between p-3 sm:p-4 lg:p-5 border border-gray-200 rounded-xl sm:rounded-2xl hover:border-gray-300 transition-colors group hover:shadow-sm"
                        >
                          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 min-w-0 flex-1">
                            <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl border-2 border-purple-200 bg-purple-50 flex-shrink-0">
                              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-gray-900 font-semibold text-sm sm:text-base truncate">
                                {refund.reason}
                              </div>
                              <div className="text-gray-500 text-xs sm:text-sm mt-1">
                                Original: ₹{refund.originalCommission.toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <div className="text-right ml-2 sm:ml-4 flex-shrink-0">
                            <div className="text-green-600 font-bold text-base sm:text-lg lg:text-xl">
                              +₹{refund.amount.toLocaleString()}
                            </div>
                            <div className="text-gray-500 text-xs sm:text-sm font-medium">
                              Completed
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Export Button */}
                <div className="flex justify-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                  <button className="flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-xl sm:rounded-2xl font-semibold hover:bg-gray-50 transition-colors hover:shadow-sm text-xs sm:text-sm">
                    <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Export Statement</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Add Money Modal */}
      <AnimatePresence>
        {showAddMoney && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full border border-gray-200"
            >
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">Add Money</h3>
                  <button
                    onClick={() => setShowAddMoney(false)}
                    className="p-1 sm:p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                      Amount
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 rounded-xl sm:rounded-2xl text-xl sm:text-2xl font-bold text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                      Payment Method
                    </label>
                    <select className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base">
                      <option>Credit Card (4242)</option>
                      <option>Digital Wallet</option>
                      <option>Bank Transfer</option>
                    </select>
                  </div>

                  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg hover:shadow-xl transition-all duration-300">
                    Add ₹1,000.00
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Wallet;