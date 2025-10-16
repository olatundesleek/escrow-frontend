import { flexRender, type Table } from '@tanstack/react-table';
import { HiChevronUp, HiChevronDown } from 'react-icons/hi';

export default function DesktopTable<TData>({
  table,
  sortableColumns = [],
  sortConfig,
  onSort,
}: {
  table: Table<TData>;
  sortableColumns?: string[];
  sortConfig?: { key: string; direction: 'asc' | 'desc' } | null;
  onSort?: (columnId: string) => void;
}) {
  return (
    <table className='bg-db-surface min-w-full text-sm text-left'>
      <thead className='bg-db-primary uppercase'>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className='border-b border-db-border'>
            {headerGroup.headers.map((header) => {
              const columnId = header.column.id;
              const isSortable = sortableColumns.includes(columnId);
              const isActive = sortConfig?.key === columnId;
              const direction = sortConfig?.direction;

              return (
                <th
                  key={header.id}
                  onClick={() => isSortable && onSort?.(columnId)}
                  className={`px-6 py-4 font-semibold whitespace-nowrap min-w-[80px] md:min-w-[120px]
                    ${
                      isSortable
                        ? 'cursor-pointer select-none hover:text-db-secondary'
                        : ''
                    }
                    ${isActive ? 'text-db-secondary' : 'text-white'}`}
                >
                  <div className='flex items-center gap-1'>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}

                    {isSortable && (
                      <span className='inline-flex items-center'>
                        {isActive ? (
                          direction === 'asc' ? (
                            <HiChevronUp className='w-4 h-4' />
                          ) : (
                            <HiChevronDown className='w-4 h-4' />
                          )
                        ) : (
                          <HiChevronDown className='w-4 h-4 opacity-50' />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.length > 0 ? (
          table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className='border-b border-db-border hover:bg-db-border/50 transition-colors capitalize'
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className='px-6 py-4 text-db-text-secondary whitespace-nowrap'
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan={table.getVisibleFlatColumns().length}
              className='text-center py-6 text-db-text-secondary'
            >
              No data found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
