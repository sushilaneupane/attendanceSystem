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
  renderRow: (item: T) => React.ReactNode
  emptyMessage?: string
}

export function DataTable<T>({ headers, data, renderRow }: DataTableProps<T>) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header, index) => (
            <TableHead key={index}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.length > 0 ? (
          data.map((item, index) => <TableRow key={index}>{renderRow(item)}</TableRow>)
        ) : (
          <TableRow>
            <TableCell colSpan={headers.length} className="text-center py-4">
              No data available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
