import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Navigation, Truck, Clock, Phone, MessageCircle,
  CheckCircle2, Play, Flag, Zap, Battery, Thermometer,
  Wifi, Satellite, AlertCircle, Download, Share2,
  RotateCcw, Pause, Eye, BarChart3, Shield,
  Package, Fuel, Gauge, Map, Sun, Moon
} from 'lucide-react';

import { useTheme } from '../../context/ThemeContext';

function ActiveLoad() {
  const [tripStatus, setTripStatus] = useState('in-progress');
  const [liveLocation, setLiveLocation] = useState({ lat: 34.0522, lng: -118.2437 });
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showRouteOverview, setShowRouteOverview] = useState(false);
  
  const { theme, isDark, toggleTheme } = useTheme();

  // Mock active load data
  const activeLoad = {
    id: 'TRK-001-AL',
    loadNumber: 'LD-2847-XP',
    status: tripStatus,
    from: {
      city: 'Los Angeles, CA',
      address: '1234 Commerce St, Los Angeles, CA 90015',
      coordinates: { lat: 34.0522, lng: -118.2437 },
      scheduled: '2024-01-18 08:00',
      completed: true
    },
    to: {
      city: 'San Francisco, CA',
      address: '567 Market St, San Francisco, CA 94105',
      coordinates: { lat: 37.7749, lng: -122.4194 },
      scheduled: '2024-01-18 14:00',
      completed: false
    },
    distance: {
      total: 382,
      traveled: 245,
      remaining: 137
    },
    timeline: {
      started: '2024-01-18 08:15',
      estimatedArrival: '2024-01-18 13:45',
      currentSpeed: 65,
      averageSpeed: 58
    },
    cargo: {
      type: 'High-Value Electronics',
      weight: '12,000 lbs',
      temperature: '68°F',
      specialRequirements: ['Fragile', 'Secure Parking Required']
    },
    contact: {
      agent: {
        name: 'Sarah Johnson',
        phone: '+1 (555) 123-4567',
        available: true
      },
      shipper: {
        name: 'TechCorp Global',
        phone: '+1 (555) 987-6543'
      }
    },
    vehicle: {
      id: 'TRK-001',
      type: 'Volvo VNL 760',
      fuel: 78,
      mileage: 245678,
      temperature: 72,
      efficiency: 8.2
    }
  };

  // Calculate progress percentage
  const progress = (activeLoad.distance.traveled / activeLoad.distance.total) * 100;

  // Simulate live location updates
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
      setLiveLocation(prev => ({
        lat: prev.lat + 0.001,
        lng: prev.lng - 0.001
      }));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStatusUpdate = (newStatus) => {
    setTripStatus(newStatus);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'loading':
        return isDark 
          ? 'bg-amber-600 text-white' 
          : 'bg-amber-500 text-white';
      case 'in-progress':
        return isDark 
          ? 'bg-blue-600 text-white' 
          : 'bg-blue-500 text-white';
      case 'completed':
        return isDark 
          ? 'bg-emerald-600 text-white' 
          : 'bg-emerald-500 text-white';
      default:
        return isDark 
          ? 'bg-gray-600 text-white' 
          : 'bg-gray-500 text-white';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'loading': return 'Loading';
      case 'in-progress': return 'In Transit';
      case 'completed': return 'Completed';
      default: return 'Scheduled';
    }
  };

  // Theme-based color configurations
  const getMetricColors = (type) => {
    const colors = {
      cyan: {
        light: { text: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-100' },
        dark: { text: 'text-cyan-400', bg: 'bg-cyan-900/30', border: 'border-cyan-800/50' }
      },
      amber: {
        light: { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
        dark: { text: 'text-amber-400', bg: 'bg-amber-900/30', border: 'border-amber-800/50' }
      },
      blue: {
        light: { text: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
        dark: { text: 'text-blue-400', bg: 'bg-blue-900/30', border: 'border-blue-800/50' }
      },
      emerald: {
        light: { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
        dark: { text: 'text-emerald-400', bg: 'bg-emerald-900/30', border: 'border-emerald-800/50' }
      },
      purple: {
        light: { text: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
        dark: { text: 'text-purple-400', bg: 'bg-purple-900/30', border: 'border-purple-800/50' }
      }
    };
    return isDark ? colors[type].dark : colors[type].light;
  };

  const cyanColors = getMetricColors('cyan');
  const amberColors = getMetricColors('amber');
  const blueColors = getMetricColors('blue');
  const emeraldColors = getMetricColors('emerald');
  const purpleColors = getMetricColors('purple');

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/20' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50'
    }`}>
      {/* Header */}
      <div className={`${theme.navbar.bg} ${theme.border.primary} border-b backdrop-blur-lg sticky top-0 z-50 ${theme.shadow.sm} transition-colors duration-200`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20 py-2">
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
              <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl shadow-lg">
                <Truck className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <div>
                <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold ${
                  isDark 
                    ? 'bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent' 
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent'
                }`}>
                  Active Load
                </h1>
                <div className="flex items-center space-x-2 sm:space-x-3 mt-1">
                  <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${getStatusColor(tripStatus)} shadow-sm transition-colors duration-200`}>
                    {getStatusText(tripStatus)}
                  </div>
                  <div className={`${isDark ? 'text-blue-300 bg-blue-900' : 'text-blue-600 bg-blue-50'} text-xs sm:text-sm font-mono px-2 py-1 rounded-lg transition-colors duration-200`}>
                    #{activeLoad.loadNumber}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
              <div className="text-right hidden xs:block">
                <div className={`text-xs sm:text-sm ${theme.text.secondary} transition-colors duration-200`}>
                  Elapsed Time
                </div>
                <div className={`text-lg sm:text-xl lg:text-2xl font-bold ${theme.text.primary} font-mono transition-colors duration-200`}>
                  {formatTime(elapsedTime)}
                </div>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold shadow-lg text-sm sm:text-base">
                JD
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column - Route & Map */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6">
            {/* Route Progress Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${theme.card.bg} rounded-2xl sm:rounded-3xl ${theme.shadow.md} ${
                theme.border.primary
              } border overflow-hidden transition-colors duration-200`}
            >
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col xs:flex-row xs:items-center justify-between mb-4 sm:mb-6 lg:mb-8 gap-3">
                  <h2 className={`text-lg sm:text-xl lg:text-2xl font-bold ${theme.text.primary} transition-colors duration-200`}>
                    Route Progress
                  </h2>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="px-3 sm:px-4 py-1 sm:py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl sm:rounded-2xl shadow-lg">
                      <div className="text-white font-bold text-base sm:text-lg">
                        {progress.toFixed(1)}%
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowRouteOverview(!showRouteOverview)}
                      className={`p-2 sm:p-3 ${theme.button.secondary} rounded-xl sm:rounded-2xl transition-colors duration-200`}
                    >
                      <Eye className={`w-4 h-4 sm:w-5 sm:h-5 ${theme.text.primary}`} />
                    </button>
                  </div>
                </div>

                {/* Route Visualization */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Start Point */}
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-emerald-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-semibold ${theme.text.primary} text-sm sm:text-base transition-colors duration-200`}>
                        {activeLoad.from.city}
                      </div>
                      <div className={`${theme.text.secondary} text-xs sm:text-sm truncate transition-colors duration-200`}>
                        {activeLoad.from.address}
                      </div>
                      <div className={`${isDark ? 'text-emerald-300' : 'text-emerald-600'} text-xs sm:text-sm mt-1 flex items-center`}>
                        <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        Pickup Completed
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className={`${theme.text.tertiary} text-xs sm:text-sm transition-colors duration-200`}>
                        08:15 AM
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative">
                    <div className={`absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 ${
                      isDark ? 'bg-gray-700' : 'bg-slate-200'
                    }`}></div>
                    <div 
                      className="absolute left-4 sm:left-6 top-0 w-0.5 bg-gradient-to-b from-emerald-500 to-cyan-500 transition-all duration-1000 shadow-lg"
                      style={{ height: `${progress}%` }}
                    ></div>
                    
                    <div className="ml-8 sm:ml-12 space-y-4 sm:space-y-6 lg:space-y-8">
                      {/* Current Location */}
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse flex-shrink-0">
                          <Navigation className="w-3 h-3 sm:w-4 sm:h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`${isDark ? 'text-cyan-300' : 'text-cyan-700'} font-semibold text-sm sm:text-base`}>
                            Current Location
                          </div>
                          <div className={`${theme.text.secondary} text-xs sm:text-sm transition-colors duration-200`}>
                            Approaching Bakersfield, CA
                          </div>
                          <div className={`${isDark ? 'text-cyan-300' : 'text-cyan-600'} text-xs sm:text-sm mt-1 font-medium`}>
                            {activeLoad.distance.traveled} mi traveled • {activeLoad.distance.remaining} mi to go
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className={`font-bold ${theme.text.primary} text-sm sm:text-base transition-colors duration-200`}>
                            {activeLoad.timeline.currentSpeed} mph
                          </div>
                          <div className={`${theme.text.tertiary} text-xs sm:text-sm transition-colors duration-200`}>
                            Current Speed
                          </div>
                        </div>
                      </div>

                      {/* Destination */}
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0">
                          <Flag className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`font-semibold ${theme.text.primary} text-sm sm:text-base transition-colors duration-200`}>
                            {activeLoad.to.city}
                          </div>
                          <div className={`${theme.text.secondary} text-xs sm:text-sm truncate transition-colors duration-200`}>
                            {activeLoad.to.address}
                          </div>
                          <div className={`${isDark ? 'text-purple-300' : 'text-purple-600'} text-xs sm:text-sm mt-1 font-medium`}>
                            ETA: {activeLoad.timeline.estimatedArrival}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className={`${theme.text.tertiary} text-xs sm:text-sm transition-colors duration-200`}>
                            02:00 PM
                          </div>
                          <div className={`${theme.text.tertiary} text-xs sm:text-sm transition-colors duration-200`}>
                            Scheduled
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Distance Metrics */}
                <div className={`grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mt-4 sm:mt-6 lg:mt-8 pt-4 sm:pt-6 lg:pt-8 border-t ${
                  theme.border.primary
                }`}>
                  {[
                    { 
                      label: 'Traveled', 
                      value: `${activeLoad.distance.traveled} mi`, 
                      colors: cyanColors 
                    },
                    { 
                      label: 'Remaining', 
                      value: `${activeLoad.distance.remaining} mi`, 
                      colors: amberColors 
                    },
                    { 
                      label: 'Total', 
                      value: `${activeLoad.distance.total} mi`, 
                      colors: blueColors 
                    }
                  ].map((metric, index) => (
                    <div key={index} className={`text-center p-3 sm:p-4 rounded-xl sm:rounded-2xl ${
                      metric.colors.bg
                    } ${metric.colors.border} border transition-colors duration-200`}>
                      <div className={`text-lg sm:text-xl lg:text-2xl font-bold ${
                        metric.colors.text
                      }`}>
                        {metric.value}
                      </div>
                      <div className={`${theme.text.secondary} text-xs sm:text-sm font-medium transition-colors duration-200`}>
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Live Map & Vehicle Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Live Map Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className={`${theme.card.bg} rounded-2xl sm:rounded-3xl ${theme.shadow.md} ${
                  theme.border.primary
                } border overflow-hidden transition-colors duration-200`}
              >
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col xs:flex-row xs:items-center justify-between mb-4 sm:mb-6 gap-2">
                    <h3 className={`text-base sm:text-lg lg:text-xl font-bold ${theme.text.primary} transition-colors duration-200`}>
                      Live Route Tracking
                    </h3>
                    <div className="flex items-center space-x-1 sm:space-x-2 text-cyan-600">
                      <Satellite className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="text-xs sm:text-sm font-semibold">LIVE GPS</span>
                    </div>
                  </div>
                  
                  {/* Map Container */}
                  <div className={`${
                    isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-cyan-100'
                  } rounded-xl sm:rounded-2xl h-48 sm:h-56 lg:h-64 relative overflow-hidden border ${
                    theme.border.primary
                  } transition-colors duration-200`}>
                    {/* Simulated Map */}
                    <div className={`absolute inset-0 ${
                      isDark ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-100 to-cyan-200'
                    }`}>
                      {/* Route Line */}
                      <div className={`absolute left-1/4 top-1/3 right-1/4 h-0.5 sm:h-1 ${
                        isDark ? 'bg-cyan-800' : 'bg-cyan-300'
                      } rounded-full`}>
                        <div 
                          className="h-0.5 sm:h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-5000 shadow-lg"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      
                      {/* Start Marker */}
                      <div className="absolute left-1/4 top-1/3 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-emerald-500 rounded-full border-2 sm:border-3 lg:border-4 border-white shadow-lg sm:shadow-xl"></div>
                      </div>
                      
                      {/* Current Location Marker */}
                      <div className="absolute left-1/4 top-1/3 transform -translate-x-1/2 -translate-y-1/2"
                          style={{ left: `calc(25% + ${progress * 0.5}%)` }}>
                        <div className="animate-pulse">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-cyan-500 rounded-full border-2 sm:border-3 lg:border-4 border-white shadow-lg sm:shadow-xl flex items-center justify-center">
                            <Truck className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                          </div>
                          <div className="absolute -inset-1 sm:-inset-2 border-2 border-cyan-400 rounded-full animate-ping"></div>
                        </div>
                      </div>
                      
                      {/* Destination Marker */}
                      <div className="absolute right-1/4 top-1/3 transform translate-x-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-purple-500 rounded-full border-2 sm:border-3 lg:border-4 border-white shadow-lg sm:shadow-xl"></div>
                      </div>
                    </div>
                    
                    {/* Map Overlay Controls */}
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                      <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center gap-2">
                        <div className="flex space-x-1 sm:space-x-2">
                          <button className={`px-2 sm:px-3 py-1 sm:py-2 ${
                            isDark ? 'bg-gray-800/90' : 'bg-white/90'
                          } backdrop-blur-sm ${theme.text.primary} rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold ${
                            isDark ? 'hover:bg-gray-700' : 'hover:bg-white'
                          } transition-colors ${theme.shadow.sm}`}>
                            Satellite
                          </button>
                          <button className={`px-2 sm:px-3 py-1 sm:py-2 ${
                            isDark ? 'bg-gray-800/90' : 'bg-white/90'
                          } backdrop-blur-sm ${theme.text.primary} rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold ${
                            isDark ? 'hover:bg-gray-700' : 'hover:bg-white'
                          } transition-colors ${theme.shadow.sm}`}>
                            Traffic
                          </button>
                        </div>
                        <button className={`p-1 sm:p-2 ${
                          isDark ? 'bg-gray-800/90' : 'bg-white/90'
                        } backdrop-blur-sm ${theme.text.primary} rounded-lg sm:rounded-xl ${
                          isDark ? 'hover:bg-gray-700' : 'hover:bg-white'
                        } transition-colors ${theme.shadow.sm} self-start xs:self-auto`}>
                          <Navigation className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Vehicle Stats Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`${theme.card.bg} rounded-2xl sm:rounded-3xl ${theme.shadow.md} ${
                  theme.border.primary
                } border p-4 sm:p-6 transition-colors duration-200`}
              >
                <h3 className={`text-base sm:text-lg lg:text-xl font-bold ${theme.text.primary} mb-4 sm:mb-6 transition-colors duration-200`}>
                  Vehicle Status
                </h3>
                <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                  {[
                    { 
                      icon: Fuel, 
                      label: 'Fuel', 
                      value: `${activeLoad.vehicle.fuel}%`, 
                      colors: emeraldColors 
                    },
                    { 
                      icon: Thermometer, 
                      label: 'Cab Temp', 
                      value: `${activeLoad.vehicle.temperature}°F`, 
                      colors: cyanColors 
                    },
                    { 
                      icon: Gauge, 
                      label: 'Efficiency', 
                      value: `${activeLoad.vehicle.efficiency} mpg`, 
                      colors: blueColors 
                    },
                    { 
                      icon: Package, 
                      label: 'Cargo Temp', 
                      value: `${activeLoad.cargo.temperature}`, 
                      colors: purpleColors 
                    }
                  ].map((stat, index) => (
                    <div key={index} className={`text-center p-3 sm:p-4 rounded-xl sm:rounded-2xl ${
                      stat.colors.bg
                    } ${stat.colors.border} border transition-colors duration-200`}>
                      <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mx-auto mb-1 sm:mb-2 ${
                        stat.colors.text
                      }`} />
                      <div className={`text-sm sm:text-base lg:text-lg font-bold ${
                        stat.colors.text
                      }`}>
                        {stat.value}
                      </div>
                      <div className={`${theme.text.secondary} text-xs sm:text-sm transition-colors duration-200`}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column - Details & Actions */}
          <div className="space-y-4 sm:space-y-6">
            {/* Status Actions Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${theme.card.bg} rounded-2xl sm:rounded-3xl ${theme.shadow.md} ${
                theme.border.primary
              } border p-4 sm:p-6 transition-colors duration-200`}
            >
              <h3 className={`text-base sm:text-lg lg:text-xl font-bold ${theme.text.primary} mb-4 sm:mb-6 transition-colors duration-200`}>
                Trip Controls
              </h3>
              
              <div className="space-y-3 sm:space-y-4">
                {[
                  {
                    status: 'loading',
                    label: 'Start Trip',
                    description: 'Begin transportation',
                    icon: Play,
                    color: 'from-blue-500 to-cyan-500',
                    disabled: tripStatus !== 'loading'
                  },
                  {
                    status: 'in-progress',
                    label: 'Pause Trip',
                    description: 'Temporary stop',
                    icon: Pause,
                    color: 'from-amber-500 to-orange-500',
                    disabled: tripStatus !== 'in-progress'
                  },
                  {
                    status: 'completed',
                    label: 'Complete Trip',
                    description: 'Finish delivery',
                    icon: CheckCircle2,
                    color: 'from-emerald-500 to-green-500',
                    disabled: tripStatus === 'completed'
                  }
                ].map((action, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: action.disabled ? 1 : 1.02 }}
                    whileTap={{ scale: action.disabled ? 1 : 0.98 }}
                    onClick={() => !action.disabled && handleStatusUpdate(action.status)}
                    disabled={action.disabled}
                    className={`w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl text-white font-semibold transition-all duration-300 ${theme.shadow.md} ${
                      action.disabled
                        ? `${isDark ? 'bg-gray-700' : 'bg-gray-100'} ${isDark ? 'text-gray-400' : 'text-gray-500'} cursor-not-allowed`
                        : `bg-gradient-to-r ${action.color} hover:${theme.shadow.lg}`
                    }`}
                  >
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <action.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                      <div className="text-left flex-1 min-w-0">
                        <div className="font-bold text-sm sm:text-base">{action.label}</div>
                        <div className="text-xs sm:text-sm opacity-90 truncate">{action.description}</div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={`${theme.card.bg} rounded-2xl sm:rounded-3xl ${theme.shadow.md} ${
                theme.border.primary
              } border p-4 sm:p-6 transition-colors duration-200`}
            >
              <h3 className={`text-base sm:text-lg lg:text-xl font-bold ${theme.text.primary} mb-4 sm:mb-6 transition-colors duration-200`}>
                Contact Support
              </h3>
              
              <div className="space-y-3 sm:space-y-4">
                {/* Agent Contact */}
                <div className={`${
                  isDark ? 'bg-blue-900/30 border-blue-800/50' : 'bg-blue-50 border-blue-100'
                } rounded-xl sm:rounded-2xl p-3 sm:p-4 border transition-colors duration-200`}>
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold shadow-lg text-sm sm:text-base">
                      SJ
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-semibold ${theme.text.primary} text-sm sm:text-base truncate transition-colors duration-200`}>
                        {activeLoad.contact.agent.name}
                      </div>
                      <div className={`${isDark ? 'text-cyan-400' : 'text-cyan-600'} text-xs sm:text-sm font-medium`}>
                        Load Agent
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-bold flex-shrink-0 ${
                      activeLoad.contact.agent.available 
                        ? `${isDark ? 'bg-emerald-900/30 text-emerald-300 border-emerald-800/50' : 'bg-emerald-100 text-emerald-700 border-emerald-200'}`
                        : `${isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'}`
                    } border transition-colors duration-200`}>
                      {activeLoad.contact.agent.available ? 'Online' : 'Offline'}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button className={`flex items-center justify-center space-x-1 sm:space-x-2 p-2 sm:p-3 ${
                      theme.button.primary
                    } rounded-lg sm:rounded-xl font-semibold transition-colors ${theme.shadow.md} text-xs sm:text-sm`}>
                      <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Call</span>
                    </button>
                    <button className={`flex items-center justify-center space-x-1 sm:space-x-2 p-2 sm:p-3 ${
                      isDark ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-emerald-500 hover:bg-emerald-600'
                    } rounded-lg sm:rounded-xl text-white font-semibold transition-colors ${theme.shadow.md} text-xs sm:text-sm`}>
                      <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>Message</span>
                    </button>
                  </div>
                </div>

                {/* Shipper Contact */}
                <div className={`${
                  isDark ? 'bg-purple-900/30 border-purple-800/50' : 'bg-purple-50 border-purple-100'
                } rounded-xl sm:rounded-2xl p-3 sm:p-4 border transition-colors duration-200`}>
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold shadow-lg text-sm sm:text-base">
                      TG
                    </div>
                    <div className="min-w-0">
                      <div className={`font-semibold ${theme.text.primary} text-sm sm:text-base truncate transition-colors duration-200`}>
                        {activeLoad.contact.shipper.name}
                      </div>
                      <div className={`${isDark ? 'text-purple-400' : 'text-purple-600'} text-xs sm:text-sm font-medium`}>
                        Shipper
                      </div>
                    </div>
                  </div>
                  
                  <button className={`w-full flex items-center justify-center space-x-1 sm:space-x-2 p-2 sm:p-3 ${
                    isDark ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'
                  } rounded-lg sm:rounded-xl text-white font-semibold transition-colors ${theme.shadow.md} text-xs sm:text-sm`}>
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Contact Shipper</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Cargo Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className={`${theme.card.bg} rounded-2xl sm:rounded-3xl ${theme.shadow.md} ${
                theme.border.primary
              } border p-4 sm:p-6 transition-colors duration-200`}
            >
              <h3 className={`text-base sm:text-lg lg:text-xl font-bold ${theme.text.primary} mb-4 sm:mb-6 transition-colors duration-200`}>
                Cargo Details
              </h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div className={`${
                  isDark ? 'bg-amber-900/30 border-amber-800/50' : 'bg-amber-50 border-amber-100'
                } rounded-xl sm:rounded-2xl p-3 sm:p-4 border transition-colors duration-200`}>
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                    <Package className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${
                      isDark ? 'text-amber-400' : 'text-amber-600'
                    }`} />
                    <div className="min-w-0">
                      <div className={`font-semibold ${theme.text.primary} text-sm sm:text-base truncate transition-colors duration-200`}>
                        {activeLoad.cargo.type}
                      </div>
                      <div className={`${isDark ? 'text-amber-400' : 'text-amber-600'} text-xs sm:text-sm`}>
                        Weight: {activeLoad.cargo.weight}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {activeLoad.cargo.specialRequirements.map((req, index) => (
                      <span key={index} className={`px-2 py-1 ${
                        isDark ? 'bg-amber-900/50 text-amber-300 border-amber-800' : 'bg-amber-100 text-amber-700 border-amber-200'
                      } rounded-md sm:rounded-lg text-xs font-medium border transition-colors duration-200`}>
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={`${theme.card.bg} rounded-2xl sm:rounded-3xl ${theme.shadow.md} ${
                theme.border.primary
              } border p-4 sm:p-6 transition-colors duration-200`}
            >
              <h3 className={`text-base sm:text-lg lg:text-xl font-bold ${theme.text.primary} mb-4 sm:mb-6 transition-colors duration-200`}>
                Quick Actions
              </h3>
              
              <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                {[
                  { icon: Download, label: 'Documents', color: 'from-blue-500 to-cyan-500' },
                  { icon: Share2, label: 'Share Status', color: 'from-emerald-500 to-green-500' },
                  { icon: BarChart3, label: 'Trip Report', color: 'from-purple-500 to-pink-500' },
                  { icon: Shield, label: 'Get Help', color: 'from-amber-500 to-orange-500' }
                ].map((action, index) => (
                  <button
                    key={index}
                    className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl text-white font-semibold bg-gradient-to-r ${action.color} ${
                      theme.shadow.md
                    } hover:${theme.shadow.lg} transition-all duration-300 hover:scale-105 text-xs sm:text-sm`}
                  >
                    <action.icon className="w-4 h-4 sm:w-5 sm:h-5 mx-auto mb-1 sm:mb-2" />
                    <div className="text-xs sm:text-sm">{action.label}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActiveLoad;