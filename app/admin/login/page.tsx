'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminRole', data.role);
      router.push('/admin/dashboard');
    } else {
      setError(data.error || 'Неверный логин или пароль');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#18181B]">LumenBridge</h1>
          <p className="text-[#71717A] mt-2">Вход в административную панель</p>
        </div>
        <div className="bg-white border border-[#E8E0D7] rounded-2xl p-8">
          {error && <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm text-center mb-6">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[#71717A] text-sm mb-2">Логин</label>
              <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} className="w-full bg-white border border-[#E8E0D7] rounded-xl p-3 focus:border-[#5F5247] outline-none" required />
            </div>
            <div>
              <label className="block text-[#71717A] text-sm mb-2">Пароль</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white border border-[#E8E0D7] rounded-xl p-3 focus:border-[#5F5247] outline-none" required />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[#5F5247] text-white py-3 rounded-full font-medium hover:bg-[#7B6652] transition">
              {loading ? 'Вход...' : 'Войти'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/" className="text-[#71717A] text-sm hover:text-[#5F5247] transition">← На главную</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
