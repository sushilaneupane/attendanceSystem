import { useParams } from "react-router-dom";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Plus } from "lucide-react";
import { useDesignationsByDepartment } from "../../../../hooks/useDesignations";
import { DialogBox } from "@/components/Dialogs/Dialogbox";
import { ControlledInput } from "../../../../components/Form/ControlledInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useAddDesignation } from "../../../../hooks/useDesignations";
import { Button } from "@/components/ui/button";


const addDesignationSchema = z.object({
  designationName: z
    .string()
    .min(2, "Designation name must be at least 2 characters")
    .max(50, "Designation name cannot exceed 50 characters")
    .trim(),
});

type AddDesignationForm = z.infer<typeof addDesignationSchema>;

export default function DesignationPage() {
  const { departmentId } = useParams<{ departmentId: string }>();
  const { data: designations, isLoading, isError, refetch } = useDesignationsByDepartment(departmentId!);

  const addDesignationMutation = useAddDesignation();

  const { control, handleSubmit, reset, formState: { errors } } = useForm<AddDesignationForm>({
    resolver: zodResolver(addDesignationSchema),
    defaultValues: { designationName: "" },
  });

  const onSubmit = (data: AddDesignationForm) => {
    if (!departmentId) return;

    addDesignationMutation.mutate(
      { departmentId, designationName: data.designationName },
      {
        onSuccess: () => {
          toast.success("Designation added successfully!");
          reset();     
          refetch();   
        },
        onError: (error: any) => {
          console.error(error);
          toast.error("Failed to add designation");
        },
      }
    );
  };

  if (isLoading) return <p>Loading designations...</p>;
  if (isError) return <p>Error fetching designations.</p>;

  return (
    <div className="p-4">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Designations</CardTitle>

          <DialogBox
            triggerButtonText={
              <>
                <Plus className="mr-1" /> Add Designation
              </>
            }
            header="Add Designation"
            children={
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <ControlledInput
                  name="designationName"
                  label="Designation Name"
                  control={control}
                  placeholder="Enter designation name"
                  errors={errors}
                />
                <Button type="submit">
                    Add 
                </Button>
               
            
              </form>
            }
          />
        </CardHeader>

        <CardContent>
          {designations && designations.length > 0 ? (
            <ul>
              {designations.map((d) => (
                <li
                  key={d.designationId}
                  className="flex justify-between items-center p-2 border-b hover:bg-gray-50"
                >
                  <span>{d.designationName}</span>
                  <Badge variant={d.isActive ? "default" : "secondary"}>
                    {d.isActive ? "Active" : "Inactive"}
                  </Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p>No designations found for this department.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
