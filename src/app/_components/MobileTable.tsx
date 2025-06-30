import { Row } from '@tanstack/react-table';
import Button from './Button';
import { useRouter } from 'next/navigation';
import { HiOutlineSearch } from 'react-icons/hi';

export function MobileCard<TData extends { _id: string }>({
  row,
}: {
  row: Row<TData>;
}) {
  const { push } = useRouter();

  const get = (colId: string) => row.getValue(colId) as React.ReactNode;

  return (
    <div className='border border-dashboard-border p-4 rounded-lg shadow- bg-white'>
      <div>
        <p className='text-gray-500 font-bold'>Category</p>
        <p className='font-light text-lg mb-1 capitalize'>{get('category')}</p>
      </div>
      <div>
        <p className='text-gray-500'>Description</p>
        <p className='font-light text-lg mb-1 capitalize'>
          {get('description')}
        </p>
      </div>
      <div className='flex justify-between mb-4'>
        <div>
          <p className='text-gray-500'>Amount</p>
          <p className='font-light text-lg mb-1'>
            ₦{Number(get('amount')).toLocaleString()}
          </p>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <div className='flex items-center gap-1 text-sm'>
            <span className='h-2 w-2 rounded-full bg-yellow-400' />
            <span className='capitalize'>{get('status')}</span>
          </div>
          <div className='text-sm font-medium text-red-600 capitalize'>
            {get('paymentStatus')}
          </div>
        </div>
      </div>
      <Button
        color='bg-dashboard-secondary text-dashboard-primary'
        style='flex justify-center items-center gap-1 w-full'
        onClick={() => push(`escrows/${row.original._id}`)}
      >
        <span>
          <HiOutlineSearch />
        </span>
        <span>View Details</span>
      </Button>
    </div>
  );
}
