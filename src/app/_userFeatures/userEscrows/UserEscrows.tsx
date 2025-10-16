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
import {
  ESCROW_FILTER_LIST,
  ESCROW_PREFILL_KEYS,
} from '@/app/_constants/escrowCategories';
import useTableQueryParams from '@/app/_hooks/useTableQueryParams';
import TableControls from '@/app/_components/EscrowTableControls';
import TablePagination from '@/app/_components/TablePagination';
import BaseTableControls from '@/app/_components/BaseTableControls';
import MobileTableFilterModal from '@/app/_components/MobileTableFilterModal';

export default function UserEscrows() {
  const { queryParams, setQueryParams, searchParams } =
    useTableQueryParams(ESCROW_FILTER_LIST);
  const router = useRouter();
  const pathname = usePathname();

  const prefillParams = Object.fromEntries(
    Array.from(searchParams.entries()).filter(([key]) =>
      key.startsWith('prefill'),
    ),
  );

  const [isAddEscrowFormOpen, setIsAddEscrowFormOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
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
            <BaseTableControls
              limit={queryParams.limit}
              setQueryParams={setQueryParams}
            >
              <TableControls
                queryParams={queryParams}
                setQueryParams={setQueryParams}
              />
            </BaseTableControls>
          </div>
          <div className='sm:hidden'>
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className={`text-db-primary text-sm font-light border border-db-primary rounded-md cursor-pointer hover:bg-db-primary hover:text-white px-2 ${
                isMobileFilterOpen ? 'bg-db-primary' : 'bg-transparent '
              }`}
            >
              Filters
            </button>
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
      <MobileTableFilterModal
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        filterConfig={[
          {
            key: 'status',
            label: 'Status',
            options: ['All', 'Pending', 'Active', 'Completed', 'Disputed'],
          },
          {
            key: 'paymentStatus',
            label: 'Payment Status',
            options: ['All', 'Paid', 'Refunded', 'Unpaid'],
          },
        ]}
      />
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
