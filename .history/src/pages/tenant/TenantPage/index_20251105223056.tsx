import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Search, Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"
import { DataTable } from "../../../components/table/DataTable"
import Sidebar from "../../../components/sidebar/sidebar"

interface Tenant {
  id: string
  name: string
  frontendUrl: string
  isActive: boolean
  createdAt: string
}

export function TenantsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [tenants, setTenants] = useState<Tenant[]>([])

  const filteredTenants = tenants.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.frontendUrl?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddTenant = () => console.log("Redirect to add tenant")
  const handleEditTenant = (id: string) => console.log("Edit tenant", id)
  const handleDeleteTenant = (id: string) => console.log("Delete tenant", id)

  return (
    <>
    <Sidebar/>
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tenants</h2>
          <p className="text-muted-foreground">
            Manage your tenants and their information
          </p>
        </div>
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tenants by name or URL..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

        <Button onClick={handleAddTenant}>
          <Plus className="mr-2 h-4 w-4" />
          Add Tenant
        </Button>
      </div>

    

      <Card>
        <CardHeader>
          <CardTitle>Tenants List</CardTitle>
          <CardDescription>
            {filteredTenants.length} tenant{filteredTenants.length !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            headers={["Name", "Frontend URL", "Status", "Created At", "Actions"]}
            data={filteredTenants}
            emptyMessage="No tenants found. Add your first tenant to get started."
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

                <td className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditTenant(tenant.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleDeleteTenant(tenant.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </>
            )}
          />
        </CardContent>

      </Card>
    </div>
     </>
  )
}
