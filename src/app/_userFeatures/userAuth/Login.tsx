'use client';
import { resendVerificationEmail, login } from '@/app/_lib/auth';
import { LoginFormInputs } from '@/app/_types/authTypes';
import { handleApiError } from '@/app/_lib/handleApiError';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import loginBanner from '../../../../public/loginimage.png';
import Button from '@/app/_components/Button';
import AuthContent from '@/app/_components/AuthContent';
import { TogglePassword } from '@/app/_components/TogglePassword';
import { AuthInput } from '@/app/_components/AuthInput';
import SpinnerMini from '@/app/_components/SpinnerMini';
import ToastCustom from '@/app/_components/ToastCustom';

export default function Login() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const redirect = searchParams.get('redirect');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const handleVerifyEmail = async (email: string) => {
    toast.dismiss();
    const res = await resendVerificationEmail({ email });

    if (res.success)
      toast.success(res.message || 'Verification email sent successfully!');

    if (!res.success)
      toast.error(res.message || 'Failed to send verification email.');
  };

  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);
    try {
      const result = await login(data);

      const errorHandled = handleApiError(result);

      if (errorHandled.handled) {
        if (errorHandled.type === 'invalidCredentials') {
          // Handle authentication error
          toast.error(
            errorHandled.message || 'Login failed. Please try again.',
          );
        }

        if (errorHandled.type === 'unverifiedEmail') {
          ToastCustom({
            children: (
              <span className='w-full flex flex-col md:flex-row lg:flex-row gap-0.5 justify-center items-center'>
                <p>{errorHandled.message}</p>
                <Button
                  color='transparent text-secondary'
                  textSize='text-base text-start'
                  padding='p-0'
                  onClick={() =>
                    errorHandled.email
                      ? handleVerifyEmail(errorHandled.email)
                      : toast.error('Email is missing,')
                  }
                >
                  Click to resend verification email
                </Button>
              </span>
            ),
          });
        }
        return;
      }

      if (result.success) {
        //Display success message
        toast.success(result.message || 'Login successful!');
        // Redirect to dashboard
        if (redirect) {
          return replace(decodeURIComponent(redirect));
        }
        return replace('/dashboard');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContent
      authPageName='Login'
      aboutAuthPage='Secure your transactions effortlessly. Log in now and experience peace of mind with our trusted platform!'
      formBanner={loginBanner}
    >
      <div className=' border-t border-gray-300 w-full'></div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-md my-10 flex flex-col justify-center items-center'
      >
        <div className='w-full'>
          <AuthInput InputTitle='Username' name='username'>
            <input
              id='username'
              type='text'
              placeholder='Username'
              autoComplete='username'
              autoFocus={true}
              className={`outline-0 focus-within:border-0 focus-within:ring-1 focus:ring-secondary w-full sm:p-4 p-2 pr-12 border border-gray-300 rounded-sm bg-white ${
                errors.username ? 'border-red-500' : ''
              }`}
              {...register('username', {
                required: {
                  value: true,
                  message: 'Username is required',
                },
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters long',
                },
                maxLength: {
                  value: 20,
                  message: 'Username must be at most 20 characters long',
                },
              })}
            />
            {errors.username && (
              <span className='text-red-500 text-sm'>
                {errors.username.message}
              </span>
            )}
          </AuthInput>
        </div>

        <div className='w-full'>
          <TogglePassword
            title={'Password'}
            name='password'
            register={register}
            error={errors.password?.message}
            style='outline-0 focus-within:border-0 focus-within:ring-1 focus:ring-secondary sm:p-4 p-2'
          />
        </div>

        <div className='flex w-full justify-between items-center py-4 sm:text-md text-sm'>
          <label className='font-medium flex items-center'>
            <input
              type='checkbox'
              className='w-4 h-4 mr-2 cursor-pointer'
              {...register('rememberme', { required: false })}
            />
            Remember me
          </label>
          <Link href='/forgottenpassword' className='text-lime-500'>
            Forgotten Password?
          </Link>
        </div>

        <Button
          style='font-medium w-full flex items-center justify-center'
          type='submit'
          isLoading={isLoading}
        >
          {isLoading ? <SpinnerMini /> : 'Log In'}
        </Button>

        <div className='flex w-full justify-between mt-2 sm:text-md text-sm'>
          <p>Don&apos;t have any account ?</p>
          <Link href='/register' className='text-lime-500'>
            Create Account
          </Link>
        </div>
      </form>
    </AuthContent>
  );
}
