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
}
export interface DeleteDesignationResponse {
  success: boolean;
}