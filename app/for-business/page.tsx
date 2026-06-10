'use client';
import Link from 'next/link';

export default function ForBusiness() {
  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      <header className="bg-white border-b border-[#E8E0D7] sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-semibold text-[#18181B]">LumenBridge</Link>
          <Link href="/" className="text-[#71717A] hover:text-[#5F5247] transition">На главную</Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white border border-[#E8E0D7] rounded-2xl p-8 shadow-sm">
          <h1 className="text-4xl font-bold text-[#18181B] mb-6">Займы для бизнеса в Европе</h1>
          <p className="text-lg text-[#71717A] mb-8">Краткосрочные финансовые решения для предпринимателей и компаний</p>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-[#F5F2EE] rounded-xl p-6">
              <h3 className="text-xl font-semibold text-[#18181B] mb-4">Условия</h3>
              <ul className="space-y-3 text-[#71717A]">
                <li>• Сумма: 30 000 – 500 000 EUR</li>
                <li>• Срок: 1 – 12 месяцев</li>
                <li>• Залог: не требуется</li>
              </ul>
            </div>
            <div className="bg-[#F5F2EE] rounded-xl p-6">
              <h3 className="text-xl font-semibold text-[#18181B] mb-4">Преимущества</h3>
              <ul className="space-y-3 text-[#71717A]">
                <li>• Быстрый доступ к средствам</li>
                <li>• Простая процедура</li>
                <li>• Прозрачные условия</li>
              </ul>
            </div>
          </div>
          <div className="bg-[#F5F2EE] rounded-xl p-6">
            <h3 className="text-xl font-semibold text-[#18181B] mb-4">Требования</h3>
            <p className="text-[#71717A] mb-4">Для компаний и ИП: регистрационные документы, удостоверение личности, банковская выписка.</p>
            <p className="text-sm text-[#A0A0A0]">Заявки принимаются через форму обратной связи. Онлайн-кабинет для бизнеса будет доступен позже.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
