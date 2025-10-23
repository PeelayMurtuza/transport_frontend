import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaFilter, FaMapMarkedAlt, FaTrash } from "react-icons/fa";

const MyLoads = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");

  const loads = [
    {
      id: 1,
      from: "Mumbai",
      to: "Delhi",
      driver: "Ravi Singh",
      freight: 25000,
      status: "Pending",
    },
    {
      id: 2,
      from: "Pune",
      to: "Surat",
      driver: "Arjun Mehta",
      freight: 12000,
      status: "Completed",
    },
    {
      id: 3,
      from: "Jaipur",
      to: "Ahmedabad",
      driver: "Rahul Verma",
      freight: 18000,
      status: "Accepted",
    },
  ];

  // --- Filtering & Sorting Logic ---
  const filteredLoads = loads
    .filter(
      (load) =>
        (statusFilter === "All" || load.status === statusFilter) &&
        (load.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
          load.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
          load.driver.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.freight - b.freight
        : sortOrder === "desc"
        ? b.freight - a.freight
        : 0
    );

  return (
    <motion.div
      className="bg-white p-8 rounded-3xl shadow-2xl max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-3xl font-extrabold text-gray-800">My Loads</h2>

        {/* Search and Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by city or driver..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="relative">
            <FaFilter className="absolute left-3 top-3 text-gray-400" />
            <select
              className="pl-9 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              <option>Pending</option>
              <option>Accepted</option>
              <option>Completed</option>
            </select>
          </div>

          <select
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="none">Sort by Freight</option>
            <option value="asc">Low → High</option>
            <option value="desc">High → Low</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-md">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <tr>
              <th className="p-4 font-medium">From</th>
              <th className="p-4 font-medium">To</th>
              <th className="p-4 font-medium">Driver</th>
              <th className="p-4 font-medium">Freight (₹)</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoads.length > 0 ? (
              filteredLoads.map((load) => (
                <tr
                  key={load.id}
                  className="hover:bg-gray-50 border-b transition duration-150"
                >
                  <td className="p-4 font-medium">{load.from}</td>
                  <td className="p-4">{load.to}</td>
                  <td className="p-4">{load.driver}</td>
                  <td className="p-4 font-semibold text-gray-700">
                    ₹{load.freight.toLocaleString()}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        load.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : load.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {load.status}
                    </span>
                  </td>
                  <td className="p-4 flex items-center gap-3">
                    <button className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-md transition">
                      <FaMapMarkedAlt /> View
                    </button>
                    <button className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md transition">
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-8 text-gray-500 font-medium"
                >
                  No loads found for this filter/search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default MyLoads;
