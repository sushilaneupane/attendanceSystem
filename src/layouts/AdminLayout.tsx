

import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar/sidebar";

export default function AdminLayout() {
 
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar/>
      <main
      className="flex-1 transition-all duration-300 mt-2"
>
        <Outlet />
      </main>
      
    </div>
  );
}