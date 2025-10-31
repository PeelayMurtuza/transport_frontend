import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Navigation, Truck, Clock, Phone, MessageCircle,
  CheckCircle2, Play, Flag, Zap, Battery, Thermometer,
  Wifi, Satellite, AlertCircle, Download, Share2,
  RotateCcw, Pause, Eye, BarChart3, Shield,
  Package, Fuel, Gauge, Map
} from 'lucide-react';

function ActiveLoad() {
  const [tripStatus, setTripStatus] = useState('in-progress'); // loading, in-progress, completed
  const [liveLocation, setLiveLocation] = useState({ lat: 34.0522, lng: -118.2437 });
  const [elapsedTime, setElapsedTime] = useState(0);
  const [showRouteOverview, setShowRouteOverview] = useState(false);

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
      // Simulate location movement
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
      case 'loading': return 'bg-amber-500 text-white';
      case 'in-progress': return 'bg-blue-500 text-white';
      case 'completed': return 'bg-emerald-500 text-white';
      default: return 'bg-slate-500 text-white';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-lg">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Active Load
                </h1>
                <div className="flex items-center space-x-3 mt-1">
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(tripStatus)} shadow-sm`}>
                    {getStatusText(tripStatus)}
                  </div>
                  <div className="text-blue-600 text-sm font-mono bg-blue-50 px-2 py-1 rounded-lg">
                    #{activeLoad.loadNumber}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-sm text-slate-600">Elapsed Time</div>
                <div className="text-2xl font-bold text-slate-900 font-mono">
                  {formatTime(elapsedTime)}
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                JD
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Route & Map */}
          <div className="xl:col-span-2 space-y-6">
            {/* Route Progress Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-slate-900">Route Progress</h2>
                  <div className="flex items-center space-x-3">
                    <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-lg">
                      <div className="text-white font-bold text-lg">
                        {progress.toFixed(1)}%
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowRouteOverview(!showRouteOverview)}
                      className="p-3 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-colors"
                    >
                      <Eye className="w-5 h-5 text-slate-600" />
                    </button>
                  </div>
                </div>

                {/* Route Visualization */}
                <div className="space-y-6">
                  {/* Start Point */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="text-slate-900 font-semibold">{activeLoad.from.city}</div>
                      <div className="text-slate-600 text-sm">{activeLoad.from.address}</div>
                      <div className="text-emerald-600 text-sm mt-1 flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Pickup Completed
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-500 text-sm">08:15 AM</div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative">
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200"></div>
                    <div 
                      className="absolute left-6 top-0 w-0.5 bg-gradient-to-b from-emerald-500 to-cyan-500 transition-all duration-1000 shadow-lg"
                      style={{ height: `${progress}%` }}
                    ></div>
                    
                    <div className="ml-12 space-y-8">
                      {/* Current Location */}
                      <div className="flex items-center space-x-4">
                        <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse">
                          <Navigation className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="text-cyan-700 font-semibold">Current Location</div>
                          <div className="text-slate-600 text-sm">Approaching Bakersfield, CA</div>
                          <div className="text-cyan-600 text-sm mt-1 font-medium">
                            {activeLoad.distance.traveled} mi traveled • {activeLoad.distance.remaining} mi to go
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-slate-900 font-bold">{activeLoad.timeline.currentSpeed} mph</div>
                          <div className="text-slate-500 text-sm">Current Speed</div>
                        </div>
                      </div>

                      {/* Destination */}
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                          <Flag className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <div className="text-slate-900 font-semibold">{activeLoad.to.city}</div>
                          <div className="text-slate-600 text-sm">{activeLoad.to.address}</div>
                          <div className="text-purple-600 text-sm mt-1 font-medium">
                            ETA: {activeLoad.timeline.estimatedArrival}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-slate-500 text-sm">02:00 PM</div>
                          <div className="text-slate-400 text-sm">Scheduled</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Distance Metrics */}
                <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-slate-200">
                  {[
                    { label: 'Traveled', value: `${activeLoad.distance.traveled} mi`, color: 'text-cyan-600', bg: 'bg-cyan-50' },
                    { label: 'Remaining', value: `${activeLoad.distance.remaining} mi`, color: 'text-amber-600', bg: 'bg-amber-50' },
                    { label: 'Total', value: `${activeLoad.distance.total} mi`, color: 'text-blue-600', bg: 'bg-blue-50' }
                  ].map((metric, index) => (
                    <div key={index} className={`text-center p-4 rounded-2xl ${metric.bg}`}>
                      <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
                      <div className="text-slate-600 text-sm font-medium">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Live Map & Vehicle Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Live Map Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-900">Live Route Tracking</h3>
                    <div className="flex items-center space-x-2 text-cyan-600">
                      <Satellite className="w-4 h-4" />
                      <span className="text-sm font-semibold">LIVE GPS</span>
                    </div>
                  </div>
                  
                  {/* Map Container */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-2xl h-64 relative overflow-hidden border border-slate-200">
                    {/* Simulated Map */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-200">
                      {/* Route Line */}
                      <div className="absolute left-1/4 top-1/3 right-1/4 h-1 bg-cyan-300 rounded-full">
                        <div 
                          className="h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-5000 shadow-lg"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      
                      {/* Start Marker */}
                      <div className="absolute left-1/4 top-1/3 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-6 h-6 bg-emerald-500 rounded-full border-4 border-white shadow-2xl"></div>
                      </div>
                      
                      {/* Current Location Marker */}
                      <div className="absolute left-1/4 top-1/3 transform -translate-x-1/2 -translate-y-1/2"
                          style={{ left: `calc(25% + ${progress * 0.5}%)` }}>
                        <div className="animate-pulse">
                          <div className="w-8 h-8 bg-cyan-500 rounded-full border-4 border-white shadow-2xl flex items-center justify-center">
                            <Truck className="w-3 h-3 text-white" />
                          </div>
                          <div className="absolute -inset-2 border-2 border-cyan-400 rounded-full animate-ping"></div>
                        </div>
                      </div>
                      
                      {/* Destination Marker */}
                      <div className="absolute right-1/4 top-1/3 transform translate-x-1/2 -translate-y-1/2">
                        <div className="w-6 h-6 bg-purple-500 rounded-full border-4 border-white shadow-2xl"></div>
                      </div>
                    </div>
                    
                    {/* Map Overlay Controls */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          <button className="px-3 py-2 bg-white/90 backdrop-blur-sm text-slate-700 rounded-xl text-sm font-semibold hover:bg-white transition-colors shadow-sm">
                            Satellite
                          </button>
                          <button className="px-3 py-2 bg-white/90 backdrop-blur-sm text-slate-700 rounded-xl text-sm font-semibold hover:bg-white transition-colors shadow-sm">
                            Traffic
                          </button>
                        </div>
                        <button className="p-2 bg-white/90 backdrop-blur-sm text-slate-700 rounded-xl hover:bg-white transition-colors shadow-sm">
                          <Navigation className="w-4 h-4" />
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
                className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6"
              >
                <h3 className="text-xl font-bold text-slate-900 mb-6">Vehicle Status</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Fuel, label: 'Fuel', value: `${activeLoad.vehicle.fuel}%`, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { icon: Thermometer, label: 'Cab Temp', value: `${activeLoad.vehicle.temperature}°F`, color: 'text-cyan-600', bg: 'bg-cyan-50' },
                    { icon: Gauge, label: 'Efficiency', value: `${activeLoad.vehicle.efficiency} mpg`, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { icon: Package, label: 'Cargo Temp', value: `${activeLoad.cargo.temperature}`, color: 'text-purple-600', bg: 'bg-purple-50' }
                  ].map((stat, index) => (
                    <div key={index} className={`text-center p-4 rounded-2xl ${stat.bg}`}>
                      <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                      <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                      <div className="text-slate-600 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column - Details & Actions */}
          <div className="space-y-6">
            {/* Status Actions Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-6">Trip Controls</h3>
              
              <div className="space-y-4">
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
                    className={`w-full p-4 rounded-2xl text-white font-semibold transition-all duration-300 shadow-lg ${
                      action.disabled 
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                        : `bg-gradient-to-r ${action.color} hover:shadow-xl`
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <action.icon className="w-6 h-6" />
                      <div className="text-left flex-1">
                        <div className="font-bold">{action.label}</div>
                        <div className="text-sm opacity-90">{action.description}</div>
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
              className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-6">Contact Support</h3>
              
              <div className="space-y-4">
                {/* Agent Contact */}
                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      SJ
                    </div>
                    <div className="flex-1">
                      <div className="text-slate-900 font-semibold">{activeLoad.contact.agent.name}</div>
                      <div className="text-cyan-600 text-sm font-medium">Load Agent</div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-bold ${
                      activeLoad.contact.agent.available 
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {activeLoad.contact.agent.available ? 'Online' : 'Offline'}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <button className="flex items-center justify-center space-x-2 p-3 bg-blue-500 hover:bg-blue-600 rounded-xl text-white font-semibold transition-colors shadow-lg">
                      <Phone className="w-4 h-4" />
                      <span>Call</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 p-3 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white font-semibold transition-colors shadow-lg">
                      <MessageCircle className="w-4 h-4" />
                      <span>Message</span>
                    </button>
                  </div>
                </div>

                {/* Shipper Contact */}
                <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                      TG
                    </div>
                    <div>
                      <div className="text-slate-900 font-semibold">{activeLoad.contact.shipper.name}</div>
                      <div className="text-purple-600 text-sm font-medium">Shipper</div>
                    </div>
                  </div>
                  
                  <button className="w-full flex items-center justify-center space-x-2 p-3 bg-purple-500 hover:bg-purple-600 rounded-xl text-white font-semibold transition-colors shadow-lg">
                    <Phone className="w-4 h-4" />
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
              className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-6">Cargo Details</h3>
              
              <div className="space-y-4">
                <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <Package className="w-6 h-6 text-amber-600" />
                    <div>
                      <div className="text-slate-900 font-semibold">{activeLoad.cargo.type}</div>
                      <div className="text-amber-600 text-sm">Weight: {activeLoad.cargo.weight}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {activeLoad.cargo.specialRequirements.map((req, index) => (
                      <span key={index} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium border border-amber-200">
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
              className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6"
            >
              <h3 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Download, label: 'Documents', color: 'from-blue-500 to-cyan-500' },
                  { icon: Share2, label: 'Share Status', color: 'from-emerald-500 to-green-500' },
                  { icon: BarChart3, label: 'Trip Report', color: 'from-purple-500 to-pink-500' },
                  { icon: Shield, label: 'Get Help', color: 'from-amber-500 to-orange-500' }
                ].map((action, index) => (
                  <button
                    key={index}
                    className={`p-4 rounded-2xl text-white font-semibold bg-gradient-to-r ${action.color} hover:shadow-lg transition-all duration-300 hover:scale-105`}
                  >
                    <action.icon className="w-5 h-5 mx-auto mb-2" />
                    <div className="text-xs">{action.label}</div>
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