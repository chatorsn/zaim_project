import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LumenBridge Finance',
  description: 'Займы для частных лиц и бизнеса в Европе',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
