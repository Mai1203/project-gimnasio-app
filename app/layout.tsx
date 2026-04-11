'use client';

import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { AppProvider } from '@/context/AppContext';
import './globals.css';

import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="es">
      <body className={inter.className}>
        <AppProvider>
          <SessionProvider>
            <div className="min-h-screen bg-background text-foreground flex flex-col">
              <Navbar />
              <main className="flex-1 w-full">
                {children}
              </main>
              <Footer />
            </div>
          </SessionProvider>
        </AppProvider>
      </body>
    </html>
  );
}
