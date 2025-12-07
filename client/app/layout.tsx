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
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-screen bg-white text-gray-900`}>
        <div className="sticky top-0 z-50">
          <Navbar />
        </div>
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
