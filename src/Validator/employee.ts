import z from "zod";

export const employeeSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  Email: z.string().email().optional().nullable(),
  contactNumber1: z.string().min(5),
  contactNumber2: z.string().optional().nullable(),
  address: z.string().min(2),
  dateOfJoining: z.string().min(1),
  dateOfBirth: z.string().min(1),
  description: z.string().optional().nullable(),
  deviceUserId: z.coerce.number(),
  isActive: z.boolean().default(true),
  marriedStatus: z.coerce.number(),
  gender: z.coerce.number(),
  designationId: z.string(),
  departmentId: z.string(),
});