import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SatelliteForm, { satelliteInitialState } from "../components/admin/SatelliteForm";
import SatelliteTable from "../components/dashboard/SatelliteTable";
import useSatellites from "../hooks/useSatellites";
import { createSatellite, deleteSatellite, updateSatellite } from "../services/satelliteService";

export default function AdminPage() {
  const { satellites } = useSatellites();
  const [formState, setFormState] = useState(satelliteInitialState);
  const [editingId, setEditingId] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fromDashboard = location.state?.editingSatellite;
    if (fromDashboard) {
      setEditingId(fromDashboard.id);
      setFormState({
        name: fromDashboard.name,
        type: fromDashboard.type,
        status: fromDashboard.status,
        altitude: fromDashboard.altitude,
      });
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.pathname, location.state, navigate]);

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      name: formState.name.trim(),
      type: formState.type,
      status: formState.status,
      altitude: Number(formState.altitude),
    };

    if (editingId) {
      await updateSatellite(editingId, payload);
      setEditingId(null);
    } else {
      await createSatellite(payload);
    }

    setFormState(satelliteInitialState);
  }

  function startEdit(satellite) {
    setEditingId(satellite.id);
    setFormState({
      name: satellite.name,
      type: satellite.type,
      status: satellite.status,
      altitude: satellite.altitude,
    });
  }

  async function handleDelete(id) {
    await deleteSatellite(id);
    if (editingId === id) {
      setEditingId(null);
      setFormState(satelliteInitialState);
    }
  }

  return (
    <section className="grid gap-4 pb-20 xl:grid-cols-[340px_1fr] lg:pb-0">
      <SatelliteForm
        formState={formState}
        setFormState={setFormState}
        onSubmit={handleSubmit}
        isEditing={Boolean(editingId)}
        onCancelEdit={() => setEditingId(null)}
      />
      <div>
        <h2 className="mb-3 text-lg font-semibold text-slate-100">Manage Satellites</h2>
        <SatelliteTable satellites={satellites} onEdit={startEdit} onDelete={handleDelete} />
      </div>
    </section>
  );
}
