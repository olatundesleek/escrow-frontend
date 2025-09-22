"use client";

import UserDashboardPageTitle from "@/app/_components/UserDashboardPageTitle";
import UserEscrowTable from "./UserEscrowTable";
import useUserEscrows from "./useUserEscrows";
import FullPageLoader from "@/app/_components/FullPageLoader";
import toast from "react-hot-toast";
import Button from "@/app/_components/Button";
import Modal from "@/app/_components/Modal";
import { useEffect, useState } from 'react';
import AddEscrowForm from './AddEscrowForm';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  ESCROW_FILTER_LIST,
  ESCROW_PREFILL_KEYS,
} from '@/app/_constants/escrowCategories';

export default function UserEscrows() {
  const searchParams = useSearchParams();
  const queryObject = Object.fromEntries(searchParams.entries());
  const router = useRouter();
  const pathname = usePathname();

  const filterParams = Object.fromEntries(
    Object.entries(queryObject).filter(([key]) =>
      ESCROW_FILTER_LIST.includes(key),
    ),
  );

  const prefillParams = Object.fromEntries(
    Object.entries(queryObject).filter(([key]) => key.startsWith('prefill')),
  );

  const [isAddEscrowFormOpen, setIsAddEscrowFormOpen] = useState(false);
  const [autoOpen, setAutoOpen] = useState(true);

  const { isUserEscrowLoading, userEscrowError, allUserEscrows } =
    useUserEscrows(filterParams);

  useEffect(() => {
    if (
      prefillParams.prefillCreatorRole &&
      prefillParams.prefillCategory &&
      prefillParams.prefillAmount &&
      !isAddEscrowFormOpen &&
      autoOpen
    ) {
      setIsAddEscrowFormOpen(true);
    }
  }, [prefillParams, isAddEscrowFormOpen, autoOpen]);

  const handleCloseForm = function () {
    setIsAddEscrowFormOpen(false);
    setAutoOpen(false);

    // Clear prefill params but keep filters
    const newParams = new URLSearchParams(searchParams.toString());

    // Remove only prefill keys
    ESCROW_PREFILL_KEYS.forEach((k) => newParams.delete(k));

    router.replace(`${pathname}?${newParams.toString()}`);
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
        <AddEscrowForm
          handleCloseForm={handleCloseForm}
          initialValues={{
            creatorRole: prefillParams.prefillCreatorRole as 'buyer' | 'seller',
            category: prefillParams.prefillCategory,
            amount: Number(prefillParams.prefillAmount),
          }}
        />
      </Modal>
      <UserEscrowTable escrowData={allUserEscrows?.escrows || []} />
    </div>
  );
}
