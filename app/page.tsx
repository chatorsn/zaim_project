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

  useEffect(() => {
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

  return (
    <div className="min-h-screen bg-[#ece6e3]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#2c3943] border-b border-[#3d4f5c]">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
          <Link href="/" className="text-2xl font-medium text-white tracking-tight">LumenBridge</Link>
          <nav className="hidden md:flex gap-10 text-sm text-[#b7c0c7]">
            <Link href="/about" className="hover:text-white transition">О компании</Link>
            <Link href="/how-it-works" className="hover:text-white transition">Как работает</Link>
            <Link href="/for-business" className="hover:text-white transition">Для бизнеса</Link>
            <Link href="/faq" className="hover:text-white transition">FAQ</Link>
            <Link href="/contacts" className="hover:text-white transition">Контакты</Link>
          </nav>
          {userId ? (
            <Link href="/account" className="text-sm text-white border border-[#4a5c6a] px-6 py-2 rounded-full hover:bg-white hover:text-[#2c3943] transition">Личный кабинет</Link>
          ) : (
            <Link href="/login" className="text-sm text-white border border-[#4a5c6a] px-6 py-2 rounded-full hover:bg-white hover:text-[#2c3943] transition">Войти</Link>
          )}
        </div>
      </header>

      <main>
        {/* HERO - БЛОК УСЛОВИЙ ТЕПЕРЬ НА 80px НИЖЕ */}
        <section className="pt-40 pb-32 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_1fr] gap-20">
              {/* Левая колонка */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <span className="w-8 h-px bg-[#2c3943]" />
                  <span className="text-xs tracking-[0.25em] uppercase text-[#77726f]">Финансирование · Европа</span>
                </div>

                <h1 className="text-5xl lg:text-7xl font-medium text-[#2c3943] mb-6 leading-[1.1]">
                  Получите деньги<br />тогда, когда это<br />действительно нужно
                </h1>
                <p className="text-xl text-[#77726f] mb-6 leading-relaxed max-w-lg">
                  Простые и прозрачные займы для частных лиц и бизнеса в Европе — быстрое решение и безопасное оформление
                </p>
                <p className="text-base text-[#77726f] mb-10 leading-relaxed max-w-lg border-l-2 border-[#e5d4ca] pl-4">
                  Неожиданные расходы или срочные возможности не должны вас останавливать.<br />
                  Сервис помогает быстро получить финансирование — без сложных процедур и скрытых условий.
                </p>

                <div className="flex flex-wrap gap-4">
                  {userId ? (
                    <Link href="/account" className="bg-[#2c3943] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#3d4f5c] transition">Личный кабинет</Link>
                  ) : (
                    <Link href="/login" className="bg-[#2c3943] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#3d4f5c] transition">Получить займ</Link>
                  )}
                  <Link href="/how-it-works" className="border border-[#e5d4ca] px-8 py-3 rounded-full text-sm font-medium text-[#2c3943] hover:bg-[#2c3943] hover:text-white transition">Как работает</Link>
                </div>
              </div>

              {/* Правая колонка - СДВИНУТА ВНИЗ НА 80px */}
              <div className="bg-white rounded-3xl p-12 lg:p-14 shadow-[0_10px_30px_rgba(0,0,0,0.04)] mt-20">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xs tracking-[0.25em] uppercase text-[#77726f]">Условия займа</span>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-[#ece6e3]">
                    <span className="text-sm text-[#77726f]">Сумма</span>
                    <span className="text-xl font-medium text-[#2c3943]">500–50 000 €</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-[#ece6e3]">
                    <span className="text-sm text-[#77726f]">Срок</span>
                    <span className="text-xl font-medium text-[#2c3943]">7–90 дней</span>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-[#ece6e3]">
                    <span className="text-sm text-[#77726f]">Ставка</span>
                    <span className="text-xl font-medium text-[#2c3943]">0.8% в день</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#77726f]">Оформление</span>
                    <span className="text-xl font-medium text-[#2c3943]">24/7</span>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-[#ece6e3]">
                  <p className="text-sm text-[#77726f] mb-2">Рассмотрение заявки</p>
                  <p className="text-3xl font-medium text-[#2c3943]">несколько минут</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-[#ece6e3] text-sm text-[#77726f]">
                  <span>Без залога</span>
                  <span>•</span>
                  <span>Быстрое одобрение</span>
                  <span>•</span>
                  <span>Выплата на банковский счёт</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== КАЛЬКУЛЯТОР ====== */}
        <section className="py-32 px-8 bg-white border-t border-[#e5d4ca]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.25em] uppercase text-[#77726f] mb-4">Калькулятор</p>
              <h2 className="text-5xl font-medium text-[#2c3943] mb-4">Рассчитайте условия</h2>
              <p className="text-lg text-[#77726f] max-w-2xl mx-auto">
                Рассчитайте условия займа за несколько секунд — выберите сумму и срок, чтобы сразу увидеть итоговую сумму к возврату.
                Все условия отображаются до оформления займа.
              </p>
            </div>
            <div className="bg-[#ece6e3] rounded-3xl p-12">
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between text-[#2c3943] mb-4">
                    <span className="text-sm">Сумма займа</span>
                    <span className="text-2xl font-medium text-[#2c3943]">{amount.toLocaleString()} €</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setAmount(Math.max(500, amount - 1000))} className="w-12 h-12 rounded-full bg-white border border-[#e5d4ca] text-xl hover:bg-[#2c3943] hover:text-white hover:border-[#2c3943] transition">−</button>
                    <div className="flex-1">
                      <input type="number" value={amount} onChange={(e) => setAmount(Math.min(50000, Math.max(500, Number(e.target.value))))} className="w-full text-center text-3xl font-medium bg-white border border-[#e5d4ca] rounded-2xl py-4 text-[#2c3943] focus:outline-none focus:border-[#2c3943]" />
                    </div>
                    <button onClick={() => setAmount(Math.min(50000, amount + 1000))} className="w-12 h-12 rounded-full bg-white border border-[#e5d4ca] text-xl hover:bg-[#2c3943] hover:text-white hover:border-[#2c3943] transition">+</button>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[#2c3943] mb-4">
                    <span className="text-sm">Срок займа</span>
                    <span className="text-2xl font-medium text-[#2c3943]">{term} дней</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => setTerm(Math.max(7, term - 5))} className="w-12 h-12 rounded-full bg-white border border-[#e5d4ca] text-xl hover:bg-[#2c3943] hover:text-white hover:border-[#2c3943] transition">−</button>
                    <div className="flex-1">
                      <input type="number" value={term} onChange={(e) => setTerm(Math.min(90, Math.max(7, Number(e.target.value))))} className="w-full text-center text-3xl font-medium bg-white border border-[#e5d4ca] rounded-2xl py-4 text-[#2c3943] focus:outline-none focus:border-[#2c3943]" />
                    </div>
                    <button onClick={() => setTerm(Math.min(90, term + 5))} className="w-12 h-12 rounded-full bg-white border border-[#e5d4ca] text-xl hover:bg-[#2c3943] hover:text-white hover:border-[#2c3943] transition">+</button>
                  </div>
                </div>
                <button onClick={calculate} disabled={loading} className="w-full bg-[#2c3943] text-white py-4 rounded-full text-sm font-medium hover:bg-[#3d4f5c] transition disabled:opacity-50">
                  {loading ? 'Расчёт...' : 'Рассчитать'}
                </button>
                {result && (
                  <>
                    <div className="bg-white rounded-2xl p-8">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[#77726f]">Платёж в день</span>
                        <span className="text-2xl font-medium text-[#2c3943]">{result.paymentAmount.toLocaleString()} €</span>
                      </div>
                      <div className="flex justify-between items-center pt-4 border-t border-[#ece6e3]">
                        <span className="text-[#77726f]">Итого к возврату</span>
                        <span className="text-3xl font-medium text-[#2c3943]">{result.totalAmount.toLocaleString()} €</span>
                      </div>
                    </div>
                    <p className="text-xs text-[#77726f] mt-4 text-center">
                      Расчёт носит ознакомительный характер. Итоговые условия зависят от результатов проверки клиента.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ====== УСЛОВИЯ ЗАЙМА ====== */}
        <section className="py-32 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.25em] uppercase text-[#77726f] mb-4">Условия</p>
              <h2 className="text-5xl font-medium text-[#2c3943]">Основные условия</h2>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { label: 'Сумма', value: 'от 500 до 50,000 EUR' },
                { label: 'Срок', value: 'от 7 до 90 дней' },
                { label: 'Процентная ставка', value: 'определяется индивидуально' },
                { label: 'Погашение', value: 'равными платежами' }
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-3xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] text-center">
                  <p className="text-xs text-[#77726f] mb-2">{item.label}</p>
                  <p className="text-xl font-medium text-[#2c3943]">{item.value}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-[#77726f] mt-8 text-sm">
              Итоговые условия зависят от результатов проверки клиента и предоставленных данных.
            </p>
          </div>
        </section>

        {/* ====== КОГДА ДЕНЬГИ НУЖНЫ СЕЙЧАС ====== */}
        <section className="py-32 px-8 bg-[#ece6e3] border-t border-[#e5d4ca]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.25em] uppercase text-[#77726f] mb-4">Ситуации</p>
              <h2 className="text-5xl font-medium text-[#2c3943] mb-4">Когда деньги нужны сейчас</h2>
              <p className="text-lg text-[#77726f] max-w-2xl mx-auto">
                Не все финансовые вопросы можно отложить. Иногда важно принять решение быстро — без сложных процедур и ожиданий.
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: '💳', title: 'Срочные расходы', desc: 'Неожиданные платежи, которые нельзя перенести' },
                { icon: '📈', title: 'Задержка дохода', desc: 'Когда деньги нужны сейчас, а поступления позже' },
                { icon: '🏢', title: 'Бизнес-задачи', desc: 'Кассовые разрывы или операционные расходы' },
                { icon: '⚡', title: 'Возможности', desc: 'Ситуации, где важно действовать без промедления' }
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-3xl p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] text-center hover:-translate-y-1 transition">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-medium text-[#2c3943] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#77726f]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== КАК ЭТО РАБОТАЕТ ====== */}
        <section className="py-32 px-8 bg-white border-t border-[#e5d4ca]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs tracking-[0.25em] uppercase text-[#77726f] mb-4">Процесс</p>
              <h2 className="text-5xl font-medium text-[#2c3943] mb-4">Как всё происходит</h2>
              <p className="text-lg text-[#77726f] max-w-2xl mx-auto">
                Оформление займа занимает всего несколько минут и полностью проходит онлайн, без визитов в офис и сложных процедур.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { num: '01', title: 'Регистрация', desc: 'Введите номер телефона и подтвердите его с помощью SMS-кода.' },
                { num: '02', title: 'Заявка', desc: 'Выберите сумму и срок займа и отправьте заявку на рассмотрение.' },
                { num: '03', title: 'Получение средств', desc: 'После одобрения деньги поступают на ваш банковский счёт.' }
              ].map((item) => (
                <div key={item.num} className="bg-[#ece6e3] rounded-3xl p-10 relative overflow-hidden">
                  <span className="absolute right-6 bottom-2 text-8xl font-medium text-[#2c3943]/10 pointer-events-none select-none leading-none">{item.num}</span>
                  <div className="relative">
                    <div className="w-12 h-12 bg-[#2c3943] rounded-2xl mb-6" />
                    <h3 className="text-2xl font-medium text-[#2c3943] mb-3">{item.title}</h3>
                    <p className="text-[#77726f] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== ПРОЗРАЧНЫЕ УСЛОВИЯ + КРЕДИТНАЯ ИСТОРИЯ ====== */}
        <section className="py-32 px-8 bg-[#ece6e3] border-t border-[#e5d4ca]">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_440px] gap-20 items-start">
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-[#77726f] mb-4">Преимущества</p>
                <h2 className="text-5xl font-medium text-[#2c3943] mb-8">Вы заранее знаете все условия</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { title: 'Никаких скрытых комиссий', desc: 'Полная стоимость займа известна до оформления' },
                    { title: 'Быстрое рассмотрение', desc: 'Заявки обрабатываются в течение нескольких минут' },
                    { title: 'Безопасность данных', desc: 'Ваши данные защищены современными технологиями' },
                    { title: 'Гибкое погашение', desc: 'Выбирайте удобный срок и погашайте без лишнего давления' }
                  ].map((item) => (
                    <div key={item.title} className="bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                      <h3 className="text-sm font-medium text-[#2c3943] mb-1">{item.title}</h3>
                      <p className="text-xs text-[#77726f]">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-[#2c3943] rounded-3xl p-10">
                <p className="text-xs tracking-[0.25em] uppercase text-[#4a5c6a] mb-4">Кредитная история</p>
                <h3 className="text-2xl font-medium text-white mb-4">Займ — это не только деньги сейчас</h3>
                <p className="text-[#9dabb4] mb-6 leading-relaxed">
                  Своевременное погашение займа помогает улучшить кредитный рейтинг и открывает доступ к более выгодным условиям в будущем.
                </p>
                <ul className="space-y-3 mb-8 text-sm text-[#9dabb4]">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Возможность начать с небольшой суммы</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Формирование положительной кредитной истории</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Более выгодные условия при повторных обращениях</span>
                  </li>
                </ul>
                <Link href="/login" className="inline-block bg-white text-[#2c3943] px-6 py-2 rounded-full text-sm hover:bg-[#ece6e3] transition">
                  Начать с небольшого займа →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ====== CTA + ФОРМА ====== */}
        <section className="py-32 px-8 bg-white border-t border-[#e5d4ca]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-xs tracking-[0.25em] uppercase text-[#77726f] mb-4">Готовы начать?</p>
              <h2 className="text-5xl font-medium text-[#2c3943] mb-4">Подайте заявку прямо сейчас</h2>
              <p className="text-lg text-[#77726f]">Заполните форму и получите решение в кратчайшие сроки</p>
            </div>
            <div className="bg-[#ece6e3] rounded-[32px] p-12">
              <ApplicationForm userId={userId || undefined} />
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-[#2c3943] text-white py-16 px-8 border-t border-[#3d4f5c]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div>
            <h4 className="text-sm font-medium text-[#4a5c6a] mb-4">КОМПАНИЯ</h4>
            <ul className="space-y-3 text-sm text-[#9dabb4]">
              <li><Link href="/about" className="hover:text-white transition">О компании</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white transition">Как это работает</Link></li>
              <li><Link href="/for-business" className="hover:text-white transition">Для бизнеса</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-[#4a5c6a] mb-4">ПОДДЕРЖКА</h4>
            <ul className="space-y-3 text-sm text-[#9dabb4]">
              <li><Link href="/faq" className="hover:text-white transition">Часто задаваемые вопросы</Link></li>
              <li><Link href="/contacts" className="hover:text-white transition">Обратная связь</Link></li>
              <li><Link href="/contacts" className="hover:text-white transition">Контакты</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-[#4a5c6a] mb-4">ДОКУМЕНТЫ</h4>
            <ul className="space-y-3 text-sm text-[#9dabb4]">
              <li><Link href="/terms" className="hover:text-white transition">Условия использования</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Политика конфиденциальности</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition">Cookie Policy</Link></li>
              <li><Link href="/credit-policy" className="hover:text-white transition">Credit Policy</Link></li>
              <li><Link href="/aml-kyc" className="hover:text-white transition">AML/KYC Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-[#4a5c6a] mb-4">КОНТАКТЫ</h4>
            <p className="text-sm text-[#9dabb4]">18 Lower Baggot Street, Dublin 2, Ireland</p>
            <p className="text-sm text-[#9dabb4] mt-2">support@lumenbridge.example</p>
            <p className="text-sm text-[#9dabb4] mt-1">+353 1 531 8420</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto text-center text-[#4a5c6a] text-xs mt-12 pt-8 border-t border-[#3d4f5c]">
          <p>LumenBridge Finance Ltd осуществляет деятельность в соответствии с применимым европейским законодательством.</p>
          <p className="mt-1">Обработка персональных данных осуществляется в рамках требований GDPR.</p>
        </div>
      </footer>
    </div>
  );
}
