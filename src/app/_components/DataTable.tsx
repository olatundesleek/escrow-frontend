import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { MobileCard } from './MobileTable';
import DesktopTable from './DesktopTable';

interface DataTableProps<TData extends { _id: string }> {
  data: TData[];
  columns: ColumnDef<TData>[];
}

export default function DataTable<TData extends { _id: string }>({
  data,
  columns,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className='w-full overflow-x-auto border border-dashboard-border rounded-md mt-4 hidden md:block'>
        <DesktopTable table={table} />
      </div>
      <div className='w-full overflow-x-auto rounded-md mt-4 sm:hidden space-y-4'>
        {table.getRowModel().rows.map((row) => (
          <MobileCard key={row.id} row={row} />
        ))}
      </div>
    </>
  );
}
