import { flexRender, type Table } from '@tanstack/react-table';

export default function DesktopTable<TData>({
  table,
}: {
  table: Table<TData>;
}) {
  return (
    // <div className="w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
    // <div className='overflow-x-auto custom-scrollbar'>
    <table className='min-w-full text-sm text-left'>
      {/* Table Header: Retaining the dreamy gradient and soft borders */}
      <thead className='bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 uppercase'>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className='border-b border-blue-200'>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className='px-6 py-4 font-semibold text-gray-700 whitespace-nowrap min-w-[80px] md:min-w-[120px]'
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
      {/* Table Body: Retaining dreamy hover and border styles */}
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className='border-b border-gray-100 hover:bg-blue-50 transition-colors capitalize'
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className='px-6 py-4 text-gray-700 whitespace-nowrap'
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    // </div>
    // </div>
  );
}
