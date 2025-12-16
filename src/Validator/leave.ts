import z from "zod";

export const leaveEditSchema = z.object({
  leaveReason: z.string().min(1, "Leave reason is required"),
  dateFrom: z.string().min(1, "Start date is required"),
  dateTo: z.string().min(1, "End date is required"),
  leaveType: z.number(),
  status: z.number(),
  leaveApproval: z.boolean().optional(),
  employeeId: z.string(),
  appliedOnDate: z.string()
});