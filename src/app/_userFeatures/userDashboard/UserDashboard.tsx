'use client';

import toast from 'react-hot-toast';

import UserDashboardPageTitle from '@/app/_components/UserDashboardPageTitle';
import TransactionChart from '@/app/_components/TransactionChart';
import FullPageLoader from '@/app/_components/FullPageLoader';
import useUserDashboard from './useUserDashboard';
import UserDetailCard from '@/app/_components/UserDetailCard';
import { TbMessage2Bolt, TbWallet, TbWalletOff } from 'react-icons/tb';
import { HiOutlineCash, HiOutlineCurrencyDollar } from 'react-icons/hi';
import { IoReload } from 'react-icons/io5';
import WalletDetailsCard from '@/app/_components/WalletDetailsCard';
import { LuPiggyBank } from 'react-icons/lu';
import Image from 'next/image';
import useGetUsersTransactions from '../userTransactions/useGetUsersTransactions';
import UserTransactionsTable from '../userTransactions/UserTransactionsTable';

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

  if (userDashboardError) return toast.error(userDashboardError.message);
  if (userTransactionsError) return toast.error(userTransactionsError.message);

  if (!userDashboardData)
    return (
      <div className='w-full h-screen flex flex-col items-center text-2xl text-dashboard-secondary'>
        <UserDashboardPageTitle />
        <p className='text-center mt-8'> No data was found!</p>
      </div>
    );

  const {
    dashboardDetails: {
      data: {
        disputes,
        escrows,
        transactions,
        kyc: { status },

        wallet,
      },
    },
  } = userDashboardData;

  const pendingEscrows = escrows.reduce((acc, escrows) => {
    return escrows.status === 'pending' ? acc + 1 : acc;
  }, 0);

  return (
    <div className='flex flex-col items-center justify-center '>
      <UserDashboardPageTitle>
        <div className='lg:flex-row items-center gap-2 hidden'>
          <span
            className={`px-3 py-1 rounded-full text-xs font-extralight ${
              status === 'verified'
                ? 'bg-green-100 text-green-600'
                : 'bg-yellow-100 text-yellow-600'
            }`}
          >
            {status.toUpperCase()}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-extralight ${
              userDashboardData.dashboardDetails.data.status === 'active'
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {userDashboardData.dashboardDetails.data.status.toUpperCase()}
          </span>
        </div>
      </UserDashboardPageTitle>

      {/* ------------------ */}
      <div className='flex flex-col items-start w-full mt-5'>
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-4'>
          <div>
            <div className='flex items-start gap-1'>
              <div className='relative w-[25px] h-[25px] sm:w-[25px] sm:h-[25px] md:w-[25px] md:h-[25px] lg:w-[45px] lg:h-[45px] mx-auto lg:ml-0 lg:mr-0 hidden lg:block'>
                <Image
                  src={'/images/wave.gif'}
                  alt='waving hand'
                  fill
                  className=' object-contain'
                />
              </div>
              <div>
                <div className='flex items-start gap-1'>
                  <h1 className='lg:text-2xl font-semibold text-dashboard-secondary'>
                    Welcome back,{' '}
                    {userDashboardData.dashboardDetails.data.firstname}!
                  </h1>
                  <div className='relative w-[25px] h-[25px] sm:w-[25px] sm:h-[25px] md:w-[25px] md:h-[25px] lg:w-[45px] lg:h-[45px] lg:hidden'>
                    <Image
                      src={'/images/wave.gif'}
                      alt='waving hand'
                      fill
                      className=' object-contain'
                    />
                  </div>
                </div>
                <p className='text-sm text-dashboard-secondary'>
                  @{userDashboardData.dashboardDetails.data.username} —{' '}
                  {userDashboardData.dashboardDetails.data.email}
                </p>
                <p className='text-sm text-dashboard-secondary lg:hidden'>
                  Joined:{' '}
                  {new Date(
                    userDashboardData.dashboardDetails.data.createdAt,
                  ).toLocaleDateString()}
                </p>
                <div className='flex-col flex items-start gap-2 lg:hidden'>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      status === 'verified'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {status.toUpperCase()}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      userDashboardData.dashboardDetails.data.status ===
                      'active'
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {userDashboardData.dashboardDetails.data.status.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <p className='text-sm text-dashboard-secondary hidden lg:block'>
            Joined:{' '}
            {new Date(
              userDashboardData.dashboardDetails.data.createdAt,
            ).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* ---------------------- */}

      <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 m-7 w-full'>
        <UserDetailCard
          title='Total Escrows'
          value={escrows.length}
          icon={<HiOutlineCash className='text-dashboard-secondary' />}
          bg='bg-purple-100 border-1 border-purple-200'
        />
        <UserDetailCard
          title='Total Transactions'
          value={transactions.length}
          icon={<HiOutlineCurrencyDollar className='text-green-500' />}
          bg='bg-green-100 border-1 border-green-200'
        />
        <UserDetailCard
          title='Total Pending'
          value={pendingEscrows}
          icon={<IoReload className='text-orange-500' />}
          bg='bg-orange-100 border-1 border-orange-200'
        />
        <UserDetailCard
          title='Total Disputes'
          value={disputes.length}
          icon={<TbMessage2Bolt className=' text-red-500' />}
          bg='bg-red-100 border-1 border-red-200'
        />
      </div>

      <div className='w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 overflow-hidden shadow-md rounded-lg m-7'>
        <WalletDetailsCard
          title='Total Wallet'
          value={wallet.balance || 0}
          bg='bg-green-100 text-green-500 border-1 border-green-200'
          icon={<TbWallet />}
          border='border-r-1  border-gray-400'
        />
        <WalletDetailsCard
          title='Total Available'
          value={wallet.balance - wallet.locked || 0}
          bg='bg-orange-100 text-orange-500 border-1 border-orange-200'
          icon={<LuPiggyBank />}
          border='border-r-1  border-gray-400'
        />
        <WalletDetailsCard
          title='Total Locked'
          value={wallet.locked || 0}
          bg='bg-red-100 text-red-500 border-1 border-red-200'
          icon={<TbWalletOff />}
        />
        {/* <WalletDetailsCard
        title='Withdrawal Charges'
        value='$6.40'
        bg='bg-blue-100 text-blue-500 border-1 border-blue-200'
        icon={<BsDatabaseDash />}
      /> */}
      </div>

      <div className='w-full flex flex-col gap-4 items-center justify-between'>
        <UserTransactionsTable
          transactionsData={userTransactionsData?.data || []}
          variant='dashboard'
        />
        <TransactionChart />
      </div>
    </div>
  );
}
