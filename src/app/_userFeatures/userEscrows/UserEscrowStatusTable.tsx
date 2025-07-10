import ButtonIcon from '@/app/_components/ButtonIcon';
import { IoCheckmarkDone, IoCloseSharp } from 'react-icons/io5';

export default function UserEscrowStatusTable({
  status,
  paymentStatus,
  escrowfeepayment,
  openAcceptConfirmModal,
  openRejectConfirmModal,
  currentUserId,
  creator,
}: {
  status: string;
  paymentStatus: string;
  escrowfeepayment: string;
  openAcceptConfirmModal: () => void;
  openRejectConfirmModal: () => void;
  currentUserId: string;
  creator: string;
}) {
  return (
    <div className='w-full border border-dashboard-border rounded-lg overflow-hidden'>
      <table className='w-full border-collapse'>
        <thead className='bg-dashboard-border'>
          <tr className='border-b border-dashboard-border'>
            <th className='py-2 px-6 text-start text-gray-700 font-light'>
              Status
            </th>
            <th className='py-2 px-6 text-start hidden lg:block'></th>
            <th className='py-2 px-6 text-start'>
              {status === 'pending' && currentUserId !== creator && (
                <span className='flex lg:hidden justify-end'>
                  <ButtonIcon
                    style='rounded-full font-black lg:text-2xl border-0 text-green-500  hover:bg-transparent hover:text-green-500 flex flex-col items-center py-0'
                    onClick={openAcceptConfirmModal}
                  >
                    <IoCheckmarkDone />
                    <span className='font-black text-xs'>Accept</span>
                  </ButtonIcon>
                  <ButtonIcon
                    style='rounded-full lg:text-2xl border-0 text-red-500 hover:bg-transparent hover:text-red-500 flex flex-col items-center py-0'
                    onClick={openRejectConfirmModal}
                  >
                    <IoCloseSharp />

                    <span className='font-black text-xs'>Reject</span>
                  </ButtonIcon>
                </span>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className='border-b border-dashboard-border'>
            <td className='py-2 px-6'>Escrow Status</td>
            <td className='py-2 pr-2 capitalize flex justify-end text-end'>
              {status}
            </td>
            {status === 'pending' && currentUserId !== creator && (
              <td className='py-2 px-6 capitalize lg:flex justify-start lg:justify-end hidden'>
                <ButtonIcon
                  style='rounded-full font-black lg:text-2xl border-0 text-green-500  hover:bg-transparent hover:text-green-500 flex flex-col items-center py-0'
                  onClick={openAcceptConfirmModal}
                >
                  <IoCheckmarkDone />
                  <span className='font-black text-xs'>Accept</span>
                </ButtonIcon>
                <ButtonIcon
                  style='rounded-full lg:text-2xl border-0 text-red-500 hover:bg-transparent hover:text-red-500 flex flex-col items-center py-0'
                  onClick={openRejectConfirmModal}
                >
                  <IoCloseSharp />

                  <span className='font-black text-xs'>Reject</span>
                </ButtonIcon>
              </td>
            )}
          </tr>
          <tr className='border-b border-dashboard-border'>
            <td className='py-2 px-6'>Payment Status</td>
            <td className='py-2 pr-2 capitalize flex justify-end text-end'>
              {paymentStatus}
            </td>
          </tr>
          <tr className='border-b border-dashboard-border'>
            <td className='py-2 px-6'>Escrow Fee Payment</td>
            <td className='py-2 pr-2 capitalize flex justify-end text-end'>
              {escrowfeepayment}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
