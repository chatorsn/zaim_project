'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AccountPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/login');
    } else {
      setUser({ id: userId, phone: localStorage.getItem('userPhone') });
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    router.push('/');
  };

  if (!user) {
    return <div className="min-h-screen bg-[#FFFFF0] flex items-center justify-center">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E8E0D5]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold text-[#2E5A4C]">LumenBridge</Link>
          <div className="flex gap-4">
            <Link href="/" className="text-[#2E5A4C] border border-[#2E5A4C] px-5 py-2 rounded-full hover:bg-[#2E5A4C] hover:text-white transition">На главную</Link>
            <button onClick={logout} className="text-white bg-red-600/80 px-5 py-2 rounded-full hover:bg-red-700 transition">Выйти</button>
          </div>
        </div>
      </header>

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-[#E8E0D5] rounded-3xl p-8 shadow-sm">
            <h1 className="text-3xl font-bold text-[#2E5A4C] mb-6">Мой кабинет</h1>
            <p className="text-[#4A4A4A] mb-2">Телефон: {user.phone}</p>
            <p className="text-[#4A4A4A]">ID пользователя: {user.id}</p>
            <div className="mt-8 p-4 bg-[#F5F0E8] rounded-2xl">
              <p className="text-[#2E5A4C] font-medium">Тут будут ваши займы и заявки</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
