import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useCreateDepartment, useUpdateDepartment } from "@/hooks/useDepartments";
import { Department } from "@/types/department";
import { ControlledInput } from "@/components/Form/ControlledInput";

const departmentSchema = z.object({
  name: z.string().min(1, "Department name is required"),
});

type DepartmentFormType = z.infer<typeof departmentSchema>;

interface DepartmentRegisterProps {
  isEditing?: boolean;
  defaultValues?: Department | null;
  onSubmitSuccess?: () => void;
}

export default function DepartmentRegister({
  isEditing,
  defaultValues = null,
  onSubmitSuccess,
}: DepartmentRegisterProps) {
  const { mutate: createDepartment } = useCreateDepartment();
  const { mutate: updateDepartment } = useUpdateDepartment();

  const [isActive, setIsActive] = useState(defaultValues?.isActive ?? true);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DepartmentFormType>({
    resolver: zodResolver(departmentSchema),
    defaultValues: defaultValues ? { name: defaultValues.name } : undefined,
  });

  useEffect(() => {
    if (defaultValues) {
      reset({ name: defaultValues.name });
      setIsActive(defaultValues.isActive ?? true);
    }
  }, [defaultValues, reset]);

  const onSubmit = (data: DepartmentFormType) => {
    const payload = {
      ...data,
      isActive,
      department: "",
    };

    if (isEditing && defaultValues) {
      updateDepartment(
        { id: defaultValues.id, department: payload },
        {
          onSuccess: () => {
            toast.success("Department updated successfully!");
            reset();
            onSubmitSuccess?.();
          },
          onError: () => toast.error("Failed to update department."),
        }
      );
    } else {
      createDepartment(payload, {
        onSuccess: () => {
          toast.success("Department registered successfully!");
          reset();
          setIsActive(true);
          onSubmitSuccess?.();
        },
        onError: () => toast.error("Failed to register department."),
      });
    }
  };

  return (
    <form id="department-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <ControlledInput
        name="name"
        control={control}
        label="Department Name"
        placeholder="Enter department name"
        errors={errors}
      />

      <div className="flex items-center space-x-2 mt-2">
        <Switch
          id="active-status"
          checked={isActive}
          onCheckedChange={setIsActive}
          className="relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out 
          data-[state=checked]:bg-green-500
          data-[state=unchecked]:bg-red-500"
        />
        <Label htmlFor="active-status">{isActive ? "Active" : "Inactive"}</Label>
      </div>
    </form>
  );
}
