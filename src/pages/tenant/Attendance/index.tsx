"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { DataTable } from "@/components/table/DataTable";
import { TableCell, TableRow } from "@/components/ui/table";
import { Attendance } from "@/types/attendance";
import { useAttendance } from "@/hooks/useAttendance";
function getLocalYMD(date: Date | string) {
  const d = date instanceof Date ? date : new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function AttendancePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const todayYMD = useMemo(() => getLocalYMD(new Date()), []);
  const [selectedDate, setSelectedDate] = useState(todayYMD);
  const { data: attendance = [], isLoading, error } = useAttendance();
  const filteredAttendance = useMemo(() => {
    return attendance.filter((item) => {
      const itemDate = getLocalYMD(item.punchTime);
      const matchesSearch = item.username.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDate = itemDate === selectedDate;

      if (itemDate === todayYMD && !matchesDate) {
        console.log('Date mismatch debug:', {
          itemDate,
          selectedDate,
          todayYMD,
          punchTime: item.punchTime
        });
      }
      
      return matchesSearch && matchesDate;
    });
  }, [attendance, searchTerm, selectedDate, todayYMD]);

  if (error)
    return (
      <div className="p-6 text-center text-red-600">
        Error loading attendance.
      </div>
    );

  return (
    <div className="p-1 sm:p-6 lg:p-8 w-full md:max-w-5xl lg:max-w-7xl fixed">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-1 z-20 p-4">
        <div>
          <h1 className="text-xl mt-3 font-extrabold text-gray-900">
            Attendance
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage employee attendance records
          </p>
        </div>

        <div className="flex items-center gap-3 mt-3 md:mt-0 flex-wrap">
          <div className="relative min-w-[120px] w-[130px] sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by email..."
              className="pl-8 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border rounded-md p-1 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="overflow-x-auto max-h-[60vh] overflow-y-auto border rounded">
        <DataTable<Attendance>
          headers={["SN", "User", "Punch Time", "Status", "Approval"]}
          data={filteredAttendance}
          isLoading={isLoading}
          emptyMessage="No attendance records found."
          renderRow={(item, index) => (
            <TableRow key={item.id} className="text-xs hover:bg-gray-50">
              <TableCell className="px-3 sm:px-4 whitespace-nowrap">
                {index + 1}
              </TableCell>
              <TableCell className="px-3 py-2 sm:px-4 sm:py-3 whitespace-nowrap font-medium">
                {item.username}
              </TableCell>
              <TableCell className="px-3 sm:px-4 whitespace-nowrap">
                {new Date(item.punchTime).toLocaleString()}
              </TableCell>

              <TableCell className="px-3 sm:px-4 whitespace-nowrap">
                {item.inOutStatus === 0 ? (
                  <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-700">
                    Check In
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-700">
                    Check Out
                  </span>
                )}
              </TableCell>
              <TableCell className="px-3 sm:px-4 whitespace-nowrap text-right">
                {item.isApproved ? (
                  <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                    Approved
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700">
                    Pending
                  </span>
                )}
              </TableCell>
            </TableRow>
          )}
        />
      </div>
    </div>
  );
}