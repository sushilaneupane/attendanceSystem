
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCreateDepartment } from "@/hooks/useDepartments";

export default function DepartmentForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const { mutate: createDepartment, isPending } = useCreateDepartment();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    createDepartment(
      {
        name,
        description,
        isActive: true,
      },
      {
        onSuccess: () => {
          setMessage("Department registered successfully!");
          setIsError(false);
          setName("");
          setDescription("");
        },
        onError: () => {
          setMessage("Failed to register department");
          setIsError(true);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Department Name</Label>
        <Input
          id="name"
          placeholder="Enter department name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          placeholder="Enter department description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {message && (
        <p className={`text-sm ${isError ? "text-red-500" : "text-green-600"}`}>
          {message}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Submitting..." : "Register"}
      </Button>
    </form>
  );
}
