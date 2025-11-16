import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { ControlledInput } from "@/components/Form/ControlledInput";
import { toast } from "sonner";
import { useCreateDepartment, useUpdateDepartment } from "@/hooks/useDepartments";
import { Department } from "@/api/departmentApi";

const departmentSchema = z.object({
  name: z.string().min(1, "Department name is required"),
});
type DepartmentFormType = z.infer<typeof departmentSchema>;

interface DepartmentRegisterProps {
  isEditing: boolean;
  defaultValues?: Department | null;
  onClose: () => void;
}

export default function DepartmentRegister({
  isEditing,
  defaultValues = null,
  onClose,
}: DepartmentRegisterProps) {
  const { mutate: createDepartment, isPending: isCreating } = useCreateDepartment();
  const { mutate: updateDepartment, isPending: isUpdating } = useUpdateDepartment();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DepartmentFormType>({
    resolver: zodResolver(departmentSchema),
    defaultValues: defaultValues ? { name: defaultValues.name } : undefined,
  });

 
  useEffect(() => {
    if (defaultValues) {
      reset({ name: defaultValues.name });
    }
  }, [defaultValues, reset]);

  const onSubmit = (data: DepartmentFormType) => {
    if (isEditing && defaultValues) {
    
      updateDepartment(
        { id: defaultValues.id, department: {
          name: data.name, isActive: defaultValues.isActive,
          department: ""
        } },
        {
          onSuccess: () => {
            toast.success("Department updated successfully!");
            onClose();
          },
          onError: () => {
            toast.error("Failed to update department.");
          },
        }
      );
    } else {
      createDepartment(
        {
          name: data.name, isActive: true,
          department: ""
        },
        {
          onSuccess: () => {
            toast.success("Department registered successfully!");
            reset();
            onClose();
          },
          onError: () => {
            toast.error("Failed to register department.");
          },
        }
      );
    }
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

      <Button type="submit" className="w-full" disabled={isCreating || isUpdating || isSubmitting}>
        {(isCreating || isUpdating) ? "Submitting..." : isEditing ? "Update" : "Register"}
      </Button>
    </form>
  );
}
