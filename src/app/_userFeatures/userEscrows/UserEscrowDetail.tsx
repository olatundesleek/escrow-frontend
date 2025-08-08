'use client';

import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import UserDashboardPageTitle from '@/app/_components/UserDashboardPageTitle';
import FullPageLoader from '@/app/_components/FullPageLoader';
import useUserEscrowDetails from './useUserEscrowDetails';

import Button from '@/app/_components/Button';
import UserEscrowChatInfo from './UserEscrowChatInfo';
import UserEscrowTermsList from './UserEscrowTermsList';
import UserEscrowStatusTable from './UserEscrowStatusTable';
import UserEscrowMoreDetails from './UserEscrowMoreDetails';
import ConfirmModal from '@/app/_components/ConfirmModal';
import useConfirmModal from '@/app/_hooks/useConfirmModal';
import useAcceptEscrow from './useAcceptEscrow';
import useRejectEscrow from './useRejectEscrow';
import useGetCurrentUser from '@/app/_hooks/useGetCurrentUser';
import UserEscrowPaymentStatus from './UserEscrowPaymentStatus';
import { getEscrowTypeForUser } from '@/app/_utils/helpers';
import Modal from '@/app/_components/Modal';
import UserPaymentForm from './UserPaymentForm';
import UserEscrowType from './UserEscrowType';
import CreateDisputeForm from './CreateDisputeForm';

export default function UserEscrowDetail() {
  const {
    currentUserData: { id: currentUserId },
  } = useGetCurrentUser();

  const { back } = useRouter();

  const { id } = useParams();

  const { escrowDetail, isLoadingEscrowDetail, escrowDetailError } =
    useUserEscrowDetails(id as string);

  const {
    isOpen: isAcceptOpen,
    open: openAccept,
    close: closeAccept,
  } = useConfirmModal();

  const {
    isOpen: isRejectOpen,
    open: openReject,
    close: closeReject,
  } = useConfirmModal();

  const {
    isOpen: isPaymentModalOpen,
    open: openPaymentModal,
    close: closePaymentModal,
  } = useConfirmModal();

  const {
    isOpen: isConfirmCompleteTradeOpen,
    open: openConfirmCompleteTrade,
    close: closeConfirmCompleteTrade,
  } = useConfirmModal();

  const {
    isOpen: isCreateDisputeOpen,
    open: openCreateDispute,
    close: closeCreateDispute,
  } = useConfirmModal();

  const { acceptEscrow } = useAcceptEscrow();

  const { rejectEscrow } = useRejectEscrow();

  if (isLoadingEscrowDetail) return <FullPageLoader />;

  if (escrowDetailError) return toast.error(escrowDetailError.message);

  if (!escrowDetail) {
    return (
      <div className='flex flex-col items-center justify-center h-screen'>
        No escrow details found for ID: {id}
      </div>
    );
  }

  const { escrow } = escrowDetail;

  const { _id: escrowId, creator } = escrow;

  const type = getEscrowTypeForUser(escrow, currentUserId);

  return (
    <>
      <Modal
        isOpen={isPaymentModalOpen}
        onClose={closePaymentModal}
        title='Make Payment'
        width='w-full lg:max-w-lg max-w-lg'
      >
        <UserPaymentForm
          escrowId={escrowId}
          feePayer={escrow.escrowfeepayment}
          amount={escrow.amount}
          closePaymentModal={closePaymentModal}
        />
      </Modal>

      <Modal
        isOpen={isCreateDisputeOpen}
        onClose={closeCreateDispute}
        title='Create Dispute'
        width='w-full lg:max-w-lg max-w-lg'
      >
        <CreateDisputeForm closeDisputeForm={closeCreateDispute} />
      </Modal>

      <ConfirmModal
        isOpen={isAcceptOpen}
        onClose={closeAccept}
        onConfirm={() => acceptEscrow({ escrowId })}
        title='Confirm Accept'
        message='Are you sure you want to accept this trade?'
        variant='success'
        confirmText='Accept'
      />

      <ConfirmModal
        isOpen={isRejectOpen}
        onClose={closeReject}
        onConfirm={() => rejectEscrow({ escrowId })}
        title='Confirm Reject'
        message='Are you sure you want to reject this trade?'
        variant='danger'
        confirmText='Reject'
      />

      <ConfirmModal
        isOpen={isConfirmCompleteTradeOpen}
        onClose={closeConfirmCompleteTrade}
        onConfirm={() => toast.success('Trade completed successfully')}
        title='Confirm trade completion'
        message='Are you sure you want to proceed with this action?'
        variant='info'
        confirmText='Complete Trade'
      />

      <div className='flex flex-col justify-center'>
        <UserDashboardPageTitle title={`Esrow #${id}`}>
          <div className='sm:flex sm:justify-end gap-4 w-2xs hidden sm:flex-1'>
            {escrow.paymentStatus === 'paid' && (
              <Button
                color='bg-transparent text-error'
                style='flex border border-error items-center gap-2 hover:bg-error hover:text-white font-light lg:font-bold'
                padding='px-2 py-1'
                textSize='lg:text-md text-sm'
                onClick={openCreateDispute}
              >
                Create Dispute
              </Button>
            )}
            {escrow.paymentStatus === 'paid' && type === 'buy' && (
              <Button
                color='bg-transparent text-dashboard-secondary'
                style='flex border border-secondary items-center gap-2 hover:bg-dashboard-secondary hover:text-white font-light lg:font-bold'
                padding='px-2 py-1'
                textSize='lg:text-md text-sm'
                onClick={openConfirmCompleteTrade}
              >
                Complete Trade
              </Button>
            )}
            <span className='bg-dashboard-secondary text-dashboard-primary text-sm px-4 rounded flex justify-center items-center font-bold capitalize'>
              {escrow.status}
            </span>
            <Button
              type='button'
              color='bg-transparent text-dashboard-secondary'
              onClick={() => back()}
              padding='p-0'
            >
              &larr; Back
            </Button>
          </div>
        </UserDashboardPageTitle>

        <div className='flex mt-8 gap-8'>
          <div className='w-full flex gap-4 flex-col'>
            <UserEscrowType type={type} />
            <UserEscrowStatusTable
              status={escrow.status}
              openAcceptConfirmModal={openAccept}
              openRejectConfirmModal={openReject}
              currentUserId={currentUserId}
              creator={creator}
            />
            <UserEscrowPaymentStatus
              escrowfeepayment={escrow.escrowfeepayment}
              paymentStatus={escrow.paymentStatus}
              status={escrow.status}
              type={type}
              openPaymentModal={openPaymentModal}
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

          <div className='hidden sm:w-full sm:min-w-md sm:max-w-lg sm:block'>
            {escrow.chatActive && <span>Chat active</span>}
          </div>
        </div>
      </div>
      <div className='sm:hidden gap-4 w-full flex justify-between py-4'>
        <span className='bg-transparent text-dashboard-secondary text-lg cursor-pointer'>
          Status: {escrow.status}
        </span>
        <button
          type='button'
          onClick={() => back()}
          className='bg-dashboard-secondary text-dashboard-primary text-sm px-4 rounded justify-center items-center font-bold capitalize flex py-2'
        >
          &larr; Back
        </button>
      </div>
    </>
  );
}
