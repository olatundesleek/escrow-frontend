"use client";

import UserDashboardPageTitle from "@/app/_components/UserDashboardPageTitle";
import UserEscrowTable from "./UserEscrowTable";
import useUserEscrows from "./useUserEscrows";
import FullPageLoader from "@/app/_components/FullPageLoader";
import toast from "react-hot-toast";
import {Button} from "@/app/_components/DashboardBtn";
import Modal from "@/app/_components/Modal";
import { useEffect, useState } from 'react';
import AddEscrowForm from './AddEscrowForm';
import { usePathname, useRouter } from 'next/navigation';
import { ESCROW_PREFILL_KEYS } from '@/app/_constants/escrowCategories';
import useTableQueryParams from '@/app/_hooks/useTableQueryParams';
import TableControls from '@/app/_components/TableControls';
import TablePagination from '@/app/_components/TablePagination';

export default function UserEscrows() {
  const { queryParams, setQueryParams, searchParams } = useTableQueryParams();
  const router = useRouter();
  const pathname = usePathname();

  const prefillParams = Object.fromEntries(
    Array.from(searchParams.entries()).filter(([key]) =>
      key.startsWith('prefill'),
    ),
  );

  const [isAddEscrowFormOpen, setIsAddEscrowFormOpen] = useState(false);
  const [autoOpen, setAutoOpen] = useState(true);

  const { isUserEscrowLoading, userEscrowError, allUserEscrows } =
    useUserEscrows(queryParams);

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
        <div className='flex gap-4'>
          <div className='hidden sm:block'>
            <TableControls
              limit={queryParams.limit}
              queryParams={queryParams}
              setQueryParams={setQueryParams}
            />
          </div>
          <Button onClick={() => setIsAddEscrowFormOpen(true)}>
            Create Escrow
          </Button>
        </div>
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

      <div className='flex justify-end w-full'>
        <TablePagination
          page={allUserEscrows?.pagination.currentPage || 1}
          totalPages={allUserEscrows?.pagination.totalPages || 1}
          setQueryParams={setQueryParams}
        />
      </div>
    </div>
  );
}
