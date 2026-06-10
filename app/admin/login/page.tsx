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
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D0D] to-[#1A1A1A] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Логотип */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#2E5A4C] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white">LB</span>
          </div>
          <h1 className="text-2xl font-bold text-white">LumenBridge Finance</h1>
          <p className="text-white/50 text-sm mt-1">Административная панель</p>
        </div>

        {/* Форма входа */}
        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/20 border border-red-500 rounded-xl p-3 text-red-300 text-sm text-center">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-white/70 text-sm mb-2">Логин</label>
              <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="w-full bg-black/30 border border-white/20 rounded-xl p-3 text-white focus:border-[#2E5A4C] outline-none transition"
                placeholder="admin"
                required
              />
            </div>
            
            <div>
              <label className="block text-white/70 text-sm mb-2">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/30 border border-white/20 rounded-xl p-3 text-white focus:border-[#2E5A4C] outline-none transition"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2E5A4C] hover:bg-[#3D6B5A] text-white py-3 rounded-xl font-medium transition disabled:opacity-50"
            >
              {loading ? 'Вход...' : 'Войти'}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link href="/" className="text-white/40 text-sm hover:text-white/60 transition">
              ← Вернуться на сайт
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
