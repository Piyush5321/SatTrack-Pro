import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import useSatellites from "../hooks/useSatellites";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function AnalyticsPage() {
  const { satellites } = useSatellites();

  const active = satellites.filter((sat) => sat.status === "Active").length;
  const inactive = satellites.length - active;

  const typeMap = satellites.reduce((acc, sat) => {
    acc[sat.type] = (acc[sat.type] ?? 0) + 1;
    return acc;
  }, {});

  const altitudeBins = {
    "100-400": 0,
    "401-800": 0,
    "801-1200": 0,
    "1201+": 0,
  };
  satellites.forEach((sat) => {
    const altitude = Number(sat.altitude);
    if (altitude <= 400) altitudeBins["100-400"] += 1;
    else if (altitude <= 800) altitudeBins["401-800"] += 1;
    else if (altitude <= 1200) altitudeBins["801-1200"] += 1;
    else altitudeBins["1201+"] += 1;
  });

  const sharedOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#cbd5e1",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#94a3b8" },
        grid: { color: "rgba(148,163,184,.12)" },
      },
      y: {
        ticks: { color: "#94a3b8" },
        grid: { color: "rgba(148,163,184,.12)" },
      },
    },
  };

  return (
    <section className="grid gap-4 pb-20 lg:grid-cols-2 lg:pb-0">
      <div className="rounded-xl border border-slate-800 bg-panel/80 p-4">
        <h3 className="mb-4 text-sm font-medium text-slate-300">Active vs Inactive</h3>
        <Doughnut
          data={{
            labels: ["Active", "Inactive"],
            datasets: [
              {
                data: [active, inactive],
                backgroundColor: ["#10b981", "#f43f5e"],
                borderWidth: 0,
              },
            ],
          }}
          options={{ responsive: true, plugins: { legend: { labels: { color: "#cbd5e1" } } } }}
        />
      </div>
      <div className="rounded-xl border border-slate-800 bg-panel/80 p-4">
        <h3 className="mb-4 text-sm font-medium text-slate-300">Satellite Type Distribution</h3>
        <Pie
          data={{
            labels: Object.keys(typeMap),
            datasets: [
              {
                data: Object.values(typeMap),
                backgroundColor: ["#06b6d4", "#14b8a6", "#60a5fa", "#f59e0b", "#a78bfa", "#34d399"],
                borderWidth: 0,
              },
            ],
          }}
          options={{ responsive: true, plugins: { legend: { labels: { color: "#cbd5e1" } } } }}
        />
      </div>
      <div className="rounded-xl border border-slate-800 bg-panel/80 p-4 lg:col-span-2">
        <h3 className="mb-4 text-sm font-medium text-slate-300">Altitude Histogram</h3>
        <Bar
          data={{
            labels: Object.keys(altitudeBins),
            datasets: [
              {
                label: "Satellites",
                data: Object.values(altitudeBins),
                backgroundColor: "#06b6d4",
              },
            ],
          }}
          options={sharedOptions}
        />
      </div>
    </section>
  );
}
