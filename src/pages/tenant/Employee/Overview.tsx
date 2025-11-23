import { useParams } from "react-router-dom";
import { useEmployeeById } from "@/hooks/useEmployee";

export function EmployeeOverview() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useEmployeeById(id);
  if (isLoading) return <p className="p-6 text-center">Loading...</p>;
  if (isError || !data?.data) return <p className="p-6 text-center">Employee not found!</p>;
  const emp = data.data;
  const genderMap: Record<number, string> = {
    1: "Male",
    2: "Female",
  };

  const marriedStatusMap: Record<number, string> = {
    1: "Single",
    2: "Married",
  };


  return (
    // <div className="flex items-center justify-center p-6 bg-green-400 h-[700px]">
    <div className="bg-gray-800 shadow-lg rounded-lg w-full max-w-6xl flex flex-col md:flex-row overflow-hidden h-[690px] ">
      <div className="md:w-1/3 bg-pink-100 flex items-center justify-center p-4 ">
        {emp.imageUrl ? (
          <img
            src={emp.imageUrl.replace(/\\/g, "/")}
            alt={emp.firstName}
            className="rounded-lg object-cover w-64 h-64"
          />
        ) : (
          <div className="w-64 h-64 flex items-center justify-center bg-gray-300 rounded-lg text-3xl font-bold">
            {emp.firstName[0]}
          </div>
        )}
      </div>
      <div className="md:w-1/3 p-6 flex flex-col justify-center">
        <p className="text-2xl font-bold mb-4">{emp.firstName} {emp.lastName}</p>
        <p>
          <span className="font-semibold">Age:</span>{" "}
          {emp.dateOfBirth
            ? Math.floor(
              (new Date().getTime() - new Date(emp.dateOfBirth).getTime()) /
              (1000 * 60 * 60 * 24 * 365.25)
            )
            : "N/A"}
        </p>


        <p>
          <span className="font-semibold">Gender</span>{" "}
          {emp.gender ? genderMap[Number(emp.gender)] : "N/A"}
        </p>
        <p>
          <span className="font-semibold">Married Status</span>{" "}
          {emp.marriedStatus ? marriedStatusMap[Number(emp.marriedStatus)] : "N/A"}
        </p>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Contact & Address</h3>
          <p><span className="font-semibold">Email</span> {emp.email || "N/A"}</p>
          <p><span className="font-semibold">Mobile </span> {emp.contactNumber1 || "N/A"}</p>
          {emp.contactNumber2 && <p><span className="font-semibold">Phone </span> {emp.contactNumber2}</p>}
          {emp.address && <p><span className="font-semibold">Address</span> {emp.address}</p>}
        </div>
      </div>
      <div className="md:w-1/3 p-6 border-l border-gray-200 flex flex-col justify-center">
        <h3 className="font-semibold mb-2">Position & Device</h3>
        <p><span className="font-semibold">Department:</span> {emp.designationName || "N/A"}</p>
        <p><span className="font-semibold">Position:</span> {emp.designationName || "N/A"}</p>
        <p>
          <span className="font-semibold">Joining Date</span>{" "}
          {emp.dateOfJoining ? emp.dateOfJoining.slice(0, 10) : "N/A"}
        </p>
        <p><span className="font-semibold">Device Name</span> {emp.deviceUserId || "N/A"}</p>

        <h3 className="font-semibold mt-4 mb-2">Description</h3>
        <p className="text-sm text-gray-700">{emp.description || "N/A"}</p>
      </div>
    </div>
    // </div>
  );
}






