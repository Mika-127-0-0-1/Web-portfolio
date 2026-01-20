import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mika is Sane-ity Studio",
  description: "My portfolio backend",
};

export default function Layout({children}: {children: React.ReactNode}) {
  return (
      <html lang="en">
        <body>{children}</body>
      </html>
  );
}
