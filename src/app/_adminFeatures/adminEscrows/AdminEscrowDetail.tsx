'use client';

import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import AdminDashboardPageTitle from '@/app/_components/AdminDashboardPageTitle';
import FullPageLoader from '@/app/_components/FullPageLoader';
import useEscrowDetails from './useEscrowDetails';

import AdminEscrowStatusTable from './AdminEscrowStatusTable';
import AdminEscrowTermsList from './AdminEscrowTermsList';
import AdminEscrowChatInfo from './AdminEscrowChatInfo';
import AdminEscrowMoreDetails from './AdminEscrowMoreDetails';

export default function AdminEscrowDetail() {
  const { back } = useRouter();
  const { id } = useParams();
  const { escrowDetail, isLoadingEscrowDetail, escrowDetailError } =
    useEscrowDetails(id as string);

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

  return (
    <div className='flex flex-col justify-center'>
      <AdminDashboardPageTitle title={`Esrow #${id}`}>
        <div className='flex justify-end gap-4 w-2xs'>
          <span className='bg-dashboard-secondary text-dashboard-primary text-sm px-4 rounded flex justify-center items-center font-bold capitalize'>
            {escrow.status}
          </span>
          <button
            type='button'
            onClick={() => back()}
            className='bg-transparent text-dashboard-secondary text-lg cursor-pointer'
          >
            &larr; Back
          </button>
        </div>
      </AdminDashboardPageTitle>

      <div className='flex mt-8 gap-8'>
        <div className='w-full flex gap-4 flex-col'>
          <AdminEscrowStatusTable
            status={escrow.status}
            paymentStatus={escrow.paymentStatus}
            escrowfeepayment={escrow.escrowfeepayment}
          />

          <AdminEscrowTermsList
            createdAt={escrow.createdAt}
            terms={escrow.terms}
          />

          <AdminEscrowChatInfo
            chatActive={escrow.chatActive}
            creatorRole={escrow.creatorRole}
            creatorEmail={'creator@email'}
            counterpartyEmail={'counterparty@Email'}
          />

          <AdminEscrowMoreDetails
            category={escrow.category}
            description={escrow.description}
            amount={escrow.amount.toString()}
            updatedAt={escrow.updatedAt}
          />
        </div>

        <div className='w-full min-w-md max-w-lg'>
          {escrow.chatActive && <span>Chat active</span>}
        </div>
      </div>
    </div>
  );
}
