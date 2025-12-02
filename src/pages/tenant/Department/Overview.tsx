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
import { Designation, DesignationRowProps } from "@/types/designation";

type DesignationForm = z.infer<typeof designationSchema>;

function DesignationRow({
  designation,
  departmentId,
  onEdit,
  onDelete,
}: DesignationRowProps) {
  const [isActive, setIsActive] = useState<boolean>(designation.isActive);
  const [openDeleteId, setOpenDeleteId] = useState<string | null>(null);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false); 

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DesignationForm>({
    resolver: zodResolver(designationSchema),
    defaultValues: { designationName: designation.designationName },
  });

  const updateDesignationMutation = useUpdateDesignation();
  const deleteDesignationMutation = useDeleteDesignation();

  const handleEditSubmit = (formData: DesignationForm) => {
    updateDesignationMutation.mutate(
      {
        id: designation.designationId,
        data: {
          designationName: formData.designationName,
          isActive: isActive,
          departmentId: departmentId,
          designationId: designation.designationId,
        },
      },
      {
        onSuccess: () => {
          toast.success("Designation updated!");
          onEdit();
          setIsEditOpen(false);

        },
        onError: () => toast.error("Failed to update designation"),
      }
    );
  };

  const handleDelete = () => {
    deleteDesignationMutation.mutate(designation.designationId, {
      onSuccess: () => {
        toast.success("Designation deleted!");
        onDelete();
        setOpenDeleteId(null);
      },
      onError: () => toast.error("Failed to delete designation"),
    });
  };

  return (
    <TableRow key={designation.designationId}>
      <TableCell className="px-6">{designation.designationName}</TableCell>

      <TableCell className="px-6">
        <Badge
          variant="secondary"
          className={
            designation.isActive
              ? "bg-green-200 text-green-700"
              : "bg-red-200 text-red-700"
          }
        >
          {designation.isActive ? "Active" : "Inactive"}
        </Badge>
      </TableCell>

      <TableCell className="px-6">
        <div className="flex justify-end items-center space-x-3">
          <DialogBox
             open={isEditOpen}
            variant="default"
            header="Edit Designation"
            onOpenChange={(open) => {
              setIsEditOpen(open);
              if (open) {
                reset({ designationName: designation.designationName });
                setIsActive(designation.isActive);
              }
            }}
             triggerButtonText={
              <Edit className="h-4 w-4 cursor-pointer text-blue-600" />
            }
          >
            <form
              onSubmit={handleSubmit(handleEditSubmit)}
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
                    id={`active-status-${designation.designationId}`}
                    checked={isActive}
                    onCheckedChange={setIsActive}
                    className="relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out 
                      data-[state=checked]:bg-green-500
                      data-[state=unchecked]:bg-red-500"
                  />
                </div>
                <Label htmlFor={`active-status-${designation.designationId}`}>
                  {isActive ? "Active" : "Inactive"}
                </Label>
              </div>

              <div className="flex justify-center gap-2 pt-4">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  disabled={updateDesignationMutation.isPending}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={updateDesignationMutation.isPending}
                >
                  {updateDesignationMutation.isPending
                    ? "Updating..."
                    : "Update"}
                </Button>
              </div>
            </form>
          </DialogBox>

          <DialogBox
            variant="destructive"
            header="Confirm Delete"
            open={openDeleteId === designation.designationId}
            onOpenChange={(state: boolean) => {
              if (!state) setOpenDeleteId(null);
              else setOpenDeleteId(designation.designationId);
            }}
            triggerButtonText={
              <Trash2 className="h-4 w-4 cursor-pointer text-red-600 hover:text-red-800" />
            }
          >
            <p className="mt-2 text-sm text-muted-foreground">
              Are you sure you want to delete &ldquo;
              {designation.designationName}&rdquo;?
            </p>

            <div className="mt-4 flex justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => setOpenDeleteId(null)}
                disabled={deleteDesignationMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={deleteDesignationMutation.isPending}
              >
                {deleteDesignationMutation.isPending ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </DialogBox>
        </div>
      </TableCell>
    </TableRow>
  );
}
export default function DepartmentOverviewPage() {
  const { id } = useParams<{ id: string }>();

  const { data: department } = useDepartmentById(id!);
  const {
    data: designations,
    isLoading: isDesigLoading,
    refetch,
  } = useDesignationsByDepartment(id!);

  const addDesignationMutation = useAddDesignation();
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);

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
        onError: (error: Error) => {
          toast.error("Failed to add designation");
          console.error("Add designation error:", error);
        },
      }
    );
  };

  
  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <h1 className="font-bold text-3xl">
         Manage Designation
        </h1>

        <DialogBox
          variant="default"
          header="Add Designation"
          open={isAddOpen}
          onOpenChange={(open: boolean) => {
            setIsAddOpen(open);
            if (open) reset({ designationName: "" });
          }}
          triggerButtonText={
            <Button variant="default" className="bg-blue-800 text-white">
              <Plus className="mr-2 h-4 w-4" />
              <span>Add designation</span>
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

            <div className="mt-4 flex justify-center gap-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => setIsAddOpen(false)}
                disabled={addDesignationMutation.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={addDesignationMutation.isPending}>
                {addDesignationMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </DialogBox>
      </div>

      <DataTable
        headers={["Designation Name", "Status", "Actions"]}
        data={designations || []}
        emptyMessage="No designations found"
        isLoading={isDesigLoading}
        renderRow={(designation: Designation) => (
          <DesignationRow
            key={designation.designationId}
            designation={designation}
            departmentId={id!}
            onEdit={refetch}
            onDelete={refetch}
          />
        )}
      />
    </div>
  );
}
