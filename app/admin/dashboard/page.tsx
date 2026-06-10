'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const [data, setData] = useState({ applications: 0, loans: 0, users: 0 });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    
    Promise.all([
      fetch('/api/admin/applications').then(r => r.json()),
      fetch('/api/admin/loans').then(r => r.json()),
      fetch('/api/admin/users').then(r => r.json())
    ]).then(([apps, loans, users]) => {
      setData({
        applications: apps.applications?.length || 0,
        loans: loans.loans?.length || 0,
        users: users.users?.length || 0
      });
    }).catch(console.error);
  }, []);

  const logout = () => {
    localStorage.clear();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] flex flex-col">
      <header className="bg-white border-b border-[#E2DCD3] px-6 py-5 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div>
          <h1 className="text-2xl font-semibold text-[#1A1A1A] tracking-tight">LumenBridge Admin</h1>
          <p className="text-sm text-[#8B7D6B] mt-0.5">Панель управления</p>
        </div>
        <button onClick={logout} className="text-[#8B7D6B] hover:text-[#C6A43F] transition text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#F5F0E8]">Выйти</button>
      </header>

      <main className="flex-1 px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-semibold text-[#1A1A1A] tracking-tight">Статистика</h2>
            <p className="text-[#8B7D6B] mt-1">Текущие показатели системы</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Link href="/admin/applications" className="bg-white rounded-xl p-6 border border-[#E2DCD3] hover:shadow-md transition hover:border-[#C6A43F]/30">
              <p className="text-[#8B7D6B] text-sm uppercase tracking-wide">Заявки</p>
              <p className="text-5xl font-semibold text-[#1A1A1A] mt-2">{data.applications}</p>
              <p className="text-[#C6A43F] text-sm mt-4 font-medium">Управление →</p>
            </Link>
            <Link href="/admin/loans" className="bg-white rounded-xl p-6 border border-[#E2DCD3] hover:shadow-md transition hover:border-[#C6A43F]/30">
              <p className="text-[#8B7D6B] text-sm uppercase tracking-wide">Займы</p>
              <p className="text-5xl font-semibold text-[#1A1A1A] mt-2">{data.loans}</p>
              <p className="text-[#C6A43F] text-sm mt-4 font-medium">Управление →</p>
            </Link>
            <Link href="/admin/users" className="bg-white rounded-xl p-6 border border-[#E2DCD3] hover:shadow-md transition hover:border-[#C6A43F]/30">
              <p className="text-[#8B7D6B] text-sm uppercase tracking-wide">Клиенты</p>
              <p className="text-5xl font-semibold text-[#1A1A1A] mt-2">{data.users}</p>
              <p className="text-[#C6A43F] text-sm mt-4 font-medium">Управление →</p>
            </Link>
          </div>

          <div className="bg-white rounded-xl border border-[#E2DCD3] p-6">
            <h3 className="font-semibold text-[#1A1A1A] mb-4">Навигация</h3>
            <div className="flex flex-wrap gap-6">
              <Link href="/admin/applications" className="text-[#8B7D6B] hover:text-[#C6A43F] transition">Заявки</Link>
              <Link href="/admin/loans" className="text-[#8B7D6B] hover:text-[#C6A43F] transition">Займы</Link>
              <Link href="/admin/users" className="text-[#8B7D6B] hover:text-[#C6A43F] transition">Клиенты</Link>
              <Link href="/admin/payments" className="text-[#8B7D6B] hover:text-[#C6A43F] transition">Платежи</Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#E2DCD3] py-4 px-6 text-center text-sm text-[#8B7D6B]">
        © 2024 LumenBridge Finance Ltd. Все права защищены.
      </footer>
    </div>
  );
}
