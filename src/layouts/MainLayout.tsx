
import React from "react";
import { Toaster } from "sonner";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/sidebar";

export default function MainLayout({ navLinks }: { navLinks?: any[] }) {
  return (
    <>
      <Sidebar navLinks={navLinks} />
      <main className=" md:ml-64 ">
        <Outlet />
      </main>
      <Toaster richColors position="top-right" />
    </>
  );
}
