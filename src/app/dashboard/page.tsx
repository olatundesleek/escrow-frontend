import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Page() {
  const cookieStore = await cookies();
  const myToken = cookieStore.get('token');
  console.log('Cookie:', cookieStore);
  console.log('Token:', myToken);

  if (!myToken) redirect('/login');

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold'>Dashboard</h1>
      <p className='mt-4 text-lg'>Welcome to the dashboard!</p>
    </div>
  );
}
