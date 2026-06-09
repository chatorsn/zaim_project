'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState('phone');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const sendCode = async () => {
    setLoading(true);
    await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    });
    setStep('code');
    setLoading(false);
  };

  const verifyCode = async () => {
    setLoading(true);
    const res = await fetch('/api/auth', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, code })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('userPhone', data.user.phone);
      router.push('/account');
    } else {
      alert('Неверный код');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E8E0D5]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold text-[#2E5A4C]">LumenBridge</Link>
          <Link href="/" className="text-[#2E5A4C] border border-[#2E5A4C] px-5 py-2 rounded-full hover:bg-[#2E5A4C] hover:text-white transition">На главную</Link>
        </div>
      </header>

      <div className="flex items-center justify-center min-h-screen pt-32 pb-20 px-6">
        <div className="bg-white border border-[#E8E0D5] rounded-3xl p-8 max-w-md w-full shadow-sm">
          <h1 className="text-3xl font-bold text-[#2E5A4C] mb-6">Вход в личный кабинет</h1>
          {step === 'phone' ? (
            <div>
              <input
                type="tel"
                placeholder="Номер телефона"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mb-4"
              />
              <button
                onClick={sendCode}
                disabled={loading}
                className="w-full bg-[#2E5A4C] text-white py-3 rounded-full font-medium hover:bg-[#3D6B5A] transition disabled:opacity-50"
              >
                {loading ? 'Отправка...' : 'Получить код'}
              </button>
            </div>
          ) : (
            <div>
              <p className="text-[#4A4A4A] mb-4">Код отправлен на {phone}</p>
              <input
                type="text"
                placeholder="Введите код"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full mb-4"
              />
              <button
                onClick={verifyCode}
                disabled={loading}
                className="w-full bg-[#2E5A4C] text-white py-3 rounded-full font-medium hover:bg-[#3D6B5A] transition disabled:opacity-50"
              >
                {loading ? 'Проверка...' : 'Войти'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
