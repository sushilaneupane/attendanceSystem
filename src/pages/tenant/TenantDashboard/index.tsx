import { useState } from "react";
import { Input } from "../../../components/ui/input";
import { Badge } from "../../../components/ui/badge";
import { DataTable } from "../../../components/table/DataTable";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../../components/ui/card";
import { Search, LayoutDashboard, Users, Layers } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";

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

  const totalEmployees = attendanceData.length;
  const presentCount = attendanceData.filter((r) => r.status === "Present").length;
  const absentCount = attendanceData.filter((r) => r.status === "Absent").length;
  const lateCount = attendanceData.filter((r) => r.status === "Late").length;
  const totalDepartments = 4; 

  return (
    <>
      <MainLayout navLinks={tenantLinks} />
      <div className="p-6 md:ml-5">

      
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 mt-5">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Card className="bg-blue-100 border-blue-300">
            <CardHeader>
              <CardTitle>Total Employees</CardTitle>
              <CardDescription className="text-2xl font-bold text-blue-800">{totalEmployees}</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-green-100 border-green-300">
            <CardHeader>
              <CardTitle>Present Today</CardTitle>
              <CardDescription className="text-2xl font-bold text-green-800">{presentCount}</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-red-100 border-red-300">
            <CardHeader>
              <CardTitle>Absent Today</CardTitle>
              <CardDescription className="text-2xl font-bold text-red-800">{absentCount}</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-yellow-100 border-yellow-300">
            <CardHeader>
              <CardTitle>Late Check-ins</CardTitle>
              <CardDescription className="text-2xl font-bold text-yellow-800">{lateCount}</CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-purple-100 border-purple-300">
            <CardHeader>
              <CardTitle>Departments</CardTitle>
              <CardDescription className="text-2xl font-bold text-purple-800">{totalDepartments}</CardDescription>
            </CardHeader>
          </Card>
        </div>

        
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
                          ? "secondary"
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
      </div>
    </>
  );
}
