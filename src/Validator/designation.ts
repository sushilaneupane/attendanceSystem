import * as z from "zod";
export const designationSchema = z.object({
  designationName: z
    .string()
    .min(2, "Designation name must be at least 2 characters")
    .max(50, "Designation name cannot exceed 50 characters")
    .trim(),
});