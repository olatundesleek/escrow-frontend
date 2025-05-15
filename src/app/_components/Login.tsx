'use client';
import Link from 'next/link';
import { useState } from 'react';
import loginBanner from '../../../public/loginimage.png';
import Button from './Button';
import AuthContent from './AuthContent';
import { TogglePassword } from './TogglePassword';
import { AuthInput } from './AuthInput';
import { useForm } from 'react-hook-form';
import { clickToVerifyEmail, login } from '../_lib/auth';
import SpinnerMini from './SpinnerMini';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import ToastCustom from './ToastCustom';
import { handleApiError } from '../_lib/handleApiError';
import { LoginFormInputs } from '../_types/authTypes';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const handleVerifyEmail = async (email: string) => {
    const res = await clickToVerifyEmail({ email });
    toast.success(res.message || 'Verification email sent successfully!');
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
              <>
                <p>{errorHandled.message}</p>
                <Button
                  color='transparent text-secondary'
                  textSize='text-base'
                  padding='p-0'
                  onClick={() =>
                    errorHandled.email
                      ? handleVerifyEmail(errorHandled.email)
                      : toast.error('Email is missing,')
                  }
                >
                  Click to resend verification email
                </Button>
              </>
            ),
          });
        }
        return;
      }

      if (result.success) {
        //Display success message
        toast.success(result.message || 'Login successful!');
        // Redirect to dashboard or another page
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error during login:', error);
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full pt-5 my-10 xl:px-20 flex flex-col justify-center items-center border-t border-gray-300'
      >
        <div className='w-full'>
          <AuthInput InputTitle='Username' name='username'>
            <input
              id='username'
              type='text'
              autoComplete='username'
              value={'afolabi'}
              autoFocus={true}
              className={`form_input w-full p-4 pr-12 border border-gray-300 rounded-sm bg-white ${
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
          />
        </div>

        <div className='flex w-full justify-between items-center py-4 2xl:text-xl text-[16px]'>
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

        <div className='flex w-full justify-evenly p-2'>
          <p>{"Don't have any account ?"}</p>
          <Link href='/register' className='text-lime-500'>
            Create Account
          </Link>
        </div>
      </form>
    </AuthContent>
  );
}
