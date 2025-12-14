import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  Truck, Package, Wallet, Navigation, MapPin, 
  Clock, TrendingUp, AlertCircle,
  CheckCircle2, RefreshCw, MoreVertical,
  Menu, X, Moon, Sun
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext'; 

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentLocation, setCurrentLocation] = useState('Austin, TX');
  const [refreshing, setRefreshing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const { theme, isDark, toggleTheme } = useTheme();

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

  // Responsive text size classes with theme support
  const getResponsiveText = {
    heading: "text-xl md:text-2xl lg:text-3xl font-bold",
    subheading: "text-lg md:text-xl font-semibold",
    body: "text-sm md:text-base",
    small: "text-xs md:text-sm",
    stat: "text-xl md:text-2xl lg:text-3xl font-bold",
    metric: "text-base md:text-lg font-semibold"
  };

  // Chart color configurations for dark/light mode
  const chartColors = {
    earnings: isDark ? '#60a5fa' : '#3b82f6', // Blue
    miles: isDark ? '#34d399' : '#10b981', // Green
    grid: isDark ? '#374151' : '#f3f4f6',
    text: isDark ? '#d1d5db' : '#6b7280',
    tooltipBg: isDark ? '#1f2937' : '#ffffff',
    tooltipText: isDark ? '#ffffff' : '#111827',
  };

  return (
    <div className={`min-h-screen ${theme.bg.primary} transition-colors duration-200`}>
      {/* Header */}
      <header className={`${theme.bg.primary} ${theme.border.primary} border-b sticky top-0 z-50` }>
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 md:space-x-4">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Truck className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h1 className={`${getResponsiveText.heading} ${theme.text.primary}`}>
                  DrivePro Logistics
                </h1>
                <p className={`${theme.text.secondary} flex items-center space-x-1`}>
                  <MapPin className="w-3 h-3 md:w-4 md:h-4" />
                  <span className={getResponsiveText.small}>
                    Current Location: {currentLocation}
                  </span>
                </p>
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={refreshData}
                className={`flex items-center space-x-2 px-3 py-2 md:px-4 md:py-2 ${
                  theme.button.secondary
                } rounded-lg transition-colors`}
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </motion.button>
              
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 md:hidden ${theme.text.primary} hover:${theme.text.accent}`}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              
              <div className="hidden md:flex items-center space-x-3">
                <div className="text-right">
                  <p className={`font-semibold ${theme.text.primary}`}>John Driver</p>
                  <p className={`${theme.status.success} flex items-center text-sm`}>
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
                className={`block w-full md:w-auto py-2 md:py-3 px-1 border-b-2 font-medium ${
                  getResponsiveText.small
                } transition-colors ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : `${theme.text.tertiary} hover:${theme.text.secondary} border-transparent hover:border-gray-300`
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
                    value: `₹${dashboardData.wallet.balance.toLocaleString()}`, 
                    change: '+12.5%', 
                    icon: Wallet,
                    color: isDark ? 'text-green-400' : 'text-green-600',
                    bgColor: isDark ? 'bg-green-900/30' : 'bg-green-50'
                  },
                  { 
                    label: 'Active Job Progress', 
                    value: `${dashboardData.activeJob.progress}%`, 
                    change: 'On track', 
                    icon: Navigation,
                    color: isDark ? 'text-blue-400' : 'text-blue-600',
                    bgColor: isDark ? 'bg-blue-900/30' : 'bg-blue-50'
                  },
                  { 
                    label: 'Weekly Earnings', 
                    value: '₹2,845', 
                    change: '+8.2%', 
                    icon: TrendingUp,
                    color: isDark ? 'text-purple-400' : 'text-purple-600',
                    bgColor: isDark ? 'bg-purple-900/30' : 'bg-purple-50'
                  },
                  { 
                    label: 'Nearby Loads', 
                    value: dashboardData.nearbyLoads.length.toString(), 
                    change: 'High match', 
                    icon: Package,
                    color: isDark ? 'text-orange-400' : 'text-orange-600',
                    bgColor: isDark ? 'bg-orange-900/30' : 'bg-orange-50'
                  }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -2 }}
                    className={`${theme.card.bg} rounded-xl p-4 md:p-6 ${theme.shadow.sm} ${
                      theme.border.primary
                    } border transition-all duration-200`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className={`${getResponsiveText.small} font-medium ${
                          theme.text.secondary
                        } truncate`}>
                          {stat.label}
                        </p>
                        <p className={`${getResponsiveText.stat} ${theme.text.primary} mt-1 truncate`}>
                          {stat.value}
                        </p>
                        <p className={`${getResponsiveText.small} ${stat.color} mt-1 truncate`}>
                          {stat.change}
                        </p>
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
                  <div className={`${theme.card.bg} rounded-xl p-4 md:p-6 ${
                    theme.shadow.sm
                  } ${theme.border.primary} border transition-colors duration-200`}>
                    <div className="flex items-center justify-between mb-4 md:mb-6">
                      <h2 className={`${getResponsiveText.subheading} ${theme.text.primary}`}>
                        Active Job
                      </h2>
                      <span className={`px-2 py-1 md:px-3 md:py-1 ${
                        isDark ? 'bg-blue-800 text-blue-200' : 'bg-blue-100 text-blue-800'
                      } text-xs md:text-sm font-medium rounded-full`}>
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
                          <p className={`${getResponsiveText.small} font-medium ${
                            theme.text.primary
                          } truncate`}>
                            {dashboardData.activeJob.pickup}
                          </p>
                        </div>
                        
                        <div className="flex-1 mx-2 md:mx-4">
                          <div className="relative">
                            <div className={`h-1 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full`}>
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
                          <p className={`${getResponsiveText.small} font-medium ${
                            theme.text.primary
                          } truncate`}>
                            {dashboardData.activeJob.delivery}
                          </p>
                        </div>
                      </div>

                      {/* Job Details */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
                        {[
                          { label: 'Distance', value: `${dashboardData.activeJob.distance} mi`, bg: isDark ? 'bg-gray-700' : 'bg-gray-50' },
                          { label: 'Est. Pay', value: `₹${dashboardData.activeJob.estimatedPay}`, bg: isDark ? 'bg-gray-700' : 'bg-gray-50' },
                          { label: 'ETA', value: dashboardData.activeJob.eta, bg: isDark ? 'bg-gray-700' : 'bg-gray-50' },
                          { label: 'Current', value: dashboardData.activeJob.currentLocation, bg: isDark ? 'bg-gray-700' : 'bg-gray-50' }
                        ].map((detail, index) => (
                          <div key={index} className={`text-center p-2 md:p-3 ${detail.bg} rounded-lg transition-colors duration-200`}>
                            <p className={`${getResponsiveText.small} ${theme.text.secondary}`}>
                              {detail.label}
                            </p>
                            <p className={`${getResponsiveText.metric} ${theme.text.primary} truncate`}>
                              {detail.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Earnings Chart */}
                  <div className={`${theme.card.bg} rounded-xl p-4 md:p-6 ${
                    theme.shadow.sm
                  } ${theme.border.primary} border transition-colors duration-200`}>
                    <h2 className={`${getResponsiveText.subheading} ${theme.text.primary} mb-4 md:mb-6`}>
                      Weekly Performance
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={dashboardData.performance}>
                        <CartesianGrid 
                          strokeDasharray="3 3" 
                          stroke={chartColors.grid} 
                        />
                        <XAxis 
                          dataKey="day" 
                          stroke={chartColors.text}
                          fontSize={isMobile ? 10 : 12}
                        />
                        <YAxis 
                          stroke={chartColors.text}
                          fontSize={isMobile ? 10 : 12}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: chartColors.tooltipBg,
                            borderColor: chartColors.grid,
                            color: chartColors.tooltipText,
                            borderRadius: '8px',
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="earnings" 
                          stroke={chartColors.earnings}
                          fill="url(#colorEarnings)" 
                          fillOpacity={0.3}
                          strokeWidth={2}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="miles" 
                          stroke={chartColors.miles}
                          strokeWidth={2}
                          dot={{ fill: chartColors.miles }}
                        />
                        <defs>
                          <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={chartColors.earnings} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={chartColors.earnings} stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-4 md:space-y-6">
                  {/* Wallet Balance Card */}
                  <div className={`${theme.card.bg} rounded-xl p-4 md:p-6 ${
                    theme.shadow.sm
                  } ${theme.border.primary} border transition-colors duration-200`}>
                    <div className="flex items-center justify-between mb-4 md:mb-6">
                      <h2 className={`${getResponsiveText.subheading} ${theme.text.primary}`}>
                        Wallet
                      </h2>
                      <Wallet className={`w-4 h-4 md:w-5 md:h-5 ${theme.text.tertiary}`} />
                    </div>
                    
                    <div className="text-center mb-4 md:mb-6">
                      <p className={`${getResponsiveText.small} ${theme.text.secondary}`}>
                        Total Balance
                      </p>
                      <p className={`${getResponsiveText.stat} ${theme.text.primary} mt-1`}>
                        ₹{dashboardData.wallet.balance.toLocaleString()}
                      </p>
                      <p className={`text-green-600 text-xs md:text-sm mt-1 flex items-center justify-center ${
                        isDark ? 'text-green-400' : 'text-green-600'
                      }`}>
                        <TrendingUp className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                        +{dashboardData.wallet.weeklyGrowth}% this week
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 md:gap-4 mb-4 md:mb-6">
                      <div className={`text-center p-2 md:p-3 ${
                        isDark ? 'bg-blue-900/30' : 'bg-blue-50'
                      } rounded-lg transition-colors duration-200`}>
                        <p className={`${getResponsiveText.small} ${
                          isDark ? 'text-blue-400' : 'text-blue-600'
                        }`}>
                          Available
                        </p>
                        <p className={`${getResponsiveText.metric} ${theme.text.primary}`}>
                          ₹{dashboardData.wallet.available.toLocaleString()}
                        </p>
                      </div>
                      <div className={`text-center p-2 md:p-3 ${
                        isDark ? 'bg-orange-900/30' : 'bg-orange-50'
                      } rounded-lg transition-colors duration-200`}>
                        <p className={`${getResponsiveText.small} ${
                          isDark ? 'text-orange-400' : 'text-orange-600'
                        }`}>
                          Pending
                        </p>
                        <p className={`${getResponsiveText.metric} ${theme.text.primary}`}>
                          ₹{dashboardData.wallet.pending.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex space-x-2 md:space-x-3">
                      <button className={`flex-1 ${
                        theme.button.primary
                      } py-2 md:py-3 rounded-lg font-semibold transition-colors text-sm md:text-base`}>
                        Withdraw
                      </button>
                      <button className={`flex-1 ${
                        theme.button.secondary
                      } py-2 md:py-3 rounded-lg font-semibold transition-colors text-sm md:text-base`}>
                        History
                      </button>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className={`${theme.card.bg} rounded-xl p-4 md:p-6 ${
                    theme.shadow.sm
                  } ${theme.border.primary} border transition-colors duration-200`}>
                    <h2 className={`${getResponsiveText.subheading} ${theme.text.primary} mb-4 md:mb-6`}>
                      Performance
                    </h2>
                    <div className="space-y-3 md:space-y-4">
                      {[
                        { 
                          label: 'Driver Rating', 
                          value: dashboardData.quickStats.rating, 
                          icon: TrendingUp, 
                          color: isDark ? 'text-yellow-400' : 'text-yellow-500',
                          bg: isDark ? 'bg-gray-700' : 'bg-gray-50'
                        },
                        { 
                          label: 'Completed Jobs', 
                          value: dashboardData.quickStats.completedJobs, 
                          icon: CheckCircle2, 
                          color: isDark ? 'text-green-400' : 'text-green-500',
                          bg: isDark ? 'bg-gray-700' : 'bg-gray-50'
                        },
                        { 
                          label: 'On-time Rate', 
                          value: `${dashboardData.quickStats.onTimeRate}%`, 
                          icon: Clock, 
                          color: isDark ? 'text-blue-400' : 'text-blue-500',
                          bg: isDark ? 'bg-gray-700' : 'bg-gray-50'
                        },
                        { 
                          label: 'Weekly Miles', 
                          value: dashboardData.quickStats.weeklyMiles.toLocaleString(), 
                          icon: Navigation, 
                          color: isDark ? 'text-purple-400' : 'text-purple-500',
                          bg: isDark ? 'bg-gray-700' : 'bg-gray-50'
                        }
                      ].map((metric, index) => (
                        <div 
                          key={index} 
                          className={`flex items-center justify-between p-2 md:p-3 ${
                            theme.card.hover
                          } rounded-lg transition-colors duration-200`}
                        >
                          <div className="flex items-center space-x-2 md:space-x-3 min-w-0 flex-1">
                            <div className={`p-1 md:p-2 rounded-lg ${metric.bg} ${
                              metric.color
                            } flex-shrink-0 transition-colors duration-200`}>
                              <metric.icon className="w-3 h-3 md:w-4 md:h-4" />
                            </div>
                            <span className={`${getResponsiveText.small} font-medium ${
                              theme.text.secondary
                            } truncate`}>
                              {metric.label}
                            </span>
                          </div>
                          <span className={`${getResponsiveText.metric} ${
                            theme.text.primary
                          } flex-shrink-0 ml-2`}>
                            {metric.value}
                          </span>
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
              <div className={`${theme.card.bg} rounded-xl ${
                theme.shadow.sm
              } ${theme.border.primary} border transition-colors duration-200`}>
                <div className={`p-4 md:p-6 ${theme.border.primary} border-b`}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <div className="flex-1 min-w-0">
                      <h2 className={`${getResponsiveText.subheading} ${theme.text.primary}`}>
                        Nearby Loads
                      </h2>
                      <p className={`${getResponsiveText.small} ${theme.text.secondary} mt-1`}>
                        Based on your current location in {currentLocation}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <button className={`px-3 py-2 sm:px-4 sm:py-2 ${
                        theme.button.secondary
                      } rounded-lg text-sm md:text-base`}>
                        Filter
                      </button>
                      <button className={`px-3 py-2 sm:px-4 sm:py-2 ${
                        theme.button.primary
                      } rounded-lg text-sm md:text-base`}>
                        New Search
                      </button>
                    </div>
                  </div>
                </div>

                <div className={`divide-y ${theme.border.primary}`}>
                  {dashboardData.nearbyLoads.map((load) => (
                    <motion.div
                      key={load.id}
                      whileHover={{ backgroundColor: isDark ? 'rgba(55, 65, 81, 0.5)' : '#f9fafb' }}
                      className="p-4 md:p-6 transition-colors duration-200"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-4 lg:space-y-0">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-3">
                            <div className="flex items-center space-x-2 min-w-0">
                              <MapPin className={`w-4 h-4 ${
                                theme.text.tertiary
                              } flex-shrink-0`} />
                              <span className={`${getResponsiveText.body} font-semibold ${
                                theme.text.primary
                              } truncate`}>
                                {load.from}
                              </span>
                              <span className={`${theme.text.tertiary} flex-shrink-0`}>→</span>
                              <span className={`${getResponsiveText.body} font-semibold ${
                                theme.text.primary
                              } truncate`}>
                                {load.to}
                              </span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              load.match >= 90 
                                ? isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800'
                                : load.match >= 80
                                ? isDark ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'
                                : isDark ? 'bg-orange-900/30 text-orange-400' : 'bg-orange-100 text-orange-800'
                            } flex-shrink-0 self-start sm:self-auto transition-colors duration-200`}>
                              {load.match}% match
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                            {[
                              { label: 'Distance', value: `${load.distance} miles` },
                              { label: 'Pay', value: `₹${load.pay}` },
                              { label: 'Pickup', value: load.pickupTime },
                              { label: 'Type', value: load.type }
                            ].map((item, idx) => (
                              <div key={idx} className="min-w-0">
                                <p className={`${getResponsiveText.small} ${theme.text.secondary}`}>
                                  {item.label}
                                </p>
                                <p className={`${getResponsiveText.body} font-medium ${
                                  theme.text.primary
                                } truncate`}>
                                  {item.value}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-end space-x-2 sm:space-x-3 lg:ml-6 lg:justify-start">
                          <button className={`px-3 py-2 sm:px-4 sm:py-2 ${
                            theme.button.primary
                          } rounded-lg font-medium text-sm md:text-base whitespace-nowrap`}>
                            Accept Load
                          </button>
                          <button className={`p-2 ${theme.text.tertiary} hover:${
                            theme.text.primary
                          } rounded-lg ${theme.card.hover}`}>
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