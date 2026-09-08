import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toast } from '@/components/Toast';

export const metadata: Metadata = {
  title: 'Game Nest | Y2K Retro Digital Game Marketplace',
  description: 'Buy and sell verified digital game keys with Y2K retro style and instant key delivery.',
  icons: {
    icon: [
      { url: '/images/logo.png', type: 'image/png' },
    ],
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#6C6CEB] text-[#1A1A1A] min-h-screen flex flex-col antialiased selection:bg-[#F4A6C6] selection:text-[#1A1A1A]">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toast />
        </AuthProvider>
      </body>
    </html>
  );
}
