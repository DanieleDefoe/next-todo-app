import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Todo app',
  description: 'Created by Abuzar Mamedov',
};

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${inter.className} bg-slate-800 text-slate-100 container mx-auto p-4`}
      >
        {children}
      </body>
    </html>
  );
}
