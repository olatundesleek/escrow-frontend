import { flexRender, type Table } from '@tanstack/react-table';

export default function DesktopTable<TData>({
  table,
}: {
  table: Table<TData>;
}) {
  return (
    <table className='w-full text-sm text-left'>
      <thead className='bg-gray-100 text-gray-700 uppercase'>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className='border-b border-dashboard-border'>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className='px-4 py-3 font-medium'>
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
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className='border-b border-dashboard-border hover:bg-gray-50 capitalize'
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className='px-4 py-4'>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
