import React from "react";
import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/sidebar.js";

export default function MainLayout() {
  return (
    <>
     <Sidebar />
     
      <main className="min-h-screen md:ml-64">
        <Outlet />
      </main>
      <Toaster richColors position="top-right" />
    </>
  );
}
