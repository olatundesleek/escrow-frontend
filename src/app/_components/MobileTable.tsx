import { Row } from '@tanstack/react-table';
import Button from './Button';
import { useRouter } from 'next/navigation';
import { HiOutlineChat, HiOutlineSearch } from 'react-icons/hi';

export function MobileCard<TData extends { _id: string }>({
  row,
}: {
  row: Row<TData>;
}) {
  const { push } = useRouter();

  const get = (colId: string) => row.getValue(colId) as React.ReactNode;

  const paymentVariant = {
    paid: 'text-green-600',
    unpaid: 'text-red-600',
  };

  const statusVariant = {
    pending: 'bg-yellow-400',
    active: 'bg-green-500',
    rejected: 'bg-red-600',
  };


  return (
    <div className='border border-dashboard-border p-4 rounded-lg shadow- bg-white'>
      <div className='flex justify-between'>
        <div>
          <p className='font-light text-lg mb-1'>
            {new Date(String(get('createdAt'))).toLocaleDateString('en-NG', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <div className='flex items-center gap-1 text-sm text-center'>
            <span
              className={`${
                statusVariant[
                  (get('status')?.toString().toLowerCase() ?? 'pending') as
                    | 'pending'
                    | 'active'
                    | 'rejected'
                ]
              } h-3 w-3 rounded-full`}
            />
            <span className='capitalize'>{get('status')}</span>
          </div>
        </div>
      </div>
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
            {Number(get('amount')).toLocaleString('en-NG', {
              style: 'currency',
              currency: 'NGN',
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <div
            className={`${
              paymentVariant[
                (get('paymentStatus')?.toString().toLowerCase() ?? 'paid') as
                  | 'paid'
                  | 'unpaid'
              ]
            } text-sm font-bold capitalize`}
          >
            {get('paymentStatus')}
          </div>
        </div>
      </div>
      <div className='flex justify-between mb-4 items-center'>
        <p className='text-gray-500'>Escrow ID</p>
        <p className='text-sm text-center'>{get('_id')}</p>
      </div>
      {get('status') === 'active' && (
        <div className='flex justify-between mb-4 items-center'>
          <p className='text-gray-500'>Username</p>
          <p className='font-lg text-dashboard-secondary font-black flex gap-1'>
            <span>Chat</span> <HiOutlineChat fontSize={'1.5rem'} />
          </p>
        </div>
      )}
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

/*<div className='flex justify-between mb-4'>
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
      </div> */