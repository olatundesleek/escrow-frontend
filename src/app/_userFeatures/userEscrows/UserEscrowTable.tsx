"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { HiCheck, HiEye, HiX } from "react-icons/hi";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import DataTable from "@/app/_components/DataTable";
import RowActionMenu from "@/app/_components/RowActionMenu";
import useGetCurrentUser from "@/app/_hooks/useGetCurrentUser";
import { UserEscrowItem } from "@/app/_types/userDashboardServicesTypes";
import useAcceptEscrow from "./useAcceptEscrow";
import useRejectEscrow from "./useRejectEscrow";
import ConfirmModal from "@/app/_components/ConfirmModal";
import useConfirmModal from "@/app/_hooks/useConfirmModal";
import { getEscrowTypeForUser } from "@/app/_utils/helpers";
import { MobileCard } from "@/app/_components/MobileTable";

interface BaseEscrow {
  _id: string;
  status: string;
  creator: string;
  paymentStatus?: string; // Add paymentStatus to BaseEscrow if it's common
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

  const [escrowToAccept, setescrowToAccept] = useState<string>("");
  const [escrowToReject, setEscrowToReject] = useState<string>("");

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
          label: "View Details",
          icon: HiEye,
          onClick: () => push(`escrows/${escrowId}`),
        },
      ];

      if (creator === currentUserId || status !== "pending") return baseAction;

      return [
        ...baseAction,
        {
          label: "Accept Escrow",
          onClick: () => {
            openAcceptModal();
            setescrowToAccept(escrowId);
          },
          success: true,
          icon: HiCheck,
          disabled: isAcceptingEscrow,
        },
        {
          label: "Reject Escrow",
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
    ]
  );

  const columns: ColumnDef<UserEscrowItem>[] = useMemo(() => {
    /*base columns*/
    const base: ColumnDef<UserEscrowItem>[] = [
      {
        header: 'Escrow ID',
        accessorKey: '_id',
        cell: ({ getValue }) => (
          <span className='font-semibold text-db-text-secondary text-xs'>
            {getValue<string>()}
          </span>
        ),
      },
      {
        header: 'Seller',
        accessorKey: 'sellerUsername',
        cell: ({ getValue }) => {
          const seller = getValue<string>();
          if (!seller) {
            return (
              <span className='inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase shadow-sm bg-warning/20 text-warning'>
                Pending acceptance
              </span>
            );
          }
          return <span className='text-db-text-secondary'>{seller}</span>;
        },
      },
      {
        header: 'Buyer',
        accessorKey: 'buyerUsername',
        cell: ({ getValue }) => {
          const buyer = getValue<string>();
          if (!buyer) {
            return (
              <span className='inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase shadow-sm bg-warning/20 text-warning'>
                Pending acceptance
              </span>
            );
          }
          return <span className='text-db-text-secondary'>{buyer}</span>;
        },
      },
      {
        header: 'Type',
        id: 'type',
        cell: ({ row }) => {
          const escrow = row.original;
          const type = getEscrowTypeForUser(escrow, currentUserId);

          // Dreamy badge styling for Escrow Type
          return (
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase shadow-sm ${
                type === 'buy'
                  ? 'bg-success/20 text-success' // Green for Buy
                  : 'bg-db-primary/20 text-db-primary' // Blue for Sell
              }`}
            >
              {type}
            </span>
          );
        },
      },
      {
        header: 'Category',
        accessorKey: 'category',
        cell: ({ getValue }) => (
          <span className='text-db-text-secondary'>{getValue<string>()}</span>
        ),
      },
      {
        header: 'Description',
        accessorKey: 'description',
        cell: ({ getValue }) => (
          <span className='text-db-text-secondary line-clamp-1 max-w-[200px] block'>
            {getValue<string>()}
          </span>
        ), // Added line-clamp for long descriptions
      },
      {
        header: 'Amount',
        accessorKey: 'amount',
        cell: ({ getValue }) => {
          const amount = getValue<number>();
          return (
            <span className='font-medium text-db-primary whitespace-nowrap'>
              {amount.toLocaleString('en-NG', {
                style: 'currency',
                currency: 'NGN',
                minimumFractionDigits: 2,
              })}
            </span>
          );
        },
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ getValue }) => {
          const status = getValue<string>();
          let bgColor = 'bg-db-surface';
          let textColor = 'text-db-text-secondary';

          switch (status) {
            case 'pending':
              bgColor = 'bg-warning/20';
              textColor = 'text-warning';
              break;
            case 'active':
              bgColor = 'bg-purple-500/20';  
              textColor = 'text-purple-500';
              break;
            case 'completed':
              bgColor = 'bg-success/20';
              textColor = 'text-green-800';
              break;
            case 'cancelled':
            case 'rejected':
              bgColor = 'bg-error/20';
              textColor = 'text-red-800';
              break;
            case 'disputed':
              bgColor = 'bg-orange-100';
              textColor = 'text-orange-800';
              break;
            default:
              // Fallback for any unknown status
              bgColor = 'bg-db-primary/20';
              textColor = 'text-db-text-secondary';
          }

          return (
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase shadow-sm ${bgColor} ${textColor}`}
            >
              {status}
            </span>
          );
        },
      },
      {
        header: 'Payment Status',
        accessorKey: 'paymentStatus',
        cell: ({ getValue }) => {
          const paymentStatus = getValue<string>();
          let bgColor = 'bg-db-primary/20';
          let textColor = 'text-db-text-secondary';

          switch (paymentStatus) {
            case 'pending':
              bgColor = 'bg-warning/20';
              textColor = 'text-warning';
              break;
            case 'paid':
              bgColor = 'bg-db-secondary/20'; // Vibrant green for paid
              textColor = 'text-db-secondary';
              break;
            case 'refunded':
              bgColor = 'bg-db-primary/20'; // Cyan for refunded
              textColor = 'text-db-primary';
              break;
            case 'unpaid':
              bgColor = 'bg-error/20';
              textColor = 'text-error';
              break;
            default:
              // Fallback for any unknown payment status
              bgColor = 'bg-db-primary/20';
              textColor = 'text-db-text-secondary';
          }

          return (
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase ${bgColor} ${textColor}`}
            >
              {paymentStatus}
            </span>
          );
        },
      },
      {
        header: 'Date',
        accessorKey: 'createdAt',
        cell: ({ getValue }) => {
          const rawDate = getValue<number>();
          return (
            <span className='text-db-primary whitespace-nowrap'>
              {new Date(rawDate).toLocaleDateString('en-NG', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          );
        },
      },
    ];

    /*actions column*/
    const actionsColumn = columnHelper.display({
      id: "actions",
      header: "Action", // Capitalized for consistency
      cell: ({ row }) => <RowActionMenu actions={buildActions(row.original)} />,
    });

    return [...base, actionsColumn];
  }, [buildActions, currentUserId]);

  return (
    <>
      <ConfirmModal
        isOpen={acceptModalIsOpen}
        onClose={closeAcceptModal}
        onConfirm={() => {
          if (escrowToAccept) acceptEscrow({ escrowId: escrowToAccept });
        }}
        variant={"success"}
        title="Confirm Acceptance" // Added titles for clarity
        message="Are you sure you want to accept this escrow? This action cannot be undone."
      />

      <ConfirmModal
        isOpen={rejectModalIsOpen}
        onClose={closeRejectModal}
        onConfirm={() => {
          if (escrowToReject) rejectEscrow({ escrowId: escrowToReject });
        }}
        variant="danger"
        title="Confirm Rejection" // Added titles for clarity
        message="Are you sure you want to reject this escrow? This action cannot be undone."
      />

      <DataTable<UserEscrowItem>
        data={escrowData}
        columns={columns}
        renderMobileCard={(row) => <MobileCard key={row.id} row={row} />}
      />
    </>
  );
}
