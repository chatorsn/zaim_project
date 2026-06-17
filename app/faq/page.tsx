'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = [
    { q: 'Кто может получить займ?', a: 'Любой совершеннолетний пользователь с действующим удостоверением личности и зарегистрированным номером телефона.' },
    { q: 'Как быстро принимается решение?', a: 'Заявки рассматриваются автоматически в течение нескольких минут.' },
    { q: 'Есть ли скрытые комиссии?', a: 'Нет. Все условия отображаются до оформления займа.' },
    { q: 'Можно ли погасить досрочно?', a: 'Да, без дополнительных комиссий.' }
  ];

  return (
    <div className="min-h-screen bg-[#ece6e3]">
      <header className="bg-[#2c3943] border-b border-[#3d4f5c] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-medium text-[#ece6e3]">LumenBridge</Link>
          <Link href="/" className="text-sm text-[#9dabb4] hover:text-[#ece6e3] transition">На главную</Link>
        </div>
      </header>
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-white border border-[#e5d4ca] rounded-2xl p-8 shadow-sm">
          <h1 className="text-3xl font-medium text-[#2c3943] mb-6 text-center">Часто задаваемые вопросы</h1>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-[#e5d4ca] rounded-xl overflow-hidden">
                <button onClick={() => setOpenIndex(openIndex === idx ? null : idx)} className="w-full flex justify-between items-center p-5 text-left">
                  <span className="font-medium text-[#2c3943]">{faq.q}</span>
                  <span className="text-[#9dabb4] text-2xl">{openIndex === idx ? '−' : '+'}</span>
                </button>
                {openIndex === idx && <div className="px-5 pb-5 text-sm text-[#77726f]">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
