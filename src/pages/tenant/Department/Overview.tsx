import { useState } from "react";
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
import { TableCell, TableRow } from "@/components/ui/table";
import { designationSchema } from "@/Validator/designation";
import z from "zod";
import { DialogBox } from "@/components/Dialogs/Dialogbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type DesignationForm = z.infer<typeof designationSchema>;

export default function DepartmentOverviewPage() {
  const { id } = useParams<{ id: string }>();

  const { data: department } = useDepartmentById(id!);

  const {
    data: designations,
    isLoading: isDesigLoading,
    refetch,
  } = useDesignationsByDepartment(id!);

  const addDesignationMutation = useAddDesignation();
  const deleteDesignation = useDeleteDesignation();
  const updateDesignationMutation = useUpdateDesignation();
  const [openDeleteId, setOpenDeleteId] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DesignationForm>({
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
        <h1 className="font-bold text-3xl">
          Welcome to {department.data.name}
        </h1>

        <DialogBox
          header="Add Designation"
          open={isAddOpen}
          onOpenChange={(open) => {
            setIsAddOpen(open);
            if (open) reset({ designationName: "" });
          }}
          triggerButtonText={
            <Button variant="default" className="bg-blue-800 text-white ">
              <Plus className="mr-2 h-4 w-4" />
              <span> Add designation</span>
             
            </Button>
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
            <Button type="submit" className="ml-50">
              Save
            </Button>
          </form>
        </DialogBox>
      </div>

   
      <DataTable
        headers={["Designation Name", "Status", "Actions"]}
        data={designations || []}
        emptyMessage="No designations found"
        isLoading={isDesigLoading}
        renderRow={(d) => {
         
          const [isActive, setIsActive] = useState(d.isActive);

          return (
            <TableRow key={d.designationId}>
              <TableCell className="px-6 ">{d.designationName}</TableCell>

             
              <TableCell className="px-6 ">
                <Badge
                  className={
                    d.isActive
                      ? "bg-green-200 text-green-700"
                      : "bg-red-200 text-red-700"
                  }
                >
                  {d.isActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>

              <TableCell className="px-6 ">
                <div className="flex justify-end items-center space-x-3">
                  
                  <DialogBox
                    header="Edit Designation"
                    triggerButtonText={
                      <Edit className="h-4 w-4 cursor-pointer text-blue-600" />
                    }
                    onOpenChange={(open) => {
                      if (open) {
                        reset({ designationName: d.designationName });
                        setIsActive(d.isActive);
                      }
                    }}
                  >
                    <form
                      onSubmit={handleSubmit((formData) => {
                        updateDesignationMutation.mutate(
                          {
                            id: d.designationId,
                            data: {
                              designationName: formData.designationName,
                              isActive: isActive,
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

                     
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <Switch
                            id={`active-status-${d.designationId}`}
                            checked={isActive}
                            onCheckedChange={setIsActive}
                           className="relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out 
      data-[state=checked]:bg-green-500
      data-[state=unchecked]:bg-red-500"
                          >
                             
                          </Switch>
                        </div>
                        <Label htmlFor={`active-status-${d.designationId}`}>
                          {isActive ? "Active" : "Inactive"}
                        </Label>
                      </div>

                      <Button type="submit" className="ml-50">
                        Update
                      </Button>
                    </form>
                  </DialogBox>

                
                  <DialogBox
                    header="Confirm Delete"
                    open={openDeleteId === d.designationId}
                    onOpenChange={(state) => {
                      if (!state) setOpenDeleteId(null);
                      else setOpenDeleteId(d.designationId);
                    }}
                    triggerButtonText={
                      <Trash2 className="h-4 w-4 cursor-pointer text-red-600 hover:text-red-800" />
                    }
                  >
                    <p className="mt-2 text-sm text-muted-foreground">
                      Are you sure you want to delete “{d.designationName}”?
                    </p>

                    <div className="mt-4 flex justify-end gap-2">
                      <Button
                        variant="destructive"
                        onClick={() => {
                          deleteDesignation.mutate(d.designationId, {
                            onSuccess: () => {
                              toast.success("Designation deleted!");
                              refetch();
                              setOpenDeleteId(null);
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
            </TableRow>
          );
        }}
      />
    </div>
  );
}