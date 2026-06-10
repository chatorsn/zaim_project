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
  type: string;
  company_name: string;
  created_at: string;
  user_name: string;
  phone: string;
};

export default function AdminApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      router.push('/admin/login');
      return;
    }
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const res = await fetch('/api/admin/applications');
    const data = await res.json();
    if (data.success) setApplications(data.applications);
    setLoading(false);
  };

  const updateStatus = async (id: number, status: string) => {
    setUpdating(id);
    await fetch('/api/admin/applications', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    });
    fetchApplications();
    setUpdating(null);
  };

  const getStatusLabel = (status: string) => {
    const map: Record<string, string> = { new: 'Новая', approved: 'Одобрена', rejected: 'Отклонена' };
    return map[status] || status;
  };

  if (loading) {
    return <div className="min-h-screen bg-[#FFFFF0] flex items-center justify-center text-[#A0A0A0]">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <header className="bg-white/80 backdrop-blur-md border-b border-[#E8E0D5] sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-[#A0A0A0] hover:text-[#C6A43F] transition">← Назад</Link>
          <h1 className="text-xl font-light text-[#1A1A1A]">Заявки</h1>
        </div>
        <button onClick={() => { localStorage.clear(); router.push('/admin/login'); }} className="text-[#A0A0A0] hover:text-[#C6A43F] transition text-sm">Выйти</button>
      </header>

      <main className="p-6">
        <div className="max-w-3xl mx-auto">
          {applications.length === 0 && <div className="text-center text-[#A0A0A0] py-12">Нет заявок</div>}
          <div className="space-y-3">
            {applications.map((app) => (
              <div key={app.id} className="bg-white border border-[#E8E0D5] rounded-xl p-5">
                <div className="flex justify-between items-start flex-wrap gap-3">
                  <div>
                    <p className="text-xl font-light text-[#1A1A1A]">{Number(app.amount).toLocaleString()} €</p>
                    <p className="text-[#A0A0A0] text-sm mt-1">{app.term} дней</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs px-2 py-0.5 rounded ${
                      app.status === 'new' ? 'bg-yellow-50 text-yellow-700' :
                      app.status === 'approved' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}>
                      {getStatusLabel(app.status)}
                    </p>
                    <p className="text-[#A0A0A0] text-sm mt-2">{app.user_name || `ID: ${app.user_id}`}</p>
                  </div>
                </div>
                {app.status === 'new' && (
                  <div className="flex gap-2 mt-4">
                    <button onClick={() => updateStatus(app.id, 'approved')} disabled={updating === app.id} className="bg-[#C6A43F] text-white px-4 py-1.5 rounded-lg text-sm hover:bg-[#B8963E] transition">
                      {updating === app.id ? '...' : 'Одобрить'}
                    </button>
                    <button onClick={() => updateStatus(app.id, 'rejected')} disabled={updating === app.id} className="border border-[#E8E0D5] text-[#A0A0A0] px-4 py-1.5 rounded-lg text-sm hover:border-red-200 hover:text-red-500 transition">
                      {updating === app.id ? '...' : 'Отклонить'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
