import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LoginForm from "./pages/Login";
import RegisterForm from "./pages/Register";
import { TenantsPage } from "./pages/tenant/TenantPage";
import TenantSignUp from "./pages/tenant/TenantRegister";
import HomePage from "./pages/Home";
import { DepartmentPage } from "./pages/tenant/Department";
import TenantAttendanceDashboard from "./pages/tenant/TenantDashboard";
import DepartmentRegister from "./pages/tenant/Department/departmentRegister";
import EmployeePage from "./pages/Employee";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
     
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

      
        <Route element={<ProtectedRoute allowedRoles={["SuperAdmin"]} />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/tenant" element={<TenantsPage />} />
            <Route path="/tenant-register" element={<TenantSignUp />} />
          </Route>
        </Route>

      
        <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
          <Route path="/tenant-dashboard" element={<TenantAttendanceDashboard />} />
           <Route path="/department" element={<DepartmentPage />} />
            <Route path="/department-register" element={<DepartmentRegister />} />
              <Route path="/employees" element={<EmployeePage />} />
        </Route>

     
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  );
}
