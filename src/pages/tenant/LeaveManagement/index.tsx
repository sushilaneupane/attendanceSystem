import { useState } from "react";
import {
  Calendar,
  Clock1,
  CheckCircle,
  XCircle,
  Trash2,
  Check,
  X,
  MoreHorizontal,
} from "lucide-react";
import { useDeleteLeave, useLeaves, useUpdateLeave } from "@/hooks/useLeave";
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
import { DialogBox } from "@/components/Dialogs/Dialogbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LeaveManagementDashboard = () => {
  const [filters, setFilters] = useState({
    FromDate: "",
    ToDate: "",
    Name: "",
  });

  const [openDeleteId, setOpenDeleteId] = useState<string | null>(null);
  const [openApprovalId, setOpenApprovalId] = useState<string | null>(null);
  const [approvalAction, setApprovalAction] = useState<"approve" | "reject" | null>(null);
  const [currentLeave, setCurrentLeave] = useState<Leave | null>(null);

  const params = Object.fromEntries(
    Object.entries(filters).filter(([, value]) => value !== "")
  );

  const { data: leavesResponse, isLoading, refetch } = useLeaves(params);
  const leaves = leavesResponse?.data || [];

  const stats: LeaveStats = {
    total: leaves.length,
    pending: leaves.filter((l) => l.status === StatusEnum.Pending).length,
    approved: leaves.filter((l) => l.status === StatusEnum.Approved).length,
    rejected: leaves.filter((l) => l.status === StatusEnum.Rejected).length,
  };

  const updateLeaveMutation = useUpdateLeave();
  const deleteLeaveMutation = useDeleteLeave();

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case StatusEnum.Approved:
        return "text-green-600";
      case StatusEnum.Pending:
        return "text-yellow-600";
      case StatusEnum.Rejected:
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusText = (status: number) => {
    switch (status) {
      case StatusEnum.Approved:
        return "✅ Approved";
      case StatusEnum.Pending:
        return "⏳ Pending";
      case StatusEnum.Rejected:
        return "❌ Rejected";
      default:
        return "Unknown";
    }
  };

  const handleApprovalAction = (action: "approve" | "reject") => {
    if (!currentLeave) {
      console.error("No current leave selected");
      return;
    }

    // Map action to StatusEnum
    const newStatus = action === "approve" ? StatusEnum.Approved : StatusEnum.Rejected;
    
    updateLeaveMutation.mutate(
      {
        id: currentLeave.id,
        data: {
          status: newStatus,
        },
      },
      {
        onSuccess: () => {
          toast.success(`Leave ${action === "approve" ? "approved" : "rejected"} successfully`);
          setOpenApprovalId(null);
          setApprovalAction(null);
          setCurrentLeave(null);
          refetch();
        },
        onError: (error) => {
          console.error("Error updating leave:", error);
          toast.error(`Failed to ${action} leave`);
        },
      }
    );
  };

  const handleDeleteLeave = (leaveId: string) => {
    deleteLeaveMutation.mutate(leaveId, {
      onSuccess: () => {
        toast.success("Leave deleted successfully");
        setOpenDeleteId(null);
        refetch();
      },
      onError: () => toast.error("Failed to delete leave"),
    });
  };

  const tableHeaders = [
    "SN",
    "Employee",
    "Leave Type",
    "Dates",
    "Reason",
    "Applied Date",
    " Status",
    "Actions",
  ];

  const renderLeaveRow = (leave: Leave, index: number) => {
    const fromDate = new Date(leave.dateFrom);
    const toDate = new Date(leave.dateTo);
    const appliedDate = new Date(leave.appliedOnDate);

    return (
      <>
        <TableRow key={leave.id} className="hover:bg-gray-50">
          <TableCell className="px-6 py-4 font-medium text-gray-900">
            {index + 1}
          </TableCell>
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

          <TableCell className="px-6 py-4 text-gray-600">
            {appliedDate.toLocaleDateString()}
          </TableCell>

          <TableCell className="px-6 py-4">
            <span className={`font-medium ${getStatusColor(leave.status)}`}>
              {getStatusText(leave.status)}
            </span>
          </TableCell>

          <TableCell className="px-6 py-4 text-right">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    setCurrentLeave(leave);
                    setOpenApprovalId(leave.id);
                    setApprovalAction("approve");
                  }}
                  className="cursor-pointer text-green-600 focus:text-green-700 focus:bg-green-50"
                >
                  <Check className="mr-2 h-4 w-4" />
                  Approve
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setCurrentLeave(leave);
                    setOpenApprovalId(leave.id);
                    setApprovalAction("reject");
                  }}
                  className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50"
                >
                  <X className="mr-2 h-4 w-4" />
                  Reject
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setOpenDeleteId(leave.id)}
                  className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TableCell>
        </TableRow>

        {openApprovalId === leave.id && approvalAction === "approve" && (
          <DialogBox
            variant="default"
            open={true}
            onOpenChange={(open: boolean) => {
              if (!open) {
                setOpenApprovalId(null);
                setApprovalAction(null);
                setCurrentLeave(null);
              }
            }}
            header="Approve Leave"
            triggerButtonText={null}
          >
            <p>
              Are you sure you want to approve this leave request for{" "}
              <strong>{leave.employeeName}</strong>?
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setOpenApprovalId(null);
                  setApprovalAction(null);
                  setCurrentLeave(null);
                }}
                disabled={updateLeaveMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleApprovalAction("approve")}
                disabled={updateLeaveMutation.isPending}
              >
                {updateLeaveMutation.isPending ? "Approving..." : "Approve"}
              </Button>
            </div>
          </DialogBox>
        )}

        {openApprovalId === leave.id && approvalAction === "reject" && (
          <DialogBox
            variant="destructive"
            open={true}
            onOpenChange={(open: boolean) => {
              if (!open) {
                setOpenApprovalId(null);
                setApprovalAction(null);
                setCurrentLeave(null);
              }
            }}
            header="Reject Leave"
            triggerButtonText={null}
          >
            <p>
              Are you sure you want to reject this leave request for{" "}
              <strong>{leave.employeeName}</strong>?
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setOpenApprovalId(null);
                  setApprovalAction(null);
                  setCurrentLeave(null);
                }}
                disabled={updateLeaveMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleApprovalAction("reject")}
                disabled={updateLeaveMutation.isPending}
              >
                {updateLeaveMutation.isPending ? "Rejecting..." : "Reject"}
              </Button>
            </div>
          </DialogBox>
        )}

        {openDeleteId === leave.id && (
          <DialogBox
            variant="destructive"
            header="Confirm Delete"
            open={true}
            onOpenChange={(open: boolean) => {
              if (!open) {
                setOpenDeleteId(null);
              }
            }}
            triggerButtonText={null}
          >
            <p>Are you sure you want to delete this leave?</p>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setOpenDeleteId(null)}
                disabled={deleteLeaveMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDeleteLeave(leave.id)}
                disabled={deleteLeaveMutation.isPending}
              >
                {deleteLeaveMutation.isPending ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </DialogBox>
        )}
      </>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-slate-800 flex items-center gap-2 mb-6">
            <Calendar className="w-8 h-8 text-blue-600" /> Leave Management
          </h1>
          <p className="mt-0.5">
            Manage employees, departments, and leave requests with ease. Track
            balances and approvals at a glance.
          </p>
        </div>

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
        <div className="flex-1 w-2xs">
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