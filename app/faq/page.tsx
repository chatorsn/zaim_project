'use client';
import { useState } from 'react';
import Link from 'next/link';

type FAQItem = {
  q: string;
  a: string;
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    { q: 'Кто может получить займ?', a: 'Любой совершеннолетний резидент страны присутствия сервиса с действующим удостоверением личности и зарегистрированным номером телефона.' },
    { q: 'Какие документы необходимы?', a: 'Для подачи заявки требуется минимальный набор данных. В большинстве случаев достаточно удостоверения личности и активного номера телефона.' },
    { q: 'Как быстро принимается решение?', a: 'Заявки рассматриваются автоматически и обрабатываются в течение нескольких минут.' },
    { q: 'Когда я получу деньги?', a: 'После одобрения средства переводятся сразу на указанный банковский счёт.' },
    { q: 'Есть ли скрытые комиссии?', a: 'Нет. Все условия и платежи отображаются до оформления займа.' },
    { q: 'Можно ли погасить займ досрочно?', a: 'Да, вы можете погасить займ раньше установленного срока без дополнительных комиссий.' },
    { q: 'Что произойдет при просрочке?', a: 'В случае просрочки могут начисляться дополнительные платежи. Это также влияет на внутреннюю оценку клиента и будущие условия.' },
    { q: 'Как улучшить кредитную историю?', a: 'Своевременно погашайте займы — это помогает формировать положительную кредитную историю и повышает шансы на получение более выгодных условий в будущем.' }
  ];

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E8E0D5]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold text-[#2E5A4C]">LumenBridge</Link>
          <nav className="hidden md:flex gap-8 text-[#4A4A4A]">
            <Link href="/how-it-works" className="hover:text-[#2E5A4C] transition">Как работает</Link>
            <Link href="/for-business" className="hover:text-[#2E5A4C] transition">Для бизнеса</Link>
            <Link href="/faq" className="text-[#2E5A4C]">FAQ</Link>
            <Link href="/contacts" className="hover:text-[#2E5A4C] transition">Контакты</Link>
          </nav>
          <Link href="/login" className="text-[#2E5A4C] border border-[#2E5A4C] px-5 py-2 rounded-full hover:bg-[#2E5A4C] hover:text-white transition">Войти</Link>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-block mb-6 text-[#2E5A4C] hover:underline">← На главную</Link>
          <h1 className="text-5xl lg:text-6xl font-bold text-[#2E5A4C] mb-6 text-center">Часто задаваемые вопросы</h1>
          <p className="text-xl text-[#4A4A4A] text-center mb-12">Ответы на основные вопросы о займах, условиях и процессе оформления</p>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white border border-[#E8E0D5] rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-6 text-left"
                >
                  <span className="text-lg font-medium text-[#2E5A4C]">{faq.q}</span>
                  <span className="text-[#2E5A4C] text-2xl">{openIndex === idx ? '−' : '+'}</span>
                </button>
                {openIndex === idx && (
                  <div className="px-6 pb-6">
                    <p className="text-[#4A4A4A] leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
