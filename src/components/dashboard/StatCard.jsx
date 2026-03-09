export default function StatCard({ label, value, accent }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-panel/80 p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className={`mt-2 text-3xl font-semibold ${accent}`}>{value}</p>
    </div>
  );
}
