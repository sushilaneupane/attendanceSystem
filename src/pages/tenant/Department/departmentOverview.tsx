import { useParams, useNavigate, data } from "react-router-dom";
import { useDepartmentById } from "../../../hooks/useDepartments";

export default function DepartmentOverviewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: department, isLoading } = useDepartmentById(id!);  
  if (isLoading) return <p>Loading...</p>;
  if (!department) return <p>Department not found</p>;

  return (
   <div className="flex justify-between items-center">
  <p className="font-medium">Wellcome to the {department.data.name}</p>

  <p className="text-sm px-2 py-1 rounded bg-gray-200">
    {department.data.isActive ? "Active" : "Inactive"}
  </p>
</div>

  );
}