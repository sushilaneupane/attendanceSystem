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
}

export function DataTable<T>({
  headers,
  data,
  renderRow,
  emptyMessage = "No data available",
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto w-full rounded-lg border border-gray-200 bg-white shadow-sm">
      <Table className="min-w-full">
        <TableHeader className="bg-gray-50">
          <TableRow>
            {headers.map((header, index) => (
              <TableHead
                key={index}
                className={`text-left text-sm font-medium text-gray-600 px-6 py-3 uppercase tracking-wider ${
                  index === headers.length - 1 ? "text-right" : ""
                }`}
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-gray-200">
          {data.length > 0 ? (
            data.map((item, index) => (
              <TableRow
                key={index}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                {renderRow(item)}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={headers.length}
                className="text-center py-8 text-gray-400"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}