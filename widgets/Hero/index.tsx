'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';

export function Hero() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setUserId(localStorage.getItem('userId'));
  }, []);

  return (
    <section className="relative pt-20 md:pt-40 pb-12 md:pb-24 px-4 md:px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-[#18181B] mb-4 md:mb-6 leading-[1.2] md:leading-[1.1]">
            Получите деньги<br />тогда, когда это<br />действительно нужно
          </h1>
          <p className="text-base md:text-xl text-[#71717A] mb-6 md:mb-8 leading-relaxed">
            Простые и прозрачные займы для частных лиц и бизнеса в Европе
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            {userId ? (
              <Button href="/account" variant="primary" fullWidth>Личный кабинет</Button>
            ) : (
              <Button href="/login" variant="primary" fullWidth>Получить займ</Button>
            )}
            <Button href="/how-it-works" variant="secondary" fullWidth>Как работает</Button>
          </div>
          <div className="flex flex-wrap gap-4 md:gap-6 mt-6 md:mt-8 text-xs md:text-sm text-[#71717A]">
            <span>✓ Без залога</span>
            <span>✓ Быстрое одобрение</span>
            <span>✓ Выплата на счёт</span>
          </div>
        </div>

        <Card>
          <div className="grid grid-cols-2 gap-4 md:gap-8">
            <div>
              <p className="text-xs md:text-sm text-[#71717A] mb-1">Сумма</p>
              <p className="text-base md:text-2xl font-bold text-[#5F5247]">500–50 000 €</p>
            </div>
            <div>
              <p className="text-xs md:text-sm text-[#71717A] mb-1">Срок</p>
              <p className="text-base md:text-2xl font-bold text-[#5F5247]">7–90 дней</p>
            </div>
            <div>
              <p className="text-xs md:text-sm text-[#71717A] mb-1">Ставка</p>
              <p className="text-base md:text-2xl font-bold text-[#5F5247]">0.8% в день</p>
            </div>
            <div>
              <p className="text-xs md:text-sm text-[#71717A] mb-1">Оформление</p>
              <p className="text-base md:text-2xl font-bold text-[#5F5247]">24/7</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
