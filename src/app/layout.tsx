import { StickyContextProvider } from "./_context/StickyContext";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Head from "next/head";
// import { Lexend } from 'next/font/google';
import { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Escrow App",
  description: "Hey there",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <StickyContextProvider>
          <header>
            <Navbar />
          </header>
          <main className="pt-14 lg:pt-0">{children}</main>
        </StickyContextProvider>
        <Footer />
      </body>
    </html>
  );
}
