export default function SatelliteTable({ satellites, onEdit, onDelete }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-panel/80">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-slate-900/70 text-slate-300">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Altitude (km)</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {satellites.map((sat) => (
              <tr key={sat.id} className="border-t border-slate-800/80 text-slate-200">
                <td className="px-4 py-3">{sat.id}</td>
                <td className="px-4 py-3">{sat.name}</td>
                <td className="px-4 py-3">{sat.type}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      sat.status === "Active"
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-rose-500/20 text-rose-300"
                    }`}
                  >
                    {sat.status}
                  </span>
                </td>
                <td className="px-4 py-3">{sat.altitude}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(sat)}
                      className="rounded bg-cyan-500/20 px-3 py-1 text-cyan-200 hover:bg-cyan-500/30"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(sat.id)}
                      className="rounded bg-rose-500/20 px-3 py-1 text-rose-200 hover:bg-rose-500/30"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {satellites.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                  No satellites found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
