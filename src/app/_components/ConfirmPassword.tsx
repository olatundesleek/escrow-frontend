"use client";

import { useState, useEffect } from "react";
import AuthContent from "./AuthContent";
import banner from "../../../public/code-verification.png";
import { TogglePassword } from './TogglePassword';
import Button from './Button';
import { Alert } from './Alert';

export default function ConfirmPassword() {
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<{
    loading: boolean;
    message: string;
    type: 'error' | 'success' | 'info';
  }>({
    loading: false,
    message: '',
    type: 'info',
  });

  // Fetch token from the API route when the component mounts
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await fetch('/api/auth/validate-token?token');
        const data = await res.json();
        if (res.ok && data.token) {
          setToken(data.token); // Set the token if it's valid
        } else {
          setStatus({
            loading: false,
            message: data.message || 'Invalid token.',
            type: 'error',
          });
        }
      } catch (err) {
        setStatus({
          loading: false,
          message: 'Failed to validate token.',
          type: 'error',
        });
        console.error(err);
      }
    };

    fetchToken();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(token ? token : 'nothing');
    if (!token) {
      setStatus({
        loading: false,
        message: 'Invalid or expired token.',
        type: 'error',
      });
      return;
    }

    if (password !== confirmPassword) {
      setStatus({
        loading: false,
        message: 'Passwords do not match!',
        type: 'error',
      });
      return;
    }

    try {
      setStatus({ loading: true, message: 'Processing...', type: 'info' });

      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setStatus({
        loading: false,
        message: 'Password changed successfully!',
        type: 'success',
      });
    } catch (err) {
      setStatus({
        loading: false,
        message: (err as Error)?.message || 'Failed to reset password.',
        type: 'error',
      });
      console.error(err);
    }
  };

  return (
    <AuthContent
      authPageName='Create New Password'
      aboutAuthPage='Your email has been verified. To secure your account, please create a strong, new password.'
      handleSubmit={handleSubmit}
      formContent={
        <>
          {status.message && (
            <Alert
              style={
                status.type === 'error'
                  ? 'bg-error'
                  : status.type === 'success'
                  ? 'bg-secondary'
                  : 'bg-secondary'
              }
              message={status.message}
            />
          )}

          <div className='w-full flex justify-center items-center gap-5 flex-col sm:flex-row md:flex-col md:gap-0'>
            <TogglePassword
              name='password'
              title='New Password'
              password={password}
              setPassword={(e) => setPassword(e.target.value)}
            />
            <TogglePassword
              title='Confirm Password'
              password={confirmPassword}
              setPassword={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <Button
            color='bg-lime-500 my-5 text-white font-medium w-full'
            type='submit'
          >
            {status.loading ? 'Creating...' : 'Create Password'}
          </Button>
        </>
      }
      formBanner={banner}
    />
  );
}
