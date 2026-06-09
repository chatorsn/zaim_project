'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFF0] flex items-center justify-center px-6">
      <div className="bg-white border border-[#E8E0D5] rounded-3xl p-8 max-w-md w-full shadow-sm">
        <Link href="/" className="text-[#2E5A4C] text-sm hover:underline">← На главную</Link>
        <h1 className="text-3xl font-bold text-[#2E5A4C] mt-4 mb-6">Вход в админ-панель</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)} className="w-full" required />
          <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full" required />
          <button type="submit" className="w-full bg-[#2E5A4C] text-white py-3 rounded-full font-medium hover:bg-[#3D6B5A] transition">Войти</button>
        </form>
      </div>
    </div>
  );
}
