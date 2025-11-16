import React from "react";
import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/sidebar/sidebar";

export default function AdminLayout() {
  return (
    <>
      {/* Sidebar now automatically selects SuperAdmin menu based on role */}
      <Sidebar />

      <main className="min-h-screen ml-64 p-6 bg-gray-50">
        <Outlet />
      </main>

      <Toaster richColors position="top-right" />
    </>
  );
}
