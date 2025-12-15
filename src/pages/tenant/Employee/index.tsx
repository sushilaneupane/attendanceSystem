import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2,TriangleAlert  } from "lucide-react";
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

  if (isLoading) return <div className="p-6 text-center">Loading employees...</div>;
  if (error) return <div className="p-6 text-center">Error loading employees.</div>;

  const filteredEmployees = (employees ?? []).filter((emp: Employee) =>
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
    <div className=" p-1 sm:p-6 lg:p-8 w-full md:max-w-5xl lg:max-w-7xl fixed">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-1 z-20 p-4 ">
        <div>
          <h1 className="text-xl mt-3 font-extrabold text-gray-900">Employees</h1>
        </div>
        <div className="flex flex-wrap md:flex-nowrap items-center gap-3 mt-3 md:mt-0">
          <div className="relative flex-shrink min-w-[120px] w-[130px] sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search employees..."
              className="pl-8 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DialogBox
            variant="default"
            open={employeeDialogOpen}
            onOpenChange={setEmployeeDialogOpen}
              width="w-full px-4a sm:min-w-3xl"
            triggerButtonText={
              <Button
                className="bg-blue-800 text-white flex items-center gap-2 px-1 py-2 rounded-md shadow hover:bg-blue-700 flex-shrink-0"
                onClick={handleAddEmployee}
              >
                <Plus/>
                Add Employee
              </Button>
            }
            header={editingEmployee ? "Edit Employee" : "Add Employee"}
            footer={
              <div className="flex justify-end gap-3 flex-wrap">
                <Button variant="outline" onClick={() => setEmployeeDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" form="employee-form" className="bg-blue-800 text-white">
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
      <div className="overflow-x-auto max-h-[60vh] overflow-y-auto border rounded">
        <DataTable
          headers={["SN","Name", "Department", "Designation", "Joining Date", "Status", "Actions"]}
          data={filteredEmployees}
          emptyMessage="No employees found."
          renderRow={(emp: Employee, index: number) => (
            <TableRow className="text-xs">
              <TableCell className="px-3 sm:px-4 whitespace-nowrap">{index + 1}</TableCell>
              <TableCell
                className="font-semibold cursor-pointer hover:underline px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap"
                onClick={() => navigate(`/employee/${emp.id}`)}
              >
                {emp.firstName} {emp.lastName}
              </TableCell>

              <TableCell className="px-2 py-2 text-xs sm:text-sm">{emp.departmentName ?? "-"}</TableCell>
              <TableCell className="px-2 py-2 text-xs sm:text-sm">{emp.designationName ?? "-"}</TableCell>
              <TableCell className="px-3 sm:px-4 whitespace-nowrap">
                {emp.dateOfJoining ? new Date(emp.dateOfJoining).toLocaleDateString() : "-"}
              </TableCell>

              <TableCell className="px-3 sm:px-4 whitespace-nowrap">
                <Badge
                  className={emp.isActive ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}
                  variant={emp.isActive ? "default" : "destructive"}
                >
                  {emp.isActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>

              <TableCell className="px-3 sm:px-4 whitespace-nowrap">
                <div className="flex justify-end items-center space-x-2 sm:space-x-3 flex-wrap">
                  <Edit className="h-4 w-4 cursor-pointer text-blue-600" onClick={() => handleEditEmployee(emp)} />
                  <DialogBox
                    open={deleteDialogOpen && employeeToDelete?.id === emp.id}
                    onOpenChange={setDeleteDialogOpen}
                    header="⚠️Confirm Delete"
                    variant="default"
                    triggerButtonText={
                      <div onClick={() => handleDeleteEmployee(emp)} className="cursor-pointer">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </div>
                    }
                  >
                    <p className="text-sm text-muted-foreground">
                      Are you sure you want to delete “{employeeToDelete?.firstName} {employeeToDelete?.lastName}”?
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
