'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const sendCode = async () => {
    setLoading(true);
    setError('');
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    });
    if (res.ok) {
      setStep('code');
    } else {
      setError('Ошибка отправки кода');
    }
    setLoading(false);
  };

  const verifyCode = async () => {
    setLoading(true);
    setError('');
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
      setError(data.error || 'Неверный код');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-semibold text-[#18181B] tracking-tight">LumenBridge</Link>
          <p className="text-[#71717A] mt-2">Вход в личный кабинет</p>
        </div>
        <div className="bg-white border border-[#E8E0D7] rounded-2xl p-8 shadow-sm">
          {error && <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm text-center mb-6">{error}</div>}
          {step === 'phone' ? (
            <div className="space-y-4">
              <div>
                <label className="block text-[#71717A] text-sm mb-2">Номер телефона</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-white border border-[#E8E0D7] rounded-xl p-3 focus:border-[#5F5247] outline-none" placeholder="+7 999 123-45-67" />
              </div>
              <button onClick={sendCode} disabled={loading} className="w-full bg-[#5F5247] text-white py-3 rounded-full font-medium hover:bg-[#7B6652] transition disabled:opacity-50">
                {loading ? 'Отправка...' : 'Получить код'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-[#71717A] text-sm text-center">Код отправлен на {phone}</p>
              <div>
                <label className="block text-[#71717A] text-sm mb-2">Код из SMS</label>
                <input type="text" value={code} onChange={(e) => setCode(e.target.value)} className="w-full bg-white border border-[#E8E0D7] rounded-xl p-3 focus:border-[#5F5247] outline-none" placeholder="000000" />
              </div>
              <button onClick={verifyCode} disabled={loading} className="w-full bg-[#5F5247] text-white py-3 rounded-full font-medium hover:bg-[#7B6652] transition disabled:opacity-50">
                {loading ? 'Проверка...' : 'Войти'}
              </button>
            </div>
          )}
          <div className="mt-6 text-center">
            <Link href="/" className="text-[#71717A] text-sm hover:text-[#5F5247] transition">← Вернуться на главную</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
