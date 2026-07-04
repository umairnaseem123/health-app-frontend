import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  HeartPulse,
  Stethoscope,
  FileText,
  ShieldAlert,
  Clock,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/symptom-checker", label: "Symptom Check", icon: Stethoscope },
  { to: "/bp-tracker", label: "BP Tracker", icon: HeartPulse },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/history", label: "History", icon: Clock },
  { to: "/emergency", label: "Find a Doctor", icon: ShieldAlert },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  }

  return (
    <aside className="w-64 min-h-screen bg-[var(--bg-sidebar)] border-r border-[var(--border)] flex flex-col p-5">
      <div className="flex items-center gap-2 mb-8 px-2">
        <HeartPulse className="text-[var(--primary)]" size={26} />
        <div>
          <p className="font-bold text-[var(--text-primary)] leading-tight">AI Health</p>
          <p className="text-xs text-[var(--primary)] leading-tight">Monitoring</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[var(--primary-light)] text-[var(--primary)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--primary-light)]"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={() => setIsDark(!isDark)}
        className="mt-auto flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--primary-light)] rounded-[10px]"
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
        {isDark ? "Light Mode" : "Dark Mode"}
      </button>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--danger)]"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}
