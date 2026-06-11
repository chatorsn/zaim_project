'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    file: null as File | null,
    consent: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      setError('Необходимо согласие на обработку данных');
      return;
    }
    
    setLoading(true);
    setError('');
    
    // Имитация отправки (в реальном проекте отправляли бы на бекенд)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
      file: null,
      consent: false
    });
    setTimeout(() => setSubmitted(false), 5000);
    setLoading(false);
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
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Контактная информация */}
          <div>
            <h1 className="text-4xl font-bold text-[#18181B] mb-4">Свяжитесь с нами</h1>
            <p className="text-lg text-[#71717A] mb-8">Если у вас есть вопросы или вам нужна помощь — наша команда готова помочь</p>
            
            <div className="space-y-6">
              <div className="bg-white border border-[#E8E0D7] rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-[#18181B] mb-4">Контактная информация</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-[#71717A] text-sm mb-1">Адрес</p>
                    <p className="text-[#18181B]">18 Lower Baggot Street, Dublin 2, Ireland</p>
                  </div>
                  <div>
                    <p className="text-[#71717A] text-sm mb-1">Email</p>
                    <p className="text-[#5F5247] font-medium">support@lumenbridge.example</p>
                  </div>
                  <div>
                    <p className="text-[#71717A] text-sm mb-1">Телефон</p>
                    <p className="text-[#18181B]">+353 1 531 8420</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#E8E0D7] rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-[#18181B] mb-4">Режим работы</h2>
                <div className="space-y-2 text-[#71717A]">
                  <p>Понедельник — Пятница: 9:00 — 18:00</p>
                  <p>Суббота: 10:00 — 16:00</p>
                  <p>Воскресенье: выходной</p>
                </div>
              </div>
            </div>
          </div>

          {/* Форма обратной связи */}
          <div className="bg-white border border-[#E8E0D7] rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-[#18181B] mb-6">Напишите нам</h2>
            
            {submitted && (
              <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-xl text-green-700 text-center">
                Сообщение отправлено! Мы свяжемся с вами.
              </div>
            )}
            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl text-red-600 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[#71717A] text-sm mb-2">Имя *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white border border-[#E8E0D7] rounded-xl p-3 focus:border-[#5F5247] outline-none"
                  placeholder="Иван Иванов"
                />
              </div>

              <div>
                <label className="block text-[#71717A] text-sm mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white border border-[#E8E0D7] rounded-xl p-3 focus:border-[#5F5247] outline-none"
                  placeholder="ivan@example.com"
                />
              </div>

              <div>
                <label className="block text-[#71717A] text-sm mb-2">Телефон</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-white border border-[#E8E0D7] rounded-xl p-3 focus:border-[#5F5247] outline-none"
                  placeholder="+7 999 123-45-67"
                />
              </div>

              <div>
                <label className="block text-[#71717A] text-sm mb-2">Сообщение *</label>
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white border border-[#E8E0D7] rounded-xl p-3 focus:border-[#5F5247] outline-none resize-none"
                  placeholder="Ваше сообщение..."
                />
              </div>

              <div>
                <label className="block text-[#71717A] text-sm mb-2">Прикрепить файл</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full bg-white border border-[#E8E0D7] rounded-xl p-2 text-sm text-[#71717A] file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-[#5F5247] file:text-white hover:file:bg-[#7B6652]"
                />
                <p className="text-xs text-[#A0A0A0] mt-1">Максимальный размер файла: 5MB</p>
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="consent"
                  checked={formData.consent}
                  onChange={(e) => setFormData({...formData, consent: e.target.checked})}
                  className="w-4 h-4 mt-1"
                  required
                />
                <label htmlFor="consent" className="text-sm text-[#71717A] leading-relaxed">
                  Я подтверждаю, что ознакомлен(а) с <Link href="/privacy" className="text-[#5F5247] hover:underline">Политикой конфиденциальности</Link> и <Link href="/cookies" className="text-[#5F5247] hover:underline">Cookie Policy</Link> и даю согласие на обработку моих персональных данных
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#5F5247] text-white py-3 rounded-full font-medium hover:bg-[#7B6652] transition disabled:opacity-50"
              >
                {loading ? 'Отправка...' : 'Отправить'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
