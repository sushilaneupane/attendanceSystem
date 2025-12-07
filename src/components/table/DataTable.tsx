import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface DataTableProps<T> {
  headers: string[];
  data: T[];
  renderRow: (item: T) => React.ReactNode;
  emptyMessage?: string;
  isLoading?: boolean;
}

export function DataTable<T>({
  headers,
  data,
  renderRow,

  emptyMessage = "No data available",
}: DataTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto">
   
      <div className="min-w-full inline-block align-middle">
        <Table className="min-w-max w-full border-separate border-spacing-0">
       
          <TableHeader>
            <TableRow className="bg-gray-100 sticky top-0 z-10 ">
              {headers.map((header, index) => (
                <TableHead
                  key={index}
                  className={`px-4 py-3 text-left text-sm sm:text-base font-bold text-gray-800 tracking-wideborder-b border-gr ay-300 ${index === headers.length - 1 ? "text-right" : ""
                    }`}
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

       
          <TableBody>
            {data.length > 0 ? (
              data.map((item) => renderRow(item))
            ) : (
              <TableRow >
                <TableCell
                  colSpan={headers.length}
                  className="px-4 py-6 text-center text-gray-400 text-sm"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

      </div>
    </div>
  );
}
