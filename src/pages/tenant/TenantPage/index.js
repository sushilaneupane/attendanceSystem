import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Search, Plus } from "lucide-react";
import { DataTable } from "../../../components/table/DataTable";
import { useTenantsQuery } from "@/hooks/useTenants";
import { DialogBox } from "@/components/Dialogs/Dialogbox";
import TenantSignUp from "../TenantRegister";
export function TenantsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const { data: tenants = [], isLoading, isError, error } = useTenantsQuery();
    const filteredTenants = tenants.filter((t) => t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.frontendUrl?.toLowerCase().includes(searchTerm.toLowerCase()));
    const totalTenants = tenants.length;
    const activeTenants = tenants.filter((t) => t.isActive).length;
    const inactiveTenants = tenants.filter((t) => !t.isActive).length;
    return (_jsxs("div", { className: "flex-1 space-y-4 p-4 md:p-8 pt-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [_jsxs("div", { className: "flex-1 mt-10", children: [_jsx("h2", { className: "text-3xl font-bold tracking-tight", children: "Tenants" }), _jsx("p", { className: "text-muted-foreground", children: "Manage your tenants and their information" })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 sm:items-center", children: [_jsxs("div", { className: "relative flex-1 max-w-sm", children: [_jsx(Search, { className: "absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search tenants by name or URL...", className: "pl-8", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) })] }), _jsx(DialogBox, { variant: "", triggerButtonText: _jsxs(_Fragment, { children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "Add Tenant"] }), children: _jsx(TenantSignUp, {}) })] })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4", children: [_jsxs(Card, { className: "p-4 text-center bg-blue-100 text-blue-800 shadow-md", children: [_jsx(CardTitle, { children: "Total Tenants" }), _jsx(CardContent, { className: "text-2xl font-bold ", children: totalTenants })] }), _jsxs(Card, { className: "p-4 text-center bg-green-100 text-green-800 shadow-md", children: [_jsx(CardTitle, { children: "Active Tenants" }), _jsx(CardContent, { className: "text-2xl font-bold ", children: activeTenants })] }), _jsxs(Card, { className: "p-4 text-center bg-red-100 text-red-600 shadow-md", children: [_jsx(CardTitle, { children: "Inactive Tenants" }), _jsx(CardContent, { className: "text-2xl font-bold ", children: inactiveTenants })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Tenants List" }), _jsx(CardDescription, { children: isError && `Failed to load tenants` })] }), _jsx(CardContent, { children: isLoading ? (_jsx("p", { className: "p-8 text-muted-foreground", children: "Loading tenants..." })) : (_jsx(DataTable, { headers: ["Name", "Frontend URL", "Status", "Created At"], data: isError ? [] : filteredTenants, emptyMessage: isError
                                ? `Unable to fetch tenants. ${error?.message || ""}`
                                : "No tenants found. Add your first tenant to get started.", renderRow: (tenant) => (_jsxs(_Fragment, { children: [_jsx("td", { children: _jsxs("div", { children: [_jsx("div", { className: "font-semibold", children: tenant.name }), _jsxs("div", { className: "text-xs text-muted-foreground mt-1", children: ["ID: ", tenant.id] })] }) }), _jsx("td", { children: tenant.frontendUrl ? (_jsx("a", { href: tenant.frontendUrl, target: "_blank", rel: "noopener noreferrer", className: "text-blue-600 hover:text-blue-800 hover:underline break-all", children: tenant.frontendUrl })) : (_jsx("span", { className: "text-muted-foreground", children: "No URL" })) }), _jsx("td", { children: _jsx(Badge, { variant: tenant.isActive ? "default" : "secondary", children: tenant.isActive ? "Active" : "Inactive" }) }), _jsx("td", { children: new Date(tenant.createdAt).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        }) })] })) })) })] })] }));
}
