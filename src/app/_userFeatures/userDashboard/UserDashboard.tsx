'use client';

import toast from 'react-hot-toast';

import UserDashboardPageTitle from '@/app/_components/UserDashboardPageTitle';
import TransactionTable from '@/app/_components/TransactionTable';
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

export default function UserDashboard() {
  const { userDashboardData, isLoadindUserDashboardData, userDashboardError } =
    useUserDashboard();

  if (isLoadindUserDashboardData) return <FullPageLoader />;

  if (userDashboardError) return toast.error(userDashboardError.message);

  console.log(userDashboardData);

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
        <div className='flex items-center gap-2 mt-2'>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              status === 'verified'
                ? 'bg-green-100 text-green-600'
                : 'bg-yellow-100 text-yellow-600'
            }`}
          >
            {status.toUpperCase()}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
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
            <div className='flex'>
              <div className='relative w-[70px] h-[70px] sm:w-[70px] sm:h-[70px] md:w-[70px] md:h-[70px] lg:w-[45px] lg:h-[45px] mx-auto lg:ml-0 lg:mr-0'>
                <Image
                  src={'/images/wave.gif'}
                  alt='waving hand'
                  fill
                  className=' object-contain'
                />
              </div>
              <div>
                <h1 className='text-2xl font-semibold text-dashboard-secondary'>
                  Welcome back,{' '}
                  {userDashboardData.dashboardDetails.data.firstname}!
                </h1>
                <p className='text-sm text-dashboard-secondary'>
                  @{userDashboardData.dashboardDetails.data.username} —{' '}
                  {userDashboardData.dashboardDetails.data.email}
                </p>
              </div>
            </div>
          </div>
          <p className='text-sm text-dashboard-secondary'>
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
        <TransactionChart />
        <TransactionTable />
      </div>
      <div className='w-full max-w-8xl px-7 mt-10'>
        <h2 className='text-lg font-semibold mb-4 text-dashboard-secondary'>
          Recent Escrows
        </h2>
        {escrows.length > 0 ? (
          <div className='bg-white rounded-lg shadow-md overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                    Escrow Id
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                    Amount
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                    Status
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                    Created
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {escrows.slice(0, 5).map((escrow) => (
                  <tr key={escrow._id}>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {escrow._id || 'N/A'}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                      {escrow.amount || '—'}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm'>
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          escrow.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : escrow.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {escrow.status}
                      </span>
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {new Date(escrow.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className='text-dashboard-secondary text-sm'>
            No recent escrows yet.
          </p>
        )}
      </div>
    </div>
  );
}
