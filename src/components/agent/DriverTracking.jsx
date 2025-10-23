import React from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaMapMarkerAlt } from "react-icons/fa";

const DriverTracking = () => {
  const drivers = [
    { id: 1, name: "Ravi Singh", lat: 19.076, lng: 72.8777 },
    { id: 2, name: "Arjun Mehta", lat: 18.5204, lng: 73.8567 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <motion.div
        className="max-w-6xl mx-auto bg-white p-8 rounded-3xl shadow-2xl space-y-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FaMapMarkerAlt /> Driver Tracking
        </h2>

        <div className="h-[500px] rounded-2xl overflow-hidden shadow-lg">
          <MapContainer center={[19.076, 72.8777]} zoom={6} scrollWheelZoom={true} className="h-full w-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {drivers.map((driver) => (
              <Marker key={driver.id} position={[driver.lat, driver.lng]}>
                <Popup>{driver.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default DriverTracking;
