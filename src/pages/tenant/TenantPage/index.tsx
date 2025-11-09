import { useState } from "react"

import { Input } from "../../../components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Search, Plus,} from "lucide-react"

import { DataTable } from "../../../components/table/DataTable"
import { useTenantsQuery } from "@/hooks/useTenants";

import { DialogBox } from "@/components/Dialogs/Dialogbox"
import TenantSignUp from "../TenantRegister"

interface Tenant {
  id: string
  name: string
  frontendUrl: string
  isActive: boolean
  createdAt: string
}

export function TenantsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: tenants = [], isLoading, isError, error } = useTenantsQuery();

 
  const filteredTenants = tenants.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.frontendUrl?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1 mt-10">
          <h2 className="text-3xl font-bold tracking-tight">Tenants</h2>
          <p className="text-muted-foreground">
            Manage your tenants and their information
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tenants by name or URL..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <DialogBox
            triggerButtonText={
              <>
                <Plus className="mr-2 h-4 w-4" />
                Add Tenant
              </>
            }
          >
            <TenantSignUp />
          </DialogBox>
        </div>
      </div>

      {/* Tenants Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tenants List</CardTitle>
          <CardDescription>
            {isError
              ? "Failed to load tenants"
              : `${filteredTenants.length} tenant${filteredTenants.length !== 1 ? "s" : ""} found`}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <p className="p-8 text-muted-foreground">Loading tenants...</p>
          ) : (
            <DataTable
              headers={["Name", "Frontend URL", "Status", "Created At"]}
              data={isError ? [] : filteredTenants}
              emptyMessage={
                isError
                  ? `Unable to fetch tenants. ${error?.message || ""}`
                  : "No tenants found. Add your first tenant to get started."
              }
              renderRow={(tenant) => (
                <>
                  <td>
                    <div>
                      <div className="font-semibold">{tenant.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        ID: {tenant.id}
                      </div>
                    </div>
                  </td>
                  <td>
                    {tenant.frontendUrl ? (
                      <a
                        href={tenant.frontendUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline break-all"
                      >
                        {tenant.frontendUrl}
                      </a>
                    ) : (
                      <span className="text-muted-foreground">No URL</span>
                    )}
                  </td>
                  <td>
                    <Badge variant={tenant.isActive ? "default" : "secondary"}>
                      {tenant.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </td>
                  <td>
                    {new Date(tenant.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </>
              )}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
