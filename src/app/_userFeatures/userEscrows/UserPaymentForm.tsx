import Button from '@/app/_components/Button';
import { useState } from 'react';
import toast from 'react-hot-toast';
import usePayEscrowBill from './usePayEscrowBill';

export default function UserPaymentForm({
  amount,
  escrowId,
  feePayer,
  closePaymentModal,
}: {
  amount: number;
  escrowId: string;
  feePayer: string;
  closePaymentModal: () => void;
}) {
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'gateway' | ''>(
    '',
  );
  const { payEscrowBill, isPayingEscrowBill } =
    usePayEscrowBill(closePaymentModal);

  const handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!paymentMethod) {
      toast.error('Please select a payment method.');
      return;
    }

    payEscrowBill({ escrowId, method: paymentMethod as 'wallet' | 'gateway' });
  };

  return (
    <form className='space-y-4' onSubmit={handleSubmit}>
      {/* Display payment summary */}
      <div className='bg-db-border p-4 rounded-lg'>
        <h3 className='font-bold text-lg mb-2'>Payment Summary</h3>
        <div className='text-sm space-y-1'>
          <p>
            <span className='font-medium'>Amount:</span>{' '}
            {amount.toLocaleString('en-NG', {
              style: 'currency',
              currency: 'NGN',
              minimumFractionDigits: 2,
            })}
          </p>
          <p>
            <span className='font-medium'>Fee Payer:</span>{' '}
            <span className='capitalize'>{feePayer}</span>
          </p>
          <p>
            <span className='font-medium'>Escrow ID:</span> {escrowId}
          </p>
        </div>
      </div>

      {/* Payment method selection */}
      <div>
        <label className='block text-sm font-bold mb-2 text-dashboard-secondary'>
          Select Payment Method
        </label>
        <div className='flex gap-4'>
          {['wallet', 'gateway'].map((method) => (
            <button
              type='button'
              key={method}
              onClick={() => setPaymentMethod(method as 'wallet' | 'gateway')}
              className={`px-4 py-2 rounded-lg border text-sm capitalize transition-all duration-1000 cursor-pointer  hover:font-bold ${
                paymentMethod === method
                  ? 'bg-dashboard-secondary text-white border-dashboard-secondary'
                  : 'bg-white text-dashboard-secondary border-dashboard-border'
              }`}
            >
              {method === 'gateway' ? 'Card / Transfer' : 'Wallet Balance'}
            </button>
          ))}
        </div>
      </div>

      {/* Submit */}
      <Button
        color='bg-dashboard-secondary text-dashboard-primary w-full'
        type='submit'
        isLoading={isPayingEscrowBill}
      >
        Proceed to Pay
      </Button>
    </form>
  );
}
