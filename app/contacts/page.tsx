'use client';
import { useState, FormEvent } from 'react';
import Link from 'next/link';

export default function Contacts() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E8E0D5]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold text-[#2E5A4C]">LumenBridge</Link>
          <nav className="hidden md:flex gap-8 text-[#4A4A4A]">
            <Link href="/how-it-works" className="hover:text-[#2E5A4C] transition">Как работает</Link>
            <Link href="/for-business" className="hover:text-[#2E5A4C] transition">Для бизнеса</Link>
            <Link href="/faq" className="hover:text-[#2E5A4C] transition">FAQ</Link>
            <Link href="/contacts" className="text-[#2E5A4C]">Контакты</Link>
          </nav>
          <Link href="/login" className="text-[#2E5A4C] border border-[#2E5A4C] px-5 py-2 rounded-full hover:bg-[#2E5A4C] hover:text-white transition">Войти</Link>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="inline-block mb-6 text-[#2E5A4C] hover:underline">← На главную</Link>
          <h1 className="text-5xl lg:text-6xl font-bold text-[#2E5A4C] mb-6 text-center">Свяжитесь с нами</h1>
          <p className="text-xl text-[#4A4A4A] text-center mb-12">Если у вас есть вопросы или вам нужна помощь — наша команда готова помочь</p>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-white border border-[#E8E0D5] rounded-3xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-[#2E5A4C] mb-4">Контактная информация</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-[#4A4A4A] text-sm mb-1">Адрес</p>
                    <p className="text-[#1A1A1A]">18 Lower Baggot Street, Dublin 2, Ireland</p>
                  </div>
                  <div>
                    <p className="text-[#4A4A4A] text-sm mb-1">Email</p>
                    <p className="text-[#2E5A4C] font-medium">support@lumenbridge.example</p>
                  </div>
                  <div>
                    <p className="text-[#4A4A4A] text-sm mb-1">Телефон</p>
                    <p className="text-[#1A1A1A]">+353 1 531 8420</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#E8E0D5] rounded-3xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-[#2E5A4C] mb-4">Режим работы</h2>
                <div className="space-y-2 text-[#4A4A4A]">
                  <p>Понедельник — Пятница: 9:00 — 18:00</p>
                  <p>Суббота: 10:00 — 16:00</p>
                  <p>Воскресенье: выходной</p>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E8E0D5] rounded-3xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-[#2E5A4C] mb-4">Напишите нам</h2>
              {submitted && (
                <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-xl text-green-700 text-center">
                  Сообщение отправлено! Мы свяжемся с вами.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[#4A4A4A] text-sm mb-1">Имя *</label>
                  <input type="text" required className="w-full" />
                </div>
                <div>
                  <label className="block text-[#4A4A4A] text-sm mb-1">Email *</label>
                  <input type="email" required className="w-full" />
                </div>
                <div>
                  <label className="block text-[#4A4A4A] text-sm mb-1">Сообщение *</label>
                  <textarea rows={4} required className="w-full resize-none" />
                </div>
                <button type="submit" className="w-full bg-[#2E5A4C] text-white py-3 rounded-full font-medium hover:bg-[#3D6B5A] transition">
                  Отправить
                </button>
              </form>
              <p className="text-xs text-[#4A4A4A] mt-4 text-center">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
