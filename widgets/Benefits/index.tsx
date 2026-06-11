'use client';
import Link from 'next/link';
import { Card } from '@/shared/ui/Card';

const benefits = [
  'Без скрытых комиссий — полная стоимость известна заранее',
  'Решение за несколько минут — быстрое онлайн-рассмотрение',
  'Защита персональных данных — современные стандарты безопасности',
  'Гибкое погашение — выбирайте удобный срок и сумму',
  'Улучшение условий для постоянных клиентов'
];

export function Benefits() {
  return (
    <section className="relative py-16 md:py-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#18181B] mb-6 md:mb-8">Почему выбирают нас</h2>
          <div className="space-y-3 md:space-y-4">
            {benefits.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-[#5F5247] text-lg md:text-xl">✓</span>
                <span className="text-sm md:text-base text-[#71717A]">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <Card className="bg-[#F5F2EE]">
          <h3 className="text-xl md:text-2xl font-semibold text-[#18181B] mb-3 md:mb-4">Улучшение кредитной истории</h3>
          <p className="text-sm md:text-base text-[#71717A] mb-4">Своевременное погашение займа помогает улучшить кредитный рейтинг и открывает доступ к более выгодным условиям.</p>
          <Link href="/login" className="inline-block text-[#5F5247] font-medium hover:underline">Начать с небольшого займа →</Link>
        </Card>
      </div>
    </section>
  );
}
