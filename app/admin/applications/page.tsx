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
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
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
    return <div className="min-h-screen bg-[#ece6e3] flex items-center justify-center">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-[#ece6e3]">
      <header className="bg-[#2c3943] border-b border-[#3d4f5c] px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-sm text-[#9dabb4] hover:text-[#ece6e3] transition">← Назад</Link>
          <h1 className="text-xl font-medium text-[#ece6e3]">Заявки</h1>
        </div>
        <button onClick={() => { localStorage.clear(); router.push('/admin/login'); }} className="text-sm text-[#9dabb4] hover:text-[#ece6e3] transition">Выйти</button>
      </header>

      <main className="p-8 max-w-6xl mx-auto">
        <div className="space-y-4">
          {applications.length === 0 && <div className="text-center text-[#77726f] py-12">Нет заявок</div>}
          {applications.map((app) => (
            <div key={app.id} className="bg-white border border-[#e5d4ca] rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-[#9dabb4]">#{app.id}</span>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      app.status === 'new' ? 'bg-[#ece6e3] text-[#2c3943]' :
                      app.status === 'approved' ? 'bg-[#e5d4ca] text-[#2c3943]' : 'bg-[#e5d4ca] text-[#2c3943]'
                    }`}>
                      {app.status === 'new' ? 'Новая' : app.status === 'approved' ? 'Одобрена' : 'Отклонена'}
                    </span>
                  </div>
                  <p className="text-2xl font-medium text-[#2c3943]">{Number(app.amount).toLocaleString()} €</p>
                  <p className="text-sm text-[#77726f] mt-1">Срок: {app.term} дней</p>
                  <div className="mt-4 pt-4 border-t border-[#e5d4ca]">
                    <p className="text-sm text-[#2c3943]">{app.user_name || `Пользователь ${app.user_id}`}</p>
                    <p className="text-xs text-[#9dabb4]">{app.phone}</p>
                  </div>
                </div>
                {app.status === 'new' && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => updateStatus(app.id, 'approved')}
                      disabled={updating === app.id}
                      className="bg-[#2c3943] text-[#ece6e3] px-5 py-2 rounded-xl text-sm hover:bg-[#3d4f5c] transition disabled:opacity-50"
                    >
                      {updating === app.id ? '...' : 'Одобрить'}
                    </button>
                    <button
                      onClick={() => updateStatus(app.id, 'rejected')}
                      disabled={updating === app.id}
                      className="border border-[#e5d4ca] text-[#2c3943] px-5 py-2 rounded-xl text-sm hover:bg-[#ece6e3] transition disabled:opacity-50"
                    >
                      Отклонить
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
