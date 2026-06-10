'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Application = {
  id: number;
  user_id: number;
  amount: string;
  status: string;
  created_at: string;
  user_name: string;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({ new: 0, active: 0, users: 0, overdue: 0 });
  const [recentApps, setRecentApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
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
      const newApps = apps.applications?.filter((a: any) => a.status === 'new') || [];
      const activeLoans = loans.loans?.filter((l: any) => l.status === 'active') || [];
      setStats({
        new: newApps.length,
        active: activeLoans.length,
        users: users.users?.length || 0,
        overdue: 0
      });
      setRecentApps(apps.applications?.slice(0, 5) || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const logout = () => {
    localStorage.clear();
    router.push('/admin/login');
  };

  if (loading) return <div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center">Загрузка...</div>;

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      <header className="bg-white border-b border-[#E8E0D7] px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-2xl font-semibold text-[#18181B]">LumenBridge Admin</h1>
        <button onClick={logout} className="text-[#71717A] hover:text-red-500 transition">Выйти</button>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* KPI карточки */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white border border-[#E8E0D7] rounded-xl p-4">
              <p className="text-[#71717A] text-sm">Новые заявки</p>
              <p className="text-3xl font-bold text-[#5F5247]">{stats.new}</p>
            </div>
            <div className="bg-white border border-[#E8E0D7] rounded-xl p-4">
              <p className="text-[#71717A] text-sm">Активные займы</p>
              <p className="text-3xl font-bold text-[#5F5247]">{stats.active}</p>
            </div>
            <div className="bg-white border border-[#E8E0D7] rounded-xl p-4">
              <p className="text-[#71717A] text-sm">Клиенты</p>
              <p className="text-3xl font-bold text-[#5F5247]">{stats.users}</p>
            </div>
            <div className="bg-white border border-[#E8E0D7] rounded-xl p-4">
              <p className="text-[#71717A] text-sm">Просрочки</p>
              <p className="text-3xl font-bold text-red-500">{stats.overdue}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Таблица последних заявок */}
            <div className="lg:col-span-2 bg-white border border-[#E8E0D7] rounded-xl p-6">
              <h2 className="text-lg font-semibold text-[#18181B] mb-4">Последние заявки</h2>
              {recentApps.length === 0 ? (
                <p className="text-[#71717A] text-center py-8">Нет заявок</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#E8E0D7] text-left">
                        <th className="pb-3 text-[#71717A] font-medium text-sm">ID</th>
                        <th className="pb-3 text-[#71717A] font-medium text-sm">Клиент</th>
                        <th className="pb-3 text-[#71717A] font-medium text-sm">Сумма</th>
                        <th className="pb-3 text-[#71717A] font-medium text-sm">Статус</th>
                        <th className="pb-3 text-[#71717A] font-medium text-sm">Дата</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentApps.map((app) => (
                        <tr key={app.id} className="border-b border-[#E8E0D7] last:border-0">
                          <td className="py-3 text-sm text-[#18181B]">#{app.id}</td>
                          <td className="py-3 text-sm text-[#71717A]">{app.user_name || `ID: ${app.user_id}`}</td>
                          <td className="py-3 text-sm font-medium text-[#18181B]">{Number(app.amount).toLocaleString()} €</td>
                          <td className="py-3">
                            <span className={`text-xs px-2 py-1 rounded-full ${app.status === 'new' ? 'bg-yellow-100 text-yellow-700' : app.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {app.status === 'new' ? 'Новая' : app.status === 'approved' ? 'Одобрена' : 'Отклонена'}
                            </span>
                          </td>
                          <td className="py-3 text-sm text-[#71717A]">{new Date(app.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="mt-4 text-right">
                <Link href="/admin/applications" className="text-sm text-[#5F5247] hover:underline">Все заявки →</Link>
              </div>
            </div>

            {/* Боковая колонка */}
            <div className="space-y-6">
              {/* Активность */}
              <div className="bg-white border border-[#E8E0D7] rounded-xl p-6">
                <h2 className="text-lg font-semibold text-[#18181B] mb-4">Активность</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-[#71717A]">Новая заявка #{recentApps[0]?.id || '—'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-[#71717A]">Новый клиент зарегистрирован</span>
                  </div>
                </div>
              </div>

              {/* Быстрые действия */}
              <div className="bg-white border border-[#E8E0D7] rounded-xl p-6">
                <h2 className="text-lg font-semibold text-[#18181B] mb-4">Быстрые действия</h2>
                <div className="space-y-3">
                  <Link href="/admin/applications" className="block w-full text-center bg-[#5F5247] text-white py-2 rounded-lg hover:bg-[#7B6652] transition">Новая заявка</Link>
                  <Link href="/admin/users" className="block w-full text-center border border-[#5F5247] text-[#5F5247] py-2 rounded-lg hover:bg-[#5F5247] hover:text-white transition">Новый клиент</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Статистика заявок (простая заглушка вместо графика) */}
          <div className="mt-6 bg-white border border-[#E8E0D7] rounded-xl p-6">
            <h2 className="text-lg font-semibold text-[#18181B] mb-4">Одобрения</h2>
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-[#5F5247]">78%</div>
              <div className="flex-1 h-2 bg-[#E8E0D7] rounded-full overflow-hidden">
                <div className="w-[78%] h-full bg-[#5F5247] rounded-full"></div>
              </div>
              <span className="text-sm text-[#71717A]">за последние 30 дней</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
