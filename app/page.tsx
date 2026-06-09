'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [amount, setAmount] = useState(15000);
  const [term, setTerm] = useState(45);
  const [result, setResult] = useState<{ paymentAmount: number; totalAmount: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const calculate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, term })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/hero-bg.jpg')" }} />
      
      <div className="relative z-10">
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E8E0D5]">
          <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
            <Link href="/" className="text-xl font-semibold text-[#2E5A4C]">LumenBridge</Link>
            <nav className="hidden md:flex gap-8 text-[#4A4A4A]">
              <Link href="/how-it-works" className="hover:text-[#2E5A4C] transition">Как работает</Link>
              <Link href="/for-business" className="hover:text-[#2E5A4C] transition">Для бизнеса</Link>
              <Link href="/faq" className="hover:text-[#2E5A4C] transition">FAQ</Link>
              <Link href="/contacts" className="hover:text-[#2E5A4C] transition">Контакты</Link>
            </nav>
            <Link href="/login" className="text-[#2E5A4C] border border-[#2E5A4C] px-5 py-2 rounded-full hover:bg-[#2E5A4C] hover:text-white transition">Войти</Link>
          </div>
        </header>

        <section className="pt-40 pb-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <h1 className="text-6xl lg:text-8xl font-bold leading-[0.95] tracking-tight text-white mb-6">
                Получите деньги<br />тогда, когда<br />это действительно<br />нужно
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-2xl">Простые и прозрачные займы для частных лиц и бизнеса в Европе.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/login" className="bg-[#2E5A4C] text-white px-8 py-4 rounded-full font-medium hover:bg-[#3D6B5A] transition">Получить займ</Link>
                <Link href="/how-it-works" className="bg-white/20 backdrop-blur border border-white/30 text-white px-8 py-4 rounded-full font-medium hover:bg-white/30 transition">Как работает</Link>
              </div>
              <div className="flex flex-wrap gap-6 mt-8 text-sm text-white/70">
                <span>✓ Без залога</span>
                <span>✓ Быстрое одобрение</span>
                <span>✓ Выплата на счёт</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { label: 'Для частных лиц', value: '500 — 50 000 €' },
                { label: 'Для бизнеса', value: '30 000 — 500 000 €' },
                { label: 'Срок займа', value: '7 — 90 дней' },
                { label: 'Формат', value: 'Полностью онлайн' }
              ].map((item) => (
                <div key={item.label} className="bg-white/20 backdrop-blur border border-white/20 rounded-3xl p-6">
                  <p className="text-white/70 text-sm mb-2">{item.label}</p>
                  <p className="text-2xl font-medium text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-10 bg-white/20 backdrop-blur border border-white/20 rounded-3xl p-8 lg:p-12">
              <div>
                <p className="text-white/70 mb-2 text-sm">Кредитный калькулятор</p>
                <h2 className="text-3xl lg:text-4xl font-medium text-white mb-4">Рассчитайте условия</h2>
                <p className="text-white/70">Выберите сумму и срок займа</p>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-white mb-2">
                    <span>Сумма</span>
                    <span>{amount.toLocaleString()} €</span>
                  </div>
                  <input type="range" min={500} max={50000} value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full accent-[#2E5A4C]" />
                </div>
                <div>
                  <div className="flex justify-between text-white mb-2">
                    <span>Срок</span>
                    <span>{term} дней</span>
                  </div>
                  <input type="range" min={7} max={90} value={term} onChange={(e) => setTerm(Number(e.target.value))} className="w-full accent-[#2E5A4C]" />
                </div>
                <button onClick={calculate} disabled={loading} className="w-full bg-[#2E5A4C] text-white py-3 rounded-full font-medium hover:bg-[#3D6B5A] transition disabled:opacity-50">
                  {loading ? 'Расчёт...' : 'Рассчитать'}
                </button>
                {result && (
                  <div className="bg-white/30 backdrop-blur rounded-xl p-5">
                    <div className="flex justify-between mb-3">
                      <span className="text-white/70">Платёж</span>
                      <span className="text-xl font-medium text-white">{result.paymentAmount} €</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Итого к возврату</span>
                      <span className="text-xl font-medium text-[#2E5A4C]">{result.totalAmount} €</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/20 py-12 px-6 mt-8">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">LumenBridge Finance</h3>
              <p className="text-sm text-white/60">Краткосрочные финансовые решения</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white/60 mb-4">КОМПАНИЯ</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="/how-it-works">Как работает</Link></li>
                <li><Link href="/for-business">Для бизнеса</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
                <li><Link href="/contacts">Контакты</Link></li>
                <li><Link href="/admin/login">Админ-панель</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white/60 mb-4">ДОКУМЕНТЫ</h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li><Link href="/privacy">Политика конфиденциальности</Link></li>
                <li><Link href="/cookies">Cookie Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white/60 mb-4">КОНТАКТЫ</h4>
              <p className="text-sm text-white/60">18 Lower Baggot Street, Dublin 2</p>
              <p className="text-sm text-[#2E5A4C] mt-2">support@lumenbridge.example</p>
            </div>
          </div>
          <div className="text-center text-white/40 text-xs mt-8 pt-8 border-t border-white/20">
            <p>© 2024 LumenBridge Finance Ltd. Все права защищены.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
