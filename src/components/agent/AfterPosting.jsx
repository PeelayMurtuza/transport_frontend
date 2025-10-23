import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AfterPosting = ({ load }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="max-w-4xl mx-auto bg-gradient-to-r from-green-100 via-green-50 to-green-100 backdrop-blur-md border border-green-300 p-10 rounded-3xl shadow-2xl text-center relative overflow-hidden mt-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Confetti Animation Placeholder */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      <h2 className="text-4xl font-extrabold text-green-700 mb-4">
        🎉 Load Posted Successfully!
      </h2>
      <p className="text-gray-700 text-lg mb-8">
        Your load is now visible to nearby drivers and the system has calculated
        the total distance automatically.
      </p>

      {/* Load Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/70 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-gray-600 font-medium">Load ID</h3>
          <p className="text-2xl font-bold text-green-700">{load?.id || "12345"}</p>
        </div>
        <div className="bg-white/70 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-gray-600 font-medium">Total Distance</h3>
          <p className="text-2xl font-bold text-green-700">{load?.distance || "350 km"}</p>
        </div>
        <div className="bg-white/70 p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h3 className="text-gray-600 font-medium">Expected Freight</h3>
          <p className="text-2xl font-bold text-green-700">{load?.freight || "₹25,000"}</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/agent/myload")}
          className="bg-green-600 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-green-700 transition"
        >
          View My Loads
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/agent/postload")}
          className="bg-white text-green-600 px-8 py-3 rounded-xl shadow-lg border border-green-600 hover:bg-green-50 transition"
        >
          Post Another Load
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AfterPosting;
