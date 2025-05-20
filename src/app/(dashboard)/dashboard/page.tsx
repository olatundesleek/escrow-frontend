'use client';
import toast from 'react-hot-toast';
import { logout } from '../../_lib/auth';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { push } = useRouter();

  const handleLogout = async () => {
    try {
      const res = await logout();
      if (res.success) {
        toast.success('Logout successful');
        push('/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold'>Dashboard</h1>
      <p className='mt-4 text-lg'>Welcome to the dashboard!</p>
      <button onClick={handleLogout}> Logout</button>
    </div>
  );
}
