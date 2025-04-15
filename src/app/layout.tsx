import Footer from "./components/Footer";
import Navbar from './components/Navbar';
import './globals.css';
// import { Lexend } from 'next/font/google';
import {  ReactNode  } from 'react';

export const metadata = {
  title: 'Escrow App',
  description: 'Hey there',
};



export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
       <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <header>
          <Navbar />
        </header>

        <main className='pt-14 lg:pt-0'>
        {children}
      </main>
        <Footer />
      </body>
    </html>
  );
}
