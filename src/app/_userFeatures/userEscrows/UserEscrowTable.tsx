import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { HiCheck, HiEye, HiX } from 'react-icons/hi';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';

import DataTable from '@/app/_components/DataTable';
import RowActionMenu from '@/app/_components/RowActionMenu';
import useGetCurrentUser from '@/app/_hooks/useGetCurrentUser';
import { UserEscrowItem } from '@/app/_types/userDashboardServicesTypes';
import useAcceptEscrow from './useAcceptEscrow';
import useRejectEscrow from './useRejectEscrow';
import ConfirmModal from '@/app/_components/ConfirmModal';
import useConfirmModal from '@/app/_hooks/useConfirmModal';

interface BaseEscrow {
  _id: string;
  status: string;
  creator: string;
}

const columnHelper = createColumnHelper<UserEscrowItem>();

export default function UserEscrowTable({
  escrowData,
}: {
  escrowData: UserEscrowItem[];
}) {
  const { push } = useRouter();
  const {
    isOpen: acceptModalIsOpen,
    open: openAcceptModal,
    close: closeAcceptModal,
  } = useConfirmModal();

  const {
    isOpen: rejectModalIsOpen,
    open: openRejectModal,
    close: closeRejectModal,
  } = useConfirmModal();

  const [escrowToAccept, setescrowToAccept] = useState<string>('');
  const [escrowToReject, setEscrowToReject] = useState<string>('');

  const {
    currentUserData: { id: currentUserId },
  } = useGetCurrentUser();
  const { acceptEscrow, isAcceptingEscrow } = useAcceptEscrow();
  const { rejectEscrow, isRejectingEscrow } = useRejectEscrow();

  const buildActions = useCallback(
    <TData extends BaseEscrow>(escrow: TData) => {
      const { _id: escrowId, creator, status } = escrow;

      const baseAction = [
        {
          label: 'View Details',
          icon: HiEye,
          onClick: () => push(`escrows/${escrowId}`),
        },
      ];

      if (creator === currentUserId || status !== 'pending') return baseAction;

      return [
        ...baseAction,
        {
          label: 'Accept Escrow',
          onClick: () => {
            openAcceptModal();
            setescrowToAccept(escrowId);
          },
          success: true,
          icon: HiCheck,
          disabled: isAcceptingEscrow,
        },
        {
          label: 'Reject Escrow',
          onClick: () => {
            openRejectModal();
            setEscrowToReject(escrowId);
          },
          danger: true,
          icon: HiX,
          disabled: isRejectingEscrow,
        },
      ];
    },
    [
      push,
      currentUserId,
      isAcceptingEscrow,
      isRejectingEscrow,
      openAcceptModal,
      openRejectModal,
    ],
  );

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
    const actionsColumn = columnHelper.display({
      id: 'actions',
      header: '',
      cell: ({ row }) => <RowActionMenu actions={buildActions(row.original)} />,
    });

    return [...base, actionsColumn];
  }, [buildActions]);

  return (
    <>
      <ConfirmModal
        isOpen={acceptModalIsOpen}
        onClose={closeAcceptModal}
        onConfirm={() => {
          if (escrowToAccept) acceptEscrow({ escrowId: escrowToAccept });
        }}
        variant={'success'}
      />

      <ConfirmModal
        isOpen={rejectModalIsOpen}
        onClose={closeRejectModal}
        onConfirm={() => {
          if (escrowToReject) rejectEscrow({ escrowId: escrowToReject });
        }}
        variant='danger'
      />

      <DataTable<UserEscrowItem> data={escrowData} columns={columns} />
    </>
  );
}
