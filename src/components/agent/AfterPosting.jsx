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
import { useTheme } from "../../context/ThemeContext"; 

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
  const { theme, isDark } = useTheme();
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
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 xs:w-2 xs:h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
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

  const StatCard = ({ icon, label, value, color }) => {
    const bgColor = isDark 
      ? color.replace('50', '900/30').replace('200', '700')
      : color;
    
    return (
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        className={`p-3 xs:p-4 sm:p-5 lg:p-6 rounded-xl xs:rounded-2xl lg:rounded-3xl backdrop-blur-sm border ${bgColor} ${theme.shadow.lg} min-h-[80px] xs:min-h-[90px] sm:min-h-[100px] flex flex-col justify-center`}
      >
        <div className="flex items-center gap-2 xs:gap-3 mb-2 xs:mb-3">
          <div className={`p-1 xs:p-2 ${isDark ? 'bg-white/10' : 'bg-white/20'} rounded-lg xs:rounded-xl flex-shrink-0`}>
            {React.cloneElement(icon, { 
              className: "size-3 xs:size-4 sm:size-5" + (icon.props.className || "") 
            })}
          </div>
          <div className={`text-xs xs:text-sm font-medium ${theme.text.secondary} truncate`}>
            {label}
          </div>
        </div>
        <div className={`text-lg xs:text-xl sm:text-2xl font-bold ${theme.text.primary} leading-tight`}>
          {value}
        </div>
      </motion.div>
    );
  };

  const QuickAction = ({ icon, label, onClick, variant = "primary" }) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`flex items-center gap-2 xs:gap-3 px-3 xs:px-4 sm:px-5 lg:px-6 py-2 xs:py-3 sm:py-4 rounded-lg xs:rounded-xl lg:rounded-2xl font-semibold transition-all text-xs xs:text-sm ${
        variant === "primary" 
          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl"
          : `${theme.button.secondary} border ${theme.border.secondary} ${theme.shadow.sm}`
      }`}
    >
      {React.cloneElement(icon, { className: "size-3 xs:size-4 sm:size-5" })}
      <span className="truncate">{label}</span>
    </motion.button>
  );

  return (
    <div className={`min-h-screen bg-gradient-to-br ${
      isDark 
        ? 'from-gray-900 via-gray-800 to-gray-900' 
        : 'from-green-50 via-blue-50/30 to-purple-50/30'
    } p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center`}>
      {/* Confetti Animation */}
      <AnimatePresence>
        {showConfetti && <Confetti />}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className={`${theme.card.bg} backdrop-blur-xl rounded-xl xs:rounded-2xl sm:rounded-3xl ${theme.shadow.xl} border ${
            isDark ? 'border-gray-700' : 'border-white/20'
          } overflow-hidden`}
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 xs:p-5 sm:p-6 lg:p-8 xl:p-10 text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-white/10 rounded-full -translate-y-16 xs:-translate-y-20 sm:-translate-y-24 lg:-translate-y-32 translate-x-16 xs:translate-x-20 sm:translate-x-24 lg:translate-x-32" />
            <div className="absolute bottom-0 left-0 w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-white/5 rounded-full -translate-x-12 xs:-translate-x-14 sm:-translate-x-16 lg:-translate-x-24 translate-y-12 xs:translate-y-14 sm:translate-y-16 lg:translate-y-24" />
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white/20 rounded-xl xs:rounded-2xl lg:rounded-3xl flex items-center justify-center mx-auto mb-3 xs:mb-4 sm:mb-5 lg:mb-6 backdrop-blur-sm"
              >
                <PartyPopper className="size-5 xs:size-6 sm:size-7 lg:size-10" />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 xs:mb-3 sm:mb-4 leading-tight"
              >
                Load Posted Successfully!
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-green-100 text-xs xs:text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed"
              >
                Your load is now live and being matched with verified drivers. 
                You should receive driver responses within minutes.
              </motion.p>
            </div>
          </div>

          {/* Load Summary */}
          <div className="p-3 xs:p-4 sm:p-5 lg:p-6 xl:p-8">
            {/* Load ID with Copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`flex flex-col lg:flex-row items-center justify-between gap-3 xs:gap-4 mb-4 xs:mb-5 sm:mb-6 lg:mb-8 p-3 xs:p-4 sm:p-5 lg:p-6 rounded-xl xs:rounded-2xl lg:rounded-3xl border ${
                isDark 
                  ? 'bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-800/50' 
                  : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200/50'
              }`}
            >
              <div className="flex items-center gap-2 xs:gap-3 min-w-0">
                <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg xs:rounded-xl lg:rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Truck className="text-white size-3 xs:size-4 sm:size-5 lg:size-6" />
                </div>
                <div className="min-w-0">
                  <div className={`text-xs xs:text-sm ${theme.text.secondary}`}>
                    Load Reference
                  </div>
                  <div className={`text-lg xs:text-xl sm:text-2xl font-bold ${theme.text.primary} truncate`}>
                    #{load.id}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-1 xs:gap-2 mt-2 lg:mt-0">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyToClipboard}
                  className={`flex items-center gap-1 xs:gap-2 px-2 xs:px-3 sm:px-4 py-1 xs:py-2 ${
                    isDark ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-white border-gray-200 hover:bg-gray-50'
                  } border rounded-lg xs:rounded-xl lg:rounded-2xl transition-colors text-xs xs:text-sm`}
                >
                  <Copy className="size-3 xs:size-4" />
                  <span>{copiedId ? "Copied!" : "Copy ID"}</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={shareLoad}
                  className={`flex items-center gap-1 xs:gap-2 px-2 xs:px-3 sm:px-4 py-1 xs:py-2 ${
                    isDark ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-white border-gray-200 hover:bg-gray-50'
                  } border rounded-lg xs:rounded-xl lg:rounded-2xl transition-colors text-xs xs:text-sm`}
                >
                  <Share2 className="size-3 xs:size-4" />
                  <span>Share</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 xs:grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 mb-4 xs:mb-5 sm:mb-6 lg:mb-8"
            >
              <StatCard
                icon={<MapPin className="text-blue-500" />}
                label="Total Distance"
                value={load.distance}
                color={isDark ? "bg-blue-900/30 border-blue-800" : "bg-blue-50/50 border-blue-200"}
              />
              <StatCard
                icon={<IndianRupee className="text-green-500" />}
                label="Expected Freight"
                value={load.freight}
                color={isDark ? "bg-green-900/30 border-green-800" : "bg-green-50/50 border-green-200"}
              />
              <StatCard
                icon={<Users className="text-purple-500" />}
                label="Driver Matches"
                value={load.driverMatches}
                color={isDark ? "bg-purple-900/30 border-purple-800" : "bg-purple-50/50 border-purple-200"}
              />
              <StatCard
                icon={<Clock className="text-orange-500" />}
                label="Avg Response"
                value="< 15min"
                color={isDark ? "bg-orange-900/30 border-orange-800" : "bg-orange-50/50 border-orange-200"}
              />
            </motion.div>

            {/* Route Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className={`p-3 xs:p-4 sm:p-5 lg:p-6 rounded-xl xs:rounded-2xl lg:rounded-3xl border ${
                isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50/50 border-gray-200'
              } mb-4 xs:mb-5 sm:mb-6 lg:mb-8`}
            >
              <div className="flex items-center justify-between mb-3 xs:mb-4">
                <h3 className={`font-semibold ${theme.text.primary} text-sm xs:text-base`}>
                  Route Overview
                </h3>
                <div className="flex items-center gap-1 text-green-600">
                  <Sparkles className="size-3 xs:size-4" />
                  <span className="text-xs xs:text-sm font-medium">Live Tracking Ready</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-center min-w-0 flex-1">
                  <div className="w-2 h-2 xs:w-3 xs:h-3 bg-blue-500 rounded-full mx-auto mb-1 xs:mb-2"></div>
                  <div className={`font-medium ${theme.text.primary} text-xs xs:text-sm truncate`}>
                    {load.from}
                  </div>
                  <div className={`text-xs ${theme.text.secondary}`}>Pickup</div>
                </div>
                
                <div className="flex-1 mx-2 xs:mx-3 sm:mx-4 relative">
                  <div className="h-1 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500 rounded-full"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Truck className={`${isDark ? 'text-gray-500' : 'text-gray-400'} animate-pulse size-3 xs:size-4 sm:size-5`} />
                  </div>
                </div>
                
                <div className="text-center min-w-0 flex-1">
                  <div className="w-2 h-2 xs:w-3 xs:h-3 bg-green-500 rounded-full mx-auto mb-1 xs:mb-2"></div>
                  <div className={`font-medium ${theme.text.primary} text-xs xs:text-sm truncate`}>
                    {load.to}
                  </div>
                  <div className={`text-xs ${theme.text.secondary}`}>Delivery</div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-3 xs:space-y-4"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 xs:gap-4">
                <QuickAction
                  icon={<Eye />}
                  label="View My Loads"
                  onClick={() => navigate("/agent/myload")}
                  variant="primary"
                />
                <QuickAction
                  icon={<Zap />}
                  label="Post Another Load"
                  onClick={() => navigate("/agent/postload")}
                  variant="secondary"
                />
              </div>
              
              <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2 xs:gap-3 sm:gap-4">
                <QuickAction
                  icon={<MessageCircle />}
                  label="Chat with Drivers"
                  onClick={() => navigate("/communication")}
                  variant="secondary"
                />
                <QuickAction
                  icon={<Download />}
                  label="Download Details"
                  onClick={() => window.print()}
                  variant="secondary"
                />
                <QuickAction
                  icon={<Star />}
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
              className={`mt-4 xs:mt-5 sm:mt-6 lg:mt-8 p-3 xs:p-4 sm:p-5 lg:p-6 rounded-xl xs:rounded-2xl lg:rounded-3xl border ${
                isDark 
                  ? 'bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-800' 
                  : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
              }`}
            >
              <h4 className={`font-semibold ${theme.text.primary} text-sm xs:text-base mb-2 xs:mb-3 flex items-center gap-1 xs:gap-2`}>
                <CheckCircle className="text-green-500 size-4 xs:size-5" />
                What happens next?
              </h4>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-3 text-xs xs:text-sm">
                {[
                  "Drivers will start bidding within minutes",
                  "You'll receive push notifications for new bids",
                  "Chat directly with interested drivers",
                  "Track all activity in your loads dashboard"
                ].map((tip, index) => (
                  <div key={index} className="flex items-center gap-1 xs:gap-2">
                    <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <span className={`leading-tight ${theme.text.secondary}`}>
                      {tip}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AfterPosting;