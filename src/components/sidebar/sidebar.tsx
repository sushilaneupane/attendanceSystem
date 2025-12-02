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
  Building,
  CalendarOff,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";

interface NavLinkItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
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
    { name: "Organization", path: "/organizations", icon: <Building size={20} /> },
    { name: "Leave Management", path: "/leave", icon: <CalendarOff size={20} /> },
  ];

  const finalLinks = user?.role === "SuperAdmin" ? superAdminLinks : tenantLinks;

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("tenant");
    navigate("/login");
  };

  return (
    <>
      {!mobileOpen && (
        <button
          className="md:hidden fixed top-0 left-0 z-50 bg-white p-2 w-full rounded shadow"
           style={{ position: 'fixed' }}
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={22} />
        </button>
      )}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <div
        className={`
          bg-white shadow-lg border-r flex flex-col h-screen fixed top-0 left-0 z-40
          w-64 transform transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:w-64
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <FileText size={24} className="text-blue-600" />
            <h2 className="text-xl font-bold text-blue-700">Attendance</h2>
          </div>
          {/* X button to close sidebar on mobile */}
          {mobileOpen && (
            <button
              className="p-1 rounded hover:bg-gray-100 md:hidden"
              onClick={() => setMobileOpen(false)}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <ul className="mt-4 flex flex-col gap-2 flex-1 overflow-y-auto">
          {finalLinks.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors
                  ${
                    location.pathname === item.path
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                onClick={() => setMobileOpen(false)}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* User Dropdown */}
        <div className="p-4 border-t relative">
          <div
            className="flex items-center justify-between cursor-pointer rounded-md px-2 py-2 hover:bg-gray-100"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="flex items-center gap-2">
              <User size={18} />
              <span className="font-semibold text-gray-800 truncate">{user?.email}</span>
            </div>
            {dropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>

          {dropdownOpen && (
            <div className="absolute bottom-12 left-0 w-full bg-white shadow-lg rounded-md py-2 border border-gray-200 z-50">
              <button
                className="w-full flex items-center gap-2 px-4 py-2 text-sm font-semibold hover:bg-gray-100"
                onClick={() => navigate("/password")}
              >
                <KeyRound size={16} />
                Change Password
              </button>

              <div className="border-t border-gray-200 my-1" />

              <button
                className="w-full flex items-center gap-2 px-4 py-2 text-sm font-semibold hover:bg-gray-100"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
