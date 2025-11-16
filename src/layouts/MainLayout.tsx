import React from "react";
import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar/sidebar";

export default function MainLayout() {
  return (
    <>
<<<<<<< HEAD
      <Sidebar navLinks={navLinks} />
      <main className=" md:ml-64 ">
=======
      <Sidebar />

      <main className="min-h-screen ml-64 p-6 bg-gray-50">
>>>>>>> d5758e992ea224115e72dddad97631307314d975
        <Outlet />
      </main>

      <Toaster richColors position="top-right" />
    </>
  );
}
