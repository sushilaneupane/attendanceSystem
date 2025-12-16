import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leaveEditSchema } from "@/Validator/leave";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ControlledInput } from "@/components/Form/ControlledInput";
import { ControlledSelect } from "@/components/Form/ControlledSelect";
import { LeaveTypeEnum} from "@/types/enum/leave";
export type UpdateLeaveDatas = z.infer<typeof leaveEditSchema>;

interface LeaveEditFormProps {
  defaultValues: UpdateLeaveDatas;
  onSubmit: (data: UpdateLeaveDatas) => void;
  isSubmitting?: boolean;
}

export const LeaveEditForm: FC<LeaveEditFormProps> = ({
  defaultValues,
  onSubmit,
  isSubmitting,
}) => {
  const { control, handleSubmit, formState: { errors } } = useForm<UpdateLeaveDatas>({
    resolver: zodResolver(leaveEditSchema),
    defaultValues,
  });
   console.log("Form errors:", errors);
  console.log("Default values:", defaultValues);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <ControlledInput
        name="leaveReason"
        label="Leave Reason"
        control={control}
        placeholder="Enter leave reason"
        errors={errors}
      />

      <div className="flex gap-2">
        <ControlledInput
          name="dateFrom"
          label="Start Date"
          control={control}
          type="date"
          errors={errors}
        />
        <ControlledInput
          name="dateTo"
          label="End Date"
          control={control}
          type="date"
          errors={errors}
        />
      </div>

      <ControlledSelect
        name="leaveType"
        control={control}
        label="Leave Type"
        placeholder="Select leave type"
        options={Object.entries(LeaveTypeEnum)
          .filter(([_, val]) => typeof val === "number")
          .map(([key, val]) => ({
            label: key.replace("Leave", "").trim(),
            value: val as number,
          }))}
      />

      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit" disabled={isSubmitting} onClick={(e) => {
    console.log("Button clicked!");
  }}
        >
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </div>
    </form>
  );
};
