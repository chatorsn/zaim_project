'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Contacts() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      <header className="bg-white border-b border-[#E8E0D7] sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-semibold text-[#18181B]">LumenBridge</Link>
          <Link href="/" className="text-[#71717A] hover:text-[#5F5247] transition">На главную</Link>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white border border-[#E8E0D7] rounded-2xl p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-[#18181B] mb-6">Контакты</h1>
            <div className="space-y-4 text-[#71717A]">
              <p><span className="font-semibold text-[#18181B]">Адрес:</span> 18 Lower Baggot Street, Dublin 2, Ireland</p>
              <p><span className="font-semibold text-[#18181B]">Email:</span> <a href="mailto:support@lumenbridge.example" className="text-[#5F5247]">support@lumenbridge.example</a></p>
              <p><span className="font-semibold text-[#18181B]">Телефон:</span> +353 1 531 8420</p>
            </div>
          </div>
          <div className="bg-white border border-[#E8E0D7] rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-[#18181B] mb-6">Напишите нам</h2>
            {submitted && <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-green-600 text-sm text-center mb-6">Сообщение отправлено!</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><input type="text" placeholder="Имя" className="w-full bg-white border border-[#E8E0D7] rounded-xl p-3 focus:border-[#5F5247] outline-none" required /></div>
              <div><input type="email" placeholder="Email" className="w-full bg-white border border-[#E8E0D7] rounded-xl p-3 focus:border-[#5F5247] outline-none" required /></div>
              <div><textarea rows={4} placeholder="Сообщение" className="w-full bg-white border border-[#E8E0D7] rounded-xl p-3 focus:border-[#5F5247] outline-none" required /></div>
              <button type="submit" className="w-full bg-[#5F5247] text-white py-3 rounded-full font-medium hover:bg-[#7B6652] transition">Отправить</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
