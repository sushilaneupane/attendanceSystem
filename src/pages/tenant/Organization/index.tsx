import React, { useState } from "react";
import { DataTable } from "@/components/table/DataTable";
import {
  useOrganizations,

  useUpdateOrganization,
} from "@/hooks/useOrganization";
import { Organization, OrganizationFormValues } from "@/types/organization";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DialogBox } from "@/components/Dialogs/Dialogbox";
import { Edit, ChevronDown, ChevronRight, ExternalLink } from "lucide-react";
import { OrganizationForm } from "./register";
import { toast } from "sonner";

export const OrganizationsPage: React.FC = () => {
  const {
    data: organizations = [],
    isLoading,
    refetch,
  } = useOrganizations();
 
  const updateOrganizationMutation = useUpdateOrganization();
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  
  const toggleExpand = (id: string) => {
    const copy = new Set(expanded);
    copy.has(id) ? copy.delete(id) : copy.add(id);
    setExpanded(copy);
  };

  const handleUpdate = (orgId: string, formData: OrganizationFormValues) => {
    updateOrganizationMutation.mutate(
      { id: orgId, data: formData },
      {
        onSuccess: () => {
          toast.success("Organization updated!");
          refetch();
        },
        onError: () => {
          toast.error("Failed to update organization");
        },
      }
    );
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: string) => {
    if (!amount) return "N/A";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(amount));
  };

  const renderRow = (org: Organization) => {
    const isExpanded = expanded.has(org.id);
    
    return (
      <React.Fragment key={org.id}>
        
        <TableRow className="hover:bg-gray-50 transition-colors">
          <TableCell className="px-6 ">
            <div 
              className="flex items-center gap-3 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(org.id);
              }}
            >
              <div className="p-1 hover:bg-gray-200 rounded transition-colors">
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-600" />
                )}
              </div>
              <span className="font-medium text-gray-900 hover:text-blue-400">{org.name}</span>
            </div>
          </TableCell>
          
          <TableCell className="px-6 ">{org.clientEmail || "N/A"}</TableCell>
          <TableCell className="px-6 ">{org.clientPhoneNo || "N/A"}</TableCell>
          
          <TableCell className="px-6 ">
            <Badge
              className={
                org.isActive
                  ? "bg-green-200 text-green-700"
                  : "bg-red-200 text-red-700"
              }
            >
              {org.isActive ? "Active" : "Inactive"}
            </Badge>
          </TableCell>
          
          <TableCell className="px-6">
            <div className="flex justify-end items-center space-x-3">
              <DialogBox
              variant=""
                header="Edit Organization"
                triggerButtonText={
                  <Edit className="h-4 w-4 text-blue-600 cursor-pointer" />
                }
              >
                <OrganizationForm
                  initialData={org}
                  isEdit={true}
                  onSubmit={(data) => handleUpdate(org.id, data)}
                />
              </DialogBox>
            </div>
          </TableCell>
        </TableRow>

    
        {isExpanded && (
          <TableRow className="bg-blue-50">
            <TableCell colSpan={5} className="px-6 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide border-b pb-2">
                    Financial Details
                  </h3>
                  <div>
                    <label className="text-xs text-gray-500 block">Bill Amount</label>
                    <p className="text-sm text-gray-900 font-medium">
                      {formatCurrency(org.billAmount)}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block">Bill Number</label>
                    <p className="text-sm text-gray-900">{org.billNumber || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block">AMC Amount</label>
                    <p className="text-sm text-gray-900 font-medium">
                      {formatCurrency(org.annualMaintenanceContractAmount)}
                    </p>
                  </div>
                </div>

            
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide border-b pb-2">
                    Contract Details
                  </h3>
                  <div>
                    <label className="text-xs text-gray-500 block">Contract Date</label>
                    <p className="text-sm text-gray-900">{formatDate(org.contractDate)}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block">AMC Renewal Date</label>
                    <p className="text-sm text-gray-900">{formatDate(org.amcRenewDate)}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block">Created At</label>
                    <p className="text-sm text-gray-900">{formatDate(org.createdAt)}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide border-b pb-2">
                    Additional Information
                  </h3>
                  <div>
                    <label className="text-xs text-gray-500 block">Address</label>
                    <p className="text-sm text-gray-900">{org.clientAddress || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block">Website</label>
                    {org.website ? (
                      <a
                        href={org.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        {org.website}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <p className="text-sm text-gray-900">N/A</p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block">Device Name</label>
                    <p className="text-sm text-gray-900">{org.deviceName || "N/A"}</p>
                  </div>
                </div>
              </div>
            </TableCell>
          </TableRow>
        )}
      </React.Fragment>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Organization Details</h1>
      <DataTable
        headers={["Organization", "Email", "Phone", "Status", "Actions"]}
        data={organizations}
        renderRow={renderRow}
        isLoading={isLoading}
        emptyMessage="No organizations found."
      />
    </div>
  );
};

export default OrganizationsPage;