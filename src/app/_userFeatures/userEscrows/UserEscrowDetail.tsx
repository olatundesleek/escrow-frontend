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

export default function UserEscrowDetail() {
  const { back } = useRouter();
  const { id } = useParams();
  const { escrowDetail, isLoadingEscrowDetail, escrowDetailError } =
    useUserEscrowDetails(id as string);

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
    <>
      <div className='flex flex-col justify-center'>
        <UserDashboardPageTitle title={`Esrow #${id}`}>
          <div className='sm:flex sm:justify-end gap-4 w-2xs hidden'>
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
            <UserEscrowStatusTable
              status={escrow.status}
              paymentStatus={escrow.paymentStatus}
              escrowfeepayment={escrow.escrowfeepayment}
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
