'use client';
import Link from 'next/link';
export default function Contacts() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] p-8">
      <h1 className="text-4xl text-white">Контакты</h1>
      <Link href="/" className="text-[#C6A43F] mt-4 block">На главную</Link>
    </div>
  );
}
