import {
  ColumnDef,
  getCoreRowModel,
  Row,
  useReactTable,
} from '@tanstack/react-table';
import DesktopTable from './DesktopTable';

interface DataTableProps<TData extends { _id: string }> {
  data: TData[];
  columns: ColumnDef<TData>[];
  renderMobileCard?: (row: Row<TData>) => React.ReactNode;
}

export default function DataTable<TData extends { _id: string }>({
  data,
  columns,
  renderMobileCard,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className='w-full border border-dashboard-border rounded-md hidden sm:block overflow-x-scroll custom-scrollbar'>
        <DesktopTable table={table} />
      </div>
      <div className='w-full overflow-x-auto rounded-md sm:hidden space-y-4 custom-scrollbar'>
        {renderMobileCard ? (
          table
            .getRowModel()
            .rows.map((row) => <div key={row.id}>{renderMobileCard(row)}</div>)
        ) : (
          <DesktopTable table={table} />
        )}
      </div>
    </>
  );
}

