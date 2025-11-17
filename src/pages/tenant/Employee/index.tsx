import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { DataTable } from "@/components/table/DataTable";
import { TableCell } from "@/components/ui/table";
import { SlideSheet, SlideSheetRef } from "@/components/App-sheet/AppSheet";
import { useEmployee, useCreateEmployee } from "@/hooks/useEmployee";
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
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);

  const { data: employees } = useEmployee();
  const createEmployee = useCreateEmployee();

  const navigate = useNavigate();

  const sheetRef = useRef<SlideSheetRef>(null);
  const deleteSheetRef = useRef<SlideSheetRef>(null);
  const sheetSubmitFn = useRef<() => void | undefined>(undefined);

  const filteredEmployees =
    employees?.filter((e) =>
      `${e.firstName} ${e.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ) || [];

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    sheetRef.current?.openSheet();
  };

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    sheetRef.current?.openSheet();
  };

  const handleDeleteEmployee = (employee: Employee) => {
    setEmployeeToDelete(employee);
    deleteSheetRef.current?.openSheet();
  };

  const confirmDelete = () => {
    if (employeeToDelete) {
      // Implement delete mutation if available
      deleteSheetRef.current?.closeSheet();
      setEmployeeToDelete(null);
    }
  };

  return (
    <div className="flex-1 space-y-6">
      {/* Header & Search */}
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

          <Button onClick={handleAddEmployee}>
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Employee Table */}
      <DataTable
        headers={["Name", "Department", "Designation", "Joining Date", "Status", "Actions"]}
        data={filteredEmployees}
        emptyMessage="No employees found."
        renderRow={(emp: any) => (
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
                <Trash2
                  className="h-4 w-4 cursor-pointer text-red-600"
                  onClick={() => handleDeleteEmployee(emp)}
                />
              </div>
            </TableCell>
          </>
        )}
      />

      {/* Add/Edit Employee Slide Sheet */}
      <SlideSheet
        ref={sheetRef}
        title={editingEmployee ? "Edit Employee" : "Add Employee"}
        width="w-96"
        submitText={editingEmployee ? "Update" : "Save"}
        onSubmit={() => sheetSubmitFn.current?.()}
      >
        <EmployeeRegister
         
        
        />
      </SlideSheet>

      {/* Delete Confirmation Slide Sheet */}
      <SlideSheet
        ref={deleteSheetRef}
        title="Confirm Delete"
        width="w-80"
        showSubmit={false}
      >
        <p className="mt-2 text-sm text-muted-foreground">
          Are you sure you want to delete “{employeeToDelete?.firstName} {employeeToDelete?.lastName}”?
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
