import React from "react";
import { useEmployeeApi } from "../../hooks/useEmployee";
import { Table } from "@/components/ui/table";
import { DataTable } from "@/components/table/DataTable";
import { useState } from "react";
import { Badge } from "../../components/ui/badge";
import { Employee } from "@/api/employeeApi";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DialogBox } from "@/components/Dialogs/Dialogbox";
import MainLayout from "@/layouts/MainLayout";
import { tenantLinks } from "../tenant/TenantDashboard";
const EmployeePage: React.FC = () => {
  const { employees, loading, error, refetch } = useEmployeeApi();
  const [searchTerm, setSearchTerm] = useState("");

   const filteredemployee = employees.filter(
    (t) =>
      t.firstName.toLowerCase().includes(searchTerm.toLowerCase())
     
  );

  return (
    <>
     <MainLayout navLinks={tenantLinks} />
  
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1 mt-10">
          <h2 className="text-3xl font-bold tracking-tight">Employees</h2>
          <p className="text-muted-foreground">
            Manage your employees and their information
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employee by name"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

        </div>
      </div>
    
         <DataTable
               headers={["Name", "Designation", "Department", "Status", "Date of Joining"]}
              data={filteredemployee}
              emptyMessage="No attendance records found."
              renderRow={(record: Employee) => (
                <>
                  <td>{record.firstName}{record.lastName}</td>
                  <td>{(record.designationName)}</td>
                  <td>{record.departmentName}</td>
                  <td>{record.marriedStatus}</td>
                   <td>
                  <div className="text-sm">
                  {new Date(record.dateOfJoining).toLocaleDateString()}
                  </div>
                  </td>
                  
                </>
              )}
            />

       
    

     
    </div>
      </>
  );
};

export default EmployeePage;
