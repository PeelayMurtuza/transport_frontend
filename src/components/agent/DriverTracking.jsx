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

  const apiKey = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjIxNjJmM2JlYmNkNTQ1Njg4NWVjMTM2NTNhNzU1MWRmIiwiaCI6Im11cm11cjY0In0=";

  // Fetch suggestions from Nominatim
  const fetchSuggestions = async (query, setSuggestions) => {
    if (!query) return setSuggestions([]);
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
    );
    const data = await res.json();
    setSuggestions(data.map(d => ({ name: d.display_name, coords: [parseFloat(d.lat), parseFloat(d.lon)] })));
  };

  const handleSelect = (suggestion, isSource) => {
    if (isSource) {
      setSource(suggestion.name);
      setSourceCoords(suggestion.coords);
      setSourceSuggestions([]);
    } else {
      setDestination(suggestion.name);
      setDestinationCoords(suggestion.coords);
      setDestinationSuggestions([]);
    }
  };

  // Fetch shortest route from OpenRouteService
  const fetchRoute = async (src, dest) => {
    const profile = mode === "walking" ? "foot-walking" : "driving-car";
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
  };

  const handleShowRoute = () => {
    if (!sourceCoords || !destinationCoords) return alert("Select valid source and destination");
    fetchRoute(sourceCoords, destinationCoords);
  };

  // Live tracking simulation
  useEffect(() => {
    if (isTracking && routeLine.length > 0) {
      const interval = setInterval(() => {
        setTrackingIndex(prev => {
          if (prev < routeLine.length - 1) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 1000); // move marker every 1 sec
      return () => clearInterval(interval);
    }
  }, [isTracking, routeLine]);

  const handleLiveTrack = () => {
    if (routeLine.length === 0) return alert("Show the route first!");
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
    <div>
      <h2>Blinkit-Style Shortest Route Viewer</h2>
      <div style={{ marginBottom: "10px" }}>
        {/* Source Input */}
        <div style={{ position: "relative", display: "inline-block", marginRight: "10px" }}>
          <input
            placeholder="Source"
            value={source}
            onChange={e => { setSource(e.target.value); fetchSuggestions(e.target.value, setSourceSuggestions); }}
            className="border"
          />
          {sourceSuggestions.length > 0 && (
            <ul style={{ position: "absolute", background: "#fff", border: "1px solid #ccc", zIndex: 1000, listStyle: "none", padding: 0, margin: 0, width: "100%" }}>
              {sourceSuggestions.map((s, i) => (
                <li key={i} style={{ padding: "5px", cursor: "pointer" }} onClick={() => handleSelect(s, true)}>
                  {s.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Destination Input */}
        <div style={{ position: "relative", display: "inline-block", marginRight: "10px" }}>
          <input
            placeholder="Destination"
            value={destination}
            onChange={e => { setDestination(e.target.value); fetchSuggestions(e.target.value, setDestinationSuggestions); }}
            className="border"
          />
          {destinationSuggestions.length > 0 && (
            <ul style={{ position: "absolute", background: "#fff", border: "1px solid #ccc", zIndex: 1000, listStyle: "none", padding: 0, margin: 0, width: "100%" }}>
              {destinationSuggestions.map((s, i) => (
                <li key={i} style={{ padding: "5px", cursor: "pointer" }} onClick={() => handleSelect(s, false)}>
                  {s.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Mode Selector */}
        <select value={mode} onChange={(e) => setMode(e.target.value)} style={{ marginRight: "10px" }}>
          <option value="driving">Driving</option>
          <option value="walking">Walking</option>
        </select>
        <button onClick={handleShowRoute}>Show Shortest Route</button>
        <button onClick={handleLiveTrack} style={{ marginLeft: "10px" }}>Live Track</button>
      </div>

      {/* Distance */}
      {distance && <p>Route Distance: {distance} km</p>}

      {/* Map */}
      {sourceCoords && destinationCoords && (
        <MapContainer center={sourceCoords} zoom={14} style={{ height: "600px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap contributors" />
          <Marker position={sourceCoords}><Popup>Source</Popup></Marker>
          <Marker position={destinationCoords}><Popup>Destination</Popup></Marker>
          {routeLine.length > 0 && <Polyline positions={routeLine} pathOptions={{ color: "orange", dashArray: "5,10" }} />}
          
          {/* Live Tracking Marker */}
          {isTracking && routeLine[trackingIndex] && (
            <>
              <Marker position={routeLine[trackingIndex]}><Popup>Live Tracking</Popup></Marker>
              <RecenterMap coords={routeLine[trackingIndex]} />
            </>
          )}
        </MapContainer>
      )}
    </div>
  );
}
