'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    if (login === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
    } else {
      alert('Неверный логин или пароль');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-4">
        <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-white mb-6">Вход в админ-панель</h1>
          <input
            type="text"
            placeholder="Логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="w-full bg-black/40 border border-white/20 rounded-xl p-3 text-white mb-4"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black/40 border border-white/20 rounded-xl p-3 text-white mb-6"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-[#2E5A4C] text-white py-3 rounded-xl font-medium hover:bg-[#3D6B5A] transition"
          >
            Войти
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <header className="bg-black/80 backdrop-blur-md border-b border-white/10 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Админ-панель</h1>
        <button onClick={() => setIsLoggedIn(false)} className="bg-red-600/20 text-red-400 px-4 py-2 rounded-lg">
          Выйти
        </button>
      </header>
      <div className="p-8">
        <p className="text-white">Тут будут заявки, клиенты, займы</p>
      </div>
    </div>
  );
}
