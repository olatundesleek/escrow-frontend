"use client";
import Link from "next/link";
import { useState } from "react";
import loginBanner from "../../../public/loginimage.png";
import Button from "./Button";
import AuthContent from "./AuthContent";
import { TogglePassword } from './TogglePassword';
import { AuthInput } from './AuthInput';
import { useForm } from 'react-hook-form';
import { login } from '../lib/auth';
import SpinnerMini from './SpinnerMini';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export interface LoginFormInputs {
  username: string;
  password: string;
  rememberme: boolean;
}

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    setIsLoading(true);
    try {
      const res = await login(data);

      if (!res.success) {
        // Handle login failure (e.g., show error message)
        // Display error message
        toast.error(res.message || 'Login failed. Please try again.');
        return;
      }

      // Handle successful login (e.g., redirect to dashboard)
      //Display success message
      toast.success(res.message || 'Login successful!');
      // Redirect to dashboard or another page
      router.push('/dashboard');
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
              className={`form_input w-full p-4 pr-12 border border-gray-300 rounded-sm bg-white`}
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

