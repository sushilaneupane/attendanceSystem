import { useState } from "react";
import {
  Calendar,
  Clock1,
  CheckCircle,
  XCircle,
  Edit2,
  Trash2,
  Eye,
} from "lucide-react";
import { useLeaves } from "@/hooks/useLeave";
import { Leave, LeaveStats } from "@/types/leave";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/table/DataTable";
import { TableRow, TableCell } from "@/components/ui/table";
import { StatusEnum, LeaveTypeEnum } from "@/types/enum/leave";
import { Input } from "@/components/ui/input";


const LeaveManagementDashboard = () => {
   const [filters, setFilters] = useState({
    FromDate: "",
    ToDate: "",
    Name: "",
  });

  
  const params = Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value !== "")
  );

  const { data: leavesResponse, isLoading } = useLeaves(params);
  const leaves: Leave[] = leavesResponse?.data || [];

 
  const stats: LeaveStats = {
    total: leaves.length,
    pending: leaves.filter((l) => l.status === StatusEnum.Pending).length,
    approved: leaves.filter((l) => l.status === StatusEnum.Approved).length,
    rejected: leaves.filter((l) => l.status === StatusEnum.Rejected).length,
  };



  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case StatusEnum.Approved:
        return "bg-green-100 text-green-800";
      case StatusEnum.Pending:
        return "bg-yellow-100 text-yellow-800";
      case StatusEnum.Rejected:
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const tableHeaders = [
    "Employee",
    "Leave Type",
    "Dates",
    "Reason",
    "Status",
    "Applied Date",
    "Actions",
  ];

  const renderLeaveRow = (leave: Leave) => {
    const fromDate = new Date(leave.dateFrom);
    const toDate = new Date(leave.dateTo);
    const appliedDate = new Date(leave.appliedOnDate);

    return (
      <TableRow key={leave.id} className="hover:bg-gray-50">
        <TableCell className="px-6 py-4 font-medium text-gray-900">
          {leave.employeeName}
        </TableCell>
        <TableCell className="px-6 py-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {LeaveTypeEnum[leave.leaveType]?.replace("Leave", "").trim() ||
              "Other"}
          </span>
        </TableCell>
        <TableCell className="px-6 py-4 text-gray-600">
          {fromDate.toLocaleDateString()} → {toDate.toLocaleDateString()}
        </TableCell>
        <TableCell className="px-6 py-4">{leave.leaveReason}</TableCell>
        <TableCell className="px-6 py-4">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
              leave.status
            )}`}
          >
            {StatusEnum[leave.status] || "Unknown"}
          </span>
        </TableCell>
        <TableCell className="px-6 py-4 text-gray-600">
          {appliedDate.toLocaleDateString()}
        </TableCell>
        <TableCell className="px-6 py-4 text-right">
          <div className="flex justify-end space-x-2">
            <button className="p-1 text-blue-600 hover:text-blue-800 transition-colors">
              <Eye className="w-4 h-4" />
            </button>
            <button className="p-1 text-yellow-600 hover:text-yellow-800 transition-colors">
              <Edit2 className="w-4 h-4" />
            </button>
            <button className="p-1 text-red-600 hover:text-red-800 transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
     
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <h1 className="text-3xl font-semibold text-slate-800 flex items-center gap-2 mb-6">
          <Calendar className="w-8 h-8 text-blue-600" /> Leave Management
        </h1>

        <div className="flex gap-4">
       
          <div className="mt-7 w-2xs">
            <Input
              placeholder="Search by employee name..."
              value={filters.Name}
              onChange={(e) => handleFilterChange("Name", e.target.value)}
            />
          </div>

        
      
        </div>
      </div>

   

 
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-blue-100 border-blue-300">
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>Total Leaves</CardTitle>
              <CardDescription className="text-2xl font-bold text-blue-800">
                {stats.total}
              </CardDescription>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </CardHeader>
        </Card>

        <Card className="bg-yellow-100 border-yellow-300">
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>Pending</CardTitle>
              <CardDescription className="text-2xl font-bold text-yellow-800">
                {stats.pending}
              </CardDescription>
            </div>
            <Clock1 className="h-8 w-8 text-yellow-600" />
          </CardHeader>
        </Card>

        <Card className="bg-green-100 border-green-300">
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>Approved</CardTitle>
              <CardDescription className="text-2xl font-bold text-green-800">
                {stats.approved}
              </CardDescription>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </CardHeader>
        </Card>

        <Card className="bg-red-100 border-red-300">
          <CardHeader className="flex items-center justify-between">
            <div>
              <CardTitle>Rejected</CardTitle>
              <CardDescription className="text-2xl font-bold text-red-800">
                {stats.rejected}
              </CardDescription>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
          </CardHeader>
        </Card>
      </div>
       
      <div className="flex gap-4 mb-6">
        <div className="flex-1  w-2xs">
          <label className="text-sm font-medium">From Date</label>
          <Input
          className="w-50"
            type="date"
            value={filters.FromDate?.split("T")[0] || ""}
            onChange={(e) =>
              handleFilterChange(
                "FromDate",
                e.target.value ? new Date(e.target.value).toISOString() : ""
              )
            }
          />
        </div>

        <div className="flex-1">
          <label className="text-sm font-medium">To Date</label>
          <Input
          className="w-50"
            type="date"
            value={filters.ToDate?.split("T")[0] || ""}
            onChange={(e) =>
              handleFilterChange(
                "ToDate",
                e.target.value ? new Date(e.target.value).toISOString() : ""
              )
            }
          />
        </div>
      </div>

     
      <DataTable
        headers={tableHeaders}
        data={leaves}
        renderRow={renderLeaveRow}
        isLoading={isLoading}
        emptyMessage="No leaves found"
      />
    </div>
  );
};

export default LeaveManagementDashboard;
