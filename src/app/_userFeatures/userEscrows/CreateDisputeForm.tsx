import Button from '@/app/_components/Button';
import { disputeReasons } from '@/app/_constants/disputeReasons';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface CreateDisputeFormInputs {
  disputeReason: string;
  otherReason?: string;
}

export default function CreateDisputeForm({
  closeDisputeForm,
}: {
  closeDisputeForm: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CreateDisputeFormInputs>();

  const disputeReason = watch('disputeReason');

  const onSubmit = (data: CreateDisputeFormInputs) => {
    // If 'others' is selected, you can use the `otherReason` value.
    const reason =
      data.disputeReason === 'others' ? data.otherReason : data.disputeReason;

    const submissionData = {
      reason,
    };
    console.log('Data to submit:', submissionData);
    toast.success('Dispute request sent successfully');
    closeDisputeForm();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div>
        <label
          htmlFor='disputeReason'
          className='block text-sm font-black mb-2'
        >
          Dispute Reason:
        </label>

        <select
          id='disputeReason'
          defaultValue={''}
          className={`w-full ring ring-dashboard-border bg-dashboard-primary rounded-md p-2 cursor-pointer pr-8 outline-dashboard-secondary ${
            watch('disputeReason') === ''
              ? 'text-gray-500'
              : 'text-dashboard-secondary'
          } ${errors.disputeReason && 'ring ring-error'}`}
          {...register('disputeReason', {
            required: {
              value: true,
              message: 'Please select the reason you are creating this dispute',
            },
            validate: (value) =>
              value !== '' ||
              'Please select the reason you are creating this dispute',
          })}
        >
          <option
            value=''
            className='text-dashboard-border cursor-pointer'
            disabled
          >
            --Select your dispute reason--
          </option>
          {disputeReasons.map(({ value, label }) => (
            <option
              value={value.toLowerCase()}
              className='hover:bg-dashboard-secondary'
              key={value}
            >
              {label}
            </option>
          ))}
        </select>

        {errors.disputeReason && (
          <span className='text-error text-sm'>
            {errors.disputeReason.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor='otherReasons'>
          Please give a short description here:
        </label>
        {disputeReason === 'others' && (
          <input
            type='text'
            id='otherReason'
            className='border border-dashboard-border w-full p-2 rounded-lg'
            {...register('otherReason', {
              required:
                'Please give a short description for the reason you are creating this dispute',
            })}
          />
        )}
        {errors.otherReason && (
          <span className='text-error text-sm'>
            {errors.otherReason.message}
          </span>
        )}
      </div>

      <div className='flex justify-end mt-4'>
        <Button
          type='submit'
          color='bg-dashboard-secondary text-dashboard-primary w-full'
        >
          File Appeal
        </Button>
      </div>
    </form>
  );
}

//check out vercept
