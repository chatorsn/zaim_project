'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    users: 0,
    approvedToday: 0,
    rejected: 0,
    avgLoan: 0
  });
  const [recentApps, setRecentApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    
    async function loadData() {
      try {
        const [appsRes, loansRes, usersRes] = await Promise.all([
          fetch('/api/admin/applications'),
          fetch('/api/admin/loans'),
          fetch('/api/admin/users')
        ]);
        
        const apps = await appsRes.json();
        const loans = await loansRes.json();
        const users = await usersRes.json();
        
        const applications = apps.applications || [];
        const approved = applications.filter((a: any) => a.status === 'approved');
        const totalAmount = applications.reduce((sum: number, a: any) => sum + Number(a.amount), 0);
        
        setStats({
          total: applications.length,
          active: loans.loans?.filter((l: any) => l.status === 'active').length || 0,
          users: users.users?.length || 0,
          approvedToday: approved.length,
          rejected: applications.filter((a: any) => a.status === 'rejected').length,
          avgLoan: applications.length > 0 ? Math.round(totalAmount / applications.length) : 0
        });
        setRecentApps(applications.slice(0, 5));
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

  const weeklyData = [4, 7, 3, 8, 5, 6, 4];
  const maxWeek = Math.max(...weeklyData);

  return (
    <div className="min-h-screen bg-[#F7F5F2] relative">
      {/* Фоновая сетка */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(95,82,71,0.03) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(95,82,71,0.03) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="relative z-10">
        <header className="bg-white/95 backdrop-blur-sm border-b border-[#E8E0D7] px-6 py-4 flex justify-between items-center sticky top-0 z-20">
          <h1 className="text-2xl font-semibold text-[#18181B]">LumenBridge Admin</h1>
          <button onClick={logout} className="text-[#71717A] hover:text-red-500 transition">Выйти</button>
        </header>

        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* 6 KPI карточек - кликабельные */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              <Link href="/admin/applications" className="bg-white rounded-xl border border-[#E8E0D7] p-5 text-center shadow-sm hover:shadow-md transition block">
                <p className="text-sm text-[#71717A] mb-2">Всего заявок</p>
                <p className="text-4xl font-bold text-[#5F5247]">{stats.total}</p>
              </Link>
              <Link href="/admin/loans" className="bg-white rounded-xl border border-[#E8E0D7] p-5 text-center shadow-sm hover:shadow-md transition block">
                <p className="text-sm text-[#71717A] mb-2">Активные займы</p>
                <p className="text-4xl font-bold text-[#5F5247]">{stats.active}</p>
              </Link>
              <Link href="/admin/users" className="bg-white rounded-xl border border-[#E8E0D7] p-5 text-center shadow-sm hover:shadow-md transition block">
                <p className="text-sm text-[#71717A] mb-2">Клиенты</p>
                <p className="text-4xl font-bold text-[#5F5247]">{stats.users}</p>
              </Link>
              <div className="bg-white rounded-xl border border-[#E8E0D7] p-5 text-center shadow-sm">
                <p className="text-sm text-[#71717A] mb-2">Одобрено</p>
                <p className="text-4xl font-bold text-green-600">{stats.approvedToday}</p>
              </div>
              <div className="bg-white rounded-xl border border-[#E8E0D7] p-5 text-center shadow-sm">
                <p className="text-sm text-[#71717A] mb-2">Отклонено</p>
                <p className="text-4xl font-bold text-red-500">{stats.rejected}</p>
              </div>
              <div className="bg-white rounded-xl border border-[#E8E0D7] p-5 text-center shadow-sm">
                <p className="text-sm text-[#71717A] mb-2">Средний займ</p>
                <p className="text-4xl font-bold text-[#5F5247]">{stats.avgLoan.toLocaleString()} €</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Таблица последних заявок */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-[#E8E0D7] shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#E8E0D7] flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-[#18181B]">Последние заявки</h2>
                  <Link href="/admin/applications" className="text-sm text-[#5F5247] hover:underline">Все →</Link>
                </div>
                {recentApps.length === 0 ? (
                  <div className="text-center py-12 text-[#71717A]">Нет заявок</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#F5F2EE]">
                        <tr>
                          <th className="text-left px-6 py-3 text-sm font-medium text-[#71717A]">ID</th>
                          <th className="text-left px-6 py-3 text-sm font-medium text-[#71717A]">Клиент</th>
                          <th className="text-left px-6 py-3 text-sm font-medium text-[#71717A]">Сумма</th>
                          <th className="text-left px-6 py-3 text-sm font-medium text-[#71717A]">Статус</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentApps.map((app: any) => (
                          <tr key={app.id} className="border-b border-[#E8E0D7] hover:bg-[#F5F2EE]/50 transition">
                            <td className="px-6 py-4 text-sm">#{app.id}</td>
                            <td className="px-6 py-4 text-sm text-[#71717A]">{app.user_name || `ID: ${app.user_id}`}</td>
                            <td className="px-6 py-4 text-sm font-medium">{Number(app.amount).toLocaleString()} €</td>
                            <td className="px-6 py-4">
                              <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                                app.status === 'new' ? 'bg-yellow-100 text-yellow-700' :
                                app.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                              }`}>
                                {app.status === 'new' ? 'Новая' : app.status === 'approved' ? 'Одобрена' : 'Отклонена'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Боковая колонка */}
              <div className="space-y-6">
                {/* Быстрые действия */}
                <div className="bg-white rounded-xl border border-[#E8E0D7] p-5 shadow-sm">
                  <h3 className="text-base font-semibold text-[#18181B] mb-3">Быстрые действия</h3>
                  <div className="flex flex-col gap-2">
                    <Link href="/admin/applications" className="text-[#5F5247] hover:underline">📋 Все заявки</Link>
                    <Link href="/admin/loans" className="text-[#5F5247] hover:underline">💰 Все займы</Link>
                    <Link href="/admin/users" className="text-[#5F5247] hover:underline">👥 Все клиенты</Link>
                  </div>
                </div>

                {/* Последняя активность */}
                <div className="bg-white rounded-xl border border-[#E8E0D7] p-5 shadow-sm">
                  <h3 className="text-base font-semibold text-[#18181B] mb-3">Последняя активность</h3>
                  <div className="space-y-3">
                    {recentApps.slice(0, 3).map((app: any) => (
                      <div key={app.id} className="flex items-start gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                        <span className="text-[#71717A]">Заявка #{app.id} — {app.status === 'new' ? 'создана' : app.status === 'approved' ? 'одобрена' : 'отклонена'}</span>
                      </div>
                    ))}
                    {recentApps.length === 0 && <p className="text-[#71717A] text-sm">Нет активности</p>}
                  </div>
                </div>

                {/* График за неделю */}
                <div className="bg-white rounded-xl border border-[#E8E0D7] p-5 shadow-sm">
                  <h3 className="text-base font-semibold text-[#18181B] mb-3">Заявки за неделю</h3>
                  <div className="flex items-end justify-between gap-2 h-32">
                    {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, i) => (
                      <div key={day} className="flex-1 text-center">
                        <div className="bg-[#5F5247]/20 rounded-md mx-1" style={{ height: `${(weeklyData[i] / maxWeek) * 80}px` }}>
                          <div className="bg-[#5F5247] rounded-md h-full" style={{ height: `${(weeklyData[i] / maxWeek) * 80}px`, width: '100%' }}></div>
                        </div>
                        <p className="text-xs text-[#71717A] mt-1">{day}</p>
                        <p className="text-xs font-medium text-[#5F5247]">{weeklyData[i]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
