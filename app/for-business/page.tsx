'use client';
import Link from 'next/link';

export default function ForBusiness() {
  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E8E0D5]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold text-[#2E5A4C]">LumenBridge</Link>
          <nav className="hidden md:flex gap-8 text-[#4A4A4A]">
            <Link href="/how-it-works" className="hover:text-[#2E5A4C] transition">Как работает</Link>
            <Link href="/for-business" className="text-[#2E5A4C]">Для бизнеса</Link>
            <Link href="/faq" className="hover:text-[#2E5A4C] transition">FAQ</Link>
            <Link href="/contacts" className="hover:text-[#2E5A4C] transition">Контакты</Link>
          </nav>
          <Link href="/login" className="text-[#2E5A4C] border border-[#2E5A4C] px-5 py-2 rounded-full hover:bg-[#2E5A4C] hover:text-white transition">Войти</Link>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-block mb-6 text-[#2E5A4C] hover:underline">← На главную</Link>
          <h1 className="text-5xl lg:text-6xl font-bold text-[#2E5A4C] mb-6 text-center">Займы для бизнеса в Европе</h1>
          <p className="text-xl text-[#4A4A4A] text-center mb-12">
            Краткосрочные финансовые решения для предпринимателей и компаний
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white border border-[#E8E0D5] rounded-3xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#2E5A4C] mb-4">Условия финансирования</h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-[#E8E0D5]">
                  <span className="text-[#4A4A4A]">Сумма займа</span>
                  <span className="font-medium text-[#2E5A4C]">30 000 — 500 000 EUR</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E8E0D5]">
                  <span className="text-[#4A4A4A]">Срок</span>
                  <span className="font-medium text-[#2E5A4C]">1 — 12 месяцев</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#E8E0D5]">
                  <span className="text-[#4A4A4A]">Залог</span>
                  <span className="font-medium text-[#2E5A4C]">Не требуется</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-[#4A4A4A]">Рассмотрение</span>
                  <span className="font-medium text-[#2E5A4C]">Быстрое онлайн</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E8E0D5] rounded-3xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#2E5A4C] mb-4">Преимущества</h2>
              <ul className="space-y-2 text-[#4A4A4A]">
                <li>• Быстрый доступ к средствам</li>
                <li>• Простая процедура оформления</li>
                <li>• Прозрачные условия без скрытых платежей</li>
                <li>• Поддержка малого и среднего бизнеса</li>
              </ul>
            </div>
          </div>

          <div className="bg-white border border-[#E8E0D5] rounded-3xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-[#2E5A4C] mb-4">Требования к заемщикам</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-[#2E5A4C] mb-3">Для компаний (PVT, LTD)</h3>
                <ul className="space-y-1 text-[#4A4A4A]">
                  <li>• Certificate of Incorporation</li>
                  <li>• Регистрационный номер компании</li>
                  <li>• Удостоверение личности директора</li>
                  <li>• Банковская выписка</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#2E5A4C] mb-3">Для индивидуальных предпринимателей</h3>
                <ul className="space-y-1 text-[#4A4A4A]">
                  <li>• Сертификат регистрации бизнеса</li>
                  <li>• Регистрационный номер предпринимателя</li>
                  <li>• Удостоверение личности владельца</li>
                  <li>• Выписка по банковскому счёту</li>
                </ul>
              </div>
            </div>
            <div className="mt-6 p-4 bg-[#F5F0E8] rounded-2xl">
              <p className="text-[#2E5A4C] text-sm">На данный момент заявки принимаются через форму обратной связи. Онлайн-кабинет для бизнеса будет доступен позже.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
