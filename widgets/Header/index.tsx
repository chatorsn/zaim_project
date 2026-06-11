'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/shared/ui/Button';

export function Header() {
  const [userId, setUserId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setUserId(localStorage.getItem('userId'));
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E8E0D7]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-5 flex justify-between items-center">
        <Link href="/" className="text-xl md:text-2xl font-semibold text-[#18181B] tracking-tight">LumenBridge</Link>
        
        <nav className="hidden md:flex gap-8">
          <Link href="/how-it-works" className="text-[#71717A] hover:text-[#5F5247] transition">Как работает</Link>
          <Link href="/for-business" className="text-[#71717A] hover:text-[#5F5247] transition">Для бизнеса</Link>
          <Link href="/faq" className="text-[#71717A] hover:text-[#5F5247] transition">FAQ</Link>
          <Link href="/contacts" className="text-[#71717A] hover:text-[#5F5247] transition">Контакты</Link>
        </nav>

        <div className="hidden md:flex gap-4">
          {userId ? (
            <Button href="/account" variant="primary">Личный кабинет</Button>
          ) : (
            <Button href="/login" variant="primary">Войти</Button>
          )}
        </div>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-2xl text-[#18181B]">
          ☰
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E8E0D7] p-4 flex flex-col gap-4">
          <Link href="/how-it-works" className="text-[#71717A] py-2">Как работает</Link>
          <Link href="/for-business" className="text-[#71717A] py-2">Для бизнеса</Link>
          <Link href="/faq" className="text-[#71717A] py-2">FAQ</Link>
          <Link href="/contacts" className="text-[#71717A] py-2">Контакты</Link>
          <div className="pt-2">
            {userId ? (
              <Button href="/account" variant="primary" fullWidth>Личный кабинет</Button>
            ) : (
              <Button href="/login" variant="primary" fullWidth>Войти</Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
