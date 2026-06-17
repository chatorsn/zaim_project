'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Application = {
  id: number;
  user_id: number;
  amount: string;
  term: number;
  status: string;
  user_name: string;
  phone: string;
  created_at: string;
};

type Loan = {
  id: number;
  amount: string;
  status: string;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({ 
    applications: 0, 
    loans: 0, 
    users: 0, 
    paymentRequests: 0,
    totalLoanAmount: 0,
    avgLoanAmount: 0
  });
  const [recentApplications, setRecentApplications] = useState<Application[]>([]);
  const [statusCounts, setStatusCounts] = useState({ new: 0, approved: 0, rejected: 0 });
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
        const [appsRes, loansRes, usersRes, paymentsRes] = await Promise.all([
          fetch('/api/admin/applications'),
          fetch('/api/admin/loans'),
          fetch('/api/admin/users'),
          fetch('/api/admin/payment-requests')
        ]);
        
        const apps = await appsRes.json();
        const loans = await loansRes.json();
        const users = await usersRes.json();
        const payments = await paymentsRes.json();
        
        const applications = apps.applications || [];
        const loansList = loans.loans || [];
        
        const statuses = applications.reduce((acc: any, app: Application) => {
          acc[app.status] = (acc[app.status] || 0) + 1;
          return acc;
        }, {});
        
        const totalAmount = loansList.reduce((sum: number, loan: Loan) => {
          return sum + Number(loan.amount);
        }, 0);
        
        const avgAmount = loansList.length > 0 ? totalAmount / loansList.length : 0;
        
        setStats({
          applications: applications.length,
          loans: loansList.length,
          users: users.users?.length || 0,
          paymentRequests: payments.requests?.length || 0,
          totalLoanAmount: totalAmount,
          avgLoanAmount: avgAmount
        });
        
        setStatusCounts({
          new: statuses.new || 0,
          approved: statuses.approved || 0,
          rejected: statuses.rejected || 0
        });
        
        setRecentApplications(applications.slice(0, 5));
        
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminRole');
    router.push('/admin/login');
  };

  if (loading) {
    return <div className="min-h-screen bg-[#ece6e3] flex items-center justify-center text-[#2c3943]">Загрузка...</div>;
  }

  const isAdmin = role === 'admin';
  const isOperator = role === 'operator';
  
  const getStatusText = (status: string) => {
    const map: Record<string, string> = { 
      new: 'Новая', 
      approved: 'Одобрена', 
      rejected: 'Отклонена' 
    };
    return map[status] || status;
  };

  return (
    <div className="min-h-screen bg-[#ece6e3]">
      <header className="bg-[#2c3943] border-b border-[#3d4f5c] px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-medium text-[#ece6e3]">LumenBridge Admin</h1>
          <span className="text-xs px-3 py-1 rounded-full bg-[#4a5c6a] text-[#ece6e3]">
            {isAdmin ? 'Администратор' : 'Оператор'}
          </span>
        </div>
        <button onClick={logout} className="text-sm text-[#9dabb4] hover:text-[#ece6e3] transition">Выйти</button>
      </header>

      <main className="p-8 max-w-7xl mx-auto">
        {/* Карточки статистики */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Link href="/admin/applications" className="bg-white rounded-2xl border border-[#e5d4ca] p-6 shadow-sm hover:shadow-md transition">
            <p className="text-sm text-[#9dabb4] mb-1">Заявки</p>
            <p className="text-3xl font-medium text-[#2c3943]">{stats.applications}</p>
            <div className="flex gap-3 mt-3 text-xs">
              <span className="text-[#77726f]">Новых: {statusCounts.new}</span>
              <span className="text-[#77726f]">Одобрено: {statusCounts.approved}</span>
            </div>
          </Link>
          <Link href="/admin/loans" className="bg-white rounded-2xl border border-[#e5d4ca] p-6 shadow-sm hover:shadow-md transition">
            <p className="text-sm text-[#9dabb4] mb-1">Займы</p>
            <p className="text-3xl font-medium text-[#2c3943]">{stats.loans}</p>
            <p className="text-xs text-[#77726f] mt-1">Сумма: {stats.totalLoanAmount.toLocaleString()} €</p>
          </Link>
          <Link href="/admin/users" className="bg-white rounded-2xl border border-[#e5d4ca] p-6 shadow-sm hover:shadow-md transition">
            <p className="text-sm text-[#9dabb4] mb-1">Клиенты</p>
            <p className="text-3xl font-medium text-[#2c3943]">{stats.users}</p>
            <p className="text-xs text-[#77726f] mt-1">Средний займ: {Math.round(stats.avgLoanAmount).toLocaleString()} €</p>
          </Link>
          <Link href="/admin/payment-requests" className="bg-white rounded-2xl border border-[#e5d4ca] p-6 shadow-sm hover:shadow-md transition">
            <p className="text-sm text-[#9dabb4] mb-1">Заявки на оплату</p>
            <p className="text-3xl font-medium text-[#2c3943]">{stats.paymentRequests}</p>
            <p className="text-xs text-[#77726f] mt-1">Ожидают обработки</p>
          </Link>
        </div>

        {/* Статус-бар */}
        <div className="bg-white rounded-2xl border border-[#e5d4ca] p-6 shadow-sm mb-6">
          <h2 className="text-sm font-medium text-[#2c3943] mb-3">Распределение заявок</h2>
          <div className="flex h-3 rounded-full overflow-hidden bg-[#ece6e3]">
            <div className="bg-[#2c3943] transition-all" style={{ width: `${stats.applications ? (statusCounts.new / stats.applications) * 100 : 0}%` }} />
            <div className="bg-[#dce9df] transition-all" style={{ width: `${stats.applications ? (statusCounts.approved / stats.applications) * 100 : 0}%` }} />
            <div className="bg-[#f1dddd] transition-all" style={{ width: `${stats.applications ? (statusCounts.rejected / stats.applications) * 100 : 0}%` }} />
          </div>
          <div className="flex gap-6 mt-3 text-xs text-[#77726f]">
            <span>● Новые: {statusCounts.new}</span>
            <span>● Одобрены: {statusCounts.approved}</span>
            <span>● Отклонены: {statusCounts.rejected}</span>
          </div>
        </div>

        {/* Последние заявки */}
        <div className="bg-white rounded-2xl border border-[#e5d4ca] p-6 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-medium text-[#2c3943]">Последние заявки</h2>
            <Link href="/admin/applications" className="text-xs text-[#9dabb4] hover:text-[#2c3943] transition">Все заявки →</Link>
          </div>
          <div className="space-y-2">
            {recentApplications.length === 0 && (
              <p className="text-sm text-[#77726f]">Нет заявок</p>
            )}
            {recentApplications.map((app) => (
              <div key={app.id} className="flex justify-between items-center py-2 border-b border-[#ece6e3] last:border-0">
                <div>
                  <p className="text-sm font-medium text-[#2c3943]">{Number(app.amount).toLocaleString()} €</p>
                  <p className="text-xs text-[#77726f]">{app.user_name || `Пользователь ${app.user_id}`}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    app.status === 'new' ? 'bg-[#ece6e3] text-[#2c3943]' :
                    app.status === 'approved' ? 'bg-[#dce9df] text-[#2c3943]' : 
                    'bg-[#f1dddd] text-[#2c3943]'
                  }`}>
                    {getStatusText(app.status)}
                  </span>
                  <p className="text-xs text-[#9dabb4] mt-0.5">{new Date(app.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Быстрые действия - РАЗНЫЕ ДЛЯ АДМИНА И ОПЕРАТОРА */}
        <div className="bg-white rounded-2xl border border-[#e5d4ca] p-6 shadow-sm">
          <h2 className="text-sm font-medium text-[#2c3943] mb-4">Быстрые действия</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/applications" className="px-5 py-2 bg-[#2c3943] text-[#ece6e3] rounded-xl text-sm hover:bg-[#3d4f5c] transition">Все заявки</Link>
            <Link href="/admin/payment-requests" className="px-5 py-2 border border-[#e5d4ca] text-[#2c3943] rounded-xl text-sm hover:bg-[#ece6e3] transition">Заявки на оплату</Link>
            
            {/* Оператору НЕ показываем ссылки на управление пользователями */}
            {isAdmin && (
              <>
                <Link href="/admin/loans" className="px-5 py-2 border border-[#e5d4ca] text-[#2c3943] rounded-xl text-sm hover:bg-[#ece6e3] transition">Все займы</Link>
                <Link href="/admin/users" className="px-5 py-2 border border-[#e5d4ca] text-[#2c3943] rounded-xl text-sm hover:bg-[#ece6e3] transition">Все клиенты</Link>
                <Link href="/admin/admins" className="px-5 py-2 border border-[#e5d4ca] text-[#2c3943] rounded-xl text-sm hover:bg-[#ece6e3] transition">Управление админами</Link>
              </>
            )}
            
            {/* Оператору показываем меньше кнопок */}
            {isOperator && (
              <>
                <Link href="/admin/loans" className="px-5 py-2 border border-[#e5d4ca] text-[#2c3943] rounded-xl text-sm hover:bg-[#ece6e3] transition">Все займы</Link>
                {/* Оператор видит клиентов, но не может редактировать */}
                <Link href="/admin/users" className="px-5 py-2 border border-[#e5d4ca] text-[#2c3943] rounded-xl text-sm hover:bg-[#ece6e3] transition">Все клиенты</Link>
              </>
            )}
          </div>
          
          {/* Подсказка о правах */}
          <div className="mt-4 pt-4 border-t border-[#ece6e3] text-xs text-[#9dabb4]">
            {isAdmin ? (
              <span>👑 У вас полный доступ ко всем разделам и управлению админами</span>
            ) : (
              <span>🔒 Вы оператор. Доступны заявки, займы, клиенты и платежи. Управление админами недоступно.</span>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
