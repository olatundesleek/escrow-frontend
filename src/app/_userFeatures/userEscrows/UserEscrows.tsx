'use client';

import UserDashboardPageTitle from '@/app/_components/UserDashboardPageTitle';
import UserEscrowTable from './UserEscrowTable';
import useUserEscrows from './useUserEscrows';
import FullPageLoader from '@/app/_components/FullPageLoader';
import toast from 'react-hot-toast';
import Button from '@/app/_components/Button';
import Modal from '@/app/_components/Modal';
import { useState } from 'react';
import AddEscrowForm from './AddEscrowForm';

export default function AdminEscrows() {
  const [isAddEscrowFormOpen, setIsAddEscrowFormOpen] = useState(false);
  const { isUserEscrowLoading, userEscrowError, allUserEscrows } =
    useUserEscrows();

  const handleCloseForm = function () {
    setIsAddEscrowFormOpen(false);
  };

  if (isUserEscrowLoading) return <FullPageLoader />;

  if (userEscrowError) return toast.error(userEscrowError.message);

  return (
    <div className='flex flex-col items-center justify-center'>
      <UserDashboardPageTitle>
        <Button
          textSize='text-sm'
          color='bg-dashboard-secondary text-dashboard-primary'
          onClick={() => setIsAddEscrowFormOpen(true)}
        >
          Create Escrow
        </Button>
      </UserDashboardPageTitle>
      <Modal
        isOpen={isAddEscrowFormOpen}
        onClose={handleCloseForm}
        title='Create Escrow'
      >
        <AddEscrowForm handleCloseForm={handleCloseForm} />
      </Modal>
      <UserEscrowTable escrowData={allUserEscrows?.escrows.data || []} />
    </div>
  );
}
