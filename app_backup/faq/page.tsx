'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    { q: 'Кто может получить займ?', a: 'Любой совершеннолетний резидент с действующим удостоверением личности и зарегистрированным номером телефона.' },
    { q: 'Как быстро принимается решение?', a: 'Заявки рассматриваются автоматически в течение нескольких минут.' },
    { q: 'Есть ли скрытые комиссии?', a: 'Нет. Все условия отображаются до оформления займа.' },
    { q: 'Можно ли погасить досрочно?', a: 'Да, без дополнительных комиссий.' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      <header className="bg-white border-b border-[#E8E0D7] sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-semibold text-[#18181B]">LumenBridge</Link>
          <Link href="/" className="text-[#71717A] hover:text-[#5F5247] transition">На главную</Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white border border-[#E8E0D7] rounded-2xl p-8 shadow-sm">
          <h1 className="text-4xl font-bold text-[#18181B] mb-6 text-center">Часто задаваемые вопросы</h1>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-[#E8E0D7] rounded-xl overflow-hidden">
                <button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="w-full flex justify-between items-center p-5 text-left">
                  <span className="font-medium text-[#18181B]">{faq.q}</span>
                  <span className="text-[#5F5247] text-2xl">{openIndex === idx ? '−' : '+'}</span>
                </button>
                {openIndex === idx && <div className="px-5 pb-5 text-[#71717A]">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
