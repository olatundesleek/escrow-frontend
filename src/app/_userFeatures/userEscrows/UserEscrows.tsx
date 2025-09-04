"use client";

import UserDashboardPageTitle from "@/app/_components/UserDashboardPageTitle";
import UserEscrowTable from "./UserEscrowTable";
import useUserEscrows from "./useUserEscrows";
import FullPageLoader from "@/app/_components/FullPageLoader";
import toast from "react-hot-toast";
import Button from "@/app/_components/Button";
import Modal from "@/app/_components/Modal";
import { useState } from "react";
import AddEscrowForm from "./AddEscrowForm";
import { useSearchParams } from "next/navigation";

export default function AdminEscrows() {
  const searchParams = useSearchParams();
  const queryObject = Object.fromEntries(searchParams.entries());
  const [isAddEscrowFormOpen, setIsAddEscrowFormOpen] = useState(false);
  const { isUserEscrowLoading, userEscrowError, allUserEscrows } =
    useUserEscrows(queryObject);

  const handleCloseForm = function () {
    setIsAddEscrowFormOpen(false);
  };

  if (isUserEscrowLoading) return <FullPageLoader />;

  if (userEscrowError) return toast.error(userEscrowError.message);

  return (
    <div className='flex flex-col items-center justify-center space-y-4'>
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
      <UserEscrowTable escrowData={allUserEscrows?.escrows || []} />
    </div>
  );
}
