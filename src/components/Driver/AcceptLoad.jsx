import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, Wallet, Shield, Phone, MessageCircle, 
  Truck, Clock, MapPin, DollarSign, BadgeCheck,
  ArrowRight, Sparkles, Lock, Zap, Star,
  Calendar, Navigation, FileCheck, UserCheck,Weight
} from 'lucide-react';

function AcceptLoad() {
  const [acceptanceStep, setAcceptanceStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadAccepted, setLoadAccepted] = useState(false);
  const [walletBalance, setWalletBalance] = useState(12450.75);
  const [commission, setCommission] = useState(0);
  const [countdown, setCountdown] = useState(30);

  // Mock load data
  const loadData = {
    id: 'LD-2847-XP',
    from: 'Austin, TX',
    to: 'Dallas, TX',
    distance: 248,
    estimatedFreight: 5400,
    loadWeight: 12000,
    vehicleType: 'Dry Van',
    pickupDate: '2024-01-18',
    deliveryDate: '2024-01-19',
    commodities: 'High-Value Electronics',
    specialRequirements: ['Liftgate Required', 'Appointment Required', 'Secure Parking'],
    shipper: {
      name: 'TechCorp Global',
      rating: 4.9,
      reviews: 287,
      trustScore: 98
    },
    urgency: 'high' // high, medium, low
  };

  const acceptanceSteps = [
    {
      title: "Load Verification",
      description: "Validating load details and requirements",
      icon: FileCheck,
      color: "blue"
    },
    {
      title: "Wallet Check",
      description: "Verifying sufficient balance for commission",
      icon: Wallet,
      color: "green"
    },
    {
      title: "Commission Hold",
      description: "Securing platform commission fee",
      icon: Lock,
      color: "purple"
    },
    {
      title: "Driver Assignment",
      description: "Assigning you as the primary carrier",
      icon: UserCheck,
      color: "orange"
    },
    {
      title: "Success!",
      description: "Load successfully assigned to you",
      icon: BadgeCheck,
      color: "emerald"
    }
  ];

  const calculateCommission = () => {
    // Commission is 3.5% of load value
    return (loadData.estimatedFreight * 0.035).toFixed(2);
  };

  const handleAcceptLoad = async () => {
    setIsProcessing(true);
    setCommission(calculateCommission());
    
    // Simulate the acceptance process
    for (let step = 0; step < acceptanceSteps.length; step++) {
      setAcceptanceStep(step);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    // Deduct commission from wallet
    setWalletBalance(prev => prev - parseFloat(commission));
    setLoadAccepted(true);
    setIsProcessing(false);
  };

  // Countdown timer for load expiration
  useEffect(() => {
    if (!loadAccepted && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, loadAccepted]);

  const getStepColor = (color) => {
    const colors = {
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      emerald: 'bg-emerald-500'
    };
    return colors[color] || 'bg-blue-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Accept Load
                </h1>
                <p className="text-slate-600">Secure your next shipment with confidence</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-slate-600">Wallet Balance</p>
                <p className="text-2xl font-bold text-slate-900">${walletBalance.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg">
                JD
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Load Details */}
          <div className="space-y-6">
            {/* Load Summary Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="p-8">
                {/* Header with Urgency */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-xl">
                      <MapPin className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Load #{loadData.id}</h2>
                      <p className="text-slate-600">High-priority shipment</p>
                    </div>
                  </div>
                  <div className="px-4 py-2 bg-red-100 border border-red-200 rounded-2xl">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-red-600" />
                      <span className="font-bold text-red-600">{countdown}s</span>
                    </div>
                    <p className="text-xs text-red-600">Expires soon</p>
                  </div>
                </div>

                {/* Route */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg mb-2 shadow-lg">
                        A
                      </div>
                      <p className="font-bold text-slate-900">{loadData.from}</p>
                    </div>
                    
                    <div className="flex-1 mx-6">
                      <div className="relative">
                        <div className="h-2 bg-blue-200 rounded-full">
                          <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-3/4"></div>
                        </div>
                        <div className="absolute top-4 left-0 right-0 flex justify-between text-sm text-slate-600">
                          <span>Pickup</span>
                          <span className="font-bold text-blue-600">{loadData.distance} miles</span>
                          <span>Delivery</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg mb-2 shadow-lg">
                        B
                      </div>
                      <p className="font-bold text-slate-900">{loadData.to}</p>
                    </div>
                  </div>
                </div>

                {/* Financial Highlight */}
                <div className="bg-gradient-to-br from-emerald-50 to-green-100 border border-emerald-200 rounded-2xl p-6 mb-6">
                  <div className="text-center">
                    <p className="text-emerald-600 font-semibold mb-2">ESTIMATED EARNINGS</p>
                    <p className="text-4xl font-bold text-slate-900 mb-2">${loadData.estimatedFreight.toLocaleString()}</p>
                    <p className="text-emerald-600 flex items-center justify-center space-x-2">
                      <Zap className="w-4 h-4" />
                      <span>High-profit opportunity</span>
                    </p>
                  </div>
                </div>

                {/* Load Specifications Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { icon: Weight, label: 'Load Weight', value: `${loadData.loadWeight.toLocaleString()} lbs` },
                    { icon: Truck, label: 'Vehicle Type', value: loadData.vehicleType },
                    { icon: Calendar, label: 'Pickup', value: loadData.pickupDate },
                    { icon: Clock, label: 'Delivery', value: loadData.deliveryDate }
                  ].map((spec, index) => (
                    <div key={index} className="bg-slate-50 rounded-xl p-4 text-center">
                      <spec.icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm text-slate-600">{spec.label}</p>
                      <p className="font-semibold text-slate-900">{spec.value}</p>
                    </div>
                  ))}
                </div>

                {/* Shipper Trust Score */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
                      {loadData.shipper.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-bold text-slate-900">{loadData.shipper.name}</h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-semibold text-slate-900">{loadData.shipper.rating}</span>
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm mb-2">{loadData.shipper.reviews} verified reviews</p>
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-600">
                          Trust Score: {loadData.shipper.trustScore}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Special Requirements */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-4">Special Requirements</h3>
              <div className="space-y-3">
                {loadData.specialRequirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                    <span className="text-slate-700">{req}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Acceptance Process */}
          <div className="space-y-6">
            {/* Acceptance Process Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Load Acceptance</h2>
                  <p className="text-slate-600">Secure this shipment in just a few steps</p>
                </div>

                {/* Process Steps */}
                <div className="space-y-6 mb-8">
                  {acceptanceSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center space-x-4 p-4 rounded-2xl border-2 transition-all duration-300 ${
                        index === acceptanceStep 
                          ? 'border-blue-500 bg-blue-50 shadow-lg' 
                          : index < acceptanceStep
                          ? 'border-green-500 bg-green-50'
                          : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${
                        index < acceptanceStep 
                          ? 'bg-green-500' 
                          : index === acceptanceStep
                          ? 'bg-blue-500 animate-pulse'
                          : 'bg-slate-400'
                      }`}>
                        {index < acceptanceStep ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          <step.icon className="w-6 h-6" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${
                          index <= acceptanceStep ? 'text-slate-900' : 'text-slate-500'
                        }`}>
                          {step.title}
                        </h3>
                        <p className={`text-sm ${
                          index <= acceptanceStep ? 'text-slate-600' : 'text-slate-400'
                        }`}>
                          {step.description}
                        </p>
                      </div>
                      {index === acceptanceStep && isProcessing && (
                        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Commission Information */}
                <div className="bg-slate-50 rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-900">Commission Details</h3>
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Platform Commission</span>
                      <span className="font-semibold text-slate-900">3.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Amount</span>
                      <span className="font-bold text-purple-600">${commission}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200 pt-3">
                      <span className="text-slate-600">Your Earnings</span>
                      <span className="font-bold text-green-600 text-lg">
                        ${(loadData.estimatedFreight - parseFloat(commission || 0)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                {!loadAccepted ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleAcceptLoad}
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing Acceptance...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-3">
                        <Sparkles className="w-6 h-6" />
                        <span>Accept This Load</span>
                        <ArrowRight className="w-6 h-6" />
                      </div>
                    )}
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-2xl font-bold text-lg shadow-2xl mb-4">
                      <div className="flex items-center justify-center space-x-3">
                        <CheckCircle2 className="w-6 h-6" />
                        <span>Load Successfully Accepted!</span>
                      </div>
                    </div>
                    <p className="text-slate-600 mb-4">You are now the assigned carrier for this shipment</p>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Support Options */}
            <AnimatePresence>
              {(isProcessing || loadAccepted) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6"
                >
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Need Assistance?</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-2xl hover:bg-blue-100 transition-colors group">
                      <Phone className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                      <span className="font-semibold text-blue-700">Call Agent</span>
                    </button>
                    <button className="flex items-center justify-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-2xl hover:bg-green-100 transition-colors group">
                      <MessageCircle className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
                      <span className="font-semibold text-green-700">Live Chat</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next Steps */}
            {loadAccepted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-3xl p-6"
              >
                <h3 className="text-lg font-bold text-slate-900 mb-4">Next Steps</h3>
                <div className="space-y-3">
                  {[
                    "Review shipment documents in your dashboard",
                    "Contact shipper for pickup instructions",
                    "Complete pre-trip vehicle inspection",
                    "Upload required documentation"
                  ].map((step, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="text-slate-700">{step}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcceptLoad;