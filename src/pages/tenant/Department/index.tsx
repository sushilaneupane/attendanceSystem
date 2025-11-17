import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { DataTable } from "../../../components/table/DataTable";
import { useDepartments, useDeleteDepartment } from "../../../hooks/useDepartments";
import { Department } from "@/api/departmentApi";
import DepartmentRegister from "./departmentRegister";
import { SlideSheet, SlideSheetRef } from "../../../components/App-sheet/AppSheet";
import { TableCell } from "@/components/ui/table";

export function DepartmentPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [departmentToDelete, setDepartmentToDelete] = useState<Department | null>(null);

  const { data: departments } = useDepartments();
  const deleteDepartment = useDeleteDepartment();

  const navigate = useNavigate();

  const sheetRef = useRef<SlideSheetRef>(null);
  const deleteSheetRef = useRef<SlideSheetRef>(null);
  const sheetSubmitFn = useRef<() => void | undefined>(undefined);

  const filteredDepartments =
    departments?.filter((d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleEditDepartment = (department: Department) => {
    setEditingDepartment(department);
    sheetRef.current?.openSheet();
  };

  const handleAddDepartment = () => {
    setEditingDepartment(null);
    sheetRef.current?.openSheet();
  };

  const handleDeleteDepartment = (department: Department) => {
    setDepartmentToDelete(department);
    deleteSheetRef.current?.openSheet();
  };

  const confirmDelete = () => {
    if (departmentToDelete) {
      deleteDepartment.mutate(departmentToDelete.id);
      deleteSheetRef.current?.closeSheet();
      setDepartmentToDelete(null);
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

          <Button onClick={handleAddDepartment}>
            <Plus className="mr-2 h-4 w-4" />
            Add Department
          </Button>
        </div>
      </div>
      <DataTable
        headers={["Department", "Status", "Actions"]}
        data={filteredDepartments}
        emptyMessage="No departments found."
        renderRow={(department: Department) => (
          <>
            <TableCell
              className="font-semibold cursor-pointer hover:underline px-6 py-4"
              onClick={() => navigate(`/department/${department.id}`)}
           

            >
              {department.name}
            </TableCell>

            <TableCell className="px-6 py-4">
              <Badge variant={department.isActive ? "default" : "secondary"}>
                {department.isActive ? "Active" : "Inactive"}
              </Badge>
            </TableCell>

            <TableCell className="px-6 py-4">
              <div className="flex justify-end items-center space-x-3">
                <Edit
                  className="h-4 w-4 cursor-pointer text-blue-600"
                  onClick={() => handleEditDepartment(department)}
                />
                <Trash2
                  className="h-4 w-4 cursor-pointer text-red-600"
                  onClick={() => handleDeleteDepartment(department)}
                />
              </div>
            </TableCell>
          </>
        )}
      />
      <SlideSheet
        ref={sheetRef}
        title={editingDepartment ? "Edit Department" : "Add Department"}
        width="w-96"
        submitText={editingDepartment ? "Update" : "Save"}
        onSubmit={() => sheetSubmitFn.current?.()}
      >
        <DepartmentRegister
          isEditing={!!editingDepartment}
          defaultValues={editingDepartment}
          onSubmitSuccess={() => sheetRef.current?.closeSheet()}
          submitHandler={(submitFn) => {
            sheetSubmitFn.current = submitFn;
          }}
        />
      </SlideSheet>

      <SlideSheet
        ref={deleteSheetRef}
        title="Confirm Delete"
        width="w-80"
        showSubmit={false}
      >
        <p className="mt-2 text-sm text-muted-foreground">
          Are you sure you want to delete “{departmentToDelete?.name}”?
        </p>

        <div className="mt-4 flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => deleteSheetRef.current?.closeSheet()}
          >
            Cancel
          </Button>
          <Button variant="destructive" onClick={confirmDelete}>
            Delete
          </Button>
        </div>
      </SlideSheet>
    </div>
  );
}