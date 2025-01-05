import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-tooltip/dist/react-tooltip.css";
import { Navbar } from "@/components/Navbar";
import { OrientationWarning } from "@/components/OrientationWarning";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agreefast",
  description: "Overcome agreement traps better",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 0.5,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-white w-full min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="px-20 pb-10 flex flex-col flex-1 h-full">
          {children}
        </main>
        <OrientationWarning />
      </body>
    </html>
  );
}
