import { NavLink } from "react-router-dom";
import { FiBarChart2, FiCommand, FiMapPin, FiSettings } from "react-icons/fi";

const navItems = [
  { to: "/dashboard", icon: FiCommand, label: "Dashboard" },
  { to: "/live-tracking", icon: FiMapPin, label: "Tracking" },
  { to: "/analytics", icon: FiBarChart2, label: "Analytics" },
  { to: "/admin", icon: FiSettings, label: "Admin" },
];

export default function MobileNav() {
  return (
    <nav className="fixed bottom-4 left-4 right-4 z-[1000] rounded-xl border border-slate-700 bg-slate-900/95 p-2 backdrop-blur lg:hidden">
      <div className="grid grid-cols-4 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center rounded-lg py-2 text-xs ${
                  isActive ? "bg-cyan-500/20 text-cyan-200" : "text-slate-400"
                }`
              }
            >
              <Icon className="mb-1 text-base" />
              {item.label}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
