"use client";

import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import UserDashboardPageTitle from "@/app/_components/UserDashboardPageTitle";
import FullPageLoader from "@/app/_components/FullPageLoader";
import { Button } from "@/app/_components/DashboardBtn";
import ConfirmModal from "@/app/_components/ConfirmModal";
import Modal from "@/app/_components/Modal";

import useUserEscrowDetails from "./useUserEscrowDetails";
import useConfirmModal from "@/app/_hooks/useConfirmModal";
import useAcceptEscrow from "./useAcceptEscrow";
import useRejectEscrow from "./useRejectEscrow";
import useGetCurrentUser from "@/app/_hooks/useGetCurrentUser";

import { getEscrowTypeForUser } from "@/app/_utils/helpers";

import UserEscrowType from "./UserEscrowType";
import UserEscrowStatusTable from "./UserEscrowStatusTable";
import UserEscrowPaymentStatus from "./UserEscrowPaymentStatus";
import UserEscrowTermsList from "./UserEscrowTermsList";
import UserEscrowChatInfo from "./UserEscrowChatInfo";
import UserEscrowMoreDetails from "./UserEscrowMoreDetails";
import UserPaymentForm from "./UserPaymentForm";
import CreateDisputeForm from "./CreateDisputeForm";

export default function UserEscrowDetail() {
  const {
    currentUserData: { id: currentUserId },
  } = useGetCurrentUser();

  const { back } = useRouter();
  const { id } = useParams();

  const { escrowDetail, isLoadingEscrowDetail, escrowDetailError } =
    useUserEscrowDetails(id as string);

  // Modal controls
  const paymentModal = useConfirmModal();
  const disputeModal = useConfirmModal();
  const acceptModal = useConfirmModal();
  const rejectModal = useConfirmModal();
  const completeTradeModal = useConfirmModal();

  const { acceptEscrow } = useAcceptEscrow();
  const { rejectEscrow } = useRejectEscrow();

  if (isLoadingEscrowDetail) return <FullPageLoader />;
  if (escrowDetailError) return toast.error(escrowDetailError.message);

  if (!escrowDetail) {
    return (
      <div className="flex h-screen flex-col items-center justify-center text-gray-600">
        No escrow details found for ID: {id}
      </div>
    );
  }

  const { escrow } = escrowDetail;
  const { _id: escrowId, creator } = escrow;

  const type = getEscrowTypeForUser(escrow, currentUserId);

  return (
    <>
      {/* --- Modals --- */}
      <Modal
        isOpen={paymentModal.isOpen}
        onClose={paymentModal.close}
        title='Make a Payment'
        width='w-full lg:max-w-lg'
      >
        <UserPaymentForm
          escrowId={escrowId}
          feePayer={escrow.escrowfeepayment}
          amount={escrow.amount}
          closePaymentModal={paymentModal.close}
        />
      </Modal>

      <Modal
        isOpen={disputeModal.isOpen}
        onClose={disputeModal.close}
        title='Raise a Dispute'
        width='w-full lg:max-w-lg'
      >
        <CreateDisputeForm
          escrowId={escrowId}
          closeDisputeForm={disputeModal.close}
        />
      </Modal>

      <ConfirmModal
        isOpen={acceptModal.isOpen}
        onClose={acceptModal.close}
        onConfirm={() => acceptEscrow({ escrowId })}
        title='Accept Trade'
        message='Do you want to accept this trade?'
        variant='success'
        confirmText='Accept'
      />

      <ConfirmModal
        isOpen={rejectModal.isOpen}
        onClose={rejectModal.close}
        onConfirm={() => rejectEscrow({ escrowId })}
        title='Reject Trade'
        message='Do you want to reject this trade?'
        variant='danger'
        confirmText='Reject'
      />

      <ConfirmModal
        isOpen={completeTradeModal.isOpen}
        onClose={completeTradeModal.close}
        onConfirm={() => toast.success('Trade marked as complete')}
        title='Complete Trade'
        message='Confirm that this trade has been successfully completed.'
        variant='info'
        confirmText='Complete'
      />

      {/* --- Page Content --- */}
      <div className='flex flex-col'>
        <UserDashboardPageTitle
          title={
            <div className='flex items-center gap-3'>
              <h1 className='sm:text-xl text-lg font-semibold text-db-text-primary'>
                Escrow Details
              </h1>
              <span className='sm:text-md text-sm text-gray-500'>
                ID: #{id}
              </span>
            </div>
          }
        >
          {/* Actions (desktop only) */}
          <div className='hidden flex-1 justify-end gap-3 sm:flex'>
            {escrow.paymentStatus === 'paid' &&
              escrow.status !== 'disputed' && (
                <Button variant='danger' onClick={disputeModal.open}>
                  Dispute
                </Button>
              )}
            {escrow.paymentStatus === 'paid' &&
              escrow.status !== 'disputed' &&
              type === 'buy' && (
                <Button variant='secondary' onClick={completeTradeModal.open}>
                  Mark as Complete
                </Button>
              )}
            <Button onClick={() => back()} variant='outline'>
              &larr; Back
            </Button>
          </div>
        </UserDashboardPageTitle>

        <div className='mt-8 flex gap-8'>
          <div className='flex w-full flex-col gap-4'>
            <UserEscrowType type={type} />
            <UserEscrowStatusTable
              status={escrow.status}
              openAcceptConfirmModal={acceptModal.open}
              openRejectConfirmModal={rejectModal.open}
              currentUserId={currentUserId}
              creator={creator}
            />
            <UserEscrowPaymentStatus
              escrowfeepayment={escrow.escrowfeepayment}
              paymentStatus={escrow.paymentStatus}
              status={escrow.status}
              type={type}
              openPaymentModal={paymentModal.open}
            />
            <UserEscrowTermsList
              createdAt={escrow.createdAt}
              terms={escrow.terms}
            />
            <UserEscrowChatInfo chatActive={escrow.chatActive} />
            <UserEscrowMoreDetails
              category={escrow.category}
              description={escrow.description}
              amount={escrow.amount.toString()}
              updatedAt={escrow.updatedAt}
            />
          </div>

          {/* Side column (desktop only) */}
          <div className='hidden sm:block sm:w-full sm:min-w-md sm:max-w-lg'>
            {escrow.chatActive && (
              <span className='text-gray-500'>Chat is active</span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile footer actions */}
      <div className='flex w-full justify-between gap-4 py-4 sm:hidden'>
        <span className='cursor-pointer text-lg text-db-text-secondary'>
          Status: <span className='text-db-text-primary'>{escrow.status}</span>
        </span>
        <Button type='button' onClick={() => back()}>
          &larr; Back
        </Button>
      </div>
    </>
  );
}
