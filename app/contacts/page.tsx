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
    <div className="min-h-screen bg-[#ece6e3]">
      <header className="bg-[#2c3943] border-b border-[#3d4f5c] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-medium text-[#ece6e3]">LumenBridge</Link>
          <Link href="/" className="text-sm text-[#9dabb4] hover:text-[#ece6e3] transition">На главную</Link>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white border border-[#e5d4ca] rounded-2xl p-8 shadow-sm">
            <h1 className="text-3xl font-medium text-[#2c3943] mb-6">Контакты</h1>
            <div className="space-y-4 text-sm text-[#77726f]">
              <p><span className="font-medium text-[#2c3943]">Адрес:</span> 18 Lower Baggot Street, Dublin 2</p>
              <p><span className="font-medium text-[#2c3943]">Email:</span> <a href="mailto:support@lumenbridge.example" className="text-[#2c3943]">support@lumenbridge.example</a></p>
              <p><span className="font-medium text-[#2c3943]">Телефон:</span> +353 1 531 8420</p>
            </div>
          </div>
          <div className="bg-white border border-[#e5d4ca] rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-medium text-[#2c3943] mb-6">Напишите нам</h2>
            {submitted && <div className="mb-6 p-3 bg-green-100 border border-green-200 rounded-xl text-green-700 text-sm text-center">Сообщение отправлено!</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div><input type="text" placeholder="Имя" className="w-full" required /></div>
              <div><input type="email" placeholder="Email" className="w-full" required /></div>
              <div><textarea rows={4} placeholder="Сообщение" className="w-full resize-none" required /></div>
              <button type="submit" className="w-full bg-[#2c3943] text-[#ece6e3] py-3 rounded-full text-sm font-medium hover:bg-[#3d4f5c] transition">Отправить</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
