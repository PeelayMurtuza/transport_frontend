import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, Wallet, Shield, Phone, MessageCircle, 
  Truck, Clock, MapPin, DollarSign, BadgeCheck,
  ArrowRight, Sparkles, Lock, Zap, Star,
  Calendar, Navigation, FileCheck, UserCheck, Weight
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
    urgency: 'high'
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
    return (loadData.estimatedFreight * 0.035).toFixed(2);
  };

  const handleAcceptLoad = async () => {
    setIsProcessing(true);
    setCommission(calculateCommission());
    
    for (let step = 0; step < acceptanceSteps.length; step++) {
      setAcceptanceStep(step);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    setWalletBalance(prev => prev - parseFloat(commission));
    setLoadAccepted(true);
    setIsProcessing(false);
  };

  useEffect(() => {
    if (!loadAccepted && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, loadAccepted]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20 py-2">
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
              <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl shadow-lg">
                <Truck className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Accept Load
                </h1>
                <p className="text-slate-600 text-xs sm:text-sm hidden xs:block">
                  Secure your next shipment with confidence
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
              <div className="text-right hidden xs:block">
                <p className="text-xs sm:text-sm text-slate-600">Wallet Balance</p>
                <p className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900">
                  ${walletBalance.toLocaleString()}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold shadow-lg text-sm sm:text-base">
                JD
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column - Load Details */}
          <div className="space-y-4 sm:space-y-6">
            {/* Load Summary Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="p-4 sm:p-6 lg:p-8">
                {/* Header with Urgency */}
                <div className="flex flex-col xs:flex-row xs:items-center justify-between mb-4 sm:mb-6 gap-3">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="p-1 sm:p-2 bg-blue-100 rounded-lg sm:rounded-xl">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900">
                        Load #{loadData.id}
                      </h2>
                      <p className="text-slate-600 text-xs sm:text-sm">High-priority shipment</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 sm:px-4 sm:py-2 bg-red-100 border border-red-200 rounded-xl sm:rounded-2xl self-start">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                      <span className="font-bold text-red-600 text-sm sm:text-base">{countdown}s</span>
                    </div>
                    <p className="text-xs text-red-600">Expires soon</p>
                  </div>
                </div>

                {/* Route */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2 shadow-lg">
                        A
                      </div>
                      <p className="font-bold text-slate-900 text-sm sm:text-base">{loadData.from}</p>
                    </div>
                    
                    <div className="flex-1 mx-3 sm:mx-4 lg:mx-6">
                      <div className="relative">
                        <div className="h-1 sm:h-2 bg-blue-200 rounded-full">
                          <div className="h-1 sm:h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-3/4"></div>
                        </div>
                        <div className="absolute top-3 sm:top-4 left-0 right-0 flex justify-between text-xs sm:text-sm text-slate-600">
                          <span>Pickup</span>
                          <span className="font-bold text-blue-600">{loadData.distance} mi</span>
                          <span>Delivery</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-green-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white font-bold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2 shadow-lg">
                        B
                      </div>
                      <p className="font-bold text-slate-900 text-sm sm:text-base">{loadData.to}</p>
                    </div>
                  </div>
                </div>

                {/* Financial Highlight */}
                <div className="bg-gradient-to-br from-emerald-50 to-green-100 border border-emerald-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
                  <div className="text-center">
                    <p className="text-emerald-600 font-semibold text-xs sm:text-sm mb-1 sm:mb-2">
                      ESTIMATED EARNINGS
                    </p>
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-1 sm:mb-2">
                      ₹{loadData.estimatedFreight.toLocaleString()}
                    </p>
                    <p className="text-emerald-600 flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
                      <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span>High-profit opportunity</span>
                    </p>
                  </div>
                </div>

                {/* Load Specifications Grid */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
                  {[
                    { icon: Weight, label: 'Load Weight', value: `${loadData.loadWeight.toLocaleString()} lbs` },
                    { icon: Truck, label: 'Vehicle Type', value: loadData.vehicleType },
                    { icon: Calendar, label: 'Pickup', value: loadData.pickupDate },
                    { icon: Clock, label: 'Delivery', value: loadData.deliveryDate }
                  ].map((spec, index) => (
                    <div key={index} className="bg-slate-50 rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 text-center">
                      <spec.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600 mx-auto mb-1 sm:mb-2" />
                      <p className="text-xs sm:text-sm text-slate-600">{spec.label}</p>
                      <p className="font-semibold text-slate-900 text-xs sm:text-sm">{spec.value}</p>
                    </div>
                  ))}
                </div>

                {/* Shipper Trust Score */}
                <div className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-sm sm:text-base lg:text-xl font-bold shadow-lg">
                      {loadData.shipper.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col xs:flex-row xs:items-center space-y-1 xs:space-y-0 xs:space-x-2 mb-1">
                        <h3 className="font-bold text-slate-900 text-sm sm:text-base lg:text-lg">
                          {loadData.shipper.name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                          <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                            {loadData.shipper.rating}
                          </span>
                        </div>
                      </div>
                      <p className="text-slate-600 text-xs sm:text-sm mb-1 sm:mb-2">
                        {loadData.shipper.reviews} verified reviews
                      </p>
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                        <span className="text-xs sm:text-sm font-semibold text-green-600">
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
              className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-slate-200 p-4 sm:p-6"
            >
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 sm:mb-4">
                Special Requirements
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {loadData.specialRequirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-blue-50 rounded-lg sm:rounded-xl">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-slate-700 text-sm sm:text-base">{req}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Acceptance Process */}
          <div className="space-y-4 sm:space-y-6">
            {/* Acceptance Process Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-slate-200 overflow-hidden"
            >
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="text-center mb-4 sm:mb-6 lg:mb-8">
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-900 mb-1 sm:mb-2">
                    Load Acceptance
                  </h2>
                  <p className="text-slate-600 text-sm sm:text-base">
                    Secure this shipment in just a few steps
                  </p>
                </div>

                {/* Process Steps */}
                <div className="space-y-3 sm:space-y-4 lg:space-y-6 mb-4 sm:mb-6 lg:mb-8">
                  {acceptanceSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-300 ${
                        index === acceptanceStep 
                          ? 'border-blue-500 bg-blue-50 shadow-lg' 
                          : index < acceptanceStep
                          ? 'border-green-500 bg-green-50'
                          : 'border-slate-200 bg-slate-50'
                      }`}
                    >
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0 ${
                        index < acceptanceStep 
                          ? 'bg-green-500' 
                          : index === acceptanceStep
                          ? 'bg-blue-500 animate-pulse'
                          : 'bg-slate-400'
                      }`}>
                        {index < acceptanceStep ? (
                          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                        ) : (
                          <step.icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold text-sm sm:text-base ${
                          index <= acceptanceStep ? 'text-slate-900' : 'text-slate-500'
                        }`}>
                          {step.title}
                        </h3>
                        <p className={`text-xs sm:text-sm ${
                          index <= acceptanceStep ? 'text-slate-600' : 'text-slate-400'
                        }`}>
                          {step.description}
                        </p>
                      </div>
                      {index === acceptanceStep && isProcessing && (
                        <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Commission Information */}
                <div className="bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h3 className="font-semibold text-slate-900 text-sm sm:text-base">Commission Details</h3>
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600 text-xs sm:text-sm">Platform Commission</span>
                      <span className="font-semibold text-slate-900 text-xs sm:text-sm">3.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 text-xs sm:text-sm">Amount</span>
                      <span className="font-bold text-purple-600 text-sm sm:text-base">₹{commission}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-200 pt-2 sm:pt-3">
                      <span className="text-slate-600 text-sm sm:text-base">Your Earnings</span>
                      <span className="font-bold text-green-600 text-base sm:text-lg">
                        ₹{(loadData.estimatedFreight - parseFloat(commission || 0)).toLocaleString()}
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
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-xl sm:shadow-2xl hover:shadow-2xl sm:hover:shadow-3xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm sm:text-base">Processing Acceptance...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                        <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                        <span className="text-sm sm:text-base">Accept This Load</span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                      </div>
                    )}
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-xl sm:shadow-2xl mb-3 sm:mb-4">
                      <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                        <span className="text-sm sm:text-base">Load Successfully Accepted!</span>
                      </div>
                    </div>
                    <p className="text-slate-600 text-xs sm:text-sm mb-3 sm:mb-4">
                      You are now the assigned carrier for this shipment
                    </p>
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
                  className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-slate-200 p-4 sm:p-6"
                >
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 sm:mb-4">
                    Need Assistance?
                  </h3>
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                    <button className="flex items-center justify-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-xl sm:rounded-2xl hover:bg-blue-100 transition-colors group">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                      <span className="font-semibold text-blue-700 text-sm sm:text-base">Call Agent</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-xl sm:rounded-2xl hover:bg-green-100 transition-colors group">
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 group-hover:scale-110 transition-transform" />
                      <span className="font-semibold text-green-700 text-sm sm:text-base">Live Chat</span>
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
                className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6"
              >
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3 sm:mb-4">
                  Next Steps
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {[
                    "Review shipment documents in your dashboard",
                    "Contact shipper for pickup instructions",
                    "Complete pre-trip vehicle inspection",
                    "Upload required documentation"
                  ].map((step, index) => (
                    <div key={index} className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-slate-700 text-sm sm:text-base">{step}</span>
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