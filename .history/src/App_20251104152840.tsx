import React, { FC } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import MainLayout from "./layouts/MainLayout";
// import LoginForm from "./pages/Login";
// import RegisterForm from "./pages/Register";
// import Home from "./pages/Home";
// import Dashboard from "./pages/Admin/Dashboard";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
      
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
