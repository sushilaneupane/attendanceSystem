import  { useState } from "react";
import { useParams } from "react-router-dom";
import { useDepartmentById } from "../../../hooks/useDepartments";
import {
  useDesignationsByDepartment,
  useAddDesignation,
  useDeleteDesignation,
  useUpdateDesignation,
} from "../../../hooks/useDesignations";
import { DataTable } from "../../../components/table/DataTable";
import { Badge } from "../../../components/ui/badge";
import { ControlledInput } from "../../../components/Form/ControlledInput";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { designationSchema } from "@/Validator/designation";
import z from "zod";

import { DialogBox } from "@/components/Dialogs/Dialogbox";

type DesignationForm = z.infer<typeof designationSchema>;

export default function DepartmentOverviewPage() {
  const { id } = useParams<{ id: string }>();

  const { data: department } = useDepartmentById(id!);
  const {
    data: designations,
    isLoading: isDesigLoading,
    isError,
    refetch,
  } = useDesignationsByDepartment(id!);

  const addDesignationMutation = useAddDesignation();
  const deleteDesignation = useDeleteDesignation();
  const updateDesignationMutation = useUpdateDesignation();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<DesignationForm>({
    resolver: zodResolver(designationSchema),
    defaultValues: { designationName: "" },
  });

  const [isAddOpen, setIsAddOpen] = useState(false);

 
  const onSubmit = (data: DesignationForm) => {
    if (!id) return;

    addDesignationMutation.mutate(
      { departmentId: id, designationName: data.designationName },
      {
        onSuccess: () => {
          toast.success("Designation added successfully!");
          reset();
          refetch();
          setIsAddOpen(false);
        },
        onError: () => toast.error("Failed to add designation"),
      }
    );
  };

  if (!department) return <p>Department not found</p>;

  return (
    <div className="p-4 space-y-6">
    
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <p>Status: {department.isActive ? "Active" : "Inactive"}</p>
        </div>
         <DialogBox
        header="Add Designation"
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
       triggerButtonText={
              <>
                <Plus className="mr-2 h-4 w-4 " />
                Add designation
              </>
            }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-2">
          <ControlledInput
            name="designationName"
            label="Designation Name"
            control={control}
            placeholder="Enter designation name"
            errors={errors}
          />
          <Button type="submit">Save</Button>
        </form>
      </DialogBox>
     
      
      </div>


      {isDesigLoading ? (
        <p>Loading designations...</p>
      ) : isError ? (
        <p>Error fetching designations.</p>
      ) : (
        <DataTable
          headers={["Designation Name", "Status", "Actions"]}
          data={designations || []}
          emptyMessage="No designations found"
          renderRow={(d) => (
            <>
              <TableCell className="px-6 py-4">{d.designationName}</TableCell>
              <TableCell className="px-6 py-4">
                <Badge variant={d.isActive ? "default" : "secondary"}>
                  {d.isActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="px-6 py-4">
                <div className="flex justify-end items-center space-x-3">
                 
                  <DialogBox
                    header="Edit Designation"
                    triggerButtonText={
                      <Edit className="h-4 w-4 cursor-pointer text-blue-600" />
                    }
                  >
                    <form
                      onSubmit={handleSubmit((formData) => {
                        updateDesignationMutation.mutate(
                          {
                            id: d.designationId,
                            data: {
                              designationName: formData.designationName,
                              isActive: d.isActive,
                              departmentId: id!,
                            },
                          },
                          {
                            onSuccess: () => {
                              toast.success("Designation updated!");
                              refetch();
                            },
                            onError: () => toast.error("Failed to update"),
                          }
                        );
                      })}
                      className="space-y-4 p-2"
                    >
                      <ControlledInput
                        name="designationName"
                        label="Designation Name"
                        control={control}
                        placeholder="Enter designation name"
                        errors={errors}
                       
                      />
                      <Button type="submit">Update</Button>
                    </form>
                  </DialogBox>

                
                  <DialogBox
                    header="Confirm Delete"
                    triggerButtonText={
                      <Trash2 className="h-4 w-4 cursor-pointer text-red-600 hover:text-red-800 focus:outline-none" />
                    }
                  >
                    <p className="mt-2 text-sm text-muted-foreground">
                      Are you sure you want to delete “{d.designationName}”?
                    </p>
                    <div className="mt-4 flex justify-end gap-2">
                      <Button variant="outline" onClick={() => {}}>
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          deleteDesignation.mutate(d.designationId, {
                            onSuccess: () => {
                              toast.success("Designation deleted!");
                              refetch();
                            },
                            onError: () =>
                              toast.error("Failed to delete designation"),
                          });
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </DialogBox>
                </div>
              </TableCell>
            </>
          )}
          isLoading={isDesigLoading}
        />
      )}

    
     
    </div>
  );
}
