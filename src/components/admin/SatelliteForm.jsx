const initialState = {
  name: "",
  type: "Communication",
  status: "Active",
  altitude: "",
};

export default function SatelliteForm({
  formState,
  setFormState,
  onSubmit,
  isEditing,
  onCancelEdit,
}) {
  function handleChange(event) {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-slate-800 bg-panel/80 p-4">
      <h2 className="text-lg font-semibold text-slate-100">
        {isEditing ? "Edit Satellite" : "Add Satellite"}
      </h2>
      <div>
        <label className="mb-1 block text-sm text-slate-300">Satellite Name</label>
        <input
          name="name"
          required
          value={formState.name}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-cyan-400"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm text-slate-300">Type</label>
        <select
          name="type"
          value={formState.type}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-cyan-400"
        >
          <option>Communication</option>
          <option>Navigation</option>
          <option>Earth Observation</option>
          <option>Scientific</option>
          <option>Military</option>
        </select>
      </div>
      <div>
        <label className="mb-1 block text-sm text-slate-300">Status</label>
        <select
          name="status"
          value={formState.status}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-cyan-400"
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>
      <div>
        <label className="mb-1 block text-sm text-slate-300">Altitude</label>
        <input
          name="altitude"
          type="number"
          required
          min="100"
          value={formState.altitude}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-cyan-400"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-lg bg-cyan-500/20 px-4 py-2 text-sm font-medium text-cyan-100 hover:bg-cyan-500/30"
        >
          {isEditing ? "Update" : "Create"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setFormState(initialState);
              onCancelEdit();
            }}
            className="rounded-lg bg-slate-700 px-4 py-2 text-sm text-slate-200 hover:bg-slate-600"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export { initialState as satelliteInitialState };
