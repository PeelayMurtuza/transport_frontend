import React, { useState } from "react";
import { motion } from "framer-motion";

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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("🎉 Load Posted Successfully!");
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto bg-gradient-to-br from-indigo-500/20 via-blue-500/10 to-purple-500/20 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20 mt-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          🚛 Post New Load
        </h2>
        <p className="text-gray-600 font-medium">
          Select your load details and connect instantly with nearby drivers.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-10 mt-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* From Location */}
          <motion.select
            whileFocus={{ scale: 1.02 }}
            name="from"
            className="p-3 border border-gray-200 rounded-xl w-full bg-white/80 focus:ring-2 focus:ring-indigo-500"
            value={form.from}
            onChange={handleChange}
          >
            <option value="">Select From Location</option>
            <option>Mumbai</option>
            <option>Pune</option>
            <option>Delhi</option>
            <option>Surat</option>
            <option>Nagpur</option>
            <option>Hyderabad</option>
          </motion.select>

          {/* To Location */}
          <motion.select
            whileFocus={{ scale: 1.02 }}
            name="to"
            className="p-3 border border-gray-200 rounded-xl w-full bg-white/80 focus:ring-2 focus:ring-indigo-500"
            value={form.to}
            onChange={handleChange}
          >
            <option value="">Select To Location</option>
            <option>Delhi</option>
            <option>Chennai</option>
            <option>Ahmedabad</option>
            <option>Jaipur</option>
            <option>Indore</option>
            <option>Lucknow</option>
          </motion.select>

          {/* Load Weight */}
          <motion.select
            whileFocus={{ scale: 1.02 }}
            name="weight"
            className="p-3 border border-gray-200 rounded-xl w-full bg-white/80 focus:ring-2 focus:ring-indigo-500"
            value={form.weight}
            onChange={handleChange}
          >
            <option value="">Select Load Weight (Tons)</option>
            <option>5 Tons</option>
            <option>10 Tons</option>
            <option>15 Tons</option>
            <option>20 Tons</option>
            <option>25 Tons</option>
          </motion.select>

          {/* Freight */}
          <motion.select
            whileFocus={{ scale: 1.02 }}
            name="freight"
            className="p-3 border border-gray-200 rounded-xl w-full bg-white/80 focus:ring-2 focus:ring-indigo-500"
            value={form.freight}
            onChange={handleChange}
          >
            <option value="">Expected Freight (₹)</option>
            <option>₹10,000 - ₹20,000</option>
            <option>₹20,000 - ₹30,000</option>
            <option>₹30,000 - ₹50,000</option>
            <option>₹50,000+</option>
          </motion.select>

          {/* Date Time Dropdown */}
          <motion.select
            whileFocus={{ scale: 1.02 }}
            name="datetime"
            className="p-3 border border-gray-200 rounded-xl w-full bg-white/80 focus:ring-2 focus:ring-indigo-500"
            value={form.datetime}
            onChange={handleChange}
          >
            <option value="">Select Date/Time Slot</option>
            <option>Today - Morning</option>
            <option>Today - Evening</option>
            <option>Tomorrow - Morning</option>
            <option>Tomorrow - Evening</option>
            <option>Custom (Contact Driver)</option>
          </motion.select>

          {/* Vehicle Type */}
          <motion.select
            whileFocus={{ scale: 1.02 }}
            name="vehicle"
            className="p-3 border border-gray-200 rounded-xl w-full bg-white/80 focus:ring-2 focus:ring-indigo-500"
            value={form.vehicle}
            onChange={handleChange}
          >
            <option value="">Select Vehicle Type</option>
            <option>Open</option>
            <option>Container</option>
            <option>Tanker</option>
            <option>Trailer</option>
            <option>Flatbed</option>
          </motion.select>

          {/* Extra Charges */}
          <motion.select
            whileFocus={{ scale: 1.02 }}
            name="charges"
            className="p-3 border border-gray-200 rounded-xl w-full bg-white/80 focus:ring-2 focus:ring-indigo-500"
            value={form.charges}
            onChange={handleChange}
          >
            <option value="">Extra Charges</option>
            <option>No Extra Charges</option>
            <option>Includes Toll</option>
            <option>Includes Loading/Unloading</option>
            <option>Includes Both</option>
          </motion.select>

          {/* Notes */}
          <motion.textarea
            whileFocus={{ scale: 1.02 }}
            name="notes"
            placeholder="Special Notes / Instructions"
            className="p-3 border border-gray-200 rounded-xl w-full h-28 bg-white/80 focus:ring-2 focus:ring-indigo-500"
            value={form.notes}
            onChange={handleChange}
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 font-semibold text-white rounded-xl bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500 hover:shadow-xl hover:from-purple-600 hover:to-indigo-600 transition duration-300"
        >
          🚀 Post Load
        </motion.button>
      </form>
    </motion.div>
  );
};

export default PostLoad;
