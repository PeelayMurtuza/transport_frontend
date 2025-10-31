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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-lg">
                <WalletIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Wallet</h1>
                <p className="text-gray-600">Manage your earnings and transactions</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowBalance(!showBalance)}
                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-colors"
              >
                {showBalance ? <EyeOff className="w-5 h-5 text-gray-600" /> : <Eye className="w-5 h-5 text-gray-600" />}
              </button>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                JD
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Balance & Quick Actions */}
          <div className="space-y-6">
            {/* Balance Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Total Balance</h2>
                  <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-semibold">+{walletData.weeklyGrowth}%</span>
                  </div>
                </div>

                <div className="text-center mb-6">
                  {showBalance ? (
                    <div className="space-y-2">
                      <div className="text-5xl font-bold text-gray-900">
                        ${walletData.balance.toLocaleString()}
                      </div>
                      <div className="text-green-600 font-semibold text-lg">
                        +${walletData.weeklyGrowth} this week
                      </div>
                    </div>
                  ) : (
                    <div className="text-5xl font-bold text-gray-900 blur-md select-none">
                      $12,450.75
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-2xl border border-green-200">
                    <div className="text-green-600 font-bold text-xl">
                      ${walletData.available.toLocaleString()}
                    </div>
                    <div className="text-gray-600 text-sm font-medium">Available</div>
                  </div>
                  <div className="text-center p-4 bg-amber-50 rounded-2xl border border-amber-200">
                    <div className="text-amber-600 font-bold text-xl">
                      ${walletData.onHold.toLocaleString()}
                    </div>
                    <div className="text-gray-600 text-sm font-medium">On Hold</div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button 
                    onClick={() => setShowAddMoney(true)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-bold hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Add Money</span>
                  </button>
                  <button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-4 rounded-2xl font-bold hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-3">
                    <ArrowUpRight className="w-5 h-5" />
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
              className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span>Earnings Overview</span>
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Total Earnings', value: `$${walletData.totalEarnings.toLocaleString()}`, color: 'text-green-600', icon: TrendingUp, bg: 'bg-green-50' },
                  { label: 'Commission Paid', value: `$${walletData.commissionPaid.toLocaleString()}`, color: 'text-blue-600', icon: TrendingDown, bg: 'bg-blue-50' },
                  { label: 'Refunds Received', value: `$${walletData.refundsReceived.toLocaleString()}`, color: 'text-purple-600', icon: RefreshCw, bg: 'bg-purple-50' }
                ].map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors group">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-2xl ${stat.bg}`}>
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <span className="text-gray-700 font-semibold">{stat.label}</span>
                    </div>
                    <span className={`font-bold text-lg ${stat.color}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Payment Methods */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-cyan-600" />
                <span>Payment Methods</span>
              </h3>
              <div className="space-y-4">
                {[
                  { type: 'Credit Card', last4: '4242', primary: true, icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { type: 'Digital Wallet', last4: 'PayPal', primary: false, icon: Smartphone, color: 'text-green-600', bg: 'bg-green-50' },
                  { type: 'Bank Transfer', last4: '7284', primary: false, icon: Building, color: 'text-purple-600', bg: 'bg-purple-50' }
                ].map((method, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl hover:border-gray-300 transition-colors group hover:shadow-sm">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-2xl ${method.bg}`}>
                        <method.icon className={`w-5 h-5 ${method.color}`} />
                      </div>
                      <div>
                        <div className="text-gray-900 font-semibold">{method.type}</div>
                        <div className="text-gray-500 text-sm">**** {method.last4}</div>
                      </div>
                    </div>
                    {method.primary && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full border border-green-200">
                        Primary
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Transactions & History */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Tabs Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Tabs */}
                  <div className="flex space-x-1 bg-gray-100 rounded-2xl p-1">
                    {[
                      { id: 'transactions', label: 'Transactions', icon: Receipt },
                      { id: 'commissions', label: 'Commissions', icon: Coins },
                      { id: 'refunds', label: 'Refunds', icon: PiggyBank }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                          activeTab === tab.id
                            ? 'bg-white text-gray-900 shadow-sm'
                            : 'text-gray-600 hover:text-gray-900'
                        }`}
                      >
                        <tab.icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Search and Filter */}
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search transactions..."
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                      <Filter className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Filter Chips */}
                <div className="flex flex-wrap gap-2 mt-4">
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
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
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
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {/* Transactions Tab */}
                  {activeTab === 'transactions' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      {filteredTransactions.map((transaction) => (
                        <motion.div
                          key={transaction.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-between p-5 border border-gray-200 rounded-2xl hover:border-gray-300 transition-colors group hover:shadow-sm"
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`p-3 rounded-2xl border-2 ${getCategoryColor(transaction.category)}`}>
                              {transaction.type === 'credit' ? (
                                <ArrowDownLeft className="w-5 h-5" />
                              ) : (
                                <ArrowUpRight className="w-5 h-5" />
                              )}
                            </div>
                            <div>
                              <div className="text-gray-900 font-semibold">
                                {transaction.description}
                              </div>
                              <div className="flex items-center space-x-3 text-gray-500 text-sm mt-1">
                                <Calendar className="w-4 h-4" />
                                <span>{transaction.date}</span>
                                {getStatusIcon(transaction.status)}
                              </div>
                            </div>
                          </div>
                          <div className={`text-right ${
                            transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            <div className="font-bold text-xl">
                              {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                            </div>
                            <div className="text-gray-500 text-sm capitalize font-medium">
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
                      className="space-y-4"
                    >
                      {commissions.map((commission) => (
                        <motion.div
                          key={commission.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-between p-5 border border-gray-200 rounded-2xl hover:border-gray-300 transition-colors group hover:shadow-sm"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-2xl border-2 border-blue-200 bg-blue-50">
                              <TrendingDown className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-gray-900 font-semibold">
                                Commission - Load #{commission.loadId}
                              </div>
                              <div className="text-gray-500 text-sm mt-1">
                                Rate: {commission.rate} • Load: ${commission.loadAmount.toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-red-600 font-bold text-xl">
                              -${commission.amount.toLocaleString()}
                            </div>
                            <div className="text-gray-500 text-sm font-medium">
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
                      className="space-y-4"
                    >
                      {refunds.map((refund) => (
                        <motion.div
                          key={refund.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center justify-between p-5 border border-gray-200 rounded-2xl hover:border-gray-300 transition-colors group hover:shadow-sm"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-2xl border-2 border-purple-200 bg-purple-50">
                              <RefreshCw className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <div className="text-gray-900 font-semibold">
                                {refund.reason}
                              </div>
                              <div className="text-gray-500 text-sm mt-1">
                                Original: ${refund.originalCommission.toLocaleString()}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-green-600 font-bold text-xl">
                              +${refund.amount.toLocaleString()}
                            </div>
                            <div className="text-gray-500 text-sm font-medium">
                              Completed
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Export Button */}
                <div className="flex justify-center mt-8 pt-6 border-t border-gray-200">
                  <button className="flex items-center space-x-3 px-6 py-3 border border-gray-300 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-colors hover:shadow-sm">
                    <Download className="w-4 h-4" />
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
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full border border-gray-200"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Add Money</h3>
                  <button
                    onClick={() => setShowAddMoney(false)}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <XCircle className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Amount
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full px-4 py-4 border border-gray-300 rounded-2xl text-2xl font-bold text-gray-900 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Payment Method
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-transparent">
                      <option>Credit Card (4242)</option>
                      <option>Digital Wallet</option>
                      <option>Bank Transfer</option>
                    </select>
                  </div>

                  <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all duration-300">
                    Add $1,000.00
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