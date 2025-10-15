export default function TableControls({
  limit,
  queryParams,
  setQueryParams,
}: {
  limit: number;
  queryParams: Record<string, string | number | null>;
  setQueryParams: (params: Record<string, string | number>) => void;
}) {
  return (
    <div className='flex flex-wrap gap-2'>
      {/* Filters */}
      {/* Escrow Status */}
      <select
        aria-label='Escrow Status'
        value={queryParams.status || ''}
        onChange={(e) => setQueryParams({ status: e.target.value, page: 1 })}
        className='border border-secondary text-secondary rounded-md p-2 text-sm'
      >
        <option value=''>All Status</option>
        <option value='pending'>Pending</option>
        <option value='active'>Active</option>
        <option value='completed'>Completed</option>
        <option value='disputed'>Disputed</option>
      </select>

      {/* Payment Status */}
      <select
        aria-label='Payment Status'
        value={queryParams.paymentStatus || ''}
        onChange={(e) =>
          setQueryParams({ paymentStatus: e.target.value, page: 1 })
        }
        className='border border-secondary text-secondary rounded-md p-2 text-sm'
      >
        <option value=''>All Payments</option>
        {/* <option value='pending'>Pending</option> */}
        <option value='paid'>Paid</option>
        <option value='refunded'>Refunded</option>
        <option value='unpaid'>Unpaid</option>
      </select>

      {/* Page Size */}
      <select
        aria-label='Page Size'
        value={limit.toString()}
        onChange={(e) => setQueryParams({ limit: e.target.value, page: 1 })}
        className='border border-secondary text-secondary rounded-md p-2 text-sm'
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
