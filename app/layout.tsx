import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { NavbarDemo } from "./_components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { InterviewContextProvider } from "@/context/InterviewContext";

const inter = Inter({
  variable: "--font-inter",
  preload: false,
});

export const metadata: Metadata = {
  title: "Vocara - Your Ultimate Mock Interview Platform",
  description: "Vocara is your go-to platform for mock interviews, helping you to hone your interview skills and boost your confidence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${inter.variable}`}>
        <body className={inter.className}>
          <InterviewContextProvider>
            <NavbarDemo />
            {children}
            <Toaster richColors />
          </InterviewContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
