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
      localStorage.setItem('adminLogin', login); // <-- сохраняем логин
      router.push('/admin/dashboard');
    } else {
      setError(data.error || 'Неверный логин или пароль');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#ece6e3] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium text-[#2c3943]">LumenBridge</h1>
          <p className="text-sm text-[#77726f] mt-2">Вход в административную панель</p>
        </div>
        <div className="bg-white border border-[#e5d4ca] rounded-2xl p-8 shadow-sm">
          {error && <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm text-center mb-6">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-[#77726f] mb-2">Логин</label>
              <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} className="w-full border border-[#e5d4ca] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2c3943]" required />
            </div>
            <div>
              <label className="block text-sm text-[#77726f] mb-2">Пароль</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-[#e5d4ca] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2c3943]" required />
            </div>
            <button type="submit" disabled={loading} className="w-full bg-[#2c3943] text-[#ece6e3] py-3 rounded-full text-sm font-medium hover:bg-[#3d4f5c] transition disabled:opacity-50">
              {loading ? 'Вход...' : 'Войти'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-[#9dabb4] hover:text-[#2c3943] transition">← На главную</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
