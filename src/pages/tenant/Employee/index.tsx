import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { DataTable } from "@/components/table/DataTable";
import { TableCell } from "@/components/ui/table";
import { DialogBox } from "@/components/Dialogs/Dialogbox";
import { useEmployee, useCreateEmployee, useDeleteEmployee } from "@/hooks/useEmployee"; // Add useDeleteEmployee import
import EmployeeRegister from "./Register";

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  dateOfJoining: string;
  contactNumber1: string;
  departmentName: string;
  designationName: string;
  isActive: boolean;
}

export function EmployeePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [employeeDialogOpen, setEmployeeDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { data: employees, isLoading, error } = useEmployee();
  const createEmployee = useCreateEmployee();
  const deleteEmployeeMutation = useDeleteEmployee(); // Initialize the delete mutation
  const navigate = useNavigate();

  // Debug: Check if data is loading or has errors
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading employees</div>;

  const filteredEmployees =
    employees?.filter((e) =>
      `${e.firstName} ${e.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleEditEmployee = (employee: Employee) => {
    console.log("Editing employee:", employee); // Debug log
    setEditingEmployee(employee);
    setEmployeeDialogOpen(true);
  };

  const handleAddEmployee = () => {
    console.log("Adding new employee"); // Debug log
    setEditingEmployee(null);
    setEmployeeDialogOpen(true);
  };

  const handleDeleteClick = (employee: Employee) => {
    console.log("Delete clicked for:", employee); // Debug log
    setEmployeeToDelete(employee);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (employeeToDelete) {
      console.log("Confirming delete for:", employeeToDelete.id); // Debug log
      try {
        await deleteEmployeeMutation.mutateAsync(employeeToDelete.id);
        setDeleteDialogOpen(false);
        setEmployeeToDelete(null);
      } catch (error) {
        console.error("Failed to delete employee:", error);
      }
    }
  };

  const handleEmployeeDialogClose = () => {
    setEmployeeDialogOpen(false);
    setEditingEmployee(null); // Reset editing state when dialog closes
  };

  return (
    <div className="flex-1 space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Employees</h2>
          <p className="text-muted-foreground mt-1">
            Manage your employees and their information
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-2 flex-1 max-w-md">
          <div className="relative w-full md:w-auto flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employees by name..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <DialogBox
            open={employeeDialogOpen}
            onOpenChange={setEmployeeDialogOpen}
            header={editingEmployee ? "Edit Employee" : "Add Employee"}
            triggerButtonText={
              <Button onClick={handleAddEmployee}>
                <Plus className="mr-2 h-4 w-4" />
                Add Employee
              </Button>
            }
          >
            <EmployeeRegister
              employee={editingEmployee || undefined} // Pass undefined instead of null for new employee
              onSuccess={handleEmployeeDialogClose}
            />
          </DialogBox>
        </div>
      </div>

      <DataTable
        headers={["Name", "Department", "Designation", "Joining Date", "Status", "Actions"]}
        data={filteredEmployees}
        emptyMessage="No employees found."
        renderRow={(emp: Employee) => (
          <>
            <TableCell
              className="font-semibold cursor-pointer hover:underline px-6 py-4"
              onClick={() => navigate(`/employee/${emp.id}`)}
            >
              {emp.firstName} {emp.lastName}
            </TableCell>

            <TableCell className="px-6 py-4">{emp.departmentName}</TableCell>
            <TableCell className="px-6 py-4">{emp.designationName}</TableCell>
            <TableCell className="px-6 py-4">
              {new Date(emp.dateOfJoining).toLocaleDateString()}
            </TableCell>

            <TableCell className="px-6 py-4">
              <Badge variant={emp.isActive ? "default" : "destructive"}>
                {emp.isActive ? "Active" : "Inactive"}
              </Badge>
            </TableCell>

            <TableCell className="px-6 py-4">
              <div className="flex justify-end items-center space-x-3">
                <Edit
                  className="h-4 w-4 cursor-pointer text-blue-600"
                  onClick={() => handleEditEmployee(emp)}
                />
                <DialogBox
        // open={deleteDialogOpen}
        // onOpenChange={setDeleteDialogOpen}
        header="Confirm Delete"
        triggerButtonText={ <Trash2 
                  className="h-4 w-4 cursor-pointer text-red-600"
                  onClick={() => handleDeleteClick(emp)}
                />}
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete <strong>"{employeeToDelete?.firstName} {employeeToDelete?.lastName}"</strong>? 
            This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2">
            <Button 
              variant="ghost" 
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleteEmployeeMutation.isPending}
            >
              Cancel
            </Button>
            <Button 

              variant="destructive" 
              onClick={confirmDelete}
              disabled={deleteEmployeeMutation.isPending}
            >
              {deleteEmployeeMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </DialogBox>
               
              </div>
            </TableCell>
          </>
        )}
      />

      {/* Delete Confirmation Dialog */}
      {/* <DialogBox
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        header="Confirm Delete"
        triggerButtonText={null}
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete <strong>"{employeeToDelete?.firstName} {employeeToDelete?.lastName}"</strong>? 
            This action cannot be undone.
          </p>
          <div className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleteEmployeeMutation.isPending}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={confirmDelete}
              disabled={deleteEmployeeMutation.isPending}
            >
              {deleteEmployeeMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </DialogBox> */}
    </div>
  );
}