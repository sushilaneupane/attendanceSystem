import { useParams, useNavigate, data } from "react-router-dom";
import { useDepartmentById } from "../../../hooks/useDepartments";
import { Button } from "../../../components/ui/button";

export default function DepartmentOverviewPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { data: department, isLoading } = useDepartmentById(id!);  

  if (isLoading) return <p>Loading...</p>;
  if (!department) return <p>Department not found</p>;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">{department.name}</h1>
      <p>ID: {department.id}</p>
      <p>name: {department.name}</p>
      <p>Status: {department.isActive ? "Active" : "Inactive"}</p>

      {department.description && <p>Description: {department.description}</p>}

    </div>
  );
}