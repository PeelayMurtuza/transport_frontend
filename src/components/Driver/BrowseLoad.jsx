import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Navigation, Truck, Calendar, Clock, 
  DollarSign, Weight, Ruler, Filter, Search,
  X, ArrowRight, Star, ChevronDown, ChevronUp
} from 'lucide-react';

function BrowseLoad() {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [selectedLoad, setSelectedLoad] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [filters, setFilters] = useState({
    distance: 'all',
    vehicleType: 'all',
    maxWeight: 50000,
    minPay: 0
  });

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mock data for available loads
  const availableLoads = [
    {
      id: 1,
      from: 'Austin, TX',
      to: 'Dallas, TX',
      distance: 248,
      estimatedFreight: 5400,
      loadWeight: 12000,
      vehicleType: 'Dry Van',
      pickupDate: '2024-01-18',
      deliveryDate: '2024-01-19',
      commodities: 'Electronics',
      specialRequirements: ['Liftgate', 'Appointment Required'],
      matchScore: 92,
      shipper: {
        name: 'TechCorp Inc.',
        rating: 4.8,
        reviews: 124
      },
      coordinates: {
        from: { lat: 30.2672, lng: -97.7431 },
        to: { lat: 32.7767, lng: -96.7970 }
      }
    },
    {
      id: 2,
      from: 'San Antonio, TX',
      to: 'Houston, TX',
      distance: 197,
      estimatedFreight: 4800,
      loadWeight: 8500,
      vehicleType: 'Refrigerated',
      pickupDate: '2024-01-18',
      deliveryDate: '2024-01-18',
      commodities: 'Pharmaceuticals',
      specialRequirements: ['Temperature Control'],
      matchScore: 87,
      shipper: {
        name: 'MedSupply Co.',
        rating: 4.9,
        reviews: 89
      },
      coordinates: {
        from: { lat: 29.4241, lng: -98.4936 },
        to: { lat: 29.7604, lng: -95.3698 }
      }
    },
    {
      id: 3,
      from: 'Dallas, TX',
      to: 'Oklahoma City, OK',
      distance: 206,
      estimatedFreight: 5200,
      loadWeight: 15000,
      vehicleType: 'Dry Van',
      pickupDate: '2024-01-19',
      deliveryDate: '2024-01-19',
      commodities: 'Consumer Goods',
      specialRequirements: [],
      matchScore: 78,
      shipper: {
        name: 'Retail Distributors',
        rating: 4.6,
        reviews: 203
      },
      coordinates: {
        from: { lat: 32.7767, lng: -96.7970 },
        to: { lat: 35.4676, lng: -97.5164 }
      }
    },
    {
      id: 4,
      from: 'Houston, TX',
      to: 'New Orleans, LA',
      distance: 348,
      estimatedFreight: 7200,
      loadWeight: 22000,
      vehicleType: 'Flatbed',
      pickupDate: '2024-01-18',
      deliveryDate: '2024-01-19',
      commodities: 'Construction Materials',
      specialRequirements: ['Tarping Required', 'Oversized Load'],
      matchScore: 65,
      shipper: {
        name: 'BuildRight Materials',
        rating: 4.4,
        reviews: 67
      },
      coordinates: {
        from: { lat: 29.7604, lng: -95.3698 },
        to: { lat: 29.9511, lng: -90.0715 }
      }
    },
    {
      id: 5,
      from: 'El Paso, TX',
      to: 'Phoenix, AZ',
      distance: 422,
      estimatedFreight: 8900,
      loadWeight: 18000,
      vehicleType: 'Dry Van',
      pickupDate: '2024-01-20',
      deliveryDate: '2024-01-21',
      commodities: 'Automotive Parts',
      specialRequirements: ['Expedited'],
      matchScore: 85,
      shipper: {
        name: 'AutoParts Global',
        rating: 4.7,
        reviews: 156
      },
      coordinates: {
        from: { lat: 31.7619, lng: -106.4850 },
        to: { lat: 33.4484, lng: -112.0740 }
      }
    }
  ];

  const vehicleTypes = ['Dry Van', 'Refrigerated', 'Flatbed', 'Step Deck', 'Double Drop'];
  const distanceRanges = [
    { label: 'All Distances', value: 'all' },
    { label: 'Under 200 miles', value: 'under200' },
    { label: '200-400 miles', value: '200-400' },
    { label: 'Over 400 miles', value: 'over400' }
  ];

  const calculateExpenses = (load) => {
    const fuelCost = (load.distance * 0.15).toFixed(2);
    const tolls = (load.distance * 0.05).toFixed(2);
    const misc = 50;
    const totalExpenses = (parseFloat(fuelCost) + parseFloat(tolls) + misc).toFixed(2);
    const estimatedProfit = (load.estimatedFreight - totalExpenses).toFixed(2);
    
    return {
      fuelCost,
      tolls,
      misc,
      totalExpenses,
      estimatedProfit,
      profitMargin: ((estimatedProfit / load.estimatedFreight) * 100).toFixed(1)
    };
  };

  const filteredLoads = availableLoads.filter(load => {
    if (filters.distance !== 'all') {
      if (filters.distance === 'under200' && load.distance >= 200) return false;
      if (filters.distance === '200-400' && (load.distance < 200 || load.distance > 400)) return false;
      if (filters.distance === 'over400' && load.distance <= 400) return false;
    }
    
    if (filters.vehicleType !== 'all' && load.vehicleType !== filters.vehicleType) return false;
    if (load.estimatedFreight < filters.minPay) return false;
    if (load.loadWeight > filters.maxWeight) return false;
    
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="p-1 sm:p-2 bg-blue-600 rounded-lg sm:rounded-xl shadow-lg">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  Browse Loads
                </h1>
                <p className="text-slate-600 text-xs sm:text-sm hidden xs:block">Find your perfect load match</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="flex bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-2 sm:px-3 lg:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium transition-all ${
                    viewMode === 'list' 
                      ? 'bg-blue-600 text-white shadow-inner' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  List
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-2 sm:px-3 lg:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium transition-all ${
                    viewMode === 'map' 
                      ? 'bg-blue-600 text-white shadow-inner' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Map
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Search by location, commodity, or shipper..."
                  className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 border border-slate-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 sm:py-3 border border-slate-300 rounded-lg sm:rounded-xl hover:bg-slate-50 transition-colors text-sm sm:text-base"
              >
                <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                <span className="font-medium text-slate-700 hidden xs:inline">Filters</span>
                {showFilters ? <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" /> : <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />}
              </button>
              
              <button className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg sm:rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg text-sm sm:text-base">
                Search
              </button>
            </div>
          </div>

          {/* Expanded Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-200 overflow-hidden"
              >
                <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">Distance</label>
                    <select
                      value={filters.distance}
                      onChange={(e) => setFilters({...filters, distance: e.target.value})}
                      className="w-full border border-slate-300 rounded-lg px-2 sm:px-3 py-1 sm:py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    >
                      {distanceRanges.map(range => (
                        <option key={range.value} value={range.value}>{range.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">Vehicle Type</label>
                    <select
                      value={filters.vehicleType}
                      onChange={(e) => setFilters({...filters, vehicleType: e.target.value})}
                      className="w-full border border-slate-300 rounded-lg px-2 sm:px-3 py-1 sm:py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                    >
                      <option value="all">All Types</option>
                      {vehicleTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="xs:col-span-2 lg:col-span-1">
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                      Max Weight: {filters.maxWeight.toLocaleString()} lbs
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="5000"
                      value={filters.maxWeight}
                      onChange={(e) => setFilters({...filters, maxWeight: parseInt(e.target.value)})}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="xs:col-span-2 lg:col-span-1">
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1 sm:mb-2">
                      Min Pay: ${filters.minPay}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="500"
                      value={filters.minPay}
                      onChange={(e) => setFilters({...filters, minPay: parseInt(e.target.value)})}
                      className="w-full"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content Area */}
        <div className={`grid gap-4 sm:gap-6 lg:gap-8 ${
          viewMode === 'map' ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1'
        }`}>
          {/* Loads List */}
          <div className={`${viewMode === 'map' ? 'lg:col-span-2' : 'w-full'}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Available Loads <span className="text-slate-500">({filteredLoads.length})</span>
              </h2>
              <div className="text-xs sm:text-sm text-slate-600">
                Sorted by: <span className="font-semibold text-blue-600">Best Match</span>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {filteredLoads.map((load) => (
                <motion.div
                  key={load.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="p-4 sm:p-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 sm:mb-4 gap-3">
                      <div className="flex-1">
                        <div className="flex flex-col xs:flex-row xs:items-center space-y-2 xs:space-y-0 xs:space-x-3 mb-2">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                            <span className="font-bold text-slate-900 text-sm sm:text-base">{load.from}</span>
                            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-slate-400" />
                            <span className="font-bold text-slate-900 text-sm sm:text-base">{load.to}</span>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                            load.matchScore >= 90 ? 'bg-green-100 text-green-800' :
                            load.matchScore >= 80 ? 'bg-blue-100 text-blue-800' :
                            'bg-orange-100 text-orange-800'
                          }`}>
                            {load.matchScore}% Match
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-600">
                          <div className="flex items-center space-x-1">
                            <Ruler className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>{load.distance} miles</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>${load.estimatedFreight.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Weight className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>{load.loadWeight.toLocaleString()} lbs</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1">
                          ${load.estimatedFreight.toLocaleString()}
                        </div>
                        <div className="text-xs sm:text-sm text-slate-500">Estimated Freight</div>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-3 sm:mb-4">
                      <div className="text-center p-2 sm:p-3 bg-slate-50 rounded-lg">
                        <Truck className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 mx-auto mb-1" />
                        <div className="text-xs sm:text-sm font-medium text-slate-900">{load.vehicleType}</div>
                      </div>
                      <div className="text-center p-2 sm:p-3 bg-slate-50 rounded-lg">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 mx-auto mb-1" />
                        <div className="text-xs sm:text-sm font-medium text-slate-900">Pickup</div>
                      </div>
                      <div className="text-center p-2 sm:p-3 bg-slate-50 rounded-lg">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 mx-auto mb-1" />
                        <div className="text-xs sm:text-sm font-medium text-slate-900">1-2 Days</div>
                      </div>
                      <div className="text-center p-2 sm:p-3 bg-slate-50 rounded-lg">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 mx-auto mb-1" />
                        <div className="text-xs sm:text-sm font-medium text-slate-900">{load.shipper.rating} ★</div>
                      </div>
                    </div>

                    {/* Shipper Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                          {load.shipper.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-slate-900 text-sm sm:text-base">{load.shipper.name}</div>
                          <div className="text-xs sm:text-sm text-slate-500">{load.shipper.reviews} reviews</div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => setSelectedLoad(load)}
                        className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg sm:rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg text-sm sm:text-base"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Map View */}
          {viewMode === 'map' && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 h-full">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 sm:mb-4">Loads Map View</h3>
                <div className="bg-slate-200 rounded-lg sm:rounded-xl h-64 sm:h-80 lg:h-96 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-slate-400 mx-auto mb-2 sm:mb-4" />
                    <p className="text-slate-600 text-sm sm:text-base">Interactive map showing available loads</p>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 sm:mt-2">Click on load markers to view details</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Load Details Modal */}
      <AnimatePresence>
        {selectedLoad && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden"
            >
              <div className="p-4 sm:p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900">Load Details</h2>
                  <button
                    onClick={() => setSelectedLoad(null)}
                    className="p-1 sm:p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
                  </button>
                </div>
              </div>

              <div className="overflow-y-auto max-h-[70vh] p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  {/* Left Column - Load Details */}
                  <div className="space-y-4 sm:space-y-6">
                    {/* Route Information */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <MapPin className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600" />
                          <h3 className="text-base sm:text-lg font-bold text-slate-900">Route Information</h3>
                        </div>
                        <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${
                          selectedLoad.matchScore >= 90 ? 'bg-green-100 text-green-800' :
                          selectedLoad.matchScore >= 80 ? 'bg-blue-100 text-blue-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {selectedLoad.matchScore}% Match
                        </div>
                      </div>
                      
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex justify-between items-center py-1 sm:py-2 border-b border-slate-200">
                          <span className="text-slate-600 text-sm sm:text-base">From</span>
                          <span className="font-semibold text-slate-900 text-sm sm:text-base">{selectedLoad.from}</span>
                        </div>
                        <div className="flex justify-between items-center py-1 sm:py-2 border-b border-slate-200">
                          <span className="text-slate-600 text-sm sm:text-base">To</span>
                          <span className="font-semibold text-slate-900 text-sm sm:text-base">{selectedLoad.to}</span>
                        </div>
                        <div className="flex justify-between items-center py-1 sm:py-2 border-b border-slate-200">
                          <span className="text-slate-600 text-sm sm:text-base">Distance</span>
                          <span className="font-semibold text-slate-900 text-sm sm:text-base">{selectedLoad.distance} miles</span>
                        </div>
                        <div className="flex justify-between items-center py-1 sm:py-2">
                          <span className="text-slate-600 text-sm sm:text-base">Est. Time</span>
                          <span className="font-semibold text-slate-900 text-sm sm:text-base">1-2 days</span>
                        </div>
                      </div>
                    </div>

                    {/* Load Specifications */}
                    <div className="bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 sm:mb-4">Load Specifications</h3>
                      <div className="grid grid-cols-2 gap-2 sm:gap-4">
                        <div className="text-center p-2 sm:p-3 bg-white rounded-lg sm:rounded-xl">
                          <Weight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600 mx-auto mb-1 sm:mb-2" />
                          <div className="text-xs sm:text-sm text-slate-600">Weight</div>
                          <div className="font-bold text-slate-900 text-sm sm:text-base">{selectedLoad.loadWeight.toLocaleString()} lbs</div>
                        </div>
                        <div className="text-center p-2 sm:p-3 bg-white rounded-lg sm:rounded-xl">
                          <Truck className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600 mx-auto mb-1 sm:mb-2" />
                          <div className="text-xs sm:text-sm text-slate-600">Vehicle Type</div>
                          <div className="font-bold text-slate-900 text-sm sm:text-base">{selectedLoad.vehicleType}</div>
                        </div>
                        <div className="text-center p-2 sm:p-3 bg-white rounded-lg sm:rounded-xl">
                          <Calendar className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600 mx-auto mb-1 sm:mb-2" />
                          <div className="text-xs sm:text-sm text-slate-600">Pickup</div>
                          <div className="font-bold text-slate-900 text-sm sm:text-base">{selectedLoad.pickupDate}</div>
                        </div>
                        <div className="text-center p-2 sm:p-3 bg-white rounded-lg sm:rounded-xl">
                          <Clock className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600 mx-auto mb-1 sm:mb-2" />
                          <div className="text-xs sm:text-sm text-slate-600">Delivery</div>
                          <div className="font-bold text-slate-900 text-sm sm:text-base">{selectedLoad.deliveryDate}</div>
                        </div>
                      </div>
                    </div>

                    {/* Shipper Information */}
                    <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-4 sm:p-6">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 sm:mb-4">Shipper Information</h3>
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white text-sm sm:text-lg font-bold">
                          {selectedLoad.shipper.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-slate-900 text-sm sm:text-base lg:text-lg">{selectedLoad.shipper.name}</div>
                          <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-slate-600">
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                            <span>{selectedLoad.shipper.rating} ★ ({selectedLoad.shipper.reviews} reviews)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Map & Financials */}
                  <div className="space-y-4 sm:space-y-6">
                    {/* Map Preview */}
                    <div className="bg-slate-100 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 sm:mb-4">Route Map</h3>
                      <div className="bg-slate-200 rounded-lg sm:rounded-xl h-32 sm:h-40 lg:h-48 flex items-center justify-center mb-3 sm:mb-4">
                        <div className="text-center text-slate-500 text-xs sm:text-sm">
                          <Navigation className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2" />
                          <p>Google Maps Route</p>
                          <p className="text-xs">{selectedLoad.distance} miles • {selectedLoad.from} to {selectedLoad.to}</p>
                        </div>
                      </div>
                      <button className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base">
                        Open in Google Maps
                      </button>
                    </div>

                    {/* Financial Breakdown */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 sm:mb-4">Financial Breakdown</h3>
                      {(() => {
                        const expenses = calculateExpenses(selectedLoad);
                        return (
                          <div className="space-y-2 sm:space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-slate-600 text-sm sm:text-base">Estimated Freight</span>
                              <span className="font-semibold text-slate-900 text-sm sm:text-base">${selectedLoad.estimatedFreight.toLocaleString()}</span>
                            </div>
                            <div className="space-y-1 sm:space-y-2 border-t border-slate-200 pt-2 sm:pt-3">
                              <div className="flex justify-between text-xs sm:text-sm">
                                <span className="text-slate-600">Fuel Cost</span>
                                <span>${expenses.fuelCost}</span>
                              </div>
                              <div className="flex justify-between text-xs sm:text-sm">
                                <span className="text-slate-600">Tolls & Fees</span>
                                <span>${expenses.tolls}</span>
                              </div>
                              <div className="flex justify-between text-xs sm:text-sm">
                                <span className="text-slate-600">Misc Expenses</span>
                                <span>${expenses.misc}</span>
                              </div>
                            </div>
                            <div className="flex justify-between border-t border-slate-200 pt-2 sm:pt-3">
                              <span className="text-slate-600 text-sm sm:text-base">Total Expenses</span>
                              <span className="font-semibold text-sm sm:text-base">${expenses.totalExpenses}</span>
                            </div>
                            <div className="flex justify-between border-t border-slate-200 pt-2 sm:pt-3">
                              <span className="text-slate-600 text-sm sm:text-base">Estimated Profit</span>
                              <span className="font-bold text-green-600 text-base sm:text-lg">${expenses.estimatedProfit}</span>
                            </div>
                            <div className="text-center text-xs sm:text-sm text-slate-600 mt-2">
                              Profit Margin: {expenses.profitMargin}%
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col xs:flex-row space-y-2 xs:space-y-0 xs:space-x-3">
                      <button className="flex-1 bg-blue-600 text-white py-3 sm:py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg text-sm sm:text-base">
                        Accept Load
                      </button>
                      <button className="px-4 sm:px-6 py-3 sm:py-4 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center">
                        <Star className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default BrowseLoad;