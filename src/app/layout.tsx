import "./globals.css";
import { ReactNode } from "react";
import { Lexend } from "next/font/google";
import { Roboto } from "next/font/google";
import { SiteSettingProvider } from "./_context/SiteSettingContext";
import { StickyContextProvider } from "./_context/StickyContext";
import AppToaster from "./_components/AppToaster";
import { DbThemeProvider } from "./_hooks/useTheme";

const roboto = Roboto({
  subsets: ["latin"],
weight:['400','500','600','700']
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
    <html lang="en" className={`${lexend.className} ${roboto.className}`}>
      <body>
        <SiteSettingProvider>
          <DbThemeProvider>
            <StickyContextProvider>
              <main className="bg-background">
                {children}
                <AppToaster />
              </main>
            </StickyContextProvider>
          </DbThemeProvider>
        </SiteSettingProvider>
      </body>
    </html>
  );
}
