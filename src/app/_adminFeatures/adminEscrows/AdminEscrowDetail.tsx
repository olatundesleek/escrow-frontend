"use client";

import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import AdminDashboardPageTitle from "@/app/_components/AdminDashboardPageTitle";
import FullPageLoader from "@/app/_components/FullPageLoader";
import useAdminEscrowDetails from "./useAdminEscrowDetails";

import AdminEscrowStatusTable from "./AdminEscrowStatusTable";
import AdminEscrowTermsList from "./AdminEscrowTermsList";
import AdminEscrowChatInfo from "./AdminEscrowChatInfo";
import AdminEscrowMoreDetails from "./AdminEscrowMoreDetails";

export default function AdminEscrowDetail() {
  const { back } = useRouter();
  const { id } = useParams();
  const { escrowDetail, isLoadingEscrowDetail, escrowDetailError } =
    useAdminEscrowDetails(id as string);

  if (isLoadingEscrowDetail) return <FullPageLoader />;

  if (escrowDetailError) return toast.error(escrowDetailError.message);

  if (!escrowDetail) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        No escrow details found for ID: {id}
      </div>
    );
  }

  const { escrow } = escrowDetail;

  return (
    <>
      <div className="flex flex-col justify-center">
        <AdminDashboardPageTitle title={`Esrow #${id}`}>
          <div className="sm:flex sm:justify-end gap-4 w-2xs hidden">
            <span className="bg-dashboard-secondary text-dashboard-primary text-sm px-4 rounded justify-center items-center font-bold capitalize flex">
              {escrow.status}
            </span>
            <button
              type="button"
              onClick={() => back()}
              className="bg-transparent text-dashboard-secondary text-lg cursor-pointer"
            >
              &larr; <span>Back</span>
            </button>
          </div>
        </AdminDashboardPageTitle>

        <div className="flex mt-8 gap-8">
          <div className="w-full flex gap-4 flex-col">
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
              creatorEmail={escrow.creatorEmail}
              counterpartyEmail={escrow.counterpartyEmail}
            />

            <AdminEscrowMoreDetails
              category={escrow.category}
              description={escrow.description}
              amount={escrow.amount.toString()}
              updatedAt={escrow.updatedAt}
            />
          </div>

          <div className="hidden sm:w-full sm:min-w-md sm:max-w-lg sm:block">
            {escrow.chatActive && <span>Chat active</span>}
          </div>
        </div>
      </div>
      <div className="sm:hidden gap-4 w-full flex justify-between py-4">
        <span className="bg-transparent text-dashboard-secondary text-lg cursor-pointer">
          Status: {escrow.status}
        </span>
        <button
          type="button"
          onClick={() => back()}
          className="bg-dashboard-secondary text-dashboard-primary text-sm px-4 rounded justify-center items-center font-bold capitalize flex py-2"
        >
          &larr; Back
        </button>
      </div>
    </>
  );
}
