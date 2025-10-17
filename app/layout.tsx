import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider, } from '@clerk/nextjs'
import { checkConnection } from "@/utils/checkConnection";
import { ApplyTheme } from "./components/ApplyTheme";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Ecommerce",
  description: "Ecommerce website using many technologies clerkProvider,Cloudainry,DaisyUi,TailwindCSS3,NextJs",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  checkConnection();
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} overflow-x-hidden`}>
          <ApplyTheme />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}