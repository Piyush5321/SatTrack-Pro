import { NavLink } from "react-router-dom";
import { FiActivity, FiBarChart2, FiCommand, FiMapPin, FiSettings } from "react-icons/fi";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: FiCommand },
  { to: "/live-tracking", label: "Live Tracking", icon: FiMapPin },
  { to: "/analytics", label: "Analytics", icon: FiBarChart2 },
  { to: "/admin", label: "Admin", icon: FiSettings },
];

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 border-r border-slate-800/80 bg-panel/80 p-4 backdrop-blur-xl">
      <div className="mb-8 flex items-center gap-3 rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-3 shadow-neon">
        <FiActivity className="text-xl text-cyan-300" />
        <div>
          <p className="font-semibold text-cyan-100">Orbital Console</p>
          <p className="text-xs text-slate-400">Mission Control</p>
        </div>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-100"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
