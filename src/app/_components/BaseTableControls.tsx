import { ReactNode } from 'react';

export default function BaseTableControls({
  limit,
  setQueryParams,
  children,
}: {
  limit: number;
  setQueryParams: (params: Record<string, string | number>) => void;
  children?: ReactNode;
}) {
  return (
    <div className='flex flex-wrap gap-2 items-center'>
      {children}
      {/* Page Size */}
      <select
        aria-label='Page Size'
        value={limit.toString()}
        onChange={(e) => setQueryParams({ limit: e.target.value, page: 1 })}
        className='border border-db-primary text-db-primary rounded-md p-2 text-sm'
      >
        {[5, 10, 15, 20, 25, 30].map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
    </div>
  );
}
