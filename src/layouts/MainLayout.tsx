import React, { useState } from "react";
import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar/sidebar";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
   <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
      <Toaster richColors position="top-right" />
    </div>
  );
}