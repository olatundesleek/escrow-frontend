import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
// import { Lexend } from 'next/font/google';
import { ReactNode } from 'react';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className='pt-14 lg:pt-0'>{children}</main>
      <Footer />
    </>
  );
}
