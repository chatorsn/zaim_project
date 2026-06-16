'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ applications: 0, loans: 0, users: 0 });
  const [role, setRole] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const userRole = localStorage.getItem('adminRole') || '';
    setRole(userRole);
    
    if (!token) {
      router.push('/admin/login');
      return;
    }
    
    async function loadData() {
      try {
        const [apps, loans, users] = await Promise.all([
          fetch('/api/admin/applications').then(r => r.json()),
          fetch('/api/admin/loans').then(r => r.json()),
          fetch('/api/admin/users').then(r => r.json())
        ]);
        setStats({
          applications: apps.applications?.length || 0,
          loans: loans.loans?.length || 0,
          users: users.users?.length || 0
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const logout = () => {
    localStorage.clear();
    router.push('/admin/login');
  };

  if (loading) {
    return <div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center">Загрузка...</div>;
  }

  const isAdmin = role === 'admin';

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      <header className="bg-white border-b border-[#E8E0D7] px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-[#18181B]">LumenBridge Admin</h1>
          <span className={`text-xs px-3 py-1 rounded-full ${isAdmin ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
            {isAdmin ? 'Администратор' : 'Оператор'}
          </span>
        </div>
        <button onClick={logout} className="text-[#71717A] hover:text-red-500 transition">Выйти</button>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Link href="/admin/applications" className="bg-white rounded-xl border border-[#E8E0D7] p-6 text-center hover:shadow-md transition">
              <p className="text-sm text-[#71717A] mb-2">Заявки</p>
              <p className="text-3xl font-bold text-[#5F5247]">{stats.applications}</p>
            </Link>
            <Link href="/admin/loans" className="bg-white rounded-xl border border-[#E8E0D7] p-6 text-center hover:shadow-md transition">
              <p className="text-sm text-[#71717A] mb-2">Займы</p>
              <p className="text-3xl font-bold text-[#5F5247]">{stats.loans}</p>
            </Link>
            <Link href="/admin/users" className="bg-white rounded-xl border border-[#E8E0D7] p-6 text-center hover:shadow-md transition">
              <p className="text-sm text-[#71717A] mb-2">Клиенты</p>
              <p className="text-3xl font-bold text-[#5F5247]">{stats.users}</p>
            </Link>
          </div>

          <div className="bg-white rounded-xl border border-[#E8E0D7] p-6">
            <h2 className="text-lg font-semibold text-[#18181B] mb-4">Быстрые действия</h2>
            <div className="flex flex-wrap gap-4">
              <Link href="/admin/applications" className="px-5 py-2 bg-[#5F5247] text-white text-sm rounded-lg hover:bg-[#7B6652] transition">Все заявки</Link>
              {isAdmin && (
                <>
                  <Link href="/admin/loans" className="px-5 py-2 border border-[#5F5247] text-[#5F5247] text-sm rounded-lg hover:bg-[#5F5247] hover:text-white transition">Все займы</Link>
                  <Link href="/admin/users" className="px-5 py-2 border border-[#5F5247] text-[#5F5247] text-sm rounded-lg hover:bg-[#5F5247] hover:text-white transition">Все клиенты</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
