import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu, X, LayoutDashboard, Users, FileText, Settings, User, KeyRound, Layers
} from "lucide-react";
import { Button } from "../ui/button";

interface NavLinkItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Get role from localStorage
  const role = localStorage.getItem("role"); // "SuperAdmin" or "Admin"

  // SuperAdmin menu
  const superAdminLinks: NavLinkItem[] = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Manage Tenants", path: "/admin/tenant", icon: <Users size={18} /> },
    { name: "Manage Users", path: "/admin/users", icon: <Users size={18} /> },
    { name: "Settings", path: "/admin/settings", icon: <Settings size={18} /> },
  ];

  // Tenant / Admin menu
  const tenantLinks: NavLinkItem[] = [
    { name: "Dashboard", path: "/tenant-dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Employees", path: "/employees", icon: <Users size={18} /> },
    { name: "Department", path: "/department", icon: <Layers size={18} /> },
    { name: "Change Password", path: "/change-password", icon: <KeyRound size={18} /> },
  ];

  // Select menu based on role
  const finalLinks = role === "SuperAdmin" ? superAdminLinks : tenantLinks;

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`fixed top-0 left-0 h-screen bg-white shadow-md border-r w-64 p-5 
        transition-transform duration-300 z-40 flex flex-col justify-between
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div>
          <h2 className="text-2xl font-bold text-blue-700 mb-8">
            Attendance System
          </h2>

          <ul className="space-y-3">
            {finalLinks.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition
                    ${
                      location.pathname === item.path
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-blue-100"
                    }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-fit px-2 py-2 flex justify-end items-center"
            onClick={handleLogout}
          >
            <User className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </>
  );
}
