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

export default function AdminApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);
  const [role, setRole] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const userRole = localStorage.getItem('adminRole') || '';
    setRole(userRole);
    
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const res = await fetch('/api/admin/applications');
    const data = await res.json();
    setApplications(data.applications || []);
    setLoading(false);
  };

  const updateStatus = async (id: number, status: string) => {
    setUpdating(id);
    const res = await fetch('/api/admin/applications', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    });
    if (res.ok) {
      const newRes = await fetch('/api/admin/applications');
      const data = await newRes.json();
      setApplications(data.applications || []);
    }
    setUpdating(null);
  };

  if (loading) {
    return <div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center">Загрузка...</div>;
  }

  const isAdmin = role === 'admin';

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      <header className="bg-white border-b border-[#E8E0D7] px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-[#71717A] hover:text-[#5F5247]">← Назад</Link>
          <h1 className="text-xl font-semibold text-[#18181B]">Заявки</h1>
          <span className={`text-xs px-3 py-1 rounded-full ${isAdmin ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
            {isAdmin ? 'Администратор' : 'Оператор'}
          </span>
        </div>
        <button onClick={() => { localStorage.clear(); router.push('/admin/login'); }} className="text-[#71717A] hover:text-red-500">Выйти</button>
      </header>

      <main className="p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {applications.length === 0 && <div className="text-center text-[#71717A] py-12">Нет заявок</div>}
          {applications.map((app) => (
            <div key={app.id} className="bg-white border border-[#E8E0D7] rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                  <p className="text-2xl font-bold text-[#18181B]">{Number(app.amount).toLocaleString()} €</p>
                  <p className="text-[#71717A] text-sm mt-1">Срок: {app.term} дней</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                    app.status === 'new' ? 'bg-yellow-100 text-yellow-700' :
                    app.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {app.status === 'new' ? 'Новая' : app.status === 'approved' ? 'Одобрена' : 'Отклонена'}
                  </span>
                  <p className="text-[#71717A] text-sm mt-2">{app.user_name || `Пользователь ${app.user_id}`}</p>
                  <p className="text-[#A0A0A0] text-xs">{app.phone}</p>
                </div>
              </div>
              {app.status === 'new' && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => updateStatus(app.id, 'approved')}
                    disabled={updating === app.id}
                    className="bg-[#5F5247] text-white px-5 py-2 rounded-xl hover:bg-[#7B6652] transition disabled:opacity-50"
                  >
                    {updating === app.id ? '...' : 'Одобрить'}
                  </button>
                  <button
                    onClick={() => updateStatus(app.id, 'rejected')}
                    disabled={updating === app.id}
                    className="border border-red-500 text-red-500 px-5 py-2 rounded-xl hover:bg-red-50 transition disabled:opacity-50"
                  >
                    Отклонить
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
