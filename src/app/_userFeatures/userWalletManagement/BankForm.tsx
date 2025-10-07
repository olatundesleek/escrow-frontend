'use client';
import {
  // FaCheckCircle,
  // FaTimesCircle,
  FaUniversity,
  FaUser,
  FaHashtag,
} from 'react-icons/fa';
import SpinnerMini from '../../_components/SpinnerMini';
import { Button } from '../../_components/DashboardBtn';

// type BankFormProps = {};

export const BankForm = () => {
  return (
    <section className='relative overflow-hidden w-full bg-db-surface border border-db-border p-8 sm:p-10 rounded-2xl shadow-sm my-8'>
      <div className='relative z-10'>
        <h2 className='lg:text-2xl text-xl font-extrabold text-db-primary mb-8 flex items-center gap-3'>
          <FaUniversity className='text-db-secondary text-3xl' />
          {/* Changed icon color to purple */}
          Withdraw to Bank
        </h2>

        <div className='space-y-7'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 text-base'>
            {/* Bank Info Cards */}
            <div className='flex items-center gap-3 bg-db-background rounded-xl p-4 border border-db-border hover:shadow-sm'>
              <FaUniversity className='text-db-secondary text-xl' />
              {/* Larger icon */}
              <div>
                <span className='block text-xs text-db-text-secondary'>
                  Bank Name
                </span>
                <span className='text-db-primary font-semibold'>N/A</span>
              </div>
            </div>
            <div className='flex items-center gap-3 bg-db-background rounded-xl p-4 border border-db-border hover:shadow-sm'>
              <FaHashtag className='text-db-secondary text-xl' />
              {/* Larger icon */}
              <div>
                <span className='block text-xs text-db-text-secondary'>
                  Account Number
                </span>
                <span className='text-db-primary font-semibold'>N/A</span>
              </div>
            </div>
            <div className='flex items-center gap-3 bg-db-background rounded-xl p-4 sm:col-span-2 border border-db-border hover:shadow-sm'>
              <FaUser className='text-db-secondary text-xl' />{' '}
              {/* Larger icon */}
              <div>
                <span className='block text-xs text-db-text-secondary'>
                  Account Name
                </span>
                <span className='text-db-primary font-semibold'>N/A</span>
              </div>
            </div>
          </div>

          {/* Withdraw Amount Input */}
          <div>
            <label
              htmlFor='withdrawAmount'
              className='block text-sm font-medium text-db-text-secondary mb-2'
            >
              Withdraw Amount
            </label>
            <input
              id='withdrawAmount'
              type='text'
              placeholder='₦0.00'
              className='w-full bg-db-background text-db-text-primary border border-db-border rounded-xl p-4 text-lg focus:ring-2 focus:ring-db-primary focus:border-db-primary outline-none transition-all duration-200' // Adjusted border/focus color, added shadow
            />
          </div>

          {/* Withdraw Message */}
          {/* {withdrawMessage && (
            <div
              className={`sm:text-base text-sm font-medium flex items-center gap-2 p-3 rounded-lg shadow-sm ${
                withdrawMessage.type === 'success'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {withdrawMessage.type === 'success' ? (
                <FaCheckCircle className='text-xl' /> // Larger icon
              ) : (
                <FaTimesCircle className='text-xl' /> // Larger icon
              )}
              {withdrawMessage.text}
            </div>
          )} */}

          {/* Withdraw Button */}
          <Button
            disabled={true}
            variant='secondary'
            size='lg'
            className='w-full' // Enhanced button colors, shadow, and transition
          >
            {false && <SpinnerMini />}
            {false ? 'Processing...' : 'Withdraw to Bank'}
          </Button>
        </div>
      </div>
    </section>
  );
};
