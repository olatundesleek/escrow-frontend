import { IoMdAdd } from 'react-icons/io';
import { IoCloseSharp } from 'react-icons/io5';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  escrowCategories,
  escrowCreatorRole,
} from '@/app/_constants/escrowCategories';
import Button from '@/app/_components/Button';
import ButtonIcon from '@/app/_components/ButtonIcon';
import { CreateEscrowFormInputs } from '@/app/_types/userDashboardServicesTypes';
import useCreateEscrow from './useCreateEscrow';
// import {
//   formatCurrencyInput,
//   parseCurrencyFormatted,
// } from '@/app/_utils/helpers';

export default function AddEscrowForm({
  handleCloseForm,
}: {
  handleCloseForm: () => void;
}) {
  const [newTerm, setNewTerm] = useState<string>('');
  const [newTermError, setNewTermError] = useState<string | null>('');
  const [isAddingNewTerm, setIsAddingNewTerm] = useState<boolean>(false);
  const [amountDisplay, setAmountDisplay] = useState<string>('');

  const termInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    register: formRegister,
    setValue,
  } = useForm<CreateEscrowFormInputs>({
    defaultValues: {
      terms: [],
    },
  });

  const { createEscrow } = useCreateEscrow();

  useEffect(() => {
    formRegister('terms', {
      validate: (value) =>
        value && value.length > 0 ? true : 'Please add at least one term',
    });
    formRegister('amount', {
      required: 'Please input item amount',
    });
  }, [formRegister]);

  const terms = watch('terms') || [];

  useEffect(() => {
    if (isAddingNewTerm && termInputRef.current) {
      termInputRef.current.focus();
    }
  }, [isAddingNewTerm]);

  const handleAddTerm = function () {
    if (!newTerm.trim()) {
      setNewTermError('Term cannot be empty');
      return;
    }
    setNewTermError(null);
    setValue('terms', [...terms, newTerm.trim()], { shouldValidate: true });
    setNewTerm('');
    setIsAddingNewTerm(false);
  };

  const handleRemoveTerm = function (index: number) {
    setValue(
      'terms',
      terms.filter((_, i) => i !== index),
      { shouldValidate: true },
    );
  };

  const handleAddTermInputKeydown = function (
    e: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTerm();
    }
  };

  const onSubmit = function (data: CreateEscrowFormInputs) {
    createEscrow(data);
    handleCloseForm();
  };

  return (
    <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex w-full gap-3 py-4 sm:flex-col md:flex-row flex-col'>
        {/* Escrow role select */}
        <div className='w-full'>
          <label
            htmlFor='creatorRole'
            className='block text-sm font-black mb-2'
          >
            I am the
          </label>
          <select
            id='creatorRole'
            defaultValue={''}
            className={`w-full ring ring-dashboard-border bg-dashboard-primary rounded-md p-2 cursor-pointer pr-8 outline-dashboard-secondary ${
              watch('creatorRole') === ''
                ? 'text-gray-500'
                : 'text-dashboard-secondary'
            } ${errors.creatorRole && 'ring ring-error'}`}
            {...register('creatorRole', {
              required: {
                value: true,
                message: 'Please select your role as the creator',
              },
              validate: (value) =>
                value !== '' || 'Please select your role as the creator',
            })}
          >
            <option
              value=''
              className='text-dashboard-border cursor-pointer'
              disabled
            >
              --Select your role--
            </option>
            {escrowCreatorRole.map(({ role }) => (
              <option
                value={role.toLowerCase()}
                className='hover:bg-dashboard-secondary'
                key={role}
              >
                {role}
              </option>
            ))}
          </select>
          {errors.creatorRole && (
            <span className='text-error text-sm'>
              {errors.creatorRole.message}
            </span>
          )}
        </div>

        {/* Escrow category select */}
        <div className='w-full'>
          <label htmlFor='category' className='block text-sm font-black mb-2'>
            Escrow Category
          </label>
          <select
            id='category'
            defaultValue={''}
            className={`w-full ring ring-dashboard-border bg-dashboard-primary rounded-md p-2 cursor-pointer pr-8 outline-dashboard-secondary ${
              watch('category') === ''
                ? 'text-gray-500'
                : 'text-dashboard-secondary'
            } ${errors.category && 'ring ring-error'}`}
            {...register('category', {
              required: {
                value: true,
                message: 'Please select category of escrow',
              },
            })}
          >
            <option value='' disabled>
              --Select escrow category--
            </option>
            {escrowCategories.map((category) => (
              <option value={category} key={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className='text-error text-sm'>
              {errors.category.message}
            </span>
          )}
        </div>
      </div>

      {/* Escrow counterparty */}
      <div>
        <label
          htmlFor='counterpartyEmail'
          className='block text-sm font-black mb-2'
        >
          Counterparty Email
        </label>
        <input
          type='text'
          id='counterpartyEmail'
          className={`border border-dashboard-border w-full p-2 rounded-lg font-medium outline-dashboard-secondary outline-0 focus-within:border-0 focus-within:ring-2 focus:ring-secondary bg-white ${
            errors.counterpartyEmail ? 'border-error' : ''
          }`}
          placeholder='e.g counterparty@gmail.com'
          {...register('counterpartyEmail', {
            required: {
              value: true,
              message: 'Please fill in the email of the other party',
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.counterpartyEmail && (
          <span className='text-error text-sm'>
            {errors.counterpartyEmail.message}
          </span>
        )}
      </div>

      {/* Escrow amount */}
      <div>
        <label htmlFor='amount' className='block text-sm font-black mb-2'>
          Amount (₦)
        </label>
        <input
          type='text'
          inputMode='decimal'
          id='amount'
          className={`border border-dashboard-border w-full p-2 rounded-lg font-medium outline-dashboard-secondary outline-0 focus-within:border-0 focus-within:ring-2 focus:ring-secondary bg-white ${
            errors.amount ? 'border-error' : ''
          }`}
          value={amountDisplay}
          placeholder='₦0.00'
          onChange={(e) => {
            const rawValue = e.target.value.replace(/[^\d.]/g, ''); // Only allow numbers + dot
            setAmountDisplay(rawValue);
            setValue('amount', parseFloat(rawValue), { shouldValidate: true });
          }}
          onBlur={() => {
            if (!amountDisplay) return;
            const formatted = parseFloat(amountDisplay).toLocaleString(
              'en-NG',
              {
                style: 'currency',
                currency: 'NGN',
                minimumFractionDigits: 2,
              },
            );
            setAmountDisplay(formatted);
          }}
          onFocus={(e) => {
            // Remove formatting when user clicks to edit again
            const numeric = e.target.value.replace(/₦|,/g, '');
            setAmountDisplay(numeric);
          }}
        />

        {errors.amount && (
          <span className='text-error text-sm'>{errors.amount.message}</span>
        )}
      </div>

      {/* Escrow terms */}
      <div>
        <label htmlFor='terms' className='block text-sm font-black mb-2'>
          Terms
        </label>

        <ul
          className={`${
            terms.length > 0 ? 'border border-dashboard-border' : ''
          } p-2 rounded-t-lg space-y-2 overflow-y-auto h-full max-h-40 custom-scrollbar`}
        >
          {terms.length > 0 ? (
            terms.map((term, i) => (
              <li
                key={i}
                className='flex justify-between items-center border border-dashboard-border px-3 py-2 rounded-md'
              >
                <span>{term}</span>
                <Button
                  color='bg-transparent text-dashboard-secondary'
                  textSize='text-sm'
                  onClick={() => handleRemoveTerm(i)}
                >
                  <IoCloseSharp />
                </Button>
              </li>
            ))
          ) : (
            <li className='text-gray-500'>No term added yet.</li>
          )}
        </ul>
        {errors.terms && (
          <span className='text-error text-sm'>{errors.terms.message}</span>
        )}

        {isAddingNewTerm ? (
          <div className='flex gap-2 mt-3'>
            <input
              id='terms'
              name='terms'
              ref={termInputRef}
              type='text'
              value={newTerm}
              onChange={(e) => {
                setNewTerm(e.target.value);
                if (newTermError) setNewTermError(null);
              }}
              onKeyDown={handleAddTermInputKeydown}
              placeholder='Add a term...'
              className={`flex-1 border border-dashboard-border p-2 rounded-lg outline-dashboard-secondary ${
                newTermError ? 'border-error' : ''
              }`}
            />
            <ButtonIcon
              style='rounded-full w-10 h-10 flex items-center justify-center'
              onClick={() => handleAddTerm()}
            >
              <IoMdAdd />
            </ButtonIcon>
          </div>
        ) : (
          <div
            className={`border border-dashboard-border p-2 ${
              terms.length > 0
                ? 'rounded-b-lg w-full'
                : 'rounded-lg w-fit hover:bg-dashboard-border transition-colors duration-500'
            } `}
          >
            <button
              aria-label='add a term'
              type='button'
              className='flex items-center gap-2 cursor-pointer text-gray-500'
              onClick={() => setIsAddingNewTerm(true)}
            >
              <span>
                <IoMdAdd />
              </span>
              <span>Add a term</span>
            </button>
          </div>
        )}
        {newTermError && (
          <span className='text-error text-sm'>{newTermError}</span>
        )}
      </div>

      {/* Escrow description */}
      <div>
        <label htmlFor='description' className='block text-sm font-black mb-2'>
          Description
        </label>
        <textarea
          id='description'
          rows={3}
          className={`border border-dashboard-border w-full p-2 rounded-lg font-medium outline-dashboard-secondary outline-0 focus-within:border-0 focus-within:ring-2 focus:ring-secondary bg-white ${
            errors.description ? 'border-error' : ''
          }`}
          placeholder='Add a description of item...'
          {...register('description', {
            required: {
              value: true,
              message: 'Please give a description of item',
            },
          })}
        />
        {errors.description && (
          <span className='text-error text-sm'>
            {errors.description.message}
          </span>
        )}
      </div>

      {/* Escrow fee payment */}
      <div>
        <label
          htmlFor='escrowFeePayment'
          className='block text-sm font-black mb-2'
        >
          Escrow Fee Payment
        </label>
        <Controller
          name='escrowFeePayment'
          control={control}
          defaultValue=''
          rules={{ required: 'Please select who will pay the escrow fee' }}
          render={({ field }) => (
            <div className='flex gap-2 border border-dashboard-border rounded-lg px-2'>
              {[...escrowCreatorRole.map(({ role }) => role), 'Split'].map(
                (payer) => {
                  const value = payer.toLowerCase();

                  return (
                    <button
                      key={payer}
                      type='button'
                      onClick={() => field.onChange(value)}
                      className={`cursor-pointer px-4 py-1.5 rounded-lg  transition ${
                        field.value === value
                          ? 'bg-dashboard-secondary text-dashboard-primary font-bold'
                          : 'hover:bg-dashboard-border'
                      }`}
                    >
                      {payer}
                    </button>
                  );
                },
              )}
            </div>
          )}
        />
        {errors.escrowFeePayment && (
          <span className='text-error text-sm'>
            {errors.escrowFeePayment.message}
          </span>
        )}
      </div>

      {/* Escrow submit button */}
      <Button
        color='bg-dashboard-secondary text-dashboard-primary w-full'
        type='submit'
      >
        Create Escrow
      </Button>
    </form>
  );
}
//.toLocaleString("en-US", { style: "currency", currency: "NGN" })
