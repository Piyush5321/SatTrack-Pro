import { useState } from "react";
import { FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const email = currentUser?.email ?? "operator@sattrack.pro";

  return (
    <header className="mb-6 flex items-center justify-between rounded-xl border border-slate-800 bg-panel/70 p-4 backdrop-blur-xl">
      <div>
        <h1 className="text-2xl font-bold tracking-wide text-slate-100">SatTrack Pro</h1>
        <p className="text-sm text-slate-400">Satellite Monitoring Dashboard</p>
      </div>
      <div className="relative">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200"
        >
          <FiUser />
          <span className="max-w-40 truncate">{email}</span>
          <FiChevronDown />
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-700 bg-slate-900 p-1 shadow-xl">
            <button
              onClick={logout}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-300 hover:bg-slate-800"
            >
              <FiLogOut />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
