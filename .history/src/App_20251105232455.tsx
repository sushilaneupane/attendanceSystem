
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import LoginForm from "./pages/Login/index";
import RegisterForm from "./pages/Register/index";
import Dashboard from "./pages/admin/AdminDashboard";
import { TenantsPage } from "./pages/tenant/TenantPage";
import TenantSignUp from "./pages/tenant/TenantRegister/index";
import DepartmentPage from "./pages/tenant/Department/index";
import HomePage from "./pages/Home/index";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root path to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Routes wrapped with MainLayout */}
        <Route element={<MainLayout />}>
        <Route path="/home" element={<HomePage />} />
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/tenant" element={<TenantsPage/>} />
        <Route path="/tenant-register" element={<TenantSignUp/>} />
        <Route path="/department" element={<DepartmentPage />} />
        </Route>


        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
     
       
      </Routes>
    </BrowserRouter>
  );
}
