import { headers } from 'next/headers';
import Footer from '../_components/Footer';
import Navbar from '../_components/Navbar';
// import { Lexend } from 'next/font/google';
import { ReactNode } from 'react';

export default async function AppLayout({ children }: { children: ReactNode }) {
  const isLoggedIn = (await headers()).get('x-user-authenticated') === 'true';
  const userRole = await(await headers()).get('x-user-role') || 'user';
  console.log('isLoggedIn:', isLoggedIn);
  console.log('userRole:', userRole);

  console.log('isLoggedIn:',isLoggedIn)
  console.log('userRole:',userRole)

  return (
    <>
      <header>
        <Navbar isLoggedIn={isLoggedIn} redirectRole={userRole} />
      </header>
      <main className='pt-14 lg:pt-0'>{children}</main>
      <Footer />
    </>
  );
}
