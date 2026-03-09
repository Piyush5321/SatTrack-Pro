import { useEffect, useState } from "react";
import { listenToSatellites } from "../services/satelliteService";

export default function useSatellites() {
  const [satellites, setSatellites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = listenToSatellites((items) => {
      setSatellites(items);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { satellites, loading };
}
