// src/components/sidebar/sidebar.tsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu, X, LayoutDashboard, Users, FileText, Settings, User, KeyRound,
} from "lucide-react";
import { Button } from "../ui/button";

interface NavLinkItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  navLinks?: NavLinkItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ navLinks }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const defaultLinks: NavLinkItem[] = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={18} /> },
    { name: "Change Password", path: "/change-password", icon: <KeyRound size={18} /> },
    { name: "Manage User", path: "/user", icon: <Users size={18} /> },
    { name: "Tenant", path: "/tenant", icon: <FileText size={18} /> },
    
  ];

  const finalLinks = navLinks || defaultLinks;

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
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
            <Link to="/" onClick={() => setOpen(false)}>Attendance</Link>
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
};

export default Sidebar;
