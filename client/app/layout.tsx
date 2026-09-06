import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LANDSLIDEX | AI-Powered Landslide Early Warning & Disaster Response",
  description:
    "Disaster operations command center for real-time landslide risk monitoring, early warning alerts, and emergency response prioritization across India's Northeast Region.",
};

import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 font-sans relative overflow-x-hidden">
        {/* Subtle Pro Max UI Background Glows */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-cyan-900/10 blur-[120px]" />
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-red-900/5 blur-[120px]" />
        </div>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
