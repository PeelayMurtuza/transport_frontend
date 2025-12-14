import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, Download, FileText, Calendar, MapPin, 
  Clock, Truck, Package, Star, Filter,
  Search, ChevronDown, ChevronUp, Eye, Share2,
  BarChart3, TrendingUp, Award, Trophy, BadgeCheck,
  Receipt, Calculator, Zap, Sparkles, Crown,
  Moon, Sun
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext'; 

function MyJobs() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [expandedJob, setExpandedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { theme, isDark, toggleTheme } = useTheme();

  // Mock data for completed jobs
  const completedJobs = [
    {
      id: 'LD-2847-XP',
      from: 'Los Angeles, CA',
      to: 'San Francisco, CA',
      distance: 382,
      completedDate: '2024-01-18',
      payment: 5400.00,
      commission: 189.00,
      netEarnings: 5211.00,
      rating: 5.0,
      loadType: 'High-Value Electronics',
      weight: '12,000 lbs',
      duration: '6 hours 30 min',
      shipper: 'TechCorp Global',
      invoiceId: 'INV-2847-XP-001',
      performance: {
        onTime: true,
        damageFree: true,
        communication: 5,
        efficiency: 4.8
      },
      milestones: [
        { action: 'Pickup Completed', time: '08:15 AM', status: 'completed' },
        { action: 'In Transit', time: '08:30 AM', status: 'completed' },
        { action: 'Delivery Completed', time: '02:45 PM', status: 'completed' }
      ]
    },
    {
      id: 'LD-2834-AB',
      from: 'Chicago, IL',
      to: 'Miami, FL',
      distance: 1387,
      completedDate: '2024-01-17',
      payment: 3200.00,
      commission: 112.00,
      netEarnings: 3088.00,
      rating: 4.8,
      loadType: 'Consumer Goods',
      weight: '15,000 lbs',
      duration: '1 day 8 hours',
      shipper: 'Retail Distributors',
      invoiceId: 'INV-2834-AB-001',
      performance: {
        onTime: true,
        damageFree: true,
        communication: 4.5,
        efficiency: 4.7
      },
      milestones: [
        { action: 'Pickup Completed', time: '07:45 AM', status: 'completed' },
        { action: 'In Transit', time: '08:00 AM', status: 'completed' },
        { action: 'Delivery Completed', time: '04:20 PM', status: 'completed' }
      ]
    },
    {
      id: 'LD-2821-CD',
      from: 'Austin, TX',
      to: 'Dallas, TX',
      distance: 248,
      completedDate: '2024-01-15',
      payment: 4500.00,
      commission: 157.50,
      netEarnings: 4342.50,
      rating: 5.0,
      loadType: 'Pharmaceuticals',
      weight: '8,500 lbs',
      duration: '4 hours 15 min',
      shipper: 'MedSupply Co.',
      invoiceId: 'INV-2821-CD-001',
      performance: {
        onTime: true,
        damageFree: true,
        communication: 5,
        efficiency: 4.9
      },
      milestones: [
        { action: 'Pickup Completed', time: '09:30 AM', status: 'completed' },
        { action: 'In Transit', time: '09:45 AM', status: 'completed' },
        { action: 'Delivery Completed', time: '01:45 PM', status: 'completed' }
      ]
    },
    {
      id: 'LD-2815-EF',
      from: 'Seattle, WA',
      to: 'Portland, OR',
      distance: 173,
      completedDate: '2024-01-12',
      payment: 2700.00,
      commission: 94.50,
      netEarnings: 2605.50,
      rating: 4.9,
      loadType: 'Automotive Parts',
      weight: '10,000 lbs',
      duration: '3 hours 20 min',
      shipper: 'AutoParts Global',
      invoiceId: 'INV-2815-EF-001',
      performance: {
        onTime: true,
        damageFree: true,
        communication: 4.8,
        efficiency: 4.8
      },
      milestones: [
        { action: 'Pickup Completed', time: '10:15 AM', status: 'completed' },
        { action: 'In Transit', time: '10:30 AM', status: 'completed' },
        { action: 'Delivery Completed', time: '01:50 PM', status: 'completed' }
      ]
    }
  ];

  const stats = {
    totalJobs: 24,
    totalEarnings: 89245.00,
    averageRating: 4.8,
    onTimeRate: 96.2,
    topShipper: 'TechCorp Global'
  };

  const filters = [
    { id: 'all', label: 'All Jobs' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'highValue', label: 'High Value' },
    { id: 'perfectRating', label: '5 Star Ratings' }
  ];

  const sortOptions = [
    { id: 'recent', label: 'Most Recent' },
    { id: 'payment', label: 'Highest Payment' },
    { id: 'distance', label: 'Longest Distance' },
    { id: 'rating', label: 'Best Rating' }
  ];

  const filteredJobs = completedJobs.filter(job => {
    if (activeFilter === 'week') {
      return job.completedDate >= '2024-01-15';
    } else if (activeFilter === 'month') {
      return job.completedDate >= '2024-01-01';
    } else if (activeFilter === 'highValue') {
      return job.payment >= 4000;
    } else if (activeFilter === 'perfectRating') {
      return job.rating === 5.0;
    }
    return true;
  }).filter(job => 
    job.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.shipper.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    switch (sortBy) {
      case 'payment': return b.payment - a.payment;
      case 'distance': return b.distance - a.distance;
      case 'rating': return b.rating - a.rating;
      default: return new Date(b.completedDate) - new Date(a.completedDate);
    }
  });

  const downloadInvoice = (jobId, invoiceId) => {
    console.log(`Downloading invoice ${invoiceId} for job ${jobId}`);
  };

  const shareJobDetails = (job) => {
    console.log('Sharing job details:', job);
  };

  // Theme-based color configurations
  const getStatsColors = (type) => {
    const colors = {
      green: {
        light: { text: 'text-green-600', bg: 'bg-green-50' },
        dark: { text: 'text-green-400', bg: 'bg-green-900/30' }
      },
      amber: {
        light: { text: 'text-amber-600', bg: 'bg-amber-50' },
        dark: { text: 'text-amber-400', bg: 'bg-amber-900/30' }
      },
      blue: {
        light: { text: 'text-blue-600', bg: 'bg-blue-50' },
        dark: { text: 'text-blue-400', bg: 'bg-blue-900/30' }
      },
      purple: {
        light: { text: 'text-purple-600', bg: 'bg-purple-50' },
        dark: { text: 'text-purple-400', bg: 'bg-purple-900/30' }
      }
    };
    return isDark ? colors[type].dark : colors[type].light;
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDark ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/30' : 'bg-gradient-to-br from-white via-gray-50 to-blue-50/30'
    }`}>
      {/* Header */}
      <div className={`${theme.navbar.bg} ${theme.border.primary} border-b sticky top-0 z-50 ${theme.shadow.sm} transition-colors duration-200`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20 py-2">
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
              <div className="p-2 sm:p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl shadow-lg">
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <div>
                <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold ${theme.text.primary} transition-colors duration-200`}>
                  My Jobs
                </h1>
                <p className={`${theme.text.secondary} text-xs sm:text-sm hidden xs:block transition-colors duration-200`}>
                  Completed deliveries and performance history
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
              <div className="text-right hidden xs:block">
                <div className={`text-xs sm:text-sm ${theme.text.secondary}`}>Total Completed</div>
                <div className={`text-lg sm:text-xl lg:text-2xl font-bold ${theme.text.primary}`}>
                  {stats.totalJobs} Jobs
                </div>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold shadow-lg text-sm sm:text-base">
                JD
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8"
        >
          {[
            { 
              label: 'Total Earnings', 
              value: `₹${stats.totalEarnings.toLocaleString()}`, 
              icon: TrendingUp, 
              colorType: 'green',
              trend: '+12.5%'
            },
            { 
              label: 'Average Rating', 
              value: stats.averageRating.toFixed(1), 
              icon: Star, 
              colorType: 'amber',
              trend: 'Top 5%'
            },
            { 
              label: 'On-Time Rate', 
              value: `${stats.onTimeRate}%`, 
              icon: CheckCircle2, 
              colorType: 'blue',
              trend: 'Excellent'
            },
            { 
              label: 'Top Shipper', 
              value: stats.topShipper, 
              icon: Award, 
              colorType: 'purple',
              trend: '12 loads'
            }
          ].map((stat, index) => {
            const colors = getStatsColors(stat.colorType);
            return (
              <div key={index} className={`${theme.card.bg} rounded-2xl sm:rounded-3xl ${
                theme.shadow.md
              } ${theme.border.primary} border p-4 sm:p-6 transition-colors duration-200`}>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl ${colors.bg} transition-colors duration-200`}>
                    <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${colors.text}`} />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-green-600">
                    {stat.trend}
                  </span>
                </div>
                <div className={`text-lg sm:text-xl lg:text-2xl font-bold ${theme.text.primary} mb-1 truncate transition-colors duration-200`}>
                  {stat.value}
                </div>
                <div className={`${theme.text.secondary} text-xs sm:text-sm transition-colors duration-200`}>
                  {stat.label}
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`${theme.card.bg} rounded-2xl sm:rounded-3xl ${theme.shadow.md} ${
            theme.border.primary
          } border p-4 sm:p-6 mb-6 sm:mb-8 transition-colors duration-200`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
            {/* Filter Chips */}
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {filters.map((filter) => {
                const isActive = activeFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-3 sm:px-4 py-1 sm:py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : `${isDark ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>

            {/* Search and Sort */}
            <div className="flex flex-col xs:flex-row xs:items-center gap-2 sm:gap-3 lg:gap-4">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  theme.text.tertiary
                } w-3 h-3 sm:w-4 sm:h-4 transition-colors duration-200`} />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-8 sm:pl-10 pr-4 py-2 ${theme.border.primary} border rounded-xl sm:rounded-2xl ${
                    theme.input.text
                  } ${theme.input.bg} focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full text-xs sm:text-sm transition-colors duration-200`}
                />
              </div>
              
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`appearance-none pl-3 sm:pl-4 pr-8 sm:pr-10 py-2 ${theme.border.primary} border rounded-xl sm:rounded-2xl ${
                    theme.input.text
                  } ${theme.input.bg} focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full text-xs sm:text-sm transition-colors duration-200`}
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className={`absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 ${
                  theme.text.tertiary
                } w-3 h-3 sm:w-4 sm:h-4 pointer-events-none transition-colors duration-200`} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Jobs List */}
        <div className="space-y-4 sm:space-y-6">
          {filteredJobs.map((job, index) => {
            const isExpanded = expandedJob === job.id;
            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${theme.card.bg} rounded-2xl sm:rounded-3xl ${theme.shadow.md} ${
                  theme.border.primary
                } border overflow-hidden hover:${theme.shadow.lg} transition-all duration-300`}
              >
                {/* Job Header */}
                <div 
                  className="p-4 sm:p-6 cursor-pointer"
                  onClick={() => setExpandedJob(isExpanded ? null : job.id)}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col xs:flex-row xs:items-center gap-2 sm:gap-3 lg:gap-4 mb-3">
                        <div className="flex items-center space-x-2">
                          <div className={`p-1 sm:p-2 ${
                            isDark ? 'bg-green-900/30' : 'bg-green-100'
                          } rounded-lg sm:rounded-xl transition-colors duration-200`}>
                            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                          </div>
                          <span className={`text-base sm:text-lg font-bold ${theme.text.primary} truncate transition-colors duration-200`}>
                            Load #{job.id}
                          </span>
                        </div>
                        <div className={`flex items-center space-x-1 ${
                          isDark ? 'bg-amber-900/30' : 'bg-amber-50'
                        } px-2 sm:px-3 py-1 rounded-full transition-colors duration-200`}>
                          <Star className={`w-3 h-3 sm:w-4 sm:h-4 ${
                            isDark ? 'text-amber-400' : 'text-amber-500'
                          } fill-current transition-colors duration-200`} />
                          <span className={`text-xs sm:text-sm font-semibold ${
                            isDark ? 'text-amber-300' : 'text-amber-700'
                          } transition-colors duration-200`}>
                            {job.rating}
                          </span>
                        </div>
                        {job.rating === 5.0 && (
                          <div className={`flex items-center space-x-1 ${
                            isDark ? 'bg-purple-900/30' : 'bg-purple-50'
                          } px-2 sm:px-3 py-1 rounded-full transition-colors duration-200`}>
                            <Crown className={`w-3 h-3 sm:w-4 sm:h-4 ${
                              isDark ? 'text-purple-400' : 'text-purple-500'
                            } transition-colors duration-200`} />
                            <span className={`text-xs sm:text-sm font-semibold ${
                              isDark ? 'text-purple-300' : 'text-purple-700'
                            } hidden xs:inline transition-colors duration-200`}>
                              Perfect Score
                            </span>
                            <span className={`text-xs sm:text-sm font-semibold ${
                              isDark ? 'text-purple-300' : 'text-purple-700'
                            } xs:hidden transition-colors duration-200`}>
                              Perfect
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                          <div className="min-w-0">
                            <div className={`text-xs sm:text-sm ${theme.text.secondary} transition-colors duration-200`}>
                              Route
                            </div>
                            <div className={`font-semibold ${theme.text.primary} text-sm sm:text-base truncate transition-colors duration-200`}>
                              {job.from} → {job.to}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                          <div className="min-w-0">
                            <div className={`text-xs sm:text-sm ${theme.text.secondary} transition-colors duration-200`}>
                              Completed
                            </div>
                            <div className={`font-semibold ${theme.text.primary} text-sm sm:text-base transition-colors duration-200`}>
                              {job.completedDate}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
                          <div className="min-w-0">
                            <div className={`text-xs sm:text-sm ${theme.text.secondary} transition-colors duration-200`}>
                              Net Earnings
                            </div>
                            <div className="font-bold text-emerald-600 text-base sm:text-lg truncate">
                              ₹{job.netEarnings.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 text-xs sm:text-sm">
                        <div className={`flex items-center space-x-1 ${theme.text.secondary} transition-colors duration-200`}>
                          <Truck className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>{job.distance} miles</span>
                        </div>
                        <div className={`flex items-center space-x-1 ${theme.text.secondary} transition-colors duration-200`}>
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="truncate">{job.duration}</span>
                        </div>
                        <div className={`flex items-center space-x-1 ${theme.text.secondary} transition-colors duration-200`}>
                          <Package className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="truncate">{job.loadType}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-2 sm:ml-4">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadInvoice(job.id, job.invoiceId);
                        }}
                        className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 ${
                          theme.button.primary
                        } rounded-xl sm:rounded-2xl font-semibold transition-colors text-xs sm:text-sm`}
                      >
                        <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="hidden xs:inline">Invoice</span>
                        <span className="xs:hidden">PDF</span>
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedJob(isExpanded ? null : job.id);
                        }}
                        className={`p-2 ${
                          isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                        } rounded-xl sm:rounded-2xl transition-colors duration-200`}
                      >
                        {isExpanded ? 
                          <ChevronUp className={`w-4 h-4 sm:w-5 sm:h-5 ${theme.text.primary}`} /> : 
                          <ChevronDown className={`w-4 h-4 sm:w-5 sm:h-5 ${theme.text.primary}`} />
                        }
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className={`${theme.border.primary} border-t`}
                    >
                      <div className="p-4 sm:p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                          {/* Payment Breakdown */}
                          <div className="space-y-4 sm:space-y-6">
                            <h3 className={`text-base sm:text-lg font-bold ${theme.text.primary} flex items-center space-x-2 transition-colors duration-200`}>
                              <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                              <span>Payment Summary</span>
                            </h3>
                            
                            <div className={`bg-gradient-to-br ${
                              isDark 
                                ? 'from-green-900/20 to-emerald-900/20 border-green-800/30' 
                                : 'from-green-50 to-emerald-50 border-green-200'
                            } rounded-xl sm:rounded-2xl p-4 sm:p-6 border transition-colors duration-200`}>
                              <div className="space-y-2 sm:space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className={`${theme.text.primary} text-sm sm:text-base transition-colors duration-200`}>
                                    Load Payment
                                  </span>
                                  <span className={`font-semibold ${theme.text.primary} text-sm sm:text-base transition-colors duration-200`}>
                                    ₹{job.payment.toLocaleString()}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center text-xs sm:text-sm">
                                  <span className={`${theme.text.secondary} transition-colors duration-200`}>
                                    Platform Commission (3.5%)
                                  </span>
                                  <span className="text-red-500">-₹{job.commission.toLocaleString()}</span>
                                </div>
                                <div className={`${
                                  isDark ? 'border-green-800/30' : 'border-green-200'
                                } border-t pt-2 sm:pt-3 transition-colors duration-200`}>
                                  <div className="flex justify-between items-center">
                                    <span className={`font-semibold ${theme.text.primary} text-sm sm:text-base transition-colors duration-200`}>
                                      Net Earnings
                                    </span>
                                    <span className="font-bold text-emerald-600 text-lg sm:text-xl">
                                      ₹{job.netEarnings.toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Performance Metrics */}
                            <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                              {[
                                { label: 'On Time', value: job.performance.onTime ? 'Yes' : 'No', color: job.performance.onTime ? 'text-green-600' : 'text-red-600' },
                                { label: 'Damage Free', value: job.performance.damageFree ? 'Yes' : 'No', color: job.performance.damageFree ? 'text-green-600' : 'text-red-600' },
                                { label: 'Communication', value: job.performance.communication, color: 'text-blue-600' },
                                { label: 'Efficiency', value: job.performance.efficiency, color: 'text-purple-600' }
                              ].map((metric, idx) => (
                                <div key={idx} className={`text-center p-2 sm:p-3 ${
                                  isDark ? 'bg-gray-800' : 'bg-gray-50'
                                } rounded-xl sm:rounded-2xl transition-colors duration-200`}>
                                  <div className={`text-xs sm:text-sm font-semibold ${metric.color}`}>
                                    {metric.value}
                                  </div>
                                  <div className={`text-xs ${
                                    isDark ? 'text-gray-400' : 'text-gray-600'
                                  } transition-colors duration-200`}>
                                    {metric.label}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Job Timeline */}
                          <div className="space-y-4 sm:space-y-6">
                            <h3 className={`text-base sm:text-lg font-bold ${theme.text.primary} flex items-center space-x-2 transition-colors duration-200`}>
                              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                              <span>Delivery Timeline</span>
                            </h3>
                            
                            <div className="space-y-3 sm:space-y-4">
                              {job.milestones.map((milestone, idx) => (
                                <div key={idx} className="flex items-center space-x-3 sm:space-x-4">
                                  <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
                                    ✓
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className={`font-semibold ${theme.text.primary} text-sm sm:text-base transition-colors duration-200`}>
                                      {milestone.action}
                                    </div>
                                    <div className={`${theme.text.secondary} text-xs sm:text-sm transition-colors duration-200`}>
                                      {milestone.time}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Additional Actions */}
                            <div className="flex flex-col xs:flex-row space-y-2 xs:space-y-0 xs:space-x-2 sm:space-x-3 pt-3 sm:pt-4">
                              <button 
                                onClick={() => downloadInvoice(job.id, job.invoiceId)}
                                className={`flex-1 flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 sm:py-3 ${
                                  theme.border.primary
                                } border text-blue-600 rounded-xl sm:rounded-2xl font-semibold ${
                                  isDark ? 'hover:bg-blue-900/20' : 'hover:bg-blue-50'
                                } transition-colors text-xs sm:text-sm`}
                              >
                                <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>Download PDF</span>
                              </button>
                              <button 
                                onClick={() => shareJobDetails(job)}
                                className={`flex-1 flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 sm:py-3 ${
                                  theme.border.primary
                                } border text-purple-600 rounded-xl sm:rounded-2xl font-semibold ${
                                  isDark ? 'hover:bg-purple-900/20' : 'hover:bg-purple-50'
                                } transition-colors text-xs sm:text-sm`}
                              >
                                <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span>Share</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8 sm:py-12"
          >
            <div className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 ${
              isDark ? 'bg-gray-800' : 'bg-gray-100'
            } rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-3 sm:mb-4 transition-colors duration-200`}>
              <Receipt className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 ${
                isDark ? 'text-gray-500' : 'text-gray-400'
              } transition-colors duration-200`} />
            </div>
            <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold ${theme.text.primary} mb-1 sm:mb-2 transition-colors duration-200`}>
              No jobs found
            </h3>
            <p className={`${theme.text.secondary} text-sm sm:text-base mb-4 sm:mb-6 transition-colors duration-200`}>
              Try adjusting your filters or search terms
            </p>
            <button 
              onClick={() => { setActiveFilter('all'); setSearchTerm(''); }}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl sm:rounded-2xl font-semibold hover:shadow-lg transition-all text-sm sm:text-base"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default MyJobs;