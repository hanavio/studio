import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'ChemLearn Portal',
  description: 'An interactive chemistry learning portal by Farida Abdelfatah, Hana Ibrahim, and Menna Atef.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          'font-body antialiased',
          'bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]'
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
