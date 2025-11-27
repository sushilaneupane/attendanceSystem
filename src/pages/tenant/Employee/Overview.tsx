import { useParams } from "react-router-dom";
import { useEmployeeById } from "@/hooks/useEmployee";
import { GenderEnum } from "@/types/enum/gender";
import { marriedStatusEnum } from "@/types/enum/marriedStatus";

export function EmployeeOverview() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useEmployeeById(id);
  if (isLoading) return <p className="p-6 text-center">Loading...</p>;
  if (isError || !data?.data) return <p className="p-6 text-center">Employee not found!</p>;
  const emp = data.data;
  const DEFAULT_AVATAR = "/avatar.png";

  return (
    <div className="w-full max-w-6xl mx-auto shadow-lg rounded-lg overflow-hidden bg-white flex flex-col md:flex-row mt-8">
      <div className="md:w-1/3 text-white flex flex-col items-center h-[600px] justify-center">
        {emp.imageUrl ? (
          <img
            src={
              emp?.imageUrl
                ? `${(import.meta as any).env.VITE_IMAGE_URL}/${emp.imageUrl.replace(/\\/g, "/")}`
                : DEFAULT_AVATAR
            }
            alt={emp.firstName}
            className="rounded-lg object-cover w-full h-full max-h-[600px]"

          />
        ) : (
          <div className="w-full h-full max-h-[500px] bg-gray-300 rounded-lg flex items-center justify-center text-6xl font-bold">
            {emp.firstName?.[0]}
          </div>
        )}
      </div>


      <div className="md:w-1/3 p-6">
        <h2 className="text-xl font-bold text-[#93C5FD] mb-3">
          {emp.firstName} {emp.lastName}
        </h2>

        <ul className="space-y-3 mb-6">
          <li className="flex items-center gap-3">
            <span className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-full text-sm"> 1</span>
            <p> <span className="font-semibold">Age: </span>{
              emp.dateOfBirth
                ? Math.floor(
                  (new Date().getTime() - new Date(emp.dateOfBirth).getTime()) /
                  (1000 * 60 * 60 * 24 * 365.25)
                )
                : "N/A"
            }</p>
          </li>
          <li className="flex items-center gap-3">
            <span className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-full text-sm"> 2</span>
            <p> <span className="font-semibold"> Gender:</span>  {emp.gender && GenderEnum[emp.gender]}</p>
          </li>
          <li className="flex items-center gap-3">
            <span className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-full text-sm"> 3 </span>
            <p> <span className="font-semibold">
              Married Status: </span> {emp.marriedStatus && marriedStatusEnum[emp.marriedStatus]}
            </p>
          </li>
          <li className="flex items-center gap-3">
            <span className="w-8 h-8 bg-black text-white flex items-center justify-center rounded-full text-sm"> 4</span>
            <p> <span className="font-semibold">
              Joining Date: </span>{emp.dateOfJoining?.slice(0, 10) || "N/A"}
            </p>
          </li>
        </ul>
        <h3 className="text-xl font-bold text-[#93C5FD] mb-3">About Employee</h3>
        <p><span className="text-sm text-gray-600 leading-relaxed"> </span>
          {emp.description}
        </p>
      </div>
      <div className="md:w-1/3 p-6 bg-gray-50 border-l border-gray-200 flex flex-col justify-between">
        <div >
          <h2 className="text-xl font-bold text-[#93C5FD] mb-3"> Position & Device</h2>
          <p><span className="font-semibold">Department: </span> {emp.designationName || "N/A"}</p>
          <p><span className="font-semibold">Position: </span> {emp.designationName || "N/A"}</p>
          <p><span className="font-semibold">Device Name:</span> {emp.deviceUserId || "N/A"}</p>

          <h2 className="text-xl font-bold text-[#93C5FD] mb-3 mt-10">Contact</h2>
          <p><span className="font-semibold">Mobile:</span> {emp.contactNumber1 || "N/A"}</p>
          {emp.contactNumber2 && (
            <p><span className="font-semibold">Phone:</span> {emp.contactNumber2}</p>
          )}
          {emp.address && (
            <p><span className="font-semibold">Address:</span> {emp.address}</p>
          )}
        </div>
        <div className="mt-10 bg-[#93C5FD] text-white p-4 rounded-lg text-center">
          {emp.address && (
            <p><span className="font-semibold">Email:</span> {emp.email}</p>
          )}
        </div>
      </div>
    </div>
  );
}
