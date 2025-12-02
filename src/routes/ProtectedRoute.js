import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from "react-router-dom";
// Decode JWT safely without extra packages
const decodeToken = (token) => {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(atob(base64)
            .split("")
            .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
            .join(""));
        return JSON.parse(jsonPayload);
    }
    catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
};
const ProtectedRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");
    if (!token || !user) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    const decoded = decodeToken(token);
    const userRole = decoded?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    // If no valid role found or not in allowedRoles
    if (!userRole || !allowedRoles.includes(userRole)) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    // Authorized — render the nested routes
    return _jsx(Outlet, {});
};
export default ProtectedRoute;
