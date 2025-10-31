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
  Loader2
} from "lucide-react";

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
      className="space-y-2"
    >
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        {icon}
        {label}
      </label>
      
      {type === "select" ? (
        <select
          name={name}
          value={form[name]}
          onChange={handleChange}
          className="w-full p-4 bg-white/90 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all backdrop-blur-sm"
          required
          {...props}
        >
          <option value="">{placeholder}</option>
          {options?.map((option) => (
            <option key={option.value || option} value={option.value || option}>
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
          className="w-full p-4 bg-white/90 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all backdrop-blur-sm resize-none"
          rows={3}
          {...props}
        />
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50/30 p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="mb-6 p-6 bg-green-500/10 border border-green-500/20 rounded-3xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 text-green-700">
                <CheckCircle2 size={24} />
                <div>
                  <div className="font-semibold">Load Posted Successfully!</div>
                  <div className="text-sm">Your load has been published and drivers are being notified.</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Truck size={32} />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold">Post New Load</h1>
                <p className="text-blue-100 mt-2">Fill in the details to connect with verified drivers</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 lg:p-8 space-y-6">
            {/* Route Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FormField
                icon={<MapPin className="text-blue-500" size={18} />}
                label="Pickup Location"
                name="from"
                placeholder="Select pickup location"
                options={locations}
              />
              
              <FormField
                icon={<MapPin className="text-green-500" size={18} />}
                label="Delivery Location"
                name="to"
                placeholder="Select delivery location"
                options={locations}
              />
            </div>

            {/* Load Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FormField
                icon={<Package className="text-orange-500" size={18} />}
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
                icon={<IndianRupee className="text-green-500" size={18} />}
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FormField
                icon={<Calendar className="text-purple-500" size={18} />}
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
                icon={<Truck className="text-gray-600" size={18} />}
                label="Vehicle Type Required"
                name="vehicle"
                placeholder="Select vehicle type"
                options={vehicleTypes}
              />
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FormField
                icon={<CreditCard className="text-yellow-500" size={18} />}
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
                icon={<MessageCircle className="text-blue-400" size={18} />}
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
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-blue-50/50 rounded-2xl border border-blue-200/50"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">50+</div>
                <div className="text-sm text-blue-600">Active Drivers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">15min</div>
                <div className="text-sm text-green-600">Avg Response</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">98%</div>
                <div className="text-sm text-purple-600">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">24/7</div>
                <div className="text-sm text-orange-600">Support</div>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-4 rounded-2xl font-semibold shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Posting Load...</span>
                </>
              ) : (
                <>
                  <Zap size={20} />
                  <span>Post Load & Connect with Drivers</span>
                  <ArrowRight size={20} />
                </>
              )}
            </motion.button>

            {/* Footer Note */}
            <div className="text-center">
              <p className="text-gray-600 text-sm">
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