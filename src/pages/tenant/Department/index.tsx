
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { DataTable } from "../../../components/table/DataTable";
import { DialogBox } from "../../../components/Dialogs/Dialogbox";

import { useDepartments, useDeleteDepartment } from "../../../hooks/useDepartments";
import { Department } from "@/api/departmentApi";
import DepartmentRegister from "./departmentRegister";

export function DepartmentPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState<Department | null>(null);

  const { data: departments } = useDepartments();
  const deleteDepartment = useDeleteDepartment();


  const navigate = useNavigate();

  const filteredDepartments =
    departments?.filter((d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleEditDepartment = (department: Department) => {
    setEditingDepartment(department);
    setOpenDialog(true);
  };

  const handleAddDepartment = () => {
    setEditingDepartment(null);
    setOpenDialog(true);
  };

  const handleDeleteDepartment = (department: Department) => {
    setDepartmentToDelete(department);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (departmentToDelete) {
      deleteDepartment.mutate(departmentToDelete.id);
      setOpenDeleteDialog(false);
      setDepartmentToDelete(null);
    }
  };

  return (
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

        <Button onClick={handleAddDepartment}>
          <Plus className="mr-2 h-4 w-4" />
          Add Department
        </Button>
      </div>

      <Card className="mr-30">
        <CardHeader>
          <CardTitle>Departments List</CardTitle>
        </CardHeader>

        <CardContent>
          <DataTable
            headers={["Department", "Status", "Actions"]}
            data={filteredDepartments}
            emptyMessage="No departments found."
            renderRow={(department: Department) => (
              <>
                <td
                  className="font-semibold cursor-pointer hover:underline"
                  onClick={() => navigate(`/department/${department.id}`)}
                >
                  {department.name}
                </td>

                <td>
                  <Badge variant={department.isActive ? "default" : "secondary"}>
                    {department.isActive ? "Active" : "Inactive"}
                  </Badge>
                </td>


                <td>
                  <DialogBox
                    triggerButtonText={
                      <>

                          <Edit  onClick={() => handleEditDepartment(department)} className="mr-1 h-4 w-4" />
                       
                      </>
                    }
                  >
                    <DepartmentRegister
                      isEditing={!!editingDepartment}
                      defaultValues={editingDepartment}
                      onClose={() => setOpenDialog(false)}
                    />
                  </DialogBox>


                  <DialogBox
                    triggerButtonText={
                      <>
                          <Trash2  onClick={() => handleDeleteDepartment(department)} className="mr-1 h-4 w-4" />
                        </>
                      
                    }
                  >

                    <div className="p-2">
                      <h3 className="text-lg font-semibold">Confirm Delete</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Are you sure you want to delete "{departmentToDelete?.name}"?
                      </p>
                      <div className="mt-4 flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setOpenDeleteDialog(false)}>
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={confirmDelete}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  </DialogBox>
                </td>
              </>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}