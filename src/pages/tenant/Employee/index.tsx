import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { DataTable } from "@/components/table/DataTable";
import { TableCell, TableRow } from "@/components/ui/table";
import { DialogBox } from "@/components/Dialogs/Dialogbox";
import { useEmployee, useDeleteEmployee } from "@/hooks/useEmployee";
import EmployeeForm from "./Register";
import { Employee } from "@/types/employee";

export default function EmployeePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [employeeDialogOpen, setEmployeeDialogOpen] = useState(false);

  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { data: employees, isLoading, error } = useEmployee();
  const deleteMutation = useDeleteEmployee();

  if (isLoading) return <div>Loading employees...</div>;
  if (error) return <div>Error loading employees</div>;

  const filteredEmployees = (employees ?? []).filter((emp: { firstName: any; lastName: any; }) =>
    `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setEmployeeDialogOpen(true);
  };

  const handleEditEmployee = (emp: Employee) => {
    setEditingEmployee(emp);
    setEmployeeDialogOpen(true);
  };

  const handleDeleteEmployee = (emp: Employee) => {
    setEmployeeToDelete(emp);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!employeeToDelete) return;
    deleteMutation.mutate(employeeToDelete.id, {
      onSuccess: () => {
        setDeleteDialogOpen(false);
        setEmployeeToDelete(null);
      },
    });
  };

  return (
    <div className="flex-1 space-y-6">
  
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold">Employees</h2>
          <p className="text-muted-foreground">Manage your employees</p>
        </div>

      
        <div className="flex items-center gap-3 max-w-md w-full">
          <div className="relative w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

      
          <DialogBox
            variant="default"
            open={employeeDialogOpen}
            onOpenChange={setEmployeeDialogOpen}
            triggerButtonText={
              <Button className="bg-blue-800" onClick={handleAddEmployee}>
                <Plus className="mr-2 h-4 w-4" />
                Add Employee
              </Button>
            }
            width="min-w-5xl"
            header={editingEmployee ? "Edit Employee" : "Add Employee"}
            footer={
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setEmployeeDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" form="employee-form" className="bg-blue-800">
                  {editingEmployee ? "Update Employee" : "Create Employee"}
                </Button>
              </div>
            }
          >
            <EmployeeForm
              isEditing={!!editingEmployee}
              defaultValues={editingEmployee}
              onSubmitSuccess={() => setEmployeeDialogOpen(false)}
            />
          </DialogBox>
        </div>
      </div>

      {/* Employee Table */}
      <DataTable
        headers={["Name", "Department", "Designation", "Joining Date", "Status", "Actions"]}
        data={filteredEmployees}
        emptyMessage="No employees found."
        renderRow={(emp: Employee) => (
          <>
          <TableRow>
            <TableCell
              className="font-semibold cursor-pointer hover:underline px-6 py-4"
              onClick={() => navigate(`/employee/${emp.id}`)}
            >
              {emp.firstName} {emp.lastName}
            </TableCell>
            <TableCell className="px-6">{emp.departmentName ?? "-"}</TableCell>
            <TableCell className="px-6">{emp.designationName ?? "-"}</TableCell>
            <TableCell className="px-6">
              {emp.dateOfJoining ? new Date(emp.dateOfJoining).toLocaleDateString() : "-"}
            </TableCell>
            <TableCell className="px-6">
              <Badge variant={emp.isActive ? "default" : "destructive"}>
                {emp.isActive ? "Active" : "Inactive"}
              </Badge>
            </TableCell>

            {/* Actions */}
            <TableCell className="px-6">
              <div className="flex justify-end items-center space-x-3">
                <Edit
                  className="h-4 w-4 cursor-pointer text-blue-600"
                  onClick={() => handleEditEmployee(emp)}
                />

                {/* Delete Dialog */}
                <DialogBox
                  open={deleteDialogOpen && employeeToDelete?.id === emp.id}
                  onOpenChange={setDeleteDialogOpen}
                  header="Confirm Delete"
                  variant="default"
                  triggerButtonText={
                    <div
                      onClick={() => handleDeleteEmployee(emp)}
                      className="cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </div>
                  }
                >
                  <p className="mt-2 text-sm text-muted-foreground">
                    Are you sure you want to delete “{employeeToDelete?.firstName}{" "}
                    {employeeToDelete?.lastName}”?
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
