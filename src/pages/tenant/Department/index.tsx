import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Search, Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { DataTable } from "../../../components/table/DataTable";
import{DialogBox} from "../../../components/Dialogs/Dialogbox";
import { useDepartments } from "../../../hooks/useDepartments";
import { Department } from "@/api/departmentApi";
import DepartmentRegister from "./departmentRegister";
import MainLayout from "@/layouts/MainLayout";
import { tenantLinks } from "../TenantDashboard";

export function DepartmentPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");

   const { data: departments} = useDepartments();

  const filteredDepartments = departments?.filter(
    (d) => d.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleAddDepartment = () => console.log("Redirect to add department");
  const handleEditDepartment = (id: string) => console.log("Edit department", id);
  const handleDeleteDepartment = (id: string) => console.log("Delete department", id);

  return (
    <>
      <MainLayout navLinks={tenantLinks} />
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Departments</h2>
          <p className="text-muted-foreground">
            Manage your departments and their information
          </p>
        </div>
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search departments by name..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
                 
                   <DialogBox
                triggerButtonText={
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Add department
                  </>
                }
              >
                <DepartmentRegister/>
              </DialogBox>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Departments List</CardTitle>
          <CardDescription>
           
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            headers={["Department Id", "Name", "Actions"]}
            data={filteredDepartments}
            emptyMessage="No departments found. Add your first department to get started."
            renderRow={(department: Department) => (
              <>
                <td>
                  <div className="font-semibold">{department.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    ID: {department.id}
                  </div>
                </td>

                <td>
                  <Badge variant={department.isActive ? "default" : "secondary"}>
                    {department?.isActive ? "Active" : "Inactive"}
                  </Badge>
                </td>

                <td className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditDepartment(department.id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleDeleteDepartment(department.id)}
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
  );
}
