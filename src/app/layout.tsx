import "./globals.css";
import { ReactNode } from "react";
import { Lexend } from "next/font/google";
import { Roboto } from "next/font/google";
import { SiteSettingProvider } from "./_context/SiteSettingContext";
import { StickyContextProvider } from "./_context/StickyContext";
import AppToaster from "./_components/AppToaster";
// import Head from "next/head";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Escrow App",
  description: "Hey there",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang='en' className={`${lexend.className} ${roboto.className}`}>
      {/* <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&display=swap'
          rel='stylesheet'
        />
      </Head> */}
      <body>
        <SiteSettingProvider>
          <StickyContextProvider>
            <main className='bg-background'>
              {children}
              <AppToaster />
            </main>
          </StickyContextProvider>
        </SiteSettingProvider>
      </body>
    </html>
  );
}
