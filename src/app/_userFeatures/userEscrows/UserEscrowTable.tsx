import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import Button from '@/app/_components/Button';
import DataTable from '@/app/_components/DataTable';
import { UserEscrowItem } from '@/app/_types/userDashboardServicesTypes';

const columnHelper = createColumnHelper<UserEscrowItem>();

export default function UserEscrowTable({
  escrowData,
}: {
  escrowData: UserEscrowItem[];
}) {
  const { push } = useRouter();

  const columns: ColumnDef<UserEscrowItem>[] = useMemo(() => {
    /*base columns*/
    const base: ColumnDef<UserEscrowItem>[] = [
      {
        header: 'Category',
        accessorKey: 'category',
      },
      {
        header: 'Description',
        accessorKey: 'description',
      },
      {
        header: 'Amount',
        accessorKey: 'amount',
      },
      {
        header: 'Status',
        accessorKey: 'status',
      },
      {
        header: 'Payment Status',
        accessorKey: 'paymentStatus',
      },
      {
        header: 'Date',
        accessorKey: 'createdAt',
      },
    ];

    /*actions column*/
    const actions = columnHelper.display({
      id: 'actions',
      header: '',
      cell: (row) => (
        <Button
          type='button'
          color='bg-dashboard-secondary text-white'
          onClick={() => push(`escrows/${row.row.original._id}`)}
        >
          View Details
        </Button>
      ),
    });

    return [...base, actions];
  }, [push]);

  return <DataTable<UserEscrowItem> data={escrowData} columns={columns} />;
}
