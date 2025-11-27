import { z } from "zod";
import { GenderEnum } from "@/types/enum/gender";
import { marriedStatusEnum } from "@/types/enum/marriedStatus";

export const employeeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),

  Email: z.string().email("Invalid email format"),

  contactNumber1: z.string().min(5, "Primary contact is required"),
  contactNumber2: z.string().optional().nullable(),

  address: z.string().min(2, "Address is required"),

  dateOfJoining: z.string().min(1, "Joining date required"),
  dateOfBirth: z.string().min(1, "Birthdate required"),

  description: z.string().optional().nullable(),

  deviceUserId: z.coerce.number(),

  isActive: z.boolean().default(true),

  gender: z.nativeEnum(GenderEnum),

  marriedStatus: z.nativeEnum(marriedStatusEnum),

  designationId: z.string(),
  departmentId: z.string(),

  Password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 6, {
      message: "Password must be at least 6 characters",
    }),
});

export type EmployeeFormValues = z.infer<typeof employeeSchema>;
