import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileNav from "./MobileNav";

export default function AppShell() {
  return (
    <div className="flex min-h-screen text-slate-100">
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <main className="flex-1 p-4 lg:p-6">
        <Topbar />
        <Outlet />
        <MobileNav />
      </main>
    </div>
  );
}
