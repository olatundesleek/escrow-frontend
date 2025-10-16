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
  sortableColumns?: string[];
  sortConfig?: { key: string; direction: 'asc' | 'desc' } | null;
  onSort?: (columnId: string) => void;
}

export default function DataTable<TData extends { _id: string }>({
  data,
  columns,
  renderMobileCard,
  sortableColumns = [],
  sortConfig,
  onSort,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className='w-full border border-db-border rounded-md hidden sm:block overflow-x-scroll custom-scrollbar'>
        <DesktopTable
          table={table}
          sortableColumns={sortableColumns}
          sortConfig={sortConfig}
          onSort={onSort}
        />
      </div>
      <div className='w-full rounded-md sm:hidden space-y-4 '>
        {renderMobileCard ? (
          table
            .getRowModel()
            .rows.map((row) => <div key={row.id}>{renderMobileCard(row)}</div>)
        ) : (
          <div className='w-full border rounded-md border-db-border overflow-x-scroll custom-scrollbar'>
            <DesktopTable table={table} />
          </div>
        )}
      </div>
    </>
  );
}

