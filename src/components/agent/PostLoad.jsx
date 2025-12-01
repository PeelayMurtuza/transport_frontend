import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Truck, 
  MapPin, 
  Calendar, 
  Package, 
  IndianRupee,
  Clock,
  CreditCard,
  MessageCircle,
  Zap,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Loader2,
  Sun,
  Moon
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const PostLoad = () => {
  const [form, setForm] = useState({
    from: "",
    to: "",
    weight: "",
    freight: "",
    datetime: "",
    vehicle: "",
    charges: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { theme, isDark, toggleTheme } = useTheme();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
      // Reset form
      setForm({
        from: "", to: "", weight: "", freight: "", 
        datetime: "", vehicle: "", charges: "", notes: ""
      });
    }, 3000);
  };

  const locations = [
    "Mumbai, Maharashtra", "Delhi, NCR", "Bangalore, Karnataka", 
    "Hyderabad, Telangana", "Chennai, Tamil Nadu", "Kolkata, West Bengal",
    "Pune, Maharashtra", "Ahmedabad, Gujarat", "Surat, Gujarat", "Jaipur, Rajasthan"
  ];

  const vehicleTypes = [
    { value: "open", label: "Open Truck", capacity: "5-25 Tons" },
    { value: "container", label: "Container", capacity: "10-30 Tons" },
    { value: "tanker", label: "Tanker", capacity: "15-35 Tons" },
    { value: "trailer", label: "Trailer", capacity: "20-40 Tons" },
    { value: "flatbed", label: "Flatbed", capacity: "8-20 Tons" },
    { value: "refrigerated", label: "Refrigerated", capacity: "5-15 Tons" }
  ];

  const FormField = ({ icon, label, name, type = "select", options, placeholder, ...props }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileFocus={{ scale: 1.02 }}
      className="space-y-1 xs:space-y-2"
    >
      <label className={`flex items-center gap-1 xs:gap-2 text-xs xs:text-sm font-medium transition-colors duration-500 ${
        isDark ? 'text-gray-300' : 'text-gray-700'
      }`}>
        {React.cloneElement(icon, { className: "size-3 xs:size-4" + (icon.props.className || "") })}
        <span className="truncate">{label}</span>
      </label>
      
      {type === "select" ? (
        <select
          name={name}
          value={form[name]}
          onChange={handleChange}
          className={`w-full p-2 xs:p-3 sm:p-4 border rounded-lg xs:rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all backdrop-blur-sm text-xs xs:text-sm transition-colors duration-500 ${
            isDark 
              ? 'bg-gray-700 border-gray-600 text-gray-100' 
              : 'bg-white/90 border-gray-200 text-gray-900'
          }`}
          required
          {...props}
        >
          <option value="">{placeholder}</option>
          {options?.map((option) => (
            <option key={option.value || option} value={option.value || option} className={isDark ? 'bg-gray-800' : 'bg-white'}>
              {option.label || option}
            </option>
          ))}
        </select>
      ) : (
        <textarea
          name={name}
          value={form[name]}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-full p-2 xs:p-3 sm:p-4 border rounded-lg xs:rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all backdrop-blur-sm resize-none text-xs xs:text-sm transition-colors duration-500 ${
            isDark 
              ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400' 
              : 'bg-white/90 border-gray-200 text-gray-900 placeholder-gray-500'
          }`}
          rows={2}
          {...props}
        />
      )}
    </motion.div>
  );

  return (
    <div className={`min-h-screen p-2 xs:p-3 sm:p-4 md:p-6 lg:p-8 transition-colors duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50/30'
    }`}>
      <div className="max-w-4xl mx-auto">
        {/* Theme Toggle Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors duration-300 ${
              isDark 
                ? 'bg-gray-800 hover:bg-gray-700 text-amber-300' 
                : 'bg-white/80 hover:bg-white text-blue-600'
            } shadow-sm`}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className={`mb-4 xs:mb-5 sm:mb-6 p-3 xs:p-4 sm:p-6 rounded-xl xs:rounded-2xl sm:rounded-3xl backdrop-blur-sm border transition-colors duration-500 ${
                isDark 
                  ? 'bg-green-900/20 border-green-800/30' 
                  : 'bg-green-500/10 border-green-500/20'
              }`}
            >
              <div className={`flex items-center gap-2 xs:gap-3 transition-colors duration-500 ${
                isDark ? 'text-green-300' : 'text-green-700'
              }`}>
                <CheckCircle2 className="size-4 xs:size-5 sm:size-6" />
                <div className="min-w-0 flex-1">
                  <div className={`font-semibold text-xs xs:text-sm sm:text-base transition-colors duration-500 ${
                    isDark ? 'text-green-200' : 'text-green-800'
                  }`}>
                    Load Posted Successfully!
                  </div>
                  <div className={`text-xs xs:text-sm mt-0.5 transition-colors duration-500 ${
                    isDark ? 'text-green-300' : 'text-green-600'
                  }`}>
                    Your load has been published and drivers are being notified.
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className={`backdrop-blur-xl rounded-xl xs:rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl lg:shadow-2xl border overflow-hidden transition-colors duration-500 ${
            isDark 
              ? 'bg-gray-800/80 border-gray-700/50' 
              : 'bg-white/80 backdrop-blur-xl border-white/20'
          }`}
        >
          {/* Header */}
          <div className={`p-4 xs:p-5 sm:p-6 lg:p-8 transition-colors duration-500 ${
            isDark 
              ? 'bg-gradient-to-r from-blue-800 to-purple-800' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600'
          } text-white`}>
            <div className="flex items-center gap-2 xs:gap-3 sm:gap-4">
              <div className={`w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg xs:rounded-xl sm:rounded-2xl flex items-center justify-center backdrop-blur-sm flex-shrink-0 ${
                isDark ? 'bg-white/10' : 'bg-white/20'
              }`}>
                <Truck className="size-4 xs:size-5 sm:size-6 lg:size-8" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight">
                  Post New Load
                </h1>
                <p className={`mt-1 text-xs xs:text-sm sm:text-base leading-relaxed transition-colors duration-500 ${
                  isDark ? 'text-blue-200' : 'text-blue-100'
                }`}>
                  Fill in the details to connect with verified drivers
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-3 xs:p-4 sm:p-5 lg:p-6 xl:p-8 space-y-4 xs:space-y-5 sm:space-y-6">
            {/* Route Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 lg:gap-6">
              <FormField
                icon={<MapPin className={isDark ? "text-blue-400" : "text-blue-500"} />}
                label="Pickup Location"
                name="from"
                placeholder="Select pickup location"
                options={locations}
              />
              
              <FormField
                icon={<MapPin className={isDark ? "text-green-400" : "text-green-500"} />}
                label="Delivery Location"
                name="to"
                placeholder="Select delivery location"
                options={locations}
              />
            </div>

            {/* Load Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 lg:gap-6">
              <FormField
                icon={<Package className={isDark ? "text-orange-400" : "text-orange-500"} />}
                label="Load Weight"
                name="weight"
                placeholder="Select load weight"
                options={[
                  "1-5 Tons (Light)",
                  "5-10 Tons (Medium)", 
                  "10-20 Tons (Heavy)",
                  "20-30 Tons (Extra Heavy)",
                  "30+ Tons (Special)"
                ]}
              />
              
              <FormField
                icon={<IndianRupee className={isDark ? "text-green-400" : "text-green-500"} />}
                label="Expected Freight"
                name="freight"
                placeholder="Select freight range"
                options={[
                  "₹5,000 - ₹10,000",
                  "₹10,000 - ₹20,000", 
                  "₹20,000 - ₹35,000",
                  "₹35,000 - ₹50,000",
                  "₹50,000 - ₹75,000",
                  "₹75,000+ (Negotiable)"
                ]}
              />
            </div>

            {/* Timing & Vehicle */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 lg:gap-6">
              <FormField
                icon={<Calendar className={isDark ? "text-purple-400" : "text-purple-500"} />}
                label="Preferred Date & Time"
                name="datetime"
                placeholder="Select pickup timing"
                options={[
                  "Today - Morning (6 AM - 12 PM)",
                  "Today - Afternoon (12 PM - 4 PM)",
                  "Today - Evening (4 PM - 8 PM)",
                  "Tomorrow - Morning",
                  "Tomorrow - Afternoon", 
                  "Tomorrow - Evening",
                  "Within 3 days - Flexible",
                  "Custom Schedule"
                ]}
              />
              
              <FormField
                icon={<Truck className={isDark ? "text-gray-400" : "text-gray-600"} />}
                label="Vehicle Type Required"
                name="vehicle"
                placeholder="Select vehicle type"
                options={vehicleTypes}
              />
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 lg:gap-6">
              <FormField
                icon={<CreditCard className={isDark ? "text-yellow-400" : "text-yellow-500"} />}
                label="Additional Charges"
                name="charges"
                placeholder="Select additional charges"
                options={[
                  "No Extra Charges",
                  "Includes Toll Charges",
                  "Includes Loading/Unloading",
                  "Includes Both Toll & Loading",
                  "Fuel Surcharge Included",
                  "All Inclusive Package"
                ]}
              />
              
              <FormField
                icon={<MessageCircle className={isDark ? "text-blue-300" : "text-blue-400"} />}
                label="Special Instructions"
                name="notes"
                type="textarea"
                placeholder="Any special requirements, loading instructions, or notes for the driver..."
              />
            </div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`grid grid-cols-2 xs:grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 p-3 xs:p-4 sm:p-5 lg:p-6 rounded-lg xs:rounded-xl sm:rounded-2xl border transition-colors duration-500 ${
                isDark 
                  ? 'bg-blue-900/20 border-blue-800/30' 
                  : 'bg-blue-50/50 border-blue-200/50'
              }`}
            >
              <div className="text-center">
                <div className={`text-base xs:text-lg sm:text-xl lg:text-2xl font-bold leading-tight transition-colors duration-500 ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  50+
                </div>
                <div className={`text-xs xs:text-sm mt-0.5 xs:mt-1 transition-colors duration-500 ${
                  isDark ? 'text-blue-300' : 'text-blue-600'
                }`}>
                  Active Drivers
                </div>
              </div>
              <div className="text-center">
                <div className={`text-base xs:text-lg sm:text-xl lg:text-2xl font-bold leading-tight transition-colors duration-500 ${
                  isDark ? 'text-green-400' : 'text-green-600'
                }`}>
                  15min
                </div>
                <div className={`text-xs xs:text-sm mt-0.5 xs:mt-1 transition-colors duration-500 ${
                  isDark ? 'text-green-300' : 'text-green-600'
                }`}>
                  Avg Response
                </div>
              </div>
              <div className="text-center">
                <div className={`text-base xs:text-lg sm:text-xl lg:text-2xl font-bold leading-tight transition-colors duration-500 ${
                  isDark ? 'text-purple-400' : 'text-purple-600'
                }`}>
                  98%
                </div>
                <div className={`text-xs xs:text-sm mt-0.5 xs:mt-1 transition-colors duration-500 ${
                  isDark ? 'text-purple-300' : 'text-purple-600'
                }`}>
                  Success Rate
                </div>
              </div>
              <div className="text-center">
                <div className={`text-base xs:text-lg sm:text-xl lg:text-2xl font-bold leading-tight transition-colors duration-500 ${
                  isDark ? 'text-orange-400' : 'text-orange-600'
                }`}>
                  24/7
                </div>
                <div className={`text-xs xs:text-sm mt-0.5 xs:mt-1 transition-colors duration-500 ${
                  isDark ? 'text-orange-300' : 'text-orange-600'
                }`}>
                  Support
                </div>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className={`w-full ${
                isDark ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                       : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
              } text-white py-2 xs:py-3 sm:py-4 rounded-lg xs:rounded-xl sm:rounded-2xl font-semibold shadow-lg sm:shadow-xl lg:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 xs:gap-2 sm:gap-3 text-xs xs:text-sm sm:text-base`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin size-3 xs:size-4 sm:size-5" />
                  <span className="truncate">Posting Load...</span>
                </>
              ) : (
                <>
                  <Zap className="size-3 xs:size-4 sm:size-5" />
                  <span className="truncate">Post Load & Connect with Drivers</span>
                  <ArrowRight className="size-3 xs:size-4 sm:size-5 hidden xs:block" />
                </>
              )}
            </motion.button>

            {/* Footer Note */}
            <div className="text-center">
              <p className={`text-xs xs:text-sm transition-colors duration-500 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                ⚡ Your load will be visible to 50+ verified drivers instantly
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default PostLoad;