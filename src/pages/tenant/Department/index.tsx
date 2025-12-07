import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { DataTable } from "@/components/table/DataTable";
import { TableCell, TableRow } from "@/components/ui/table";
import { DialogBox } from "@/components/Dialogs/Dialogbox";
import { useDepartments, useDeleteDepartment } from "@/hooks/useDepartments";
import DepartmentRegister from "./Register";
import { Department } from "@/types/department";

export function DepartmentPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [departmentDialogOpen, setDepartmentDialogOpen] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState<Department | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { data: departments, isLoading, error } = useDepartments();
  const deleteDepartment = useDeleteDepartment();

  if (isLoading) return <div className="p-6 text-center">Loading departments...</div>;
  if (error) return <div className="p-6 text-center">Error loading departments.</div>;

  const filteredDepartments =
    departments?.filter((d) => d.name.toLowerCase().includes(searchTerm.toLowerCase())) || [];

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
    <div className="p-1 sm:p-6 lg:p-8 w-full md:max-w-4xl lg:max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-1 z-20 p-4">
        <div>
          <h2 className="text-xl mt-3 font-extrabold text-gray-900">Departments</h2>
          <p className="text-muted-foreground mt-1">Manage your departments and their information</p>
        </div>

        <div className="flex flex-wrap md:flex-nowrap items-center gap-3 mt-3 md:mt-0">
          <div className="relative flex-shrink min-w-[120px] w-[130px] sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search departments by name..."
              className="pl-8 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <DialogBox
            variant="default"
            open={departmentDialogOpen}
            onOpenChange={setDepartmentDialogOpen}
            triggerButtonText={
              <Button
                className="bg-blue-800 text-white flex items-center gap-2 px-1 py-2 rounded-md shadow hover:bg-blue-700 flex-shrink-0"
                onClick={handleAddDepartment}
              >
                <Plus className="text-sm px-0 py-1.5" />
                Add Department
              </Button>
            }
            width="min-w-[300px]"
            header={editingDepartment ? "Edit Department" : "Add Department"}
            footer={
              <div className="flex justify-center gap-3 flex-wrap">
                <Button variant="outline" onClick={() => setDepartmentDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" form="department-form" className="bg-blue-800 text-white">
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

      <div className="overflow-x-auto max-h-[60vh] overflow-y-auto border rounded">
        <DataTable
          headers={["Department", "Status", "Actions"]}
          data={filteredDepartments}
          emptyMessage="No departments found."
          renderRow={(department: Department) => (
            <TableRow className="text-xs">
              <TableCell
                className="font-semibold cursor-pointer hover:underline px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap"
                onClick={() => navigate(`/department/${department.id}`)}
              >
                {department.name}
              </TableCell>

              <TableCell className="px-3 sm:px-4 whitespace-nowrap">
                <Badge
                  className={
                    department.isActive ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"
                  }
                  variant={department.isActive ? "default" : "destructive"}
                >
                  {department.isActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>

              <TableCell className="px-3 sm:px-4 whitespace-nowrap">
                <div className="flex justify-end items-center space-x-2 sm:space-x-3 flex-wrap">
                  <Edit
                    className="h-4 w-4 cursor-pointer text-blue-600"
                    onClick={() => handleEditDepartment(department)}
                  />
                  <DialogBox
                    open={deleteDialogOpen && departmentToDelete?.id === department.id}
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
                    <div className="mt-4 flex justify-end gap-2 flex-wrap">
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
          )}
        />
      </div>
    </div>
  );
}
