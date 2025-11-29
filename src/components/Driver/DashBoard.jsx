import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  Truck, Package, Wallet, Navigation, MapPin, 
  Clock, DollarSign, TrendingUp, AlertCircle,
  CheckCircle2, RefreshCw, MoreVertical,
  Menu, X
} from 'lucide-react';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentLocation, setCurrentLocation] = useState('Austin, TX');
  const [refreshing, setRefreshing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Mock data - In real app, this would come from APIs
  const dashboardData = {
    wallet: {
      balance: 12450.75,
      weeklyGrowth: 12.5,
      pending: 8450.00,
      available: 4000.75,
      transactions: [
        { id: 1, amount: 4500, type: 'credit', date: '2024-01-15', description: 'Load #1234 - LA to NY' },
        { id: 2, amount: -320, type: 'debit', date: '2024-01-14', description: 'Fuel - Truck Stop #45' },
        { id: 3, amount: 6200, type: 'credit', date: '2024-01-12', description: 'Load #1231 - Chicago to Miami' }
      ]
    },

    activeJob: {
      id: 'TRK-001',
      status: 'in-progress',
      pickup: 'Los Angeles, CA',
      delivery: 'San Francisco, CA',
      distance: 382,
      estimatedPay: 860,
      progress: 65,
      deadline: '2024-01-18 14:00',
      currentLocation: 'Bakersfield, CA',
      eta: '4 hours 30 min'
    },

    nearbyLoads: [
      { 
        id: 1, 
        from: 'Austin, TX', 
        to: 'Dallas, TX', 
        distance: 248, 
        pay: 540, 
        match: 92,
        pickupTime: 'Today, 16:00',
        weight: '12,000 lbs',
        type: 'Dry Van'
      },
      { 
        id: 2, 
        from: 'San Antonio, TX', 
        to: 'Houston, TX', 
        distance: 197, 
        pay: 480, 
        match: 87,
        pickupTime: 'Today, 18:30',
        weight: '8,500 lbs',
        type: 'Refrigerated'
      },
      { 
        id: 3, 
        from: 'Dallas, TX', 
        to: 'Oklahoma City, OK', 
        distance: 206, 
        pay: 520, 
        match: 78,
        pickupTime: 'Tomorrow, 08:00',
        weight: '15,000 lbs',
        type: 'Dry Van'
      }
    ],

    performance: [
      { day: 'Mon', earnings: 450, miles: 320 },
      { day: 'Tue', earnings: 620, miles: 450 },
      { day: 'Wed', earnings: 580, miles: 380 },
      { day: 'Thu', earnings: 710, miles: 520 },
      { day: 'Fri', earnings: 680, miles: 410 },
      { day: 'Sat', earnings: 820, miles: 480 },
      { day: 'Sun', earnings: 1245, miles: 620 }
    ],

    quickStats: {
      rating: 4.8,
      completedJobs: 24,
      onTimeRate: 96,
      weeklyMiles: 1248
    }
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const refreshData = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => setRefreshing(false), 1000);
  };

  // Responsive text size classes
  const getResponsiveText = {
    heading: "text-xl md:text-2xl lg:text-3xl font-bold",
    subheading: "text-lg md:text-xl font-semibold",
    body: "text-sm md:text-base",
    small: "text-xs md:text-sm",
    stat: "text-xl md:text-2xl lg:text-3xl font-bold",
    metric: "text-base md:text-lg font-semibold"
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Truck className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h1 className={`${getResponsiveText.heading} text-gray-900`}>DrivePro Logistics</h1>
                <p className="text-gray-600 flex items-center space-x-1">
                  <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                  <span className={getResponsiveText.small}>Current Location: {currentLocation}</span>
                </p>
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={refreshData}
                className="flex items-center space-x-2 px-3 py-2 md:px-4 md:py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </motion.button>
              
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 md:hidden text-gray-600 hover:text-gray-900"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              
              <div className="hidden md:flex items-center space-x-3">
                <div className="text-right">
                  <p className="font-semibold text-gray-900">John Driver</p>
                  <p className="text-sm text-green-600 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Online
                  </p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  JD
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="px-4 sm:px-6">
          <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:flex space-y-2 md:space-y-0 md:space-x-8 pb-4 md:pb-0`}>
            {['overview', 'loads', 'earnings', 'analytics'].map((tab) => (
              <button
                key={tab}
                className={`block w-full md:w-auto py-2 md:py-3 px-1 border-b-2 font-medium ${getResponsiveText.small} transition-colors ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => {
                  setActiveTab(tab);
                  setMobileMenuOpen(false);
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="p-4 sm:p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4 md:space-y-6"
            >
              {/* Quick Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                  { 
                    label: 'Wallet Balance', 
                    value: `$${dashboardData.wallet.balance.toLocaleString()}`, 
                    change: '+12.5%', 
                    icon: Wallet,
                    color: 'text-green-600',
                    bgColor: 'bg-green-50'
                  },
                  { 
                    label: 'Active Job Progress', 
                    value: `${dashboardData.activeJob.progress}%`, 
                    change: 'On track', 
                    icon: Navigation,
                    color: 'text-blue-600',
                    bgColor: 'bg-blue-50'
                  },
                  { 
                    label: 'Weekly Earnings', 
                    value: '$2,845', 
                    change: '+8.2%', 
                    icon: TrendingUp,
                    color: 'text-purple-600',
                    bgColor: 'bg-purple-50'
                  },
                  { 
                    label: 'Nearby Loads', 
                    value: dashboardData.nearbyLoads.length.toString(), 
                    change: 'High match', 
                    icon: Package,
                    color: 'text-orange-600',
                    bgColor: 'bg-orange-50'
                  }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -2 }}
                    className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className={`${getResponsiveText.small} font-medium text-gray-600 truncate`}>{stat.label}</p>
                        <p className={`${getResponsiveText.stat} text-gray-900 mt-1 truncate`}>{stat.value}</p>
                        <p className={`${getResponsiveText.small} ${stat.color} mt-1 truncate`}>{stat.change}</p>
                      </div>
                      <div className={`p-2 md:p-3 rounded-lg ${stat.bgColor} flex-shrink-0 ml-3`}>
                        <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                {/* Active Job Summary */}
                <div className="lg:col-span-2 space-y-4 md:space-y-6">
                  {/* Active Job Card */}
                  <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4 md:mb-6">
                      <h2 className={getResponsiveText.subheading}>Active Job</h2>
                      <span className="px-2 py-1 md:px-3 md:py-1 bg-blue-100 text-blue-800 text-xs md:text-sm font-medium rounded-full">
                        In Progress
                      </span>
                    </div>

                    <div className="space-y-4 md:space-y-6">
                      {/* Route */}
                      <div className="flex items-center justify-between space-x-2 md:space-x-4">
                        <div className="text-center flex-shrink-0">
                          <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mb-1 md:mb-2 text-xs md:text-base">
                            A
                          </div>
                          <p className={`${getResponsiveText.small} font-medium text-gray-900 truncate`}>{dashboardData.activeJob.pickup}</p>
                        </div>
                        
                        <div className="flex-1 mx-2 md:mx-4">
                          <div className="relative">
                            <div className="h-1 bg-gray-200 rounded-full">
                              <div 
                                className="h-1 bg-blue-600 rounded-full transition-all duration-500"
                                style={{ width: `${dashboardData.activeJob.progress}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 mt-2">
                              <span>Start</span>
                              <span>{dashboardData.activeJob.progress}%</span>
                              <span>End</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-center flex-shrink-0">
                          <div className="w-8 h-8 md:w-10 md:h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold mb-1 md:mb-2 text-xs md:text-base">
                            B
                          </div>
                          <p className={`${getResponsiveText.small} font-medium text-gray-900 truncate`}>{dashboardData.activeJob.delivery}</p>
                        </div>
                      </div>

                      {/* Job Details */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
                        <div className="text-center p-2 md:p-3 bg-gray-50 rounded-lg">
                          <p className={`${getResponsiveText.small} text-gray-600`}>Distance</p>
                          <p className={`${getResponsiveText.metric} text-gray-900`}>{dashboardData.activeJob.distance} mi</p>
                        </div>
                        <div className="text-center p-2 md:p-3 bg-gray-50 rounded-lg">
                          <p className={`${getResponsiveText.small} text-gray-600`}>Est. Pay</p>
                          <p className={`${getResponsiveText.metric} text-gray-900`}>${dashboardData.activeJob.estimatedPay}</p>
                        </div>
                        <div className="text-center p-2 md:p-3 bg-gray-50 rounded-lg">
                          <p className={`${getResponsiveText.small} text-gray-600`}>ETA</p>
                          <p className={`${getResponsiveText.metric} text-gray-900 truncate`}>{dashboardData.activeJob.eta}</p>
                        </div>
                        <div className="text-center p-2 md:p-3 bg-gray-50 rounded-lg">
                          <p className={`${getResponsiveText.small} text-gray-600`}>Current</p>
                          <p className={`${getResponsiveText.metric} text-gray-900 truncate`}>{dashboardData.activeJob.currentLocation}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Earnings Chart */}
                  <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
                    <h2 className={`${getResponsiveText.subheading} mb-4 md:mb-6`}>Weekly Performance</h2>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={dashboardData.performance}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                        <XAxis dataKey="day" stroke="#6b7280" fontSize={isMobile ? 10 : 12} />
                        <YAxis stroke="#6b7280" fontSize={isMobile ? 10 : 12} />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="earnings" 
                          stroke="#3b82f6" 
                          fill="url(#colorEarnings)" 
                          fillOpacity={0.3}
                          strokeWidth={2}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="miles" 
                          stroke="#10b981" 
                          strokeWidth={2}
                          dot={{ fill: '#10b981' }}
                        />
                        <defs>
                          <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-4 md:space-y-6">
                  {/* Wallet Balance Card */}
                  <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4 md:mb-6">
                      <h2 className={getResponsiveText.subheading}>Wallet</h2>
                      <Wallet className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                    </div>
                    
                    <div className="text-center mb-4 md:mb-6">
                      <p className={`${getResponsiveText.small} text-gray-600`}>Total Balance</p>
                      <p className={`${getResponsiveText.stat} text-gray-900 mt-1`}>
                        ${dashboardData.wallet.balance.toLocaleString()}
                      </p>
                      <p className="text-green-600 text-xs md:text-sm mt-1 flex items-center justify-center">
                        <TrendingUp className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                        +{dashboardData.wallet.weeklyGrowth}% this week
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-6">
                      <div className="text-center p-2 md:p-3 bg-blue-50 rounded-lg">
                        <p className={`${getResponsiveText.small} text-blue-600`}>Available</p>
                        <p className={`${getResponsiveText.metric} text-gray-900`}>${dashboardData.wallet.available.toLocaleString()}</p>
                      </div>
                      <div className="text-center p-2 md:p-3 bg-orange-50 rounded-lg">
                        <p className={`${getResponsiveText.small} text-orange-600`}>Pending</p>
                        <p className={`${getResponsiveText.metric} text-gray-900`}>${dashboardData.wallet.pending.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2 md:space-x-3">
                      <button className="flex-1 bg-blue-600 text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm md:text-base">
                        Withdraw
                      </button>
                      <button className="flex-1 bg-gray-100 text-gray-700 py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-sm md:text-base">
                        History
                      </button>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-100">
                    <h2 className={`${getResponsiveText.subheading} mb-4 md:mb-6`}>Performance</h2>
                    <div className="space-y-3 md:space-y-4">
                      {[
                        { label: 'Driver Rating', value: dashboardData.quickStats.rating, icon: TrendingUp, color: 'text-yellow-500' },
                        { label: 'Completed Jobs', value: dashboardData.quickStats.completedJobs, icon: CheckCircle2, color: 'text-green-500' },
                        { label: 'On-time Rate', value: `${dashboardData.quickStats.onTimeRate}%`, icon: Clock, color: 'text-blue-500' },
                        { label: 'Weekly Miles', value: dashboardData.quickStats.weeklyMiles.toLocaleString(), icon: Navigation, color: 'text-purple-500' }
                      ].map((metric, index) => (
                        <div key={index} className="flex items-center justify-between p-2 md:p-3 hover:bg-gray-50 rounded-lg transition-colors">
                          <div className="flex items-center space-x-2 md:space-x-3 min-w-0 flex-1">
                            <div className={`p-1 md:p-2 rounded-lg bg-gray-50 ${metric.color} flex-shrink-0`}>
                              <metric.icon className="w-3 h-3 md:w-4 md:h-4" />
                            </div>
                            <span className={`${getResponsiveText.small} font-medium text-gray-700 truncate`}>{metric.label}</span>
                          </div>
                          <span className={`${getResponsiveText.metric} text-gray-900 flex-shrink-0 ml-2`}>{metric.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Nearby Loads Tab */}
          {activeTab === 'loads' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-4 md:p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <div className="flex-1 min-w-0">
                      <h2 className={getResponsiveText.subheading}>Nearby Loads</h2>
                      <p className={`${getResponsiveText.small} text-gray-600 mt-1`}>Based on your current location in {currentLocation}</p>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <button className="px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm md:text-base">
                        Filter
                      </button>
                      <button className="px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm md:text-base">
                        New Search
                      </button>
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {dashboardData.nearbyLoads.map((load) => (
                    <motion.div
                      key={load.id}
                      whileHover={{ backgroundColor: '#f9fafb' }}
                      className="p-4 md:p-6 transition-colors"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-3">
                            <div className="flex items-center space-x-2 min-w-0">
                              <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                              <span className={`${getResponsiveText.body} font-semibold text-gray-900 truncate`}>{load.from}</span>
                              <span className="text-gray-300 flex-shrink-0">→</span>
                              <span className={`${getResponsiveText.body} font-semibold text-gray-900 truncate`}>{load.to}</span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              load.match >= 90 
                                ? 'bg-green-100 text-green-800'
                                : load.match >= 80
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-orange-100 text-orange-800'
                            } flex-shrink-0 self-start sm:self-auto`}>
                              {load.match}% match
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                            <div className="min-w-0">
                              <p className={`${getResponsiveText.small} text-gray-600`}>Distance</p>
                              <p className={`${getResponsiveText.body} font-medium text-gray-900 truncate`}>{load.distance} miles</p>
                            </div>
                            <div className="min-w-0">
                              <p className={`${getResponsiveText.small} text-gray-600`}>Pay</p>
                              <p className={`${getResponsiveText.body} font-medium text-gray-900 truncate`}>${load.pay}</p>
                            </div>
                            <div className="min-w-0">
                              <p className={`${getResponsiveText.small} text-gray-600`}>Pickup</p>
                              <p className={`${getResponsiveText.body} font-medium text-gray-900 truncate`}>{load.pickupTime}</p>
                            </div>
                            <div className="min-w-0">
                              <p className={`${getResponsiveText.small} text-gray-600`}>Type</p>
                              <p className={`${getResponsiveText.body} font-medium text-gray-900 truncate`}>{load.type}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-end space-x-2 sm:space-x-3 lg:ml-6 lg:justify-start">
                          <button className="px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm md:text-base whitespace-nowrap">
                            Accept Load
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                            <MoreVertical className="w-4 h-4 md:w-5 md:h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default Dashboard;