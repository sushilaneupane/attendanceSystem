import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useCreateDepartment, useUpdateDepartment } from "@/hooks/useDepartments";
import { Department } from "@/api/departmentApi";
import { ControlledInput } from "@/components/Form/ControlledInput";

const departmentSchema = z.object({
  name: z.string().min(1, "Department name is required"),
});
type DepartmentFormType = z.infer<typeof departmentSchema>;

interface DepartmentRegisterProps {
  isEditing?: boolean;
  defaultValues?: Department | null;
  onSubmitSuccess?: () => void; 
  submitHandler?: (handleSubmit: () => void) => void; 
}

export default function DepartmentRegister({
  isEditing,
  defaultValues = null,
  onSubmitSuccess,
  submitHandler,
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
        { id: defaultValues.id, department: { name: data.name, isActive: defaultValues.isActive, department: "" } },
        {
          onSuccess: () => {
            toast.success("Department updated successfully!");
            reset();
            onSubmitSuccess?.();
          },
          onError: () => {
            toast.error("Failed to update department.");
          },
        }
      );
    } else {
      createDepartment(
        { name: data.name, isActive: true, department: "" },
        {
          onSuccess: () => {
            toast.success("Department registered successfully!");
            reset();
            onSubmitSuccess?.();
          },
          onError: () => {
            toast.error("Failed to register department.");
          },
        }
      );
    }
  };

  useEffect(() => {
    if (submitHandler) {
      submitHandler(handleSubmit(onSubmit));
    }
  }, [submitHandler, handleSubmit]);

  return (
    <div className="space-y-4">
      <ControlledInput
        name="name"
        control={control}
        label="Department Name"
        placeholder="Enter department name"
        errors={errors}
      />
    </div>
  );
}