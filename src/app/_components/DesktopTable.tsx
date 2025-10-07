import { flexRender, type Table } from '@tanstack/react-table';

export default function DesktopTable<TData>({
  table,
}: {
  table: Table<TData>;
}) {
  return (
 
    <table className='bg-db-surface min-w-full text-sm text-left'>
   
      <thead className='bg-db-primary text-db-text-primary uppercase'>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className='border-b border-db-border'>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className='px-6 py-4 font-semibold text-white whitespace-nowrap min-w-[80px] md:min-w-[120px]'
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </th>
            ))}
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
