import { ReactNode } from 'react';

import Footer from '../_components/Footer';
import Navbar from '../_components/Navbar';

export default async function AppLayout({ children }: { children: ReactNode }) {
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
