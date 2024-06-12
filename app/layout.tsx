import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { NavbarDemo } from "./_components/Navbar";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

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
      <html lang="en">
        <body className={inter.className}>
          <NavbarDemo />
          {children}
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
