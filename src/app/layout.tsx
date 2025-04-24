<<<<<<< HEAD
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";
// import { Lexend } from 'next/font/google';
import { ReactNode } from "react";
=======
import { StickyContextProvider } from './_context/StickyContext';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import './globals.css';
// import { Lexend } from 'next/font/google';
import { ReactNode } from 'react';
>>>>>>> 2367ccc4e9d931421a4f1e00db8ce50dac491cfe

export const metadata = {
  title: "Escrow App",
  description: "Hey there",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
<<<<<<< HEAD
    <html lang="en">
=======
    <html lang='en'>
>>>>>>> 2367ccc4e9d931421a4f1e00db8ce50dac491cfe
      <head>
        <link
          href='https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&display=swap'
          rel='stylesheet'
        />
      </head>
      <body>
        <StickyContextProvider>
          <header>
            <Navbar />
          </header>

<<<<<<< HEAD
        <main className="pt-14 lg:pt-0">{children}</main>
=======
          <main className='pt-14 lg:pt-0'>{children}</main>
        </StickyContextProvider>
>>>>>>> 2367ccc4e9d931421a4f1e00db8ce50dac491cfe
        <Footer />
      </body>
    </html>
  );
}
