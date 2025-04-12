import "./globals.css";
import {ReactNode} from "react";

export const metadata = {
  title: "Escrow App",
  description: "Hey there",
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
