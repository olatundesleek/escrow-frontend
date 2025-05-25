import './globals.css';
import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { Lexend } from 'next/font/google';

import SiteSetting from './_context/SiteSettingContext';
import { StickyContextProvider } from './_context/StickyContext';
// import Head from "next/head";

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'Escrow App',
  description: 'Hey there',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={lexend.className}>
      {/* <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700&display=swap'
          rel='stylesheet'
        />
      </Head> */}
      <body>
        <SiteSetting>
          <StickyContextProvider>
            <main>
              {children}
              <Toaster
                position='top-center'
                gutter={12}
                containerStyle={{ margin: '8px' }}
                toastOptions={{
                  success: {
                    duration: 5000,
                  },
                  error: {
                    duration: 8000,
                  },
                  style: {
                    fontSize: '16px',
                    fontWeight: 500,
                    maxWidth: '500px',
                    padding: '16px 24px',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    color: '#000000',
                  },
                }}
              />
            </main>
          </StickyContextProvider>
        </SiteSetting>
      </body>
    </html>
  );
}
