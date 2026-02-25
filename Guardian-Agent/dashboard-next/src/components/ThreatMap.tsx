'use client';
import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

const geoUrl = "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json";

export default function ThreatMap() {
  const [alerts, setAlerts] = useState<{name: string, coordinates: [number, number]}[]>([]);

  useEffect(() => {
    // Connect to your Rust Backend WebSocket
    const socket = new WebSocket('ws://localhost:8080');
    socket.onmessage = (event) => {
      const newThreat = JSON.parse(event.data);
      setAlerts(prev => [...prev.slice(-10), newThreat]); // Keep last 10
    };
    return () => socket.close();
  }, []);

  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
      <h3 className="text-white font-bold mb-4">Live Threat Map</h3>
      <ComposableMap projectionConfig={{ scale: 150 }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} fill="#1e293b" stroke="#334155" />
            ))
          }
        </Geographies>
        {alerts.map(({ name, coordinates }) => (
          <Marker key={name} coordinates={coordinates}>
            <circle r={4} fill="#ef4444" className="animate-ping" />
            <circle r={2} fill="#ef4444" />
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
}