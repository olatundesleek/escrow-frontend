"use client";

import toast from "react-hot-toast";
import useUserDashboard from "./useUserDashboard";
import { HiOutlineCash, HiOutlineCurrencyDollar } from "react-icons/hi";
import { TbMessage2Bolt, TbWallet, TbWalletOff } from "react-icons/tb";
import { IoReload, IoAdd, IoRemove } from "react-icons/io5";
import { LuPiggyBank } from "react-icons/lu";
import { RiVisaLine } from "react-icons/ri";
import { CiNoWaitingSign } from "react-icons/ci";

import UserDashboardPageTitle from "@/app/_components/UserDashboardPageTitle";
import WelcomeHeader from "@/app/_components/WelcomeHeader";
import UserDetailCard from "@/app/_components/UserDetailCard";
import WalletDetailsCard from "@/app/_components/WalletDetailsCard";
import TransactionChart from "@/app/_components/TransactionChart";
import TransactionTable from "@/app/_components/TransactionTable";
import FullPageLoader from "@/app/_components/FullPageLoader";

export default function UserDashboard() {
  const { userDashboardData, isLoadindUserDashboardData, userDashboardError } =
    useUserDashboard();

  if (isLoadindUserDashboardData) return <FullPageLoader />;

  if (userDashboardError) {
    toast.error(userDashboardError.message);
    return null;
  }

  // Handle case where userDashboardData might be null or incomplete after loading
  if (!userDashboardData || !userDashboardData.dashboardDetails?.data) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center text-xl text-gray-700 p-4 text-center">
        <UserDashboardPageTitle />
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
      data: { disputes, escrows, transactions, wallet }, // Destructure 'user' specifically for WelcomeHeader
    },
  } = userDashboardData;

  const pendingEscrows = escrows.filter((e) => e.status === "pending").length;

  return (
    <div className="w-full space-y-12 pb-16 fade-in">
      <UserDashboardPageTitle title="Dashboard" />
      {/* Pass the entire user object directly */}
      <WelcomeHeader user={userDashboardData.dashboardDetails.data} />

      {/* --- Financial Overview Section --- */}
      <section className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-800">Financial Overview</h2>

        {/* Main Balance Card (Elevated & Refined) */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-700 to-indigo-900 p-8 text-white shadow-2xl transition-all duration-300 hover:shadow-purple-500/30">
          {/* Enhanced Subtle background graphics with more distinct shapes */}
          <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-purple-500 opacity-15 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-12 -left-12 h-56 w-56 rounded-full bg-blue-400 opacity-10 blur-3xl pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-white opacity-5 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col justify-between h-full">
            {/* Card Header and Balance */}
            <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-start">
              <div>
                <p className="mb-2 text-base text-white/80 font-medium">
                  Current Balance
                </p>
                <h2 className="text-5xl font-extrabold tracking-tight leading-none md:text-6xl">
                  ${(wallet.balance || 0).toLocaleString()}.
                  <span className="text-3xl text-white/70">00</span>
                </h2>
              </div>
              <div className="mt-6 flex items-center gap-2 rounded-full bg-white/20 px-5 py-2.5 text-base font-medium shadow-lg backdrop-blur-md sm:mt-0">
                <RiVisaLine className="h-6 w-6 text-white/95" />
                <span className="tracking-wide text-white/95">Escrow Card</span>
              </div>
            </div>

            {/* Transaction Buttons */}
            <div className="mb-8 flex flex-col sm:flex-row justify-around gap-4">
              <button className="flex-1 flex items-center justify-center gap-3 rounded-xl bg-white/15 px-4 py-4 text-base font-semibold shadow-xl transition-all duration-300 hover:bg-white/25 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-white/50">
                <IoAdd className="h-6 w-6 text-green-300" />
                Deposit
              </button>
              <button className="flex-1 flex items-center justify-center gap-3 rounded-xl bg-white/15 px-4 py-4 text-base font-semibold shadow-xl transition-all duration-300 hover:bg-white/25 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-white/50">
                <IoRemove className="h-6 w-6 text-red-300" />
                Withdraw
              </button>
            </div>

            {/* Footer */}
            <div className="pt-4 text-center text-sm text-white/70">
              Your financial details at a glance.
            </div>
          </div>
        </div>
        {/* Wallet Details Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <WalletDetailsCard
            title="Total Wallet"
            value={wallet.balance || 0}
            color={"text-green-800"}
            bg="bg-green-50 text-green-800 border-green-200"
            icon={<TbWallet className="text-green-600" />}
          />
          <WalletDetailsCard
            title="Available Balance"
            value={wallet.balance - wallet.locked || 0}
            color={"text-blue-800"}
            bg="bg-blue-50 text-blue-800 border-blue-200"
            icon={<LuPiggyBank className="text-blue-600" />}
          />
          <WalletDetailsCard
            title="Locked Funds"
            value={wallet.locked || 0}
            color={"text-red-800"}
            bg="bg-red-50 text-red-800 border-red-200"
            icon={<TbWalletOff className="text-red-600" />}
          />
        </div>
      </section>
      {/* --- Key Metrics Section --- */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Key Metrics</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          <UserDetailCard
            cardColor="bg-purple-500"
            title="Total Escrows"
            value={escrows.length}
            icon={<HiOutlineCash className="text-purple-600" />}
            bg="bg-purple-50 border border-purple-200"
          />
          <UserDetailCard
            cardColor="bg-green-500"
            title="Total Transactions"
            value={transactions.length}
            icon={<HiOutlineCurrencyDollar className="text-green-600" />}
            bg="bg-green-50 border border-green-200"
          />
          <UserDetailCard
            cardColor="bg-orange-500"
            title="Pending Escrows"
            value={pendingEscrows}
            icon={<IoReload className="animate-spin-slow text-orange-600" />}
            bg="bg-orange-50 border border-orange-200"
          />
          <UserDetailCard
            cardColor="bg-red-500"
            title="Disputes"
            value={disputes.length}
            icon={<TbMessage2Bolt className="text-red-600" />}
            bg="bg-red-50 border border-red-200"
          />
        </div>
      </section>
      {/* --- Transaction History and Charts --- */}
      <section className="flex flex-col gap-8">
        <h2 className="text-2xl font-bold text-gray-800">Activity Overview</h2>
        <TransactionChart />
        <TransactionTable />
      </section>
      {/* --- Recent Escrows Table --- */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Recent Escrows</h2>
        {escrows.length > 0 ? (
          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-lg">
            <table className="min-w-full text-left text-sm divide-y divide-gray-200">
              <thead className="bg-gray-50 uppercase text-gray-600">
                <tr>
                  <th className="px-6 py-3 font-semibold tracking-wider">
                    Escrow ID
                  </th>
                  <th className="px-6 py-3 font-semibold tracking-wider text-right">
                    Amount
                  </th>
                  <th className="px-6 py-3 font-semibold tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 font-semibold tracking-wider whitespace-nowrap">
                    Created Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {escrows.slice(0, 5).map((escrow) => (
                  <tr key={escrow._id} className="transition hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-indigo-700">
                      {escrow._id || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-right text-gray-800 font-medium">
                      $
                      {(escrow.amount || 0).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                          escrow.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : escrow.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {escrow.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                      {new Date(escrow.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex items-center justify-center p-6 text-gray-500 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
            <CiNoWaitingSign className="h-6 w-6 mr-2 text-gray-400" />
            <p className="text-sm">No recent escrows to display.</p>
          </div>
        )}
      </section>
    </div>
  );
}
