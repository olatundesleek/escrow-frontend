import React from 'react';
import { Button } from './DashboardBtn';

export default function TablePagination({
  setQueryParams,
  totalPages,
  page,
}: {
  page: number;
  totalPages: number;
  setQueryParams: (params: Record<string, string | number>) => void;
}) {
  return (
    <div className='flex items-center gap-2'>
      {/* Pagination */}
      <Button
        onClick={() => setQueryParams({ page: Math.max(page - 1, 1) })}
        disabled={page === 1}
      >
        Prev
      </Button>
      <span className='text-sm'>
        Page {page} of {totalPages}
      </span>
      <Button
        onClick={() => setQueryParams({ page: Math.min(page + 1, totalPages) })}
        disabled={page === totalPages}
      >
        Next
      </Button>
    </div>
  );
}
