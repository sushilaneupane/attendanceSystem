import React from "react";
import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar.tsx";

export default function () {
  return (
    <>
      <Sidebar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Toaster richColors position="top-right" />
    </>
  );
}
