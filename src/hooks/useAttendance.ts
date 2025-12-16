import { useQuery } from "@tanstack/react-query";
import { getAttendance } from "@/api/attendance";
import { Attendance } from "@/types/attendance";

export const useAttendance = () => {
  return useQuery({
    queryKey: ["attendance"],
    queryFn: getAttendance,
    select: (response) => response.data,
  });
};
