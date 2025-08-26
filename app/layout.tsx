// file: app/layout.tsx

import type React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/hooks/use-supabase-auth'; // Pastikan path ini benar
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PT. Merpati Wahana Raya',
  description: 'Employee management system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {/* AuthProvider HARUS membungkus semua children di sini */}
        <AuthProvider>
          {children}
          <Toaster position='top-right' richColors closeButton />
        </AuthProvider>
      </body>
    </html>
  );
}
