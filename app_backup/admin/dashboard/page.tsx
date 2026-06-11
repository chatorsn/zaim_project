'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ 
    applications: 0, 
    activeLoans: 0, 
    users: 0, 
    pendingPayments: 0 
  });
  const [recentApps, setRecentApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    console.log('1. TOKEN:', token);
    if (!token) {
      router.push('/admin/login');
      return;
    }
    
    async function loadData() {
      try {
        console.log('2. НАЧАЛО ЗАГРУЗКИ');
        
        const [appsRes, loansRes, usersRes] = await Promise.all([
          fetch('/api/admin/applications'),
          fetch('/api/admin/loans'),
          fetch('/api/admin/users')
        ]);
        
        console.log('3. appsRes.status:', appsRes.status);
        console.log('4. loansRes.status:', loansRes.status);
        console.log('5. usersRes.status:', usersRes.status);
        
        const apps = await appsRes.json();
        const loans = await loansRes.json();
        const users = await usersRes.json();
        
        console.log('6. apps RAW:', apps);
        console.log('7. loans RAW:', loans);
        console.log('8. users RAW:', users);
        
        console.log('9. apps.applications?.length:', apps.applications?.length);
        console.log('10. loans.loans?.length:', loans.loans?.length);
        console.log('11. users.users?.length:', users.users?.length);
        
        const activeLoans = loans.loans?.filter((l: any) => l.status === 'active').length || 0;
        console.log('12. activeLoans (filtered):', activeLoans);
        
        const newStats = {
          applications: apps.applications?.length || 0,
          activeLoans: activeLoans,
          users: users.users?.length || 0,
          pendingPayments: 0
        };
        
        console.log('13. newStats перед setStats:', newStats);
        setStats(newStats);
        setRecentApps(apps.applications?.slice(0, 5) || []);
        console.log('14. recentApps установлены:', apps.applications?.slice(0, 5));
        
      } catch (err) {
        console.error('ОШИБКА:', err);
      } finally {
        setLoading(false);
        console.log('15. ЗАГРУЗКА ЗАВЕРШЕНА, loading = false');
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

  console.log('16. РЕНДЕР: stats =', stats);

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      <header className="bg-white border-b border-[#E8E0D7] px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-2xl font-semibold text-[#18181B]">LumenBridge Admin</h1>
        <button onClick={logout} className="text-[#71717A] hover:text-red-500 transition">Выйти</button>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
            <div className="bg-white rounded-xl border border-[#E8E0D7] p-5 shadow-sm">
              <p className="text-sm text-[#71717A] mb-2">Заявки</p>
              <p className="text-3xl font-bold text-[#5F5247]">{stats.applications}</p>
              <Link href="/admin/applications" className="text-sm text-[#5F5247] mt-3 inline-block hover:underline">Подробнее →</Link>
            </div>
            <div className="bg-white rounded-xl border border-[#E8E0D7] p-5 shadow-sm">
              <p className="text-sm text-[#71717A] mb-2">Активные займы</p>
              <p className="text-3xl font-bold text-[#5F5247]">{stats.activeLoans}</p>
              <Link href="/admin/loans" className="text-sm text-[#5F5247] mt-3 inline-block hover:underline">Подробнее →</Link>
            </div>
            <div className="bg-white rounded-xl border border-[#E8E0D7] p-5 shadow-sm">
              <p className="text-sm text-[#71717A] mb-2">Клиенты</p>
              <p className="text-3xl font-bold text-[#5F5247]">{stats.users}</p>
              <Link href="/admin/users" className="text-sm text-[#5F5247] mt-3 inline-block hover:underline">Подробнее →</Link>
            </div>
            <div className="bg-white rounded-xl border border-[#E8E0D7] p-5 shadow-sm">
              <p className="text-sm text-[#71717A] mb-2">Заявки на оплату</p>
              <p className="text-3xl font-bold text-orange-500">{stats.pendingPayments}</p>
              <span className="text-sm text-[#71717A] mt-3 inline-block">В разработке</span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#E8E0D7] p-6 shadow-sm mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-[#18181B]">Последние заявки</h2>
              <Link href="/admin/applications" className="text-sm text-[#5F5247] hover:underline">Все заявки →</Link>
            </div>
            {recentApps.length === 0 ? (
              <p className="text-[#71717A] text-center py-8">Нет заявок</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#E8E0D7]">
                      <th className="text-left py-3 text-sm font-medium text-[#71717A]">ID</th>
                      <th className="text-left py-3 text-sm font-medium text-[#71717A]">Клиент</th>
                      <th className="text-left py-3 text-sm font-medium text-[#71717A]">Сумма</th>
                      <th className="text-left py-3 text-sm font-medium text-[#71717A]">Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentApps.map((app: any) => (
                      <tr key={app.id} className="border-b border-[#E8E0D7] hover:bg-[#F5F2EE]">
                        <td className="py-3 text-sm">#{app.id}</td>
                        <td className="py-3 text-sm">{app.user_name || `Пользователь ${app.user_id}`}</td>
                        <td className="py-3 text-sm font-medium">{Number(app.amount).toLocaleString()} €</td>
                        <td className="py-3">
                          <span className={`inline-block px-2 py-1 text-xs rounded-full ${
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

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-[#E8E0D7] p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-[#18181B] mb-4">Быстрые действия</h2>
              <div className="flex flex-wrap gap-3">
                <Link href="/admin/applications" className="px-5 py-2 bg-[#5F5247] text-white text-sm rounded-lg hover:bg-[#7B6652] transition">Все заявки</Link>
                <Link href="/admin/loans" className="px-5 py-2 border border-[#5F5247] text-[#5F5247] text-sm rounded-lg hover:bg-[#5F5247] hover:text-white transition">Все займы</Link>
                <Link href="/admin/users" className="px-5 py-2 border border-[#5F5247] text-[#5F5247] text-sm rounded-lg hover:bg-[#5F5247] hover:text-white transition">Все клиенты</Link>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-[#E8E0D7] p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-[#18181B] mb-4">Одобрения</h2>
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-[#5F5247]">78%</div>
                <div className="flex-1 h-2 bg-[#E8E0D7] rounded-full overflow-hidden">
                  <div className="w-[78%] h-full bg-[#5F5247] rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
