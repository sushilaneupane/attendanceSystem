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
import { Search } from "lucide-react";
import { TableRow, TableCell } from "../../../components/ui/table";

interface EmployeeAttendance {
  id: string;
  name: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: "Present" | "Absent" | "Late";
}

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
    <div className="p-2 sm:p-4 md:p-6 lg:p-8">
      {/* Header and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-4 sm:mb-6">
        <div>
          <h1 className="text-xs sm:text-2xl mt-4 md:text-3xl font-bold tracking-tight">Attendance Dashboard</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">View all employees' attendance records</p>
        </div>

        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2 top-2 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or date..."
            className="pl-7 sm:pl-8 text-xs sm:text-sm w-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-4 mb-6 sm:mb-8">
        <Card className="bg-blue-100 border-blue-300 p-2 sm:p-4 w-30">
          <CardHeader>
            <CardTitle className="text-xs sm:text-sm">Total Employees</CardTitle>
            <CardDescription className="text-lg sm:text-xl font-bold text-blue-800">{totalEmployees}</CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-green-100 border-green-300 p-2 sm:p-4 w-30">
          <CardHeader>
            <CardTitle className="text-xs sm:text-sm">Present Today</CardTitle>
            <CardDescription className="text-lg sm:text-xl font-bold text-green-800">{presentCount}</CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-red-100 border-red-300 p-2 sm:p-4 w-30">
          <CardHeader>
            <CardTitle className="text-xs sm:text-sm">Absent Today</CardTitle>
            <CardDescription className="text-lg sm:text-xl font-bold text-red-800">{absentCount}</CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-yellow-100 border-yellow-300 p-2 sm:p-4 w-30">
          <CardHeader>
            <CardTitle className="text-xs sm:text-sm">Late Check-ins</CardTitle>
            <CardDescription className="text-lg sm:text-xl font-bold text-yellow-800">{lateCount}</CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-purple-100 border-purple-300 p-2 sm:p-4 w-30">
          <CardHeader>
            <CardTitle className="text-xs sm:text-sm">Departments</CardTitle>
            <CardDescription className="text-lg sm:text-xl font-bold text-purple-800">{totalDepartments}</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Attendance Table */}
      <Card className="w-80">
        <CardHeader>
          <CardTitle className="text-sm sm:text-base">Employees Attendance</CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            {filteredAttendance.length} record{filteredAttendance.length !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <DataTable
            headers={["Employee", "Date", "Check-in", "Check-out", "Status"]}
            data={filteredAttendance}
            emptyMessage="No attendance records found."
            renderRow={(record: EmployeeAttendance) => (
              <TableRow key={record.id}>
                <TableCell className="whitespace-nowrap text-xs sm:text-sm">{record.name}</TableCell>
                <TableCell className="whitespace-nowrap text-xs sm:text-sm">{new Date(record.date).toLocaleDateString()}</TableCell>
                <TableCell className="whitespace-nowrap text-xs sm:text-sm">{record.checkIn || "-"}</TableCell>
                <TableCell className="whitespace-nowrap text-xs sm:text-sm">{record.checkOut || "-"}</TableCell>
                <TableCell className="whitespace-nowrap text-xs sm:text-sm">
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
                </TableCell>
              </TableRow>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
}
