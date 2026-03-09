import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import useSatellites from "../hooks/useSatellites";

const markerIcon = L.divIcon({
  className: "",
  html: '<div style="width:12px;height:12px;border-radius:50%;background:#06b6d4;box-shadow:0 0 16px rgba(6,182,212,.85)"></div>',
  iconSize: [12, 12],
});

function seedFromString(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export default function LiveTrackingPage() {
  const { satellites } = useSatellites();
  const [positions, setPositions] = useState({});

  useEffect(() => {
    const base = {};
    satellites.forEach((sat) => {
      const seed = seedFromString(sat.id);
      base[sat.id] = {
        lat: ((seed % 1600) / 10 - 80).toFixed(3),
        lng: (((seed / 2) % 3600) / 10 - 180).toFixed(3),
      };
    });
    setPositions(base);
  }, [satellites]);

  useEffect(() => {
    const timer = setInterval(() => {
      setPositions((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((id, index) => {
          const sat = next[id];
          const drift = (index % 7) * 0.025 + 0.03;
          next[id] = {
            lat: ((Number(sat.lat) + drift + 90) % 180 - 90).toFixed(3),
            lng: ((Number(sat.lng) + drift * 2 + 180) % 360 - 180).toFixed(3),
          };
        });
        return next;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const mappedSatellites = useMemo(
    () =>
      satellites
        .filter((sat) => positions[sat.id])
        .map((sat) => ({
          ...sat,
          lat: Number(positions[sat.id].lat),
          lng: Number(positions[sat.id].lng),
        })),
    [satellites, positions]
  );

  return (
    <section className="space-y-4 pb-20 lg:pb-0">
      <div className="rounded-xl border border-slate-800 bg-panel/80 p-4">
        <h2 className="text-lg font-semibold text-slate-100">Live Orbital Tracking</h2>
        <p className="text-sm text-slate-400">
          Marker positions refresh every 3 seconds via simulated orbital drift.
        </p>
      </div>
      <div className="h-[65vh] rounded-xl border border-slate-800 bg-panel/70 p-3">
        <MapContainer center={[20, 0]} zoom={2} scrollWheelZoom className="z-0">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {mappedSatellites.map((sat) => (
            <Marker key={sat.id} position={[sat.lat, sat.lng]} icon={markerIcon}>
              <Popup>
                <div>
                  <p className="font-semibold">{sat.name}</p>
                  <p>Type: {sat.type}</p>
                  <p>Status: {sat.status}</p>
                  <p>Altitude: {sat.altitude} km</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
}
