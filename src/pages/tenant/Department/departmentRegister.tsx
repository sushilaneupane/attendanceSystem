import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ControlledInput } from "@/components/Form/ControlledInput";
import { toast } from "sonner";
import { useCreateDepartment } from "@/hooks/useDepartments";

const departmentSchema = z.object({
  name: z.string().min(1, "Department name is required"),
  description: z.string().optional(),
});

type DepartmentFormType = z.infer<typeof departmentSchema>;

export default function DepartmentRegister() {
  const { mutate: createDepartment, isPending } = useCreateDepartment();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DepartmentFormType>({
    resolver: zodResolver(departmentSchema),
  });

  const onSubmit = (data: DepartmentFormType) => {
    createDepartment(
      {
        name: data.name,
        description: data.description || "",
        isActive: true,
      },
      {
        onSuccess: () => {
          toast.success("Department registered successfully!");
          reset();
        },
        onError: () => {
          toast.error("Failed to register department.");
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
      <ControlledInput
        name="name"
        control={control}
        label="Department Name"
        placeholder="Enter department name"
        errors={errors}
      />

      <ControlledInput
        name="description"
        control={control}
        label="Description"
        placeholder="Enter department description"
        errors={errors}
      />

      <Button type="submit" className="w-full" disabled={isPending || isSubmitting}>
        {isPending ? "Submitting..." : "Register"}
      </Button>
    </form>
  );
}
