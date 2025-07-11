import Button from '@/app/_components/Button';
import { MdOutlinePayment } from 'react-icons/md';

export default function UserEscrowPaymentStatus({
  paymentStatus,
  escrowfeepayment,
  status,
  type,
  openPaymentModal,
}: {
  paymentStatus: string;
  escrowfeepayment: string;
  status: 'active' | 'pending' | 'rejected' | 'disputed';
  type: 'buy' | 'sell';
  openPaymentModal: () => void;
}) {
  return (
    <div className='w-full border border-dashboard-border rounded-lg overflow-hidden'>
      <table className='w-full border-collapse'>
        <thead className='bg-dashboard-border'>
          <tr className='border-b border-dashboard-border'>
            <th className='py-2 px-6 text-start text-gray-700 font-light'>
              Payment Status
            </th>
            <th className='py-2 px-6 text-end flex justify-end'>
              {type === 'buy' &&
                status === 'active' &&
                paymentStatus === 'unpaid' && (
                  <Button
                    color='bg-transparent text-dashboard-secondary'
                    style='flex border border-secondary items-center gap-2 hover:bg-dashboard-secondary hover:text-white font-light lg:font-bold'
                    padding='px-2 py-1'
                    textSize='lg:text-md text-sm'
                    onClick={openPaymentModal}
                  >
                    <span className='hidden lg:block'>Make Payment</span>
                    <span className='block lg:hidden'>Pay</span>
                    <span>
                      <MdOutlinePayment
                        fontSize={'1.2rem'}
                        // className='hidden'
                      />
                    </span>
                  </Button>
                )}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className='border-b border-dashboard-border'>
            <td className='py-2 px-6'>Payment Status</td>
            <td className='py-2 pr-2 capitalize text-end'>{paymentStatus}</td>
          </tr>
          <tr className='border-b border-dashboard-border'>
            <td className='py-2 px-6'>Escrow Fee Payer</td>
            <td className='py-2 pr-2 capitalize text-end'>
              {escrowfeepayment}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
