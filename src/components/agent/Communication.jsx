import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaComments, FaPhone } from "react-icons/fa";

const Communication = () => {
  const [messages, setMessages] = useState([
    { id: 1, driver: "Ravi Singh", message: "Load accepted", time: "2 hrs ago" },
    { id: 2, driver: "Arjun Mehta", message: "Reached pickup location", time: "1 hr ago" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage) return;
    setMessages([
      ...messages,
      { id: messages.length + 1, driver: "You", message: newMessage, time: "Just now" },
    ]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <motion.div
        className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-2xl space-y-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FaComments /> Communication
        </h2>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              className={`p-3 rounded-lg shadow-sm ${
                msg.driver === "You" ? "bg-blue-100 text-right" : "bg-gray-100"
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <p className="font-medium">{msg.driver}</p>
              <p>{msg.message}</p>
              <span className="text-xs text-gray-500">{msg.time}</span>
            </motion.div>
          ))}
        </div>

        <div className="flex gap-2 mt-4">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-blue-700"
            onClick={sendMessage}
          >
            Send
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Communication;
