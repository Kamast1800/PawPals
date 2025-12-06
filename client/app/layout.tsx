import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '../components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PawPals - Find Your Perfect Pet Match',
  description: 'Connect with pets looking for their forever homes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="pb-16 min-h-screen">
          {children}
        </main>
        <Navbar />
      </body>
    </html>
  );
}
