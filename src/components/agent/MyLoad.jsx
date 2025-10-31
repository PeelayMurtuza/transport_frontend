import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Filter, 
  MapPin, 
  Trash2, 
  Eye,
  Truck,
  Calendar,
  IndianRupee,
  MoreVertical,
  Download,
  RefreshCw,
  Plus,
  AlertCircle,
  CheckCircle2,
  Clock
} from "lucide-react";

const MyLoads = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("none");
  const [selectedLoad, setSelectedLoad] = useState(null);

  // Mock data with more realistic fields
  const loads = [
    {
      id: 1,
      from: "Mumbai, MH",
      to: "Delhi, DL",
      driver: "Ravi Kumar",
      vehicle: "MH01 AB 1234",
      freight: 25000,
      status: "pending",
      date: "2024-01-15",
      distance: "1400 km",
      type: "Refrigerated"
    },
    {
      id: 2,
      from: "Pune, MH",
      to: "Surat, GJ",
      driver: "Arjun Mehta",
      vehicle: "GJ05 CD 5678",
      freight: 12000,
      status: "completed",
      date: "2024-01-14",
      distance: "400 km",
      type: "Dry Goods"
    },
    {
      id: 3,
      from: "Jaipur, RJ",
      to: "Ahmedabad, GJ",
      driver: "Rahul Verma",
      vehicle: "RJ02 EF 9012",
      freight: 18000,
      status: "active",
      date: "2024-01-16",
      distance: "650 km",
      type: "General"
    },
    {
      id: 4,
      from: "Chennai, TN",
      to: "Bangalore, KA",
      driver: "Suresh Patel",
      vehicle: "TN03 GH 3456",
      freight: 15000,
      status: "pending",
      date: "2024-01-17",
      distance: "350 km",
      type: "Electronics"
    }
  ];

  // Status configurations
  const statusConfig = {
    pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock },
    active: { color: "bg-blue-100 text-blue-800 border-blue-200", icon: Truck },
    completed: { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle2 },
    cancelled: { color: "bg-red-100 text-red-800 border-red-200", icon: AlertCircle }
  };

  // Optimized filtering and sorting with useMemo
  const filteredLoads = useMemo(() => {
    let filtered = loads.filter(load => {
      const matchesSearch = 
        load.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
        load.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
        load.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
        load.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || load.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

    // Sorting
    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.freight - b.freight);
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.freight - a.freight);
    }

    return filtered;
  }, [searchTerm, statusFilter, sortOrder]);

  const getStatusIcon = (status) => {
    const IconComponent = statusConfig[status]?.icon || AlertCircle;
    return <IconComponent size={14} />;
  };

  const StatsCard = ({ title, value, color }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`p-4 rounded-2xl ${color} backdrop-blur-sm border`}
    >
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-600 mt-1">{title}</div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Loads</span>
            </h1>
            <p className="text-gray-600 mt-2">Manage and track your shipments</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 px-4 py-2 rounded-2xl hover:shadow-lg transition-all">
              <RefreshCw size={18} />
              <span>Refresh</span>
            </button>
            <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-2xl font-semibold hover:shadow-lg transition-all">
              <Plus size={18} />
              <span>New Load</span>
            </button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <StatsCard 
            title="Total Loads" 
            value={loads.length} 
            color="bg-white/80 border-gray-200" 
          />
          <StatsCard 
            title="Active" 
            value={loads.filter(l => l.status === 'active').length} 
            color="bg-blue-50/80 border-blue-200" 
          />
          <StatsCard 
            title="Pending" 
            value={loads.filter(l => l.status === 'pending').length} 
            color="bg-yellow-50/80 border-yellow-200" 
          />
          <StatsCard 
            title="Completed" 
            value={loads.filter(l => l.status === 'completed').length} 
            color="bg-green-50/80 border-green-200" 
          />
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-gray-200/50"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search loads, drivers, locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2 flex-wrap">
              {[
                { value: "all", label: "All" },
                { value: "pending", label: "Pending" },
                { value: "active", label: "Active" },
                { value: "completed", label: "Completed" }
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setStatusFilter(filter.value)}
                  className={`px-4 py-2 rounded-2xl font-medium transition-all ${
                    statusFilter === filter.value
                      ? "bg-blue-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              <option value="none">Sort by Freight</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </motion.div>

        {/* Loads Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredLoads.map((load) => (
              <motion.div
                key={load.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-gray-200/50 hover:shadow-2xl transition-all"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                      <Truck className="text-white" size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Load #{load.id}</div>
                      <div className="text-sm text-gray-500">{load.type}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>

                {/* Route */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-900">{load.from}</div>
                    <div className="text-xs text-gray-500">{load.distance}</div>
                    <div className="text-sm font-medium text-gray-900">{load.to}</div>
                  </div>
                  <div className="flex items-center justify-center text-gray-400">
                    <div className="w-full h-px bg-gray-200 relative">
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <div className="text-gray-500">Driver</div>
                    <div className="font-medium text-gray-900">{load.driver}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Vehicle</div>
                    <div className="font-medium text-gray-900">{load.vehicle}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Date</div>
                    <div className="font-medium text-gray-900">{load.date}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Freight</div>
                    <div className="font-medium text-gray-900 flex items-center gap-1">
                      <IndianRupee size={14} />
                      {load.freight.toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Status and Actions */}
                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${statusConfig[load.status]?.color}`}>
                    {getStatusIcon(load.status)}
                    <span className="capitalize">{load.status}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-blue-50 rounded-xl transition-colors text-blue-600">
                      <Eye size={16} />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-xl transition-colors text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredLoads.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <Truck className="text-gray-400" size={40} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No loads found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button 
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setSortOrder("none");
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyLoads;