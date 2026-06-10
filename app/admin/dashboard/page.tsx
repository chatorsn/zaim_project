'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const [role, setRole] = useState<string | null>(null);
  const [stats, setStats] = useState({
    applications: 0,
    activeLoans: 0,
    users: 0,
    pendingPayments: 0
  });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      setRole(localStorage.getItem('adminRole'));
      fetchStats();
    }
  }, []);

  const fetchStats = async () => {
    try {
      const appsRes = await fetch('/api/admin/applications');
      const appsData = await appsRes.json();
      setStats(prev => ({ ...prev, applications: appsData.applications?.length || 0 }));
    } catch (e) {
      console.error(e);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminRole');
    router.push('/admin/login');
  };

  if (!role) {
    return <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">Загрузка...</div>;
  }

  const menuItems = [
    { title: 'Заявки', href: '/admin/applications', icon: '📋', count: stats.applications, color: 'from-blue-500/20 to-blue-600/10' },
    { title: 'Займы', href: '/admin/loans', icon: '💰', count: stats.activeLoans, color: 'from-green-500/20 to-green-600/10' },
    { title: 'Клиенты', href: '/admin/users', icon: '👥', count: stats.users, color: 'from-purple-500/20 to-purple-600/10' },
    { title: 'Платежи', href: '/admin/payments', icon: '💳', count: stats.pendingPayments, color: 'from-yellow-500/20 to-yellow-600/10' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0F] to-[#12121A]">
      {/* Header */}
      <header className="bg-black/60 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">LumenBridge Admin</h1>
            <p className="text-white/40 text-sm mt-0.5">Роль: {role}</p>
          </div>
          <button onClick={logout} className="px-5 py-2 rounded-xl bg-red-500/20 text-red-400 hover:bg-red-500/30 transition text-sm font-medium">Выйти</button>
        </div>
      </header>

      {/* Main */}
      <main className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Приветствие */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white">Добро пожаловать, {role === 'admin' ? 'Администратор' : 'Оператор'}</h2>
            <p className="text-white/40 mt-1">Управляйте заявками, займами и клиентами</p>
          </div>

          {/* Карточки статистики */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative overflow-hidden bg-gradient-to-br ${item.color} border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-white/50 text-sm mb-1">{item.title}</p>
                    <p className="text-3xl font-bold text-white">{item.count}</p>
                  </div>
                  <div className="text-4xl opacity-50 group-hover:opacity-100 transition">{item.icon}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Быстрые действия */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Быстрые действия</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/admin/applications" className="flex items-center gap-3 bg-white/5 rounded-xl p-4 hover:bg-white/10 transition">
                <span className="text-2xl">📋</span>
                <div>
                  <p className="text-white font-medium">Новые заявки</p>
                  <p className="text-white/40 text-sm">Просмотр и обработка</p>
                </div>
              </Link>
              <Link href="/admin/loans" className="flex items-center gap-3 bg-white/5 rounded-xl p-4 hover:bg-white/10 transition">
                <span className="text-2xl">💰</span>
                <div>
                  <p className="text-white font-medium">Активные займы</p>
                  <p className="text-white/40 text-sm">Контроль и платежи</p>
                </div>
              </Link>
              <Link href="/admin/users" className="flex items-center gap-3 bg-white/5 rounded-xl p-4 hover:bg-white/10 transition">
                <span className="text-2xl">👥</span>
                <div>
                  <p className="text-white font-medium">Клиенты</p>
                  <p className="text-white/40 text-sm">Управление пользователями</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
