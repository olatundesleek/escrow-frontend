import { flexRender, Table } from '@tanstack/react-table';

export function MobileCard<TData>({ table }: { table: Table<TData> }) {
  return (
    <div className='border border-gray-200 rounded-lg shadow-sm bg-white'>
      {table.getRowModel().rows.map((row) =>
        row.getVisibleCells().map((cell) => {
          /* 1️⃣ pick a label */
          const headerDef = cell.column.columnDef.header;
          const label =
            typeof headerDef === 'string' || typeof headerDef === 'number'
              ? headerDef
              : cell.column.id; // fallback

          /* 2️⃣ render */
          return (
            <div
              key={cell.id}
              className='grid grid-cols-[120px_1fr] items-start gap-3 px-4 py-2 border-b last:border-0'
            >
              <span className='font-medium text-gray-500'>{label}</span>
              <span className='break-all'>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </span>
            </div>
          );
        }),
      )}
    </div>
  );
}
