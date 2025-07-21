"use client";

import toast from "react-hot-toast";
import useUserDashboard from "./useUserDashboard";
import UserDashboardPageTitle from "@/app/_components/UserDashboardPageTitle";
import WelcomeHeader from "@/app/_components/WelcomeHeader";
import TransactionChart from "@/app/_components/TransactionChart";
import FullPageLoader from "@/app/_components/FullPageLoader";
import UserBalanceCard from "@/app/_components/UserBalanceCard";
import UserDetailCard from "@/app/_components/UserDetailCard";
import { HiOutlineCash, HiOutlineCurrencyDollar } from "react-icons/hi";
import { IoReload } from "react-icons/io5";
import { TbMessage2Bolt } from "react-icons/tb";
import useGetUsersTransactions from "../userTransactions/useGetUsersTransactions";
import UserTransactionsTable from "../userTransactions/UserTransactionsTable";

export default function UserDashboard() {
  const { userDashboardData, isLoadindUserDashboardData, userDashboardError } =
    useUserDashboard();
  const {
    isLoadingUserTransactions,
    userTransactionsError,
    userTransactionsData,
  } = useGetUsersTransactions({ limit: 5 });

  if (isLoadindUserDashboardData || isLoadingUserTransactions)
    return <FullPageLoader />;

  if (userDashboardError) {
    toast.error(userDashboardError.message);
    return null;
  }

  if (userTransactionsError) {
    toast.error(userTransactionsError.message);
    return null;
  }

  // Handle case where userDashboardData might be null or incomplete after loading
  if (!userDashboardData || !userDashboardData.dashboardDetails?.data) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center text-xl text-gray-700 p-4 text-center">
        <UserDashboardPageTitle title="Dashboard" />
        <p className="mt-8 text-lg font-medium">No dashboard data was found.</p>
        <p className="text-sm text-gray-500">Please try refreshing the page.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-lg"
        >
          Reload Dashboard
        </button>
      </div>
    );
  }

  const {
    dashboardDetails: {
      data: { disputes, escrows, transactions, wallet },
    },
  } = userDashboardData;

  const pendingEscrows = escrows.filter((e) => e.status === "pending").length;

  return (
    <div className="w-full space-y-12 pb-16 fade-in">
      <UserDashboardPageTitle title="Dashboard" />

      <section className="space-y-8  bg-gradient-to-br from-blue-50 via-gray-50 to-blue-50 rounded-2xl">
        <WelcomeHeader user={userDashboardData.dashboardDetails.data} />
        {/* --- Key Metrics Section --- */}
        <section className="space-y-6 p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black mb-6 text-left">
            Escrows
          </h2>
          <div className="grid grid-cols-1 min-[360px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            <UserDetailCard
              cardColor="bg-purple-600"
              title="Total Escrows"
              value={escrows.length}
              icon={<HiOutlineCash className="text-white" />}
              bg="bg-white"
            />
            <UserDetailCard
              cardColor="bg-green-600"
              title="Total Transactions"
              value={transactions.length}
              icon={<HiOutlineCurrencyDollar className="text-white" />}
              bg="bg-white"
            />
            <UserDetailCard
              cardColor="bg-orange-600"
              title="Pending Escrows"
              value={pendingEscrows}
              icon={<IoReload className="animate-spin-slow text-white" />}
              bg="bg-white"
            />
            <UserDetailCard
              cardColor="bg-blue-600"
              title="Disputes"
              value={disputes.length}
              icon={<TbMessage2Bolt className="text-white" />}
              bg="bg-white"
            />
          </div>
        </section>

        {/* Main Balance Card (Elevated & Refined) */}
        <UserBalanceCard
          wallet={wallet}
          pendingEscrows={pendingEscrows}
          transactions={transactions}
          disputes={disputes}
          escrows={escrows}
        />
      </section>

      {/* --- Transaction History and Charts --- */}
      <section className="flex flex-col gap-8">
        <h2 className="text-2xl font-bold text-gray-800">Activity Overview</h2>
        <UserTransactionsTable
          transactionsData={userTransactionsData?.data || []}
          variant="dashboard"
        />
        <TransactionChart />
      </section>
    </div>
  );
}
