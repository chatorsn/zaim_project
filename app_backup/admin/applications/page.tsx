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
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      router.push('/admin/login');
      return;
    }
    fetch('/api/admin/applications')
      .then(r => r.json())
      .then(data => {
        setApplications(data.applications || []);
        setLoading(false);
      });
  }, []);

  const updateStatus = async (id: number, status: string) => {
    await fetch('/api/admin/applications', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    });
    const res = await fetch('/api/admin/applications');
    const data = await res.json();
    setApplications(data.applications || []);
  };

  const getStatus = (s: string) => {
    const map: Record<string, string> = { new: '🟡 Новая', approved: '🟢 Одобрена', rejected: '🔴 Отклонена' };
    return map[s] || s;
  };

  if (loading) return <div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center">Загрузка...</div>;

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      <header className="bg-white border-b border-[#E8E0D7] px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-[#71717A] hover:text-[#5F5247]">← Назад</Link>
          <h1 className="text-xl font-semibold text-[#18181B]">Заявки</h1>
        </div>
        <button onClick={() => { localStorage.clear(); router.push('/admin/login'); }} className="text-[#71717A] hover:text-red-500">Выйти</button>
      </header>
      <main className="p-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {applications.length === 0 && <div className="text-center text-[#71717A] py-12">Нет заявок</div>}
          {applications.map((app) => (
            <div key={app.id} className="bg-white border border-[#E8E0D7] rounded-xl p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-2xl font-bold text-[#18181B]">{Number(app.amount).toLocaleString()} €</p>
                  <p className="text-[#71717A] text-sm mt-1">Срок: {app.term} дней</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{getStatus(app.status)}</p>
                  <p className="text-[#71717A] text-xs mt-1">{app.user_name || `Пользователь ${app.user_id}`}</p>
                </div>
              </div>
              {app.status === 'new' && (
                <div className="flex gap-3 mt-4">
                  <button onClick={() => updateStatus(app.id, 'approved')} className="bg-[#5F5247] text-white px-4 py-2 rounded-full text-sm hover:bg-[#7B6652] transition">Одобрить</button>
                  <button onClick={() => updateStatus(app.id, 'rejected')} className="border border-red-500 text-red-500 px-4 py-2 rounded-full text-sm hover:bg-red-50 transition">Отклонить</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
