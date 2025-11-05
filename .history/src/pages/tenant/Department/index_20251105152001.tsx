import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "..";
import { Loader2 } from "lucide-react";

interface Department {
  id: string;
  name: string;
  isActive: boolean;
}

interface ApiResponse {
  success: boolean;
  errorMessage: string;
  detailErrorMessage: string;
  data: Department[];
  statusCode: number;
}

const DepartmentPage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<ApiResponse>("YOUR_API_URL_HERE")
      .then((response) => {
        if (response.data.success) {
          setDepartments(response.data.data);
        } else {
          setError(response.data.errorMessage);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin w-10 h-10 text-blue-500" />
      </div>
    );

  if (error)
    return (
      <div className="text-red-500 text-center mt-10">
        <p>Error: {error}</p>
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Departments</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {departments.map((dept) => (
          <Card key={dept.id} className="border border-gray-200">
            <CardHeader>
              <CardTitle>{dept.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Status:{" "}
                <Badge
                  variant={dept.isActive ? "default" : "destructive"}
                  className="capitalize"
                >
                  {dept.isActive ? "Active" : "Inactive"}
                </Badge>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DepartmentPage;
