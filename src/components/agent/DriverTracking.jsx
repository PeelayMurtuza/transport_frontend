import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function BlinkitStyleTracker() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [sourceCoords, setSourceCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [routeLine, setRouteLine] = useState([]);
  const [distance, setDistance] = useState(null);
  const [mode, setMode] = useState("driving"); // driving / walking
  const [sourceSuggestions, setSourceSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [trackingIndex, setTrackingIndex] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [showSourceSuggestions, setShowSourceSuggestions] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);

  const apiKey = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjIxNjJmM2JlYmNkNTQ1Njg4NWVjMTM2NTNhNzU1MWRmIiwiaCI6Im11cm11cjY0In0=";

  // Fetch suggestions from Nominatim
  const fetchSuggestions = async (query, setSuggestions) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
      );
      const data = await res.json();
      setSuggestions(data.map(d => ({ name: d.display_name, coords: [parseFloat(d.lat), parseFloat(d.lon)] })));
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSelect = (suggestion, isSource) => {
    if (isSource) {
      setSource(suggestion.name);
      setSourceCoords(suggestion.coords);
      setSourceSuggestions([]);
      setShowSourceSuggestions(false);
    } else {
      setDestination(suggestion.name);
      setDestinationCoords(suggestion.coords);
      setDestinationSuggestions([]);
      setShowDestinationSuggestions(false);
    }
  };

  // Fetch shortest route from OpenRouteService
  const fetchRoute = async (src, dest) => {
    const profile = mode === "walking" ? "foot-walking" : "driving-car";
    try {
      const res = await fetch(
        `https://api.openrouteservice.org/v2/directions/${profile}?api_key=${apiKey}&start=${src[1]},${src[0]}&end=${dest[1]},${dest[0]}&preference=shortest`
      );
      const data = await res.json();
      if (data && data.features && data.features.length > 0) {
        const coords = data.features[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
        setRouteLine(coords);
        setDistance((data.features[0].properties.summary.distance / 1000).toFixed(2));
        setTrackingIndex(0); // reset tracking
        setIsTracking(false);
      }
    } catch (error) {
      console.error("Error fetching route:", error);
      alert("Error fetching route. Please try again.");
    }
  };

  const handleShowRoute = () => {
    if (!sourceCoords || !destinationCoords) {
      alert("Please select valid source and destination locations");
      return;
    }
    fetchRoute(sourceCoords, destinationCoords);
  };

  // Live tracking simulation
  useEffect(() => {
    if (isTracking && routeLine.length > 0) {
      const interval = setInterval(() => {
        setTrackingIndex(prev => {
          if (prev < routeLine.length - 1) return prev + 1;
          clearInterval(interval);
          setIsTracking(false);
          return prev;
        });
      }, 1000); // move marker every 1 sec
      return () => clearInterval(interval);
    }
  }, [isTracking, routeLine]);

  const handleLiveTrack = () => {
    if (routeLine.length === 0) {
      alert("Please show the route first!");
      return;
    }
    setIsTracking(true);
    setTrackingIndex(0);
  };

  // Component to center map on moving marker
  const RecenterMap = ({ coords }) => {
    const map = useMap();
    useEffect(() => {
      if (coords) map.setView(coords, 14);
    }, [coords]);
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 xs:p-3 sm:p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-3 xs:mb-4 sm:mb-6">
          <h1 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 xs:mb-2">
            Live Route <span className="text-orange-500">Tracker</span>
          </h1>
          <p className="text-gray-600 text-xs xs:text-sm sm:text-base">
            Find the shortest route and track in real-time
          </p>
        </div>

        {/* Controls Section */}
        <div className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 shadow-lg mb-3 xs:mb-4 sm:mb-6">
          {/* Inputs Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 xs:gap-4 mb-3 xs:mb-4">
            {/* Source Input */}
            <div className="relative">
              <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1 xs:mb-2">
                Source Location
              </label>
              <div className="relative">
                <input
                  placeholder="Enter source address..."
                  value={source}
                  onChange={e => { 
                    setSource(e.target.value); 
                    fetchSuggestions(e.target.value, setSourceSuggestions);
                    setShowSourceSuggestions(true);
                  }}
                  onFocus={() => setShowSourceSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSourceSuggestions(false), 200)}
                  className="w-full px-3 xs:px-4 py-2 xs:py-3 border border-gray-300 rounded-lg xs:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-xs xs:text-sm"
                />
                {showSourceSuggestions && sourceSuggestions.length > 0 && (
                  <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg xs:rounded-xl shadow-lg mt-1 max-h-48 overflow-y-auto">
                    {sourceSuggestions.map((s, i) => (
                      <li 
                        key={i} 
                        className="px-3 xs:px-4 py-2 xs:py-3 border-b border-gray-100 last:border-b-0 hover:bg-orange-50 cursor-pointer transition-colors text-xs xs:text-sm"
                        onClick={() => handleSelect(s, true)}
                      >
                        <div className="font-medium text-gray-900 truncate">{s.name.split(',')[0]}</div>
                        <div className="text-gray-500 text-xs truncate">{s.name.split(',').slice(1).join(',')}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Destination Input */}
            <div className="relative">
              <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1 xs:mb-2">
                Destination Location
              </label>
              <div className="relative">
                <input
                  placeholder="Enter destination address..."
                  value={destination}
                  onChange={e => { 
                    setDestination(e.target.value); 
                    fetchSuggestions(e.target.value, setDestinationSuggestions);
                    setShowDestinationSuggestions(true);
                  }}
                  onFocus={() => setShowDestinationSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowDestinationSuggestions(false), 200)}
                  className="w-full px-3 xs:px-4 py-2 xs:py-3 border border-gray-300 rounded-lg xs:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-xs xs:text-sm"
                />
                {showDestinationSuggestions && destinationSuggestions.length > 0 && (
                  <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg xs:rounded-xl shadow-lg mt-1 max-h-48 overflow-y-auto">
                    {destinationSuggestions.map((s, i) => (
                      <li 
                        key={i} 
                        className="px-3 xs:px-4 py-2 xs:py-3 border-b border-gray-100 last:border-b-0 hover:bg-orange-50 cursor-pointer transition-colors text-xs xs:text-sm"
                        onClick={() => handleSelect(s, false)}
                      >
                        <div className="font-medium text-gray-900 truncate">{s.name.split(',')[0]}</div>
                        <div className="text-gray-500 text-xs truncate">{s.name.split(',').slice(1).join(',')}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Controls Row */}
          <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 items-start xs:items-center">
            {/* Mode Selector */}
            <div className="flex-1 xs:flex-none">
              <select 
                value={mode} 
                onChange={(e) => setMode(e.target.value)} 
                className="w-full xs:w-auto px-3 xs:px-4 py-2 xs:py-3 border border-gray-300 rounded-lg xs:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-xs xs:text-sm"
              >
                <option value="driving">🚗 Driving</option>
                <option value="walking">🚶 Walking</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 xs:gap-3 w-full xs:w-auto">
              <button 
                onClick={handleShowRoute}
                className="flex-1 xs:flex-none bg-orange-500 hover:bg-orange-600 text-white px-4 xs:px-6 py-2 xs:py-3 rounded-lg xs:rounded-xl font-semibold transition-all text-xs xs:text-sm shadow-md hover:shadow-lg"
              >
                Show Route
              </button>
              <button 
                onClick={handleLiveTrack}
                disabled={routeLine.length === 0}
                className="flex-1 xs:flex-none bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 xs:px-6 py-2 xs:py-3 rounded-lg xs:rounded-xl font-semibold transition-all text-xs xs:text-sm shadow-md hover:shadow-lg"
              >
                {isTracking ? "Tracking..." : "Live Track"}
              </button>
            </div>
          </div>

          {/* Distance Display */}
          {distance && (
            <div className="mt-3 xs:mt-4 p-3 xs:p-4 bg-green-50 border border-green-200 rounded-lg xs:rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-800 font-semibold text-xs xs:text-sm">
                  Route Distance: <span className="text-lg xs:text-xl">{distance} km</span>
                </span>
              </div>
              {isTracking && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-orange-700 text-xs xs:text-sm">
                    Live tracking active - {Math.round((trackingIndex / routeLine.length) * 100)}% complete
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Map Container */}
        {sourceCoords && destinationCoords && (
          <div className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
            <div className="h-64 xs:h-72 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] w-full">
              <MapContainer 
                center={sourceCoords} 
                zoom={14} 
                style={{ height: "100%", width: "100%" }}
                className="rounded-lg xs:rounded-xl sm:rounded-2xl"
              >
                <TileLayer 
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                
                {/* Source Marker */}
                <Marker position={sourceCoords}>
                  <Popup>
                    <div className="text-xs xs:text-sm">
                      <strong>📍 Source</strong><br/>
                      {source.split(',').slice(0, 2).join(',')}
                    </div>
                  </Popup>
                </Marker>
                
                {/* Destination Marker */}
                <Marker position={destinationCoords}>
                  <Popup>
                    <div className="text-xs xs:text-sm">
                      <strong>🎯 Destination</strong><br/>
                      {destination.split(',').slice(0, 2).join(',')}
                    </div>
                  </Popup>
                </Marker>
                
                {/* Route Line */}
                {routeLine.length > 0 && (
                  <Polyline 
                    positions={routeLine} 
                    pathOptions={{ 
                      color: "#f97316", 
                      weight: 4,
                      opacity: 0.8,
                      dashArray: isTracking ? "10, 10" : "none"
                    }} 
                  />
                )}
                
                {/* Live Tracking Marker */}
                {isTracking && routeLine[trackingIndex] && (
                  <>
                    <Marker 
                      position={routeLine[trackingIndex]}
                      icon={L.divIcon({
                        className: 'live-tracking-marker',
                        html: '<div style="background-color: #22c55e; width: 16px; height: 16px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>',
                        iconSize: [16, 16],
                        iconAnchor: [8, 8]
                      })}
                    >
                      <Popup>
                        <div className="text-xs xs:text-sm">
                          <strong>🚀 Live Tracking</strong><br/>
                          Moving to destination...
                        </div>
                      </Popup>
                    </Marker>
                    <RecenterMap coords={routeLine[trackingIndex]} />
                  </>
                )}
              </MapContainer>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!sourceCoords && (
          <div className="mt-4 xs:mt-6 p-4 xs:p-6 bg-blue-50 border border-blue-200 rounded-lg xs:rounded-xl">
            <h3 className="font-semibold text-blue-900 text-sm xs:text-base mb-2">How to use:</h3>
            <ul className="text-blue-800 text-xs xs:text-sm space-y-1">
              <li>• Enter source and destination locations</li>
              <li>• Select driving or walking mode</li>
              <li>• Click "Show Route" to see the shortest path</li>
              <li>• Use "Live Track" to simulate real-time movement</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}