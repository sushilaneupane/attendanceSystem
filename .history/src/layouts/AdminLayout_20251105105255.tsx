import React from "react";
import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";
import Sidebar from "../src/lay";

export default function MainLayout() {
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
