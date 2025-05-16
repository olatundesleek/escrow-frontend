'use client';

import { signUp } from '../_lib/auth';
import { handleApiError } from '../_lib/handleApiError';
import { RegisterFormInputs } from '../_types/authTypes';

import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

import signupBanner from '../../../public/signup-banner.png';
import AuthContent from './AuthContent';
import Button from './Button';
import { TogglePassword } from './TogglePassword';
import { AuthInput } from './AuthInput';
import SpinnerMini from './SpinnerMini';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { push } = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterFormInputs>();

  const onSubmit = async (data: RegisterFormInputs) => {
    setIsLoading(true);
    try {
      const result = await signUp(data);

      const errorHandle = handleApiError(result);

      if (errorHandle.handled) {
        if (errorHandle.type === 'duplicateEmail') {
          toast.error(errorHandle.message);
        }

        if (errorHandle.type === 'validationError') {
          toast.error(`${errorHandle.message}: ${errorHandle.details}`);
        }
      }

      if (result.success) {
        toast.success(result.message);
        push('/login');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContent
      authPageName='Sign Up'
      aboutAuthPage='Join our secure platform today. Register now and unlock the power of safe transactions with ease!'
      formBanner={signupBanner}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full pt-5 my-10 xl:px-20 flex flex-col justify-center items-center border-t border-gray-300'
      >
        {/* {error && <p className='text-red-500 font-medium mb-4'>{error}</p>} */}
        <div className='w-full flex gap-4 flex-col sm:flex-row md:flex-col lg:flex-row'>
          <div className='w-full sm:w-1/2 md:w-full lg:1/2'>
            <AuthInput InputTitle='First Name' name='firstName'>
              <input
                type='text'
                autoComplete='firstname'
                id='firstname'
                autoFocus={true}
                className={`form_input w-full p-4 pr-12 border border-gray-300 rounded-sm bg-white ${
                  errors.firstname ? 'border-red-500' : ''
                }`}
                {...register('firstname', {
                  required: {
                    value: true,
                    message: 'First name is required',
                  },
                  minLength: {
                    value: 3,
                    message: 'First name must be at least 3 characters long',
                  },
                  maxLength: {
                    value: 20,
                    message: 'First name must be at most 20 characters long',
                  },
                })}
              />
              {errors.firstname && (
                <span className='text-red-500 text-sm'>
                  {String(errors.firstname.message)}
                </span>
              )}
            </AuthInput>
          </div>

          <div className='w-full sm:w-1/2 md:w-full lg:1/2'>
            <AuthInput InputTitle='Last Name' name='lastName'>
              <input
                type='text'
                autoComplete='lastname'
                id='lastname'
                autoFocus={true}
                className={`form_input w-full p-4 pr-12 border border-gray-300 rounded-sm bg-white ${
                  errors.lastname ? 'border-red-500' : ''
                }`}
                {...register('lastname', {
                  required: {
                    value: true,
                    message: 'Last name is required',
                  },
                  minLength: {
                    value: 3,
                    message: 'Last name must be at least 3 characters long',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Last name must be at most 20 characters long',
                  },
                })}
              />
              {errors.lastname && (
                <span className='text-red-500 text-sm'>
                  {String(errors.lastname.message)}
                </span>
              )}
            </AuthInput>
          </div>
        </div>
        <div className='w-full flex gap-4 flex-col sm:flex-row md:flex-col lg:flex-row'>
          <div className='w-full sm:w-1/2 md:w-full lg:1/2'>
            <AuthInput InputTitle='Username' name='username'>
              <input
                type='text'
                autoComplete='username'
                id='username'
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
                  {String(errors.username.message)}
                </span>
              )}
            </AuthInput>
          </div>

          <div className='w-full sm:w-1/2 md:w-full lg:1/2'>
            <AuthInput InputTitle='Email Address' name='email'>
              <input
                type='text'
                autoComplete='email'
                id='email'
                autoFocus={true}
                className={`form_input w-full p-4 pr-12 border border-gray-300 rounded-sm bg-white ${
                  errors.email ? 'border-red-500' : ''
                }`}
                {...register('email', {
                  required: {
                    value: true,
                    message: 'Email is required',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && (
                <span className='text-red-500 text-sm'>
                  {String(errors.email.message)}
                </span>
              )}
            </AuthInput>
          </div>
        </div>

        <div className='w-full flex gap-4 flex-col sm:flex-row md:flex-col lg:flex-row'>
          <div className='w-full sm:w-1/2 md:w-full lg:1/2'>
            <TogglePassword
              title='Password'
              name='password'
              register={register}
              error={
                typeof errors.password?.message === 'string'
                  ? errors.password?.message
                  : undefined
              }
            />
          </div>
        </div>

        <div className='flex w-full justify-start gap-1 items-center py-4 2xl:text-xl text-[16px]'>
          <label className='font-medium flex items-center'>
            <input
              type='checkbox'
              required
              id='agree'
              autoComplete='agree'
              className={`w-4 h-4 mr-2 cursor-pointer`}
              {...register('agree', { required: true })}
            />
            <p>
              I agree with{' '}
              {
                <Link href='#' className='text-lime-500 font-medium'>
                  {' '}
                  privacy policy
                </Link>
              }
              ,
              <Link href='#' className='text-lime-500 font-medium'>
                {' '}
                Terms of Service
              </Link>
            </p>
          </label>

          {errors.agree && (
            <span className='text-red-500 text-sm'>
              {String(errors.agree.message)}
            </span>
          )}
        </div>

        <Button
          style='font-medium w-full flex items-center justify-center'
          type='submit'
          isLoading={isLoading}
        >
          {isLoading ? <SpinnerMini /> : 'Sign Up'}
        </Button>

        <div className='flex w-full justify-center gap-2 p-2'>
          <p>
            Already have an account?{' '}
            {
              <Link href='/login' className='text-lime-500 font-medium'>
                Sign In
              </Link>
            }{' '}
            here.
          </p>
        </div>
      </form>
    </AuthContent>
  );
}
