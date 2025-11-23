import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { DataTable } from "../../../components/table/DataTable";
import { useDepartments, useDeleteDepartment } from "../../../hooks/useDepartments";
import { Department } from "@/types/department";
import DepartmentRegister from "./Register";
import { TableCell, TableRow } from "@/components/ui/table";
import { DialogBox } from "@/components/Dialogs/Dialogbox";

export function DepartmentPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [departmentToDelete, setDepartmentToDelete] = useState<Department | null>(null);

  const [departmentDialogOpen, setDepartmentDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const { data: departments } = useDepartments();
  const deleteDepartment = useDeleteDepartment();
  const navigate = useNavigate();

  const filteredDepartments =
    departments?.filter((d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleEditDepartment = (department: Department) => {
    setEditingDepartment(department);
    setDepartmentDialogOpen(true);
  };

  const handleAddDepartment = () => {
    setEditingDepartment(null);
    setDepartmentDialogOpen(true);
  };

  const handleDeleteDepartment = (department: Department) => {
    setDepartmentToDelete(department);
    setDeleteDialogOpen(true);
  };
  const confirmDelete = () => {
    if (departmentToDelete) {
      deleteDepartment.mutate(departmentToDelete.id, {
        onSuccess: () => {
          setDeleteDialogOpen(false);
          setDepartmentToDelete(null);
        },
      });
    }
  };

  return (
    <div className="flex-1 space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Departments</h2>
          <p className="text-muted-foreground mt-1">
            Manage your departments and their information
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-2 flex-1 max-w-md">
          <div className="relative w-full md:w-auto flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search departments by name..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DialogBox
            variant="default"
            open={departmentDialogOpen}
            onOpenChange={setDepartmentDialogOpen}
            triggerButtonText={
              <Button className="bg-blue-800 hover-none" onClick={handleAddDepartment}>
                <Plus className="mr-2 h-4 w-4" />
                Add Department
              </Button>
            }
            header={editingDepartment ? "Edit Department" : "Add Department"}
            footer={
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setDepartmentDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" form="department-form" className="bg-blue-800">
                  {editingDepartment ? "Update Department" : "Create Department"}
                </Button>
              </div>
            }
          >
            <DepartmentRegister
              isEditing={!!editingDepartment}
              defaultValues={editingDepartment}
              onSubmitSuccess={() => setDepartmentDialogOpen(false)}
            />
          </DialogBox>


        </div>
      </div>
      <DataTable
        headers={["Department", "Status", "Actions"]}
        data={filteredDepartments}
        emptyMessage="No departments found."
        renderRow={(department: Department) => (
          <>
          <TableRow>
            <TableCell
              className="font-semibold cursor-pointer hover:underline px-6 py-4"
              onClick={() => navigate(`/department/${department.id}`)}
            >
              {department.name}
            </TableCell>

            <TableCell className="px-6">
              <Badge variant={department.isActive ? "default" : "secondary"}>
                {department.isActive ? "Active" : "Inactive"}
              </Badge>
            </TableCell>

            <TableCell className="px-6">
              <div className="flex justify-end items-center space-x-3">
                <Edit
                  className="h-4 w-4 cursor-pointer text-blue-600"
                  onClick={() => handleEditDepartment(department)}
                />

                <DialogBox
                  open={deleteDialogOpen}
                  onOpenChange={setDeleteDialogOpen}
                  header="Confirm Delete"
                  variant="default"
                  triggerButtonText={
                    <div
                      onClick={() => handleDeleteDepartment(department)}
                      className="cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </div>
                  }
                >
                  <p className="mt-2 text-sm text-muted-foreground">
                    Are you sure you want to delete “{departmentToDelete?.name}”?
                  </p>

                  <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={confirmDelete}>
                      Delete
                    </Button>
                  </div>
                </DialogBox>
              </div>
            </TableCell>
            </TableRow>
          </>
        )}
      />
    </div>
  );
}
