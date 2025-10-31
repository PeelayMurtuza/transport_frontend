import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, Download, FileText, Calendar, MapPin, 
  DollarSign, Clock, Truck, Package, Star, Filter,
  Search, ChevronDown, ChevronUp, Eye, Share2,
  BarChart3, TrendingUp, Award, Trophy, BadgeCheck,
  Receipt, Calculator, Zap, Sparkles, Crown
} from 'lucide-react';

function MyJobs() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [expandedJob, setExpandedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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
      // Filter for this week (mock logic)
      return job.completedDate >= '2024-01-15';
    } else if (activeFilter === 'month') {
      // Filter for this month (mock logic)
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
    // Mock invoice download
    console.log(`Downloading invoice ${invoiceId} for job ${jobId}`);
    // In real app, this would generate and download PDF
  };

  const shareJobDetails = (job) => {
    // Mock share functionality
    console.log('Sharing job details:', job);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50/30">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">My Jobs</h1>
                <p className="text-gray-600">Completed deliveries and performance history</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Total Completed</div>
                <div className="text-2xl font-bold text-gray-900">{stats.totalJobs} Jobs</div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                JD
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            { 
              label: 'Total Earnings', 
              value: `$${stats.totalEarnings.toLocaleString()}`, 
              icon: DollarSign, 
              color: 'text-green-600', 
              bg: 'bg-green-50',
              trend: '+12.5%'
            },
            { 
              label: 'Average Rating', 
              value: stats.averageRating.toFixed(1), 
              icon: Star, 
              color: 'text-amber-600', 
              bg: 'bg-amber-50',
              trend: 'Top 5%'
            },
            { 
              label: 'On-Time Rate', 
              value: `${stats.onTimeRate}%`, 
              icon: CheckCircle2, 
              color: 'text-blue-600', 
              bg: 'bg-blue-50',
              trend: 'Excellent'
            },
            { 
              label: 'Top Shipper', 
              value: stats.topShipper, 
              icon: Award, 
              color: 'text-purple-600', 
              bg: 'bg-purple-50',
              trend: '12 loads'
            }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-sm font-semibold text-green-600">{stat.trend}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Filter Chips */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-2xl text-sm font-semibold transition-all ${
                    activeFilter === filter.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Search and Sort */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-2xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-2xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Jobs List */}
        <div className="space-y-6">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Job Header */}
              <div 
                className="p-6 cursor-pointer"
                onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-green-100 rounded-xl">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-lg font-bold text-gray-900">Load #{job.id}</span>
                      </div>
                      <div className="flex items-center space-x-1 bg-amber-50 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 text-amber-500 fill-current" />
                        <span className="text-sm font-semibold text-amber-700">{job.rating}</span>
                      </div>
                      {job.rating === 5.0 && (
                        <div className="flex items-center space-x-1 bg-purple-50 px-3 py-1 rounded-full">
                          <Crown className="w-4 h-4 text-purple-500" />
                          <span className="text-sm font-semibold text-purple-700">Perfect Score</span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="text-sm text-gray-600">Route</div>
                          <div className="font-semibold text-gray-900">{job.from} → {job.to}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="text-sm text-gray-600">Completed</div>
                          <div className="font-semibold text-gray-900">{job.completedDate}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <DollarSign className="w-5 h-5 text-emerald-600" />
                        <div>
                          <div className="text-sm text-gray-600">Net Earnings</div>
                          <div className="font-bold text-emerald-600 text-lg">${job.netEarnings.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Truck className="w-4 h-4" />
                        <span>{job.distance} miles</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{job.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Package className="w-4 h-4" />
                        <span>{job.loadType}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadInvoice(job.id, job.invoiceId);
                      }}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-2xl font-semibold hover:bg-blue-600 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      <span>Invoice</span>
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedJob(expandedJob === job.id ? null : job.id);
                      }}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-colors"
                    >
                      {expandedJob === job.id ? 
                        <ChevronUp className="w-5 h-5 text-gray-600" /> : 
                        <ChevronDown className="w-5 h-5 text-gray-600" />
                      }
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {expandedJob === job.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-gray-200"
                  >
                    <div className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Payment Breakdown */}
                        <div className="space-y-6">
                          <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                            <Calculator className="w-5 h-5 text-purple-600" />
                            <span>Payment Summary</span>
                          </h3>
                          
                          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-700">Load Payment</span>
                                <span className="font-semibold text-gray-900">${job.payment.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Platform Commission (3.5%)</span>
                                <span className="text-red-600">-${job.commission.toLocaleString()}</span>
                              </div>
                              <div className="border-t border-green-200 pt-3">
                                <div className="flex justify-between items-center">
                                  <span className="font-semibold text-gray-900">Net Earnings</span>
                                  <span className="font-bold text-emerald-600 text-xl">${job.netEarnings.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Performance Metrics */}
                          <div className="grid grid-cols-2 gap-4">
                            {[
                              { label: 'On Time', value: job.performance.onTime ? 'Yes' : 'No', color: job.performance.onTime ? 'text-green-600' : 'text-red-600' },
                              { label: 'Damage Free', value: job.performance.damageFree ? 'Yes' : 'No', color: job.performance.damageFree ? 'text-green-600' : 'text-red-600' },
                              { label: 'Communication', value: job.performance.communication, color: 'text-blue-600' },
                              { label: 'Efficiency', value: job.performance.efficiency, color: 'text-purple-600' }
                            ].map((metric, idx) => (
                              <div key={idx} className="text-center p-3 bg-gray-50 rounded-2xl">
                                <div className={`text-sm font-semibold ${metric.color}`}>{metric.value}</div>
                                <div className="text-xs text-gray-600">{metric.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Job Timeline */}
                        <div className="space-y-6">
                          <h3 className="text-lg font-bold text-gray-900 flex items-center space-x-2">
                            <Clock className="w-5 h-5 text-blue-600" />
                            <span>Delivery Timeline</span>
                          </h3>
                          
                          <div className="space-y-4">
                            {job.milestones.map((milestone, idx) => (
                              <div key={idx} className="flex items-center space-x-4">
                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                  ✓
                                </div>
                                <div className="flex-1">
                                  <div className="font-semibold text-gray-900">{milestone.action}</div>
                                  <div className="text-sm text-gray-600">{milestone.time}</div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Additional Actions */}
                          <div className="flex space-x-3 pt-4">
                            <button 
                              onClick={() => downloadInvoice(job.id, job.invoiceId)}
                              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 border border-blue-500 text-blue-600 rounded-2xl font-semibold hover:bg-blue-50 transition-colors"
                            >
                              <FileText className="w-4 h-4" />
                              <span>Download PDF</span>
                            </button>
                            <button 
                              onClick={() => shareJobDetails(job)}
                              className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 border border-purple-500 text-purple-600 rounded-2xl font-semibold hover:bg-purple-50 transition-colors"
                            >
                              <Share2 className="w-4 h-4" />
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
          ))}
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Receipt className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
            <button 
              onClick={() => { setActiveFilter('all'); setSearchTerm(''); }}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl font-semibold hover:shadow-lg transition-all"
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