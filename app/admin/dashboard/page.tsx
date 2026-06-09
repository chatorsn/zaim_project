'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      setRole(localStorage.getItem('adminRole'));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminRole');
    router.push('/admin/login');
  };

  if (!role) return <div className="min-h-screen bg-[#FFFFF0] flex items-center justify-center">Загрузка...</div>;

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <header className="bg-white border-b border-[#E8E0D5] px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#2E5A4C]">Админ-панель</h1>
        <div className="flex gap-4">
          <span className="text-[#4A4A4A]">Роль: {role}</span>
          <button onClick={logout} className="text-red-600 hover:underline">Выйти</button>
        </div>
      </header>
      <main className="p-6">
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/admin/applications" className="bg-white border border-[#E8E0D5] rounded-2xl p-6 hover:shadow-md transition">
            <h2 className="text-xl font-bold text-[#2E5A4C] mb-2">Заявки</h2>
            <p className="text-[#4A4A4A]">Управление заявками на займы</p>
          </Link>
          <Link href="/admin/loans" className="bg-white border border-[#E8E0D5] rounded-2xl p-6 hover:shadow-md transition">
            <h2 className="text-xl font-bold text-[#2E5A4C] mb-2">Займы</h2>
            <p className="text-[#4A4A4A]">Активные и закрытые займы</p>
          </Link>
          <Link href="/admin/users" className="bg-white border border-[#E8E0D5] rounded-2xl p-6 hover:shadow-md transition">
            <h2 className="text-xl font-bold text-[#2E5A4C] mb-2">Пользователи</h2>
            <p className="text-[#4A4A4A]">Список клиентов</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
