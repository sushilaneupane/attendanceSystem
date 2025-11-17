import React from "react";
import { useEmployee } from "../../hooks/useEmployee";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/table/DataTable"; // optional if you want a table component
import { Skeleton } from "@/components/ui/skeleton";

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  dateOfJoining: string;
  email?: string;
  contactNumber1: string;
  contactNumber2?: string;
  address?: string;
  dateOfBirth: string;
  description?: string;
  deviceUserId?: number;
  isActive: boolean;
  marriedStatus?: number;
  gender?: number;
  designationId?: string;
  designationName: string;
  departmentId?: string;
  departmentName: string;
}

const EmployeePage: React.FC = () => {
  const { data: employees, isLoading, error } = useEmployee();

  if (isLoading) {
    return (
      <div className="p-4 space-y-2">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">Failed to load employees.</p>;
  }

  return (
    <div className="p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Employees</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="border px-4 py-2 text-left">Name</th>
                <th className="border px-4 py-2 text-left">Department</th>
                <th className="border px-4 py-2 text-left">Designation</th>
                <th className="border px-4 py-2 text-left">Joining Date</th>
                <th className="border px-4 py-2 text-left">Status</th>
                <th className="border px-4 py-2 text-left">Contact</th>
              </tr>
            </thead>
            <tbody>
             
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeePage;
