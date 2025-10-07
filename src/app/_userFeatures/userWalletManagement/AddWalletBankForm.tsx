'use client';

import { FaCheckCircle, FaSearch, FaUniversity } from 'react-icons/fa';
import SpinnerMini from '../../_components/SpinnerMini';
import { Button } from '../../_components/DashboardBtn';
import { Fragment, useMemo, useState } from 'react';
import useBankList from './useBankList';
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from '@headlessui/react';
import { Bank } from '@/app/_types/userDashboardServicesTypes';
import { Controller, useForm } from 'react-hook-form';
import useResolveBank from './useResolveBank';
import toast from 'react-hot-toast';
import useAddUserBank from './useAddUserBank';

interface AddBankFormProps {
  bank: Bank | null;
  accountNumber: number | string;
}

export const AddWalletBankForm = () => {
  const [query, setQuery] = useState<string>('');
  const [isBankFormOpen, setIsBankFormOpen] = useState(false);
  const [isUserBankVerified, setIsUserBankVerified] = useState(false);

  const {
    watch,
    control,
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<AddBankFormProps>({
    defaultValues: {
      bank: null,
      accountNumber: '',
    },
  });

  const { allBanksList } = useBankList();

  const {
    resolveUserBank,
    isResolvingUserBank,
    resolvedUserBankData,
    resolveUserBankError,
  } = useResolveBank();

  const { addUserBank, isAddingUserBank } = useAddUserBank();

  const filteredBanks = useMemo(
    () =>
      query.trim() === ''
        ? allBanksList
        : allBanksList.filter((bank) =>
            bank.name.toLowerCase().includes(query.toLowerCase()),
          ),
    [allBanksList, query],
  );

  const onResolve = (bankCode: string, accountNumber: string) => {
    resolveUserBank(
      { bankCode, accountNumber },
      {
        onSuccess: () => setIsUserBankVerified(true),
        onError: () => setIsUserBankVerified(false),
      },
    );
  };

  const onSubmit = (data: AddBankFormProps) => {
    if (!data.bank) {
      return;
    }

    if (!isUserBankVerified) {
      toast.error('Please verify your account first.');
      return;
    }

    addUserBank({
      bankCode: data.bank?.code,
      accountNumber: data.accountNumber.toString(),
    });
  };

  return (
    <section className='relative w-full bg-db-surface border border-db-border p-8 sm:p-10 rounded-2xl shadow-sm my-8'>
      <div className='relative z-[10]'>
        {/* Ensure content is above the dreamy background */}
        <h2 className='lg:text-2xl text-xl font-extrabold text-db-primary mb-8 flex items-center gap-3'>
          <FaUniversity className='text-db-secondary text-3xl' />{' '}
          {/* Changed icon color to purple */}
          Add/Update Bank Account
        </h2>

        <form
          className='flex flex-col gap-y-6 sm:gap-y-7'
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Bank Dropdown */}
          <div>
            <label
              htmlFor='bankSelect'
              className='block text-sm sm:text-base font-medium text-db-text-secondary mb-2'
            >
              Bank
            </label>

            <Controller
              name='bank'
              control={control}
              rules={{ required: 'Please select a bank' }}
              render={({ field }) => (
                <Combobox
                  value={field.value}
                  onChange={(bank) => {
                    field.onChange(bank);
                    setIsBankFormOpen(false);
                    trigger('bank');
                  }}
                >
                  <div className='relative'>
                    <div className='relative w-full cursor-default rounded-xl border border-db-border bg-db-background text-left focus-within:ring-2 focus-within:ring-purple-400'>
                      <ComboboxInput
                        className='w-full pl-9 sm:pl-10 pr-4 bg-db-background border border-db-border rounded-xl py-2.5 sm:py-3 text-sm sm:text-base focus:ring-2 focus:ring-purple-400 focus:border-db-primary outline-none transition-all duration-200 text-db-text-primary'
                        displayValue={(bank: Bank) => bank?.name || ''}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder='Search or select a bank...'
                        onFocus={() => setIsBankFormOpen(true)}
                        onBlur={() => setIsBankFormOpen(false)}
                      />
                      <FaSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm sm:text-base' />
                    </div>

                    <Transition
                      as={Fragment}
                      show={isBankFormOpen}
                      leave='transition ease-in duration-100'
                      leaveFrom='opacity-100'
                      leaveTo='opacity-0'
                    >
                      <ComboboxOptions
                        static
                        className='absolute mt-1 max-h-60 w-full overflow-auto rounded-xl bg-db-surface border border-db-border py-1 text-base shadow-lg ring-1 ring-purple-400 ring-opacity-5 focus:outline-none sm:text-sm z-[50]'
                      >
                        {filteredBanks.length > 0 ? (
                          filteredBanks.map((bank) => (
                            <ComboboxOption
                              key={bank.id}
                              value={bank}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 px-4 ${
                                  active
                                    ? 'bg-purple-100 text-purple-900'
                                    : 'text-db-text-primary'
                                }`
                              }
                              onClick={() => setIsBankFormOpen(false)}
                            >
                              {bank.name}
                            </ComboboxOption>
                          ))
                        ) : (
                          <div className='cursor-default select-none py-2 px-4 text-db-text-secondary'>
                            No banks found
                          </div>
                        )}
                      </ComboboxOptions>
                    </Transition>
                  </div>
                </Combobox>
              )}
            />

            {errors.bank?.message && (
              <span className='text-red-600 text-xs sm:text-sm mt-1 block'>
                {errors.bank.message}
              </span>
            )}
          </div>

          {/* Account Number */}
          <div>
            <label
              htmlFor='accountNumber'
              className='block text-sm sm:text-base font-medium text-db-text-secondary mb-2'
            >
              Account Number
            </label>
            <input
              id='accountNumber'
              type='number'
              disabled={isResolvingUserBank}
              className={`w-full bg-db-background border ${
                errors.accountNumber ? 'border-red-500' : 'border-db-border'
              } rounded-xl py-2.5 sm:py-3 px-4 text-sm sm:text-base focus:ring-2 focus:ring-purple-400 focus:border-db-primary transition-all duration-200 text-db-text-primary`}
              placeholder='e.g., 0123456789'
              maxLength={10}
              {...register('accountNumber', {
                required: 'Please input an account number',
                validate: (val) =>
                  val.toString().length === 10 ||
                  'Please input a valid account number',
              })}
              onChange={(e) => {
                const value = e.target.value;
                const bank = watch('bank');
                if (value.length === 10 && !errors.accountNumber && bank) {
                  const bankCode = watch('bank')?.code;
                  setValue('accountNumber', value, { shouldValidate: true });
                  if (bankCode) onResolve(bankCode, value);
                } else {
                  setIsUserBankVerified(false);
                }
              }}
            />
            {errors.accountNumber?.message && (
              <span className='text-red-600 text-xs sm:text-sm mt-1 block'>
                {errors.accountNumber.message}
              </span>
            )}
          </div>

          {/* ✅ Verification Status */}
          <div className=' flex items-center gap-2 text-sm'>
            {isResolvingUserBank && (
              <span className='text-db-text-secondary italic'>
                Verifying...
              </span>
            )}

            {resolvedUserBankData?.accountInfo && (
              <div className='w-full flex items-center justify-between gap-2 text-green-600 font-medium'>
                <div className='flex items-start gap-1'>
                  <div className=' bg-green-500 rounded-full text-white text-lg flex items-center justify-center'>
                    <FaCheckCircle />
                  </div>
                  <div className='flex gap-1 items-start flex-col'>
                    <span className='text-lg font-bold'>Account Name:</span>
                    <span className='text-base font-black'>
                      {
                        resolvedUserBankData.accountInfo.accountInfo
                          .account_name
                      }
                    </span>
                  </div>
                </div>
                <div className='flex gap-1 items-start flex-col'>
                  <span className='text-lg font-bold'>Bank Name:</span>
                  <span className='text-base font-black'>
                    {watch('bank')?.name}
                  </span>
                </div>
                <div className='flex gap-1 items-start flex-col'>
                  <span className='text-lg font-bold'>Account Number:</span>
                  <span className='text-base font-black'>
                    {
                      resolvedUserBankData.accountInfo.accountInfo
                        .account_number
                    }
                  </span>
                </div>
              </div>
            )}

            {resolveUserBankError && (
              <span className='text-red-600 text-xs sm:text-sm'>
                Couldn&apos;t verify account
              </span>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type='submit'
            disabled={!isUserBankVerified || isAddingUserBank}
            className='w-full'
            variant='secondary'
            size='lg'
          >
            {isAddingUserBank && <SpinnerMini />}
            {isAddingUserBank ? 'Saving...' : 'Save Bank Info'}
          </Button>
        </form>
      </div>
    </section>
  );
};
