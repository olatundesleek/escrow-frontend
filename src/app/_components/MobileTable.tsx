import { Row } from '@tanstack/react-table';
import { Button } from './DashboardBtn';
import { useRouter } from 'next/navigation';
import { HiOutlineChat, HiOutlineSearch } from 'react-icons/hi';
import { getEscrowTypeForUser } from '../_utils/helpers';
import RibbonBadge from './RibbonBadge';

export function MobileCard<
  TData extends {
    _id: string;
    creator: string;
    creatorRole: 'buyer' | 'seller';
  },
>({ row, currentUserId }: { row: Row<TData>; currentUserId: string }) {
  const { push } = useRouter();
  const get = (colId: string) => row.getValue(colId) as React.ReactNode;
  const escrow = {
    creator: row.original.creator,
    creatorRole: row.original.creatorRole,
  };
  const type = getEscrowTypeForUser(escrow, currentUserId);

  console.log(row.original);

  // --- Friendly Payment Status Badge ---
  const paymentVariantClasses = (paymentStatus: string) => {
    const ps = paymentStatus.toLowerCase();
    let bgColor = 'bg-db-border';
    let textColor = 'text-db-text-secondary';
    let label = paymentStatus;

    switch (ps) {
      case 'pending':
        bgColor = 'bg-warning/20';
        textColor = 'text-warning';
        label = 'Pending Payment';
        break;
      case 'paid':
        bgColor = 'bg-db-secondary/20';
        textColor = 'text-db-secondary';
        label = 'Payment Received';
        break;
      case 'refunded':
        bgColor = 'bg-db-primary/20';
        textColor = 'text-db-primary';
        label = 'Refunded';
        break;
      case 'unpaid':
      case 'failed':
        bgColor = 'bg-error/20';
        textColor = 'text-error';
        label = 'Payment Failed';
        break;
    }
    return {
      classes: `inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase ${bgColor} ${textColor}`,
      label,
    };
  };

  // --- Friendly Transaction Status Badge ---
  const statusVariantClasses = (status: string) => {
    const s = status.toLowerCase();
    let bgColor = 'bg-db-border';
    let textColor = 'text-db-text-secondary';
    let label = status;

    switch (s) {
      case 'pending':
        bgColor = 'bg-warning/20';
        textColor = 'text-warning';
        label = 'Pending Approval';
        break;
      case 'active':
        bgColor = 'bg-purple-500/20';
        textColor = 'text-purple-500';
        label = 'Active';
        break;
      case 'completed':
        bgColor = 'bg-success/20';
        textColor = 'text-success';
        label = 'Completed';
        break;
      case 'cancelled':
      case 'rejected':
        bgColor = 'bg-error/20';
        textColor = 'text-error';
        label = 'Rejected';
        break;
      case 'disputed':
        bgColor = 'bg-accent/20';
        textColor = 'text-accent';
        label = 'Disputed';
        break;
    }
    return {
      classes: `inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase shadow-sm ${bgColor} ${textColor}`,
      label,
    };
  };

  const paymentBadge = paymentVariantClasses(
    get('paymentStatus')?.toString() ?? 'pending',
  );
  const statusBadge = statusVariantClasses(
    get('status')?.toString() ?? 'pending',
  );

  const typeVariantClasses = (type: string) => {
    let bgColor = 'bg-db-primary/20';
    let textColor = 'text-db-primary';

    if (type.toLowerCase() === 'buy') {
      bgColor = 'bg-db-success/20';
      textColor = 'text-db-success';
    } else if (type.toLowerCase() === 'sell') {
      bgColor = 'bg-db-primary/20';
      textColor = 'text-db-primary';
    }
    if (type.toLowerCase() === 'buy') {
      bgColor = 'bg-db-success';
      textColor = 'text-db-background';
    } else if (type.toLowerCase() === 'sell') {
      bgColor = 'bg-db-primary';
      textColor = 'text-db-background';
    }
    return `inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase shadow-sm ${bgColor} ${textColor}`;
  };

  return (
    <div className='relative border border-db-border p-5 rounded-xl shadow-md bg-db-surface space-y-4'>
      <div className='absolute -top-8 -right-10 z-10'>
        {/* <span
          className={`${typeVariantClasses(
            type?.toString() ?? 'buy',
          )} w-20 h-20 p-4 pt-10 text-center flex justify-center items-center relative -translate-y-1/3 translate-x-1/3 rotate-45 shadow-md border-b border-b-red z-2`}
        >
          {type}
        </span> */}
        {type === 'buy' ? (
          <RibbonBadge text='Buy' color='green' />
        ) : (
          <RibbonBadge text='Sell' color='blue' />
        )}
      </div>

      <div className='flex justify-between items-start gap-2 flex-wrap  z-4 relative'>
        <div>
          <p className='text-sm text-db-text-secondary'>Transaction Date</p>
          <p className='font-medium text-base text-db-primary'>
            {new Date(String(get('createdAt'))).toLocaleDateString('en-NG', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </div>
        <div className='flex flex-col items-end gap-1'>
          <span className={statusBadge.classes}>{statusBadge.label}</span>
        </div>
      </div>

      {/* Category */}

      <div>
        <p className='text-sm text-db-text-secondary'>Category</p>
        <p className='font-medium text-base capitalize text-db-primary'>
          {get('category')}
        </p>
      </div>

      {/* Description */}
      <div>
        <p className='text-sm text-db-text-secondary'>Description</p>
        <p className='text-base text-db-primary line-clamp-2'>
          {get('description')}
        </p>
      </div>

      {/* Amount + Payment Status */}

      <div className='flex justify-between items-start'>
        <div>
          <p className='text-sm text-db-text-secondary'>Amount</p>
          <p className='font-semibold text-lg text-db-primary whitespace-nowrap'>
            {Number(get('amount')).toLocaleString('en-NG', {
              style: 'currency',
              currency: 'NGN',
              minimumFractionDigits: 2,
            })}
          </p>
        </div>
        <span className={paymentBadge.classes}>{paymentBadge.label}</span>
      </div>

      {/* Transaction ID */}

      <div className='flex justify-between items-center'>
        <p className='text-sm text-db-text-secondary'>Transaction ID</p>
        <p className='text-sm text-db-text-primary font-medium'>{get('_id')}</p>
      </div>

      {/* Chat Option (if Active) */}
      {get('status')?.toString().toLowerCase() === 'active' && (
        <div className='flex justify-between items-center'>
          <p className='text-sm text-db-text-secondary'>Other Party</p>
          <button className='flex items-center gap-1 text-db-secondary hover:text-indigo-700 transition-colors font-medium'>
            <span>Open Chat</span>
            <HiOutlineChat fontSize='1.25rem' />
          </button>
        </div>
      )}

      {/* View Details */}
      <Button className='w-full' onClick={() => push(`escrows/${get('_id')}`)}>
        <HiOutlineSearch />
        <span>View Full Details</span>
      </Button>
    </div>
  );
}
