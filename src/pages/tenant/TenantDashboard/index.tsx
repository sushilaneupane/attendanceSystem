import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import { DataTable } from "../../../components/table/DataTable";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../components/ui/card";
import { Search } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { LayoutDashboard, Users, CalendarDays,Layers } from "lucide-react";

interface EmployeeAttendance {
  id: string;
  name: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: "Present" | "Absent" | "Late";
}
 export const tenantLinks = [
  { name: "Dashboard", path: "/tenant-dashboard", icon: <LayoutDashboard size={18} /> },
  { name: "Employee Attendance", path: "/tenant/attendance", icon: <CalendarDays size={18} /> },
  { name: "Employees", path: "/tenant/employees", icon: <Users size={18} /> },
  { name: "Department", path: "/department", icon: <Layers size={18} /> },

];

const attendanceData: EmployeeAttendance[] = [
  { id: "1", name: "John Doe", date: "2025-11-09", checkIn: "09:00 AM", checkOut: "05:00 PM", status: "Present" },
  { id: "2", name: "Jane Smith", date: "2025-11-09", checkIn: "09:15 AM", checkOut: "05:00 PM", status: "Late" },
  { id: "3", name: "Bob Johnson", date: "2025-11-09", checkIn: null, checkOut: null, status: "Absent" },
];

export default function TenantAttendanceDashboard() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAttendance = attendanceData.filter(
    (record) =>
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.date.includes(searchTerm)
  );

  return (
    <>
    <MainLayout navLinks={tenantLinks}/>
   
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance Dashboard</h1>
          <p className="text-muted-foreground">View all employees' attendance records</p>
        </div>
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or date..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Employees Attendance</CardTitle>
          <CardDescription>
            {filteredAttendance.length} record{filteredAttendance.length !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            headers={["Employee", "Date", "Check-in", "Check-out", "Status"]}
            data={filteredAttendance}
            emptyMessage="No attendance records found."
            renderRow={(record: EmployeeAttendance) => (
              <>
                <td>{record.name}</td>
                <td>{new Date(record.date).toLocaleDateString()}</td>
                <td>{record.checkIn || "-"}</td>
                <td>{record.checkOut || "-"}</td>
                <td>
                  <Badge
                    variant={
                      record.status === "Present"
                        ? "default"
                        : record.status === "Late"
                        ? "secondary" // Fixed for TypeScript
                        : "destructive"
                    }
                  >
                    {record.status}
                  </Badge>
                </td>
              </>
            )}
          />
        </CardContent>
      </Card>
  
     </>
  );
}
