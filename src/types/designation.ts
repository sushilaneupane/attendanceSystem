export interface Designation {
  designationId: string;
  designationName: string;
  departmentId: string;
  isActive: boolean;
}
export interface AddDesignationData{
   departmentId: string;
  designationName: string;
}
export interface UpdateDesignationData {
  designationName: string;
  isActive: boolean;
  departmentId: string;
  designationId:string;
}
export interface DeleteDesignationResponse {
  success: boolean;
}
export interface DesignationRowProps{
  designation: Designation,
  departmentId:string,
  onEdit: () => void,
  onDelete : () => void;
  index: number;
}