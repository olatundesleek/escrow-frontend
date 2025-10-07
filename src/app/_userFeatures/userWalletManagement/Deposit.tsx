import Button from '@/app/_components/Button';
import {
  formatCurrencyInput,
  parseCurrencyFormatted,
  formatCurrency,
} from '@/app/_utils/helpers';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useDeposit from './useDeposit';
import { UserBaseWallet } from '@/app/_types/userDashboardServicesTypes';

interface DepositProps {
  wallet: UserBaseWallet;
}

interface DepositFormInputs {
  amount: number;
}

export default function Deposit({ wallet }: DepositProps) {
  const [amountDisplay, setamountDisplay] = useState<string>('');
  const { deposit, isDepositPending } = useDeposit();

  const {
    setValue,
    handleSubmit,
    formState: { errors },
    register,
    trigger,
  } = useForm<DepositFormInputs>({
    defaultValues: {
      amount: 0,
    },
  });

  register('amount', {
    required: 'Please input amount',
    min: { value: 1, message: 'Amount must be greater than 0' },
  });

  useEffect(() => {
    register('amount', {
      required: 'Please input amount',
      min: { value: 1000, message: 'Amount must be from 1000 and above' },
    });
  });

  const { availableBalance } = wallet;

  const onSubmit = function (data: DepositFormInputs) {
    deposit(data);
  };

  return (
    <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
      {/* Display payment summary */}
      <div className='bg-dashboard-border p-4 rounded-lg'>
        <div className='text-sm space-y-1'>
          <p>
            <span className='font-medium'>Current balance:</span>{' '}
            {formatCurrency(availableBalance)}
          </p>
        </div>
      </div>

      <div>
        <label htmlFor='amount' className='block text-sm font-black mb-2'>
          Enter Amount:
        </label>
        <input
          type='text'
          inputMode='decimal'
          placeholder='₦0.00'
          id='amount'
          className={`border border-dashboard-border w-full p-2 rounded-lg font-medium outline-dashboard-secondary outline-0 focus-within:border-0 focus-within:ring-2 focus:ring-secondary bg-white ${
            errors.amount ? 'border-error' : ''
          }`}
          value={amountDisplay}
          onChange={(e) => {
            const value = parseCurrencyFormatted(e.target.value);
            setamountDisplay(value.toString());
            setValue('amount', parseFloat(value.toString()), {
              shouldValidate: true,
            });
            trigger('amount');
          }}
          onBlur={() => {
            if (!amountDisplay) return;
            const value = formatCurrencyInput(amountDisplay);
            setamountDisplay(value);
          }}
          onFocus={(e) => {
            const value = parseCurrencyFormatted(e.target.value);
            setamountDisplay(value.toString());
          }}
        />
        {errors.amount && (
          <span className='text-error text-sm'>{errors.amount.message}</span>
        )}
      </div>

      {/* Submit */}
      <div className='flex justify-end items-center gap-4'>
        <Button color='bg-dashboard-border text-black' type='button'>
          Cancel
        </Button>
        <Button
          color='bg-dashboard-secondary text-dashboard-primary'
          type='submit'
          isLoading={isDepositPending}
        >
          Proceed to Deposit
        </Button>
      </div>
    </form>
  );
}
