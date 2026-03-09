import { useNavigate } from "react-router-dom";
import StatCard from "../components/dashboard/StatCard";
import SatelliteTable from "../components/dashboard/SatelliteTable";
import useSatellites from "../hooks/useSatellites";
import { deleteSatellite } from "../services/satelliteService";

export default function DashboardPage() {
  const { satellites, loading } = useSatellites();
  const navigate = useNavigate();

  const activeCount = satellites.filter((sat) => sat.status === "Active").length;
  const inactiveCount = satellites.length - activeCount;

  async function handleDelete(id) {
    await deleteSatellite(id);
  }

  function handleEdit(satellite) {
    navigate("/admin", { state: { editingSatellite: satellite } });
  }

  return (
    <section className="space-y-6 pb-20 lg:pb-0">
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total Satellites" value={satellites.length} accent="text-cyan-200" />
        <StatCard label="Active" value={activeCount} accent="text-emerald-300" />
        <StatCard label="Inactive" value={inactiveCount} accent="text-rose-300" />
      </div>
      <div>
        <h2 className="mb-3 text-lg font-semibold text-slate-100">Satellite Registry</h2>
        {loading ? (
          <p className="text-slate-400">Loading satellites...</p>
        ) : (
          <SatelliteTable satellites={satellites} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
    </section>
  );
}
