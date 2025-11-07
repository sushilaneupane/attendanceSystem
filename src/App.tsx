
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LoginForm from "./pages/Login/index";
import RegisterForm from "./pages/Register/index";
import { TenantsPage } from "./pages/tenant/TenantPage";
import TenantSignUp from "./pages/tenant/TenantRegister/index";
import HomePage from "./pages/Home/index";
import { DepartmentPage } from "./pages/tenant/Department";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route element={<MainLayout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/tenant" element={<TenantsPage/>} />
        <Route path="/tenant-register" element={<TenantSignUp/>} />
        <Route path="/department" element={<DepartmentPage/>} />
        </Route>

        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  );
}
