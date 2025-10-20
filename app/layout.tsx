import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Playfair_Display,
  Poppins,
  Raleway,
  Great_Vibes,
  Inter,
} from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ApplyTheme } from "./components/ApplyTheme";
import { AuthProvider } from "./context/authContext";
import { Toaster } from "react-hot-toast";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
const greatVibes = Great_Vibes({
  variable: "--font-greatvibes",
  subsets: ["latin"],
  weight: ["400"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
export const metadata: Metadata = {
  title: "Ecommerce",
  description:
    "Ecommerce website using Clerk, Cloudinary, DaisyUI, TailwindCSS, and Next.js",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <AuthProvider>
        <html lang="en">
          <body
            className={`
              ${geistSans.variable} 
              ${geistMono.variable} 
              ${playfair.variable} 
              ${poppins.variable} 
              ${raleway.variable} 
              ${greatVibes.variable} 
              ${inter.variable} 
              overflow-x-hidden
            `}
          >
            <Toaster />
            <ApplyTheme />
            {children}
          </body>
        </html>
      </AuthProvider>
    </ClerkProvider>
  );
}