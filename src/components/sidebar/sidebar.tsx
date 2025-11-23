import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  User,
  KeyRound,
  Layers,
  ChevronDown,
  ChevronUp,
  LogOut,
  Building
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext"; 

interface NavLinkItem { name: string; path: string; icon: React.ReactNode; }

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
const { user} = useAuth();
 


  const [dropdownOpen, setDropdownOpen] = useState(false);

  const superAdminLinks: NavLinkItem[] = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Manage Tenants", path: "/admin/tenant", icon: <Users size={20} /> },
    { name: "Manage Users", path: "/admin/users", icon: <Users size={20} /> },
    { name: "Settings", path: "/admin/settings", icon: <Settings size={20} /> },
  ];

  const tenantLinks: NavLinkItem[] = [
    { name: "Dashboard", path: "/tenant-dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Employees", path: "/employee", icon: <Users size={20} /> },
    { name: "Department", path: "/department", icon: <Layers size={20} /> },
    { name: "Change Password", path: "/change-password", icon: <KeyRound size={20} /> },
     { name: "Organization", path: "/organizations", icon: <Building size={20} /> },

  ];

   const finalLinks = user?.role === "SuperAdmin" ? superAdminLinks : tenantLinks;

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("tenant")
    navigate("/login");
  };

  return (
    <div
      className={`bg-white shadow-lg border-r transition-all duration-300 flex flex-col
        ${open ? "w-64" : "w-20"}`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <FileText size={24} className="text-blue-600" />
          {open && <h2 className="text-xl font-bold text-blue-700">Attendance</h2>}
        </div>
        <button
          className="p-1 rounded hover:bg-gray-100 md:flex hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <ul className="mt-4 flex flex-col gap-2 flex-1 overflow-y-auto">
        {finalLinks.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors
                ${location.pathname === item.path
                  ? "bg-blue-20 text-blue-700 font-semibold"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
            >
              {item.icon}
              {open && <span>{item.name}</span>}
            </Link>

          </li>
        ))}
      </ul>

      <div className="p-4 border-t relative">
        <div
          className={`flex items-center justify-between cursor-pointer rounded-md px-2 py-2 hover:bg-gray-100`}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <div className="flex items-center gap-2">
            <User size={18} />
            {open && <span className="font-semibold text-gray-800">{user?.email}</span>}
          </div>
          {open && (dropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
        </div>

        {dropdownOpen && open && (
          <div className="absolute bottom-12 left-0 w-full bg-white shadow-lg rounded-md py-2 z-50 border border-gray-200">

            <button
              className="w-full flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100"
              onClick={() => navigate("/profile")}
            >
              <User size={16} />
              View Profile
            </button>

            <div className="border-t border-gray-200 my-1" />

            <button
              className="w-full flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}