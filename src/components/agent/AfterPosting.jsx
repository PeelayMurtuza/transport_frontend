import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  CheckCircle, 
  Truck, 
  MapPin, 
  IndianRupee, 
  Calendar,
  Clock,
  Users,
  Zap,
  ArrowRight,
  Copy,
  Share2,
  Download,
  Eye,
  MessageCircle,
  Star,
  Sparkles,
  PartyPopper
} from "lucide-react";

const AfterPosting = ({ load = {
  id: "TC12478",
  from: "Mumbai, MH",
  to: "Delhi, DL", 
  distance: "1,420 km",
  freight: "₹25,000",
  vehicle: "Container Truck",
  weight: "15 Tons",
  date: "Today - Morning",
  driverMatches: 12
} }) => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(load.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const shareLoad = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Load #${load.id} - TransConnect`,
          text: `New load posted from ${load.from} to ${load.to}. Freight: ${load.freight}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Sharing cancelled');
      }
    }
  };

  const Confetti = () => (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: -20,
            scale: 0,
            rotate: 0
          }}
          animate={{ 
            y: window.innerHeight + 100,
            scale: [0, 1, 0.8],
            rotate: 360,
            x: Math.random() * window.innerWidth - 100
          }}
          transition={{ 
            duration: 2 + Math.random() * 2,
            ease: "easeOut",
            delay: Math.random() * 0.5
          }}
        />
      ))}
    </div>
  );

  const StatCard = ({ icon, label, value, color }) => (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      className={`p-6 rounded-3xl backdrop-blur-sm border ${color} shadow-lg`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-white/20 rounded-2xl">
          {icon}
        </div>
        <div className="text-sm font-medium text-gray-600">{label}</div>
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </motion.div>
  );

  const QuickAction = ({ icon, label, onClick, variant = "primary" }) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all ${
        variant === "primary" 
          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl"
          : "bg-white/80 text-gray-700 border border-gray-200 hover:bg-white"
      }`}
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50/30 to-purple-50/30 p-4 lg:p-8 flex items-center justify-center">
      {/* Confetti Animation */}
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 lg:p-10 text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -translate-x-24 translate-y-24" />
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm"
              >
                <PartyPopper size={40} />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl lg:text-4xl font-bold mb-4"
              >
                Load Posted Successfully!
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-green-100 text-lg max-w-2xl mx-auto"
              >
                Your load is now live and being matched with verified drivers. 
                You should receive driver responses within minutes.
              </motion.p>
            </div>
          </div>

          {/* Load Summary */}
          <div className="p-6 lg:p-8">
            {/* Load ID with Copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl border border-blue-200/50"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <Truck className="text-white" size={24} />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Load Reference</div>
                  <div className="text-2xl font-bold text-gray-900">#{load.id}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors"
                >
                  <Copy size={18} />
                  <span>{copiedId ? "Copied!" : "Copy ID"}</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={shareLoad}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors"
                >
                  <Share2 size={18} />
                  <span>Share</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            >
              <StatCard
                icon={<MapPin className="text-blue-500" size={20} />}
                label="Total Distance"
                value={load.distance}
                color="bg-blue-50/50 border-blue-200"
              />
              <StatCard
                icon={<IndianRupee className="text-green-500" size={20} />}
                label="Expected Freight"
                value={load.freight}
                color="bg-green-50/50 border-green-200"
              />
              <StatCard
                icon={<Users className="text-purple-500" size={20} />}
                label="Driver Matches"
                value={load.driverMatches}
                color="bg-purple-50/50 border-purple-200"
              />
              <StatCard
                icon={<Clock className="text-orange-500" size={20} />}
                label="Avg Response"
                value="< 15min"
                color="bg-orange-50/50 border-orange-200"
              />
            </motion.div>

            {/* Route Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="p-6 bg-gray-50/50 rounded-3xl border border-gray-200 mb-8"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Route Overview</h3>
                <div className="flex items-center gap-1 text-green-600">
                  <Sparkles size={16} />
                  <span className="text-sm font-medium">Live Tracking Ready</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-2"></div>
                  <div className="font-medium text-gray-900">{load.from}</div>
                  <div className="text-sm text-gray-600">Pickup</div>
                </div>
                
                <div className="flex-1 mx-4 relative">
                  <div className="h-1 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Truck className="text-gray-400 animate-pulse" size={20} />
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                  <div className="font-medium text-gray-900">{load.to}</div>
                  <div className="text-sm text-gray-600">Delivery</div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <QuickAction
                  icon={<Eye size={20} />}
                  label="View My Loads"
                  onClick={() => navigate("/agent/myload")}
                  variant="primary"
                />
                <QuickAction
                  icon={<Zap size={20} />}
                  label="Post Another Load"
                  onClick={() => navigate("/agent/postload")}
                  variant="secondary"
                />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <QuickAction
                  icon={<MessageCircle size={18} />}
                  label="Chat with Drivers"
                  onClick={() => navigate("/communication")}
                  variant="secondary"
                />
                <QuickAction
                  icon={<Download size={18} />}
                  label="Download Details"
                  onClick={() => window.print()}
                  variant="secondary"
                />
                <QuickAction
                  icon={<Star size={18} />}
                  label="Rate Experience"
                  onClick={() => {}}
                  variant="secondary"
                />
              </div>
            </motion.div>

            {/* Success Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl border border-green-200"
            >
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle className="text-green-500" size={20} />
                What happens next?
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Drivers will start bidding within minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>You'll receive push notifications for new bids</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Chat directly with interested drivers</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Track all activity in your loads dashboard</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AfterPosting;