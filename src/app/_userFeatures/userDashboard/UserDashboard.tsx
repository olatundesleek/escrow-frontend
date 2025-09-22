"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// Hooks
import useUserDashboard from "./useUserDashboard";
import useGetUsersTransactions from "../userTransactions/useGetUsersTransactions";

// Components
import UserDashboardPageTitle from "@/app/_components/UserDashboardPageTitle";
import WelcomeHeader from "@/app/_components/WelcomeHeader";
import TransactionChart from "@/app/_components/TransactionChart";
import FullPageLoader from "@/app/_components/FullPageLoader";
import UserBalanceCard from "@/app/_components/UserBalanceCard";
import UserDetailCard from "@/app/_components/UserDetailCard";
import UserTransactionsTable from "../userTransactions/UserTransactionsTable";
import Modal from "@/app/_components/Modal";
import Deposit from "../userWalletManagement/Deposit";

// Icons
import { HiOutlineCash, HiOutlineCurrencyDollar } from "react-icons/hi";
import { IoHourglassOutline } from "react-icons/io5";
import { TbMessage2Bolt } from "react-icons/tb";

export default function UserDashboard() {
  const { push } = useRouter();

  const { userDashboardData, isLoadindUserDashboardData, userDashboardError } =
    useUserDashboard();

  const {
    isLoadingUserTransactions,
    userTransactionsError,
    userTransactionsData,
  } = useGetUsersTransactions({ limit: 5 });

  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean;
    title: string;
  }>({
    isOpen: false,
    title: "",
  });

  const handleOpenDepositModal = () => {
    setPaymentModal({ isOpen: true, title: "Deposit" });
  };

  /* ----------------- Loading & Error States ----------------- */
  if (isLoadindUserDashboardData || isLoadingUserTransactions) {
    return <FullPageLoader />;
  }

  if (userDashboardError) {
    toast.error(userDashboardError.message);
    return null;
  }

  if (userTransactionsError) {
    toast.error(userTransactionsError.message);
    return null;
  }

  if (!userDashboardData || !userDashboardData.dashboardDetails?.data) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center p-4 text-center">
        <UserDashboardPageTitle title="Dashboard" />
        <p className="mt-8 text-lg font-medium text-db-text-primary">
          No dashboard data was found.
        </p>
        <p className="text-sm text-db-text-secondary">
          Please try refreshing the page.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 rounded-lg shadow-lg bg-db-primary text-white font-semibold hover:bg-db-primary-hover transition-colors"
        >
          Reload Dashboard
        </button>
      </div>
    );
  }

  /* ----------------- Destructure Dashboard Data ----------------- */
  const {
    dashboardDetails: {
      data: { disputes, escrows, transactions, wallet },
    },
  } = userDashboardData;

  const pendingEscrows = escrows.filter((e) => e.status === "pending").length;

  /* ----------------- Render ----------------- */
  return (
    <div className="w-full space-y-12 pb-16 fade-in">
      {/* Deposit Modal */}
      <Modal
        isOpen={paymentModal.isOpen}
        title={paymentModal.title}
        onClose={() => setPaymentModal({ isOpen: false, title: "" })}
        width="w-md lg:max-w-3xl max-w-lg"
      >
        <Deposit wallet={wallet} />
      </Modal>

      {/* Page Title */}
      <UserDashboardPageTitle title="Dashboard" />

      {/* ----------------- Welcome & Metrics ----------------- */}
      <section className="space-y-8">
        <WelcomeHeader user={userDashboardData.dashboardDetails.data} />

        {/* Key Metrics Section */}
        <section className="space-y-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-db-text-primary">
            Escrows
          </h2>
          <div className="grid grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            <UserDetailCard
              cardColor="bg-purple-600"
              title="Total Escrows"
              value={escrows.length}
              icon={<HiOutlineCash className="text-white" />}
              onClick={() => push("/dashboard/escrows")}
            />
            <UserDetailCard
              cardColor="bg-green-600"
              title="Completed Escrows"
              value={transactions.length}
              icon={<HiOutlineCurrencyDollar className="text-white" />}
              onClick={() => push("/dashboard/escrows?status=completed")}
            />
            <UserDetailCard
              cardColor="bg-orange-600"
              title="Pending Escrows"
              value={pendingEscrows}
              icon={
                <IoHourglassOutline className="animate-spin-slow text-white" />
              }
              onClick={() => push("/dashboard/escrows?status=pending")}
            />
            <UserDetailCard
              cardColor="bg-blue-600"
              title="Disputes"
              value={disputes.length}
              icon={<TbMessage2Bolt className="text-white" />}
              onClick={() => push("/dashboard/escrows?status=disputed")}
            />
          </div>
        </section>

        {/* Balance Card */}
        <UserBalanceCard
          wallet={wallet}
          pendingEscrows={pendingEscrows}
          transactions={transactions}
          disputes={disputes}
          escrows={escrows}
          onDeposit={handleOpenDepositModal}
          onWithdraw={() => toast.success("Withdrawal feature coming soon")}
        />
      </section>

  {/* ----------------- Activity Overview ----------------- */}
<section className="flex flex-col gap-6">
  {/* Section Header */}
  <div className="flex flex-col gap-2">
    <h2 className="text-2xl font-bold text-db-text-primary">
      Activity Overview
    </h2>
    <p className="text-db-text-secondary text-sm sm:text-base">
      Track your recent escrow transactions and overall activity. See detailed records and visual trends to stay on top of your account.
    </p>
  </div>

  {/* Transactions Table */}
  <div className="overflow-x-auto rounded-xl shadow-sm bg-db-surface">
    <UserTransactionsTable
      transactionsData={userTransactionsData?.data || []}
      variant="dashboard"
    />
  </div>

  {/* Activity Chart */}
  <div className="p-4 bg-db-surface rounded-xl shadow-sm">
    <TransactionChart />
  </div>
</section>

    </div>
  );
}
