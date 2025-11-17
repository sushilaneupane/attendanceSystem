import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LoginForm from "./pages/Login";
import RegisterForm from "./pages/Register";
import { TenantsPage } from "./pages/tenant/TenantPage";
import TenantSignUp from "./pages/tenant/TenantRegister";
import HomePage from "./pages/Home";
import TenantAttendanceDashboard from "./pages/tenant/TenantDashboard";
import DepartmentRegister from "./pages/tenant/Department/departmentRegister";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import DepartmentOverviewPage from "./pages/tenant/Department/departmentOverview";
import { DepartmentPage } from "./pages/tenant/Department";
import DesignationPage from "./pages/tenant/Department/Designation";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route element={<ProtectedRoute allowedRoles={["SuperAdmin"]} />}>
          <Route element={<MainLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/tenant" element={<TenantsPage />} />
            <Route path="/tenant-register" element={<TenantSignUp />} />
          </Route>
        </Route>

      
        <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
          <Route element={<AdminLayout />}>
          <Route path="/tenant-dashboard" element={<TenantAttendanceDashboard />} />
          <Route path="/department" element={<DepartmentPage/>} />
          <Route path="/department-register" element={<DepartmentRegister/>} />
           <Route path="/departments/:departmentId/designations" element={<DesignationPage/>}></Route>
          <Route path="/department/:id" element={<DepartmentOverviewPage />} />
          </Route>
        </Route>

     
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
       
      </Routes>
    </BrowserRouter>
  );
}
