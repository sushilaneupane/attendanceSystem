import React from "react";
import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/sidebar.js";

export default function MainLayout() {
  return (
    <>
    <span > <Sidebar /></span>
     
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Toaster richColors position="top-right" />
    </>
  );
}
