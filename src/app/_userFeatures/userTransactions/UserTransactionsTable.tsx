import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { HiEye } from 'react-icons/hi';
// import { ColumnDef, createColumnHelper } from '@tanstack/react-table';//uncomment when actions are needed
import { ColumnDef } from '@tanstack/react-table';

import DataTable from '@/app/_components/DataTable';
// import RowActionMenu from '@/app/_components/RowActionMenu';//uncomment for actions addition
// import useGetCurrentUser from '@/app/_hooks/useGetCurrentUser';
import { UserTransactionItem } from '@/app/_types/userDashboardServicesTypes';
import {Button} from '@/app/_components/DashboardBtn';

interface BaseTransaction {
  _id: string;
  escrow: string;
  direction: 'debit' | 'credit';
}

// const columnHelper = createColumnHelper<UserTransactionItem>();uncomment when actions are needed

export default function UserTransactionsTable({
  transactionsData,
  variant = 'full',
}: {
  transactionsData: UserTransactionItem[];
  variant?: 'dashboard' | 'full';
}) {
  const { push } = useRouter();

  const buildActions = useCallback(
    <TData extends BaseTransaction>(transaction: TData) => {
      const { _id: transactionId } = transaction;
      const baseAction = [
        {
          label: 'View Details',
          icon: HiEye,
          onClick: () => push(`transaction/${transactionId}`),
        },
      ];
      return baseAction;
    },
    [push],
  );

  const columns: ColumnDef<UserTransactionItem>[] = useMemo(() => {
    /*base columns*/
    const base: ColumnDef<UserTransactionItem>[] = [
      {
        header: 'Reference',
        accessorKey: 'reference',
      },
      {
        header: 'Direction',
        accessorKey: 'direction',
      },
      {
        header: 'Amount',
        accessorKey: 'amount',
        cell: ({ getValue }) => {
          const amount = getValue<number>();
          return amount.toLocaleString('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 2,
          });
        },
      },
      {
        header: 'Status',
        accessorKey: 'status',
      },
      {
        header: 'Type',
        accessorKey: 'type',
        cell: ({ getValue }) => getValue<string>().replaceAll('_', ' '),
      },
      {
        header: 'From',
        accessorKey: 'from',
      },
      {
        header: 'To',
        accessorKey: 'to',
      },
      {
        header: 'Date',
        accessorKey: 'createdAt',
        cell: ({ getValue }) => {
          const rawDate = getValue<number>();
          return new Date(rawDate).toLocaleDateString('en-NG', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });
        },
      },
    ];
    /*actions column*/
    // const actionsColumn = columnHelper.display({
    //   id: 'actions',
    //   header: '',
    //   cell: ({ row }) => <RowActionMenu actions={buildActions(row.original)} />,
    // });
    // return [...base, actionsColumn];// uncommment when there are actions to be added
    return [...base];
  }, [buildActions]);

  return (
    <>
      {variant === 'dashboard' && (
        <div className='w-full flex justify-between items-center p-4'>
          <h2 className='text-lg font-semibold text-db-text-secondary'>
            Recent Transactions
          </h2>
          <Button
            onClick={() => push('/dashboard/transactions')}
           size="sm"
          >
            View All
          </Button>
        </div>
      )}

      <DataTable<UserTransactionItem>
        data={transactionsData}
        columns={columns}
      />
    </>
  );
}
