import React from "react";
import { useParams } from "react-router-dom";
import { useDepartmentById } from "../../../hooks/useDepartments";
import { useDesignationsByDepartment, useAddDesignation } from "../../../hooks/useDesignations";
import { DataTable } from "../../../components/table/DataTable";
import { Badge } from "../../../components/ui/badge";
import { DialogBox } from "../../../components/Dialogs/Dialogbox";
import { ControlledInput } from "../../../components/Form/ControlledInput";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";


const designationSchema = z.object({
  designationName: z
    .string()
    .min(2, "Designation name must be at least 2 characters")
    .max(50, "Designation name cannot exceed 50 characters")
    .trim(),
});

type DesignationForm = z.infer<typeof designationSchema>;

export default function DepartmentOverviewPage() {
  const { id } = useParams<{ id: string }>();

  const { data: department, isLoading: isDeptLoading } = useDepartmentById(id!);
  const { data: designations, isLoading: isDesigLoading, isError, refetch } = useDesignationsByDepartment(id!);

  const addDesignationMutation = useAddDesignation();

  const { control, handleSubmit, reset, formState: { errors } } = useForm<DesignationForm>({
    resolver: zodResolver(designationSchema),
    defaultValues: { designationName: "" },
  });

  const onSubmit = (data: DesignationForm) => {
    if (!id) return;

    addDesignationMutation.mutate(
      { departmentId: id, designationName: data.designationName },
      {
        onSuccess: () => {
          toast.success("Designation added successfully!");
          reset();
          refetch();
        },
        onError: () => toast.error("Failed to add designation"),
      }
    );
  };

  if (isDeptLoading) return <p>Loading department...</p>;
  if (!department) return <p>Department not found</p>;

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
   
      <div>
        <h1 className="text-2xl font-bold">Welcome to the {department.data.name}</h1>
       
        <p>Status: {department.data.isActive ? "Active" : "Inactive"}</p>
      
      </div>

       <Button >
            <Plus className="mr-1" /> Add Designation
       </Button>
      </div>

      
      {isDesigLoading ? (
        <p>Loading designations...</p>
      ) : isError ? (
        <p>Error fetching designations.</p>
      ) : (
        <DataTable
          headers={["Designation Name", "Status","Actions"]}
          data={designations || []}
          renderRow={(d) => (
            <>
              <td className="px-6 py-4">{d.designationName}</td>
              <td className="px-6 py-4">
                <Badge variant={d.isActive ? "default" : "secondary"}>
                  {d.isActive ? "Active" : "Inactive"}
                </Badge>
              </td>
            </>
          )}
          emptyMessage="No designations found"
        />
      )}
    </div>
  );
}
