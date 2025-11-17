import React, { useState } from "react";
import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar/sidebar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <main
        className="flex-1 transition-all duration-300 p-6"
      >
        <Outlet />
      </main>
      <Toaster richColors position="top-right" />
    </div>
  );
}