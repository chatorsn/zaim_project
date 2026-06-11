'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ApplicationForm from './components/ApplicationForm';

export default function Home() {
  const [amount, setAmount] = useState(15000);
  const [term, setTerm] = useState(45);
  const [result, setResult] = useState<{ paymentAmount: number; totalAmount: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setUserId(localStorage.getItem('userId'));
  }, []);

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

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F5F2] via-[#F5F2EE] to-[#EFE8DF] relative">
      {/* Большие фоновые пятна */}
      <div className="fixed top-0 left-0 w-[800px] h-[800px] rounded-full bg-[#8B7355]/20 blur-[180px] pointer-events-none" />
      <div className="fixed top-[30%] right-0 w-[700px] h-[700px] rounded-full bg-[#A1866F]/15 blur-[180px] pointer-events-none" />
      <div className="fixed bottom-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#5F5247]/10 blur-[160px] pointer-events-none" />

      {/* Тонкие линии по бокам */}
      <div className="fixed left-0 top-0 bottom-0 w-[180px] pointer-events-none opacity-10">
        <svg className="w-full h-full" viewBox="0 0 180 1000" preserveAspectRatio="none" fill="none">
          <path d="M150 0 C20 250 20 750 150 1000" stroke="#5F5247" strokeWidth="1.5" fill="none" />
        </svg>
      </div>
      <div className="fixed right-0 top-0 bottom-0 w-[180px] pointer-events-none opacity-15">
        <svg className="w-full h-full" viewBox="0 0 180 1000" preserveAspectRatio="none" fill="none">
          <path d="M30 0 C160 250 160 750 30 1000" stroke="#5F5247" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {/* Декоративные точки */}
      <div className="fixed left-[5%] top-[20%] w-3 h-3 rounded-full bg-[#5F5247]/20 pointer-events-none" />
      <div className="fixed right-[8%] top-[40%] w-2 h-2 rounded-full bg-[#5F5247]/15 pointer-events-none" />
      <div className="fixed left-[10%] top-[60%] w-4 h-4 rounded-full border border-[#5F5247]/15 pointer-events-none" />
      <div className="fixed right-[12%] top-[75%] w-1.5 h-1.5 rounded-full bg-[#5F5247]/25 pointer-events-none" />
      <div className="fixed left-[7%] top-[85%] w-2.5 h-2.5 rounded-full bg-[#8B7355]/20 pointer-events-none" />

      <div className="relative z-10">
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E8E0D7]">
          <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
            <Link href="/" className="text-2xl font-semibold text-[#18181B] tracking-tight">LumenBridge</Link>
            <nav className="hidden md:flex gap-8">
              <Link href="/how-it-works" className="text-[#71717A] hover:text-[#5F5247] transition">Как работает</Link>
              <Link href="/for-business" className="text-[#71717A] hover:text-[#5F5247] transition">Для бизнеса</Link>
              <Link href="/faq" className="text-[#71717A] hover:text-[#5F5247] transition">FAQ</Link>
              <Link href="/contacts" className="text-[#71717A] hover:text-[#5F5247] transition">Контакты</Link>
            </nav>
            {userId ? (
              <Link href="/account" className="text-[#5F5247] border border-[#5F5247] px-6 py-2 rounded-full hover:bg-[#5F5247] hover:text-white transition">Личный кабинет</Link>
            ) : (
              <Link href="/login" className="text-[#5F5247] border border-[#5F5247] px-6 py-2 rounded-full hover:bg-[#5F5247] hover:text-white transition">Войти</Link>
            )}
          </div>
        </header>

        <main>
          {/* Hero секция с номером 01 */}
          <section className="relative pt-40 pb-24 px-6">
            <span className="absolute right-8 top-8 text-[180px] font-bold text-[#5F5247]/5 pointer-events-none select-none">01</span>
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-[#18181B] mb-6 leading-[1.1]">
                  Получите деньги<br />тогда, когда это<br />действительно нужно
                </h1>
                <p className="text-xl text-[#71717A] mb-8 leading-relaxed">
                  Простые и прозрачные займы для частных лиц и бизнеса в Европе
                </p>
                <div className="flex flex-wrap gap-4">
                  {userId ? (
                    <Link href="/account" className="bg-[#5F5247] text-white px-8 py-3 rounded-full font-medium hover:bg-[#7B6652] transition">Личный кабинет</Link>
                  ) : (
                    <Link href="/login" className="bg-[#5F5247] text-white px-8 py-3 rounded-full font-medium hover:bg-[#7B6652] transition">Получить займ</Link>
                  )}
                  <Link href="/how-it-works" className="border border-[#5F5247] text-[#5F5247] px-8 py-3 rounded-full font-medium hover:bg-[#5F5247] hover:text-white transition">Как работает</Link>
                </div>
                <div className="flex gap-6 mt-8 text-sm text-[#71717A]">
                  <span>✓ Без залога</span>
                  <span>✓ Быстрое одобрение</span>
                  <span>✓ Выплата на счёт</span>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[#E8E0D7] p-8 shadow-sm">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-sm text-[#71717A] mb-1">Сумма</p>
                    <p className="text-2xl font-bold text-[#5F5247]">500–50 000 €</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#71717A] mb-1">Срок</p>
                    <p className="text-2xl font-bold text-[#5F5247]">7–90 дней</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#71717A] mb-1">Ставка</p>
                    <p className="text-2xl font-bold text-[#5F5247]">0.8% в день</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#71717A] mb-1">Оформление</p>
                    <p className="text-2xl font-bold text-[#5F5247]">24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Калькулятор - секция 02 */}
          <section className="relative py-16 px-6 bg-white">
            <span className="absolute right-8 top-8 text-[180px] font-bold text-[#5F5247]/5 pointer-events-none select-none">02</span>
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold text-[#18181B] mb-4">Рассчитайте условия</h2>
                <p className="text-lg text-[#71717A]">за несколько секунд</p>
              </div>
              <div className="bg-white border border-[#E8E0D7] rounded-2xl p-8 lg:p-12 max-w-3xl mx-auto shadow-sm">
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between text-[#18181B] mb-4">
                      <span className="text-lg">Сумма займа</span>
                      <span className="text-2xl font-semibold text-[#5F5247]">{amount.toLocaleString()} €</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <button onClick={() => setAmount(Math.max(500, amount - 1000))} className="w-12 h-12 rounded-full bg-[#F5F2EE] text-[#5F5247] text-xl hover:bg-[#5F5247] hover:text-white transition">−</button>
                      <div className="flex-1 text-center">
                        <input type="number" value={amount} onChange={(e) => setAmount(Math.min(50000, Math.max(500, Number(e.target.value))))} className="w-full text-center text-3xl font-semibold bg-white border border-[#E8E0D7] rounded-2xl py-4 text-[#18181B]" />
                      </div>
                      <button onClick={() => setAmount(Math.min(50000, amount + 1000))} className="w-12 h-12 rounded-full bg-[#F5F2EE] text-[#5F5247] text-xl hover:bg-[#5F5247] hover:text-white transition">+</button>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[#18181B] mb-4">
                      <span className="text-lg">Срок займа</span>
                      <span className="text-2xl font-semibold text-[#5F5247]">{term} дней</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <button onClick={() => setTerm(Math.max(7, term - 5))} className="w-12 h-12 rounded-full bg-[#F5F2EE] text-[#5F5247] text-xl hover:bg-[#5F5247] hover:text-white transition">−</button>
                      <div className="flex-1 text-center">
                        <input type="number" value={term} onChange={(e) => setTerm(Math.min(90, Math.max(7, Number(e.target.value))))} className="w-full text-center text-3xl font-semibold bg-white border border-[#E8E0D7] rounded-2xl py-4 text-[#18181B]" />
                      </div>
                      <button onClick={() => setTerm(Math.min(90, term + 5))} className="w-12 h-12 rounded-full bg-[#F5F2EE] text-[#5F5247] text-xl hover:bg-[#5F5247] hover:text-white transition">+</button>
                    </div>
                  </div>
                  <button onClick={calculate} disabled={loading} className="w-full bg-[#5F5247] text-white py-4 rounded-full font-medium hover:bg-[#7B6652] transition">
                    {loading ? 'Расчёт...' : 'Рассчитать'}
                  </button>
                  {result && (
                    <div className="bg-[#F5F2EE] rounded-2xl p-6 mt-6">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[#71717A]">Платёж в день</span>
                        <span className="text-2xl font-bold text-[#18181B]">{result.paymentAmount} €</span>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-[#5F5247]/20">
                        <span className="text-[#71717A]">Итого к возврату</span>
                        <span className="text-3xl font-bold text-[#5F5247]">{result.totalAmount} €</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Почему выбирают нас - секция 03 */}
          <section className="relative py-20 px-6">
            <span className="absolute right-8 top-8 text-[180px] font-bold text-[#5F5247]/5 pointer-events-none select-none">03</span>
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-4xl lg:text-5xl font-bold text-[#18181B] mb-6">Почему выбирают нас</h2>
                  <div className="space-y-4">
                    {[
                      'Без скрытых комиссий — полная стоимость известна заранее',
                      'Решение за несколько минут — быстрое онлайн-рассмотрение',
                      'Защита персональных данных — современные стандарты безопасности',
                      'Гибкое погашение — выбирайте удобный срок и сумму',
                      'Улучшение условий для постоянных клиентов'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="text-[#5F5247] text-xl">✓</span>
                        <span className="text-[#71717A]">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-[#F5F2EE] rounded-2xl p-8">
                  <h3 className="text-2xl font-semibold text-[#18181B] mb-4">Улучшение кредитной истории</h3>
                  <p className="text-[#71717A] mb-4">Своевременное погашение займа помогает улучшить кредитный рейтинг и открывает доступ к более выгодным условиям.</p>
                  <Link href="/login" className="inline-block text-[#5F5247] font-medium hover:underline">Начать с небольшого займа →</Link>
                </div>
              </div>
            </div>
          </section>

          {/* Как работает */}
          <section className="relative py-20 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold text-[#18181B] mb-4">Как всё происходит</h2>
                <p className="text-lg text-[#71717A]">Оформление займа занимает всего несколько минут</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { num: '01', title: 'Регистрация', desc: 'Введите номер телефона и подтвердите его с помощью SMS-кода' },
                  { num: '02', title: 'Заявка', desc: 'Выберите сумму и срок займа и отправьте заявку на рассмотрение' },
                  { num: '03', title: 'Получение средств', desc: 'После одобрения деньги поступают на ваш банковский счёт' }
                ].map((item) => (
                  <div key={item.num} className="bg-white border border-[#E8E0D7] rounded-2xl p-8 text-center hover:shadow-md transition">
                    <div className="text-5xl font-bold text-[#5F5247]/20 mb-4">{item.num}</div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-[#71717A] text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Форма заявки */}
          <section className="py-20 px-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border border-[#E8E0D7] rounded-2xl p-8 lg:p-12 shadow-sm">
                <h2 className="text-3xl font-semibold text-center mb-8">Подать заявку на займ</h2>
                <ApplicationForm userId={userId || undefined} />
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-[#2C2824] text-white py-16 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4 text-[#C6A43F]">LumenBridge Finance</h3>
              <p className="text-sm text-white/60">Краткосрочные финансовые решения</p>
              <p className="text-sm text-white/60 mt-2">18 Lower Baggot Street, Dublin 2</p>
              <p className="text-sm text-[#C6A43F] mt-2">support@lumenbridge.example</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white/50 mb-4">КОМПАНИЯ</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/how-it-works" className="text-white/60 hover:text-[#C6A43F] transition">Как работает</Link></li>
                <li><Link href="/for-business" className="text-white/60 hover:text-[#C6A43F] transition">Для бизнеса</Link></li>
                <li><Link href="/faq" className="text-white/60 hover:text-[#C6A43F] transition">FAQ</Link></li>
                <li><Link href="/contacts" className="text-white/60 hover:text-[#C6A43F] transition">Контакты</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white/50 mb-4">ДОКУМЕНТЫ</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="text-white/60 hover:text-[#C6A43F] transition">Политика</Link></li>
                <li><Link href="/cookies" className="text-white/60 hover:text-[#C6A43F] transition">Cookie Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white/50 mb-4">КОНТАКТЫ</h4>
              <p className="text-sm text-white/60">+353 1 531 8420</p>
              <p className="text-sm text-[#C6A43F] mt-2">support@lumenbridge.example</p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto text-center text-white/30 text-xs mt-12 pt-8 border-t border-white/10">
            <p>© 2024 LumenBridge Finance Ltd. Все права защищены.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
