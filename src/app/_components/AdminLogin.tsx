'use client';
import Image from 'next/image';
import Logo from './Logo';
import { AuthInput } from './AuthInput';
import { TogglePassword } from './TogglePassword';
import Link from 'next/link';
import Button from './Button';
import SpinnerMini from './SpinnerMini';
import { useForm } from 'react-hook-form';
import { LoginFormInputs } from '../_types/authTypes';
import { login, verifyAdmin } from '../_lib/auth';
import { handleApiError } from '../_lib/handleApiError';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const { replace } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async function (data: LoginFormInputs) {
    setIsLoading(true);
    try {
      const result = await login(data);
      const errorHandle = handleApiError(result);

      if (errorHandle.handled) {
        toast.error(errorHandle.message);
      }

      const verification = await verifyAdmin(result.token);

      if (!verification?.authorized)
        toast.error(
          verification?.message || 'You are not allowed to view this page',
        );

      if (verification?.authorized) {
        toast.success(result.message);
        replace('/admin/dashboard');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-[#ffffffbf] w-lg h-auto rounded flex flex-col items-center p-12 backdrop:blur-xl gap-8 border border-dashboard-secondary'>
      <Logo />
      <div className='relative w-[70px] h-[70px] sm:w-[70px] sm:h-[70px] md:w-[70px] md:h-[70px] lg:w-[80px] lg:h-[80px] mx-auto lg:ml-0 lg:mr-0'>
        <Image
          src={'/images/wave.gif'}
          alt='waving hand'
          fill
          className=' object-contain'
        />
      </div>
      <header className='text-gray-700 font-bold border-b border-gray-400 pb-6 w-full flex justify-center'>
        Please sign-in to your account
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className='w-full px-6'>
        <AuthInput InputTitle='Username' name='username'>
          <input
            type='text'
            id='username'
            className={`w-full p-2 pr-12 border border-gray-300 rounded-sm bg-white outline-0 focus-within:border-0 focus-within:ring-1 focus:ring-dashboard-secondary ${
              errors.username?.message ? 'border-red-500' : ''
            }`}
            {...register('username', {
              required: {
                value: true,
                message: 'Username is required',
              },
              minLength: {
                value: 3,
                message: 'Username must be atleast 3 characters long',
              },
              maxLength: {
                value: 20,
                message: 'Username must be less than 20 characters',
              },
            })}
          />
          <span className='text-red-500 text-sm'>
            {errors.username?.message}
          </span>
        </AuthInput>
        <TogglePassword
          title='Password'
          name='password'
          style='p-2 outline-0 focus-within:border-0 focus-within:ring-1 focus:ring-dashboard-secondary'
          register={register}
          error={errors.password?.message}
        />

        <div className='flex w-full justify-between items-center py-4 2xl:text-xl text-[16px]'>
          <label className='font-extralight text-gray-500 flex items-center'>
            <input
              type='checkbox'
              className='w-4 h-4 mr-2 cursor-pointer '
              {...register('rememberme', { required: false })}
            />
            Remember me
          </label>
          <Link
            href='/forgottenpassword'
            className='text-dashboard-secondary font-extralight'
          >
            Forgotten Password?
          </Link>
        </div>

        <Button
          style='font-extralight w-full flex items-center justify-center mt-4'
          type='submit'
          color='bg-dashboard-secondary text-white'
          isLoading={isLoading}
        >
          {isLoading ? <SpinnerMini /> : 'Sign In'}
        </Button>
      </form>
    </div>
  );
}
