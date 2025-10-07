import { Row } from '@tanstack/react-table';
import { Button } from './DashboardBtn';
import { useRouter } from 'next/navigation';
import { HiOutlineChat, HiOutlineSearch } from 'react-icons/hi';
import { getEscrowTypeForUser } from '../_utils/helpers';

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

  // --- Friendly Payment Status Badge ---
  const paymentVariantClasses = (paymentStatus: string) => {
    const ps = paymentStatus.toLowerCase();
    let bgColor = 'bg-db-border';
    let textColor = 'text-db-text-secondary';
    let label = paymentStatus;

    switch (ps) {
      case 'paid':
        bgColor = 'bg-db-secondary/20';
        textColor = 'text-db-secondary';
        label = 'Paid';
        break;
      case 'refunded':
        bgColor = 'bg-db-primary/20';
        textColor = 'text-db-primary';
        label = 'Refunded';
        break;
      case 'unpaid':
        bgColor = 'bg-error/20';
        textColor = 'text-error';
        label = 'Unpaid';
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
        bgColor = 'bg-warning/40';
        textColor = 'text-warning';
        label = 'Pending Acceptance';
        break;
      case 'active':
        bgColor = 'bg-purple-500/40';
        textColor = 'text-purple-500';
        label = 'Active';
        break;
      case 'completed':
        bgColor = 'bg-success/50';
        textColor = 'text-success';
        label = 'Completed';
        break;

      case 'rejected':
        bgColor = 'bg-error/50';
        textColor = 'text-error';
        label = 'Rejected';
        break;
      case 'disputed':
        bgColor = 'bg-error/50';
        textColor = 'text-error';
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
    //for ribbon

    return `inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase shadow-sm ${bgColor} ${textColor}`;
  };

  return (
    <div className='relative border border-db-border p-5 rounded-xl shadow-md bg-db-surface space-y-4 overflow-hidden'>
      <div className='absolute top-0 right-0 overflow-hidden'>
        <div
          className={`
          ${typeVariantClasses(
            type ?? 'buy',
          )} w-20 h-20 p-4 rounded-full flex justify-center items-center relative -translate-y-1/3 translate-x-1/3 rotate-45 shadow-md border z-2
          `}
        >
          <span className={`translate-y-3`}>{type}</span>
        </div>
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

      <div>
        <p className='text-sm text-db-text-secondary'>Category</p>
        <p className='font-medium text-base capitalize text-db-primary'>
          {get('category')}
        </p>
      </div>

      <div>
        <p className='text-sm text-db-text-secondary'>Description</p>
        <p className='text-base text-db-primary line-clamp-2'>
          {get('description')}
        </p>
      </div>

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

      <div className='flex justify-between items-center'>
        <p className='text-sm text-db-text-secondary'>Transaction ID</p>
        <p className='text-sm text-db-text-primary font-medium'>{get('_id')}</p>
      </div>

      {get('status')?.toString().toLowerCase() === 'active' && (
        <div className='flex justify-between items-center'>
          <p className='text-sm text-db-text-secondary'>Other Party</p>
          <button className='flex items-center gap-1 text-db-secondary hover:text-indigo-700 transition-colors font-medium'>
            <span>Open Chat</span>
            <HiOutlineChat fontSize='1.25rem' />
          </button>
        </div>
      )}

      <Button className='w-full' onClick={() => push(`escrows/${get('_id')}`)}>
        <HiOutlineSearch />
        <span>View Full Details</span>
      </Button>
    </div>
  );
}
