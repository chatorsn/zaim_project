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
  const [error, setError] = useState<string | null>(null);
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
    try {
      setError(null);
      const res = await fetch('/api/admin/applications', { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Ошибка загрузки');
      setApplications(data.applications || []);
    } catch (e: any) {
      setError(e.message || 'Ошибка загрузки');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    setUpdating(id);
    setError(null);
    try {
      const res = await fetch('/api/admin/applications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Ошибка обновления');
      setApplications((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
    } catch (e: any) {
      setError(e.message || 'Ошибка');
    } finally {
      setUpdating(null);
    }
  };

  const newApps = applications.filter((a) => a.status === 'new');
  const doneApps = applications.filter((a) => a.status !== 'new');
  const approvedCount = applications.filter((a) => a.status === 'approved').length;

  const statusLabel: Record<string, string> = {
    new: 'Новая',
    approved: 'Одобрена',
    rejected: 'Отклонена',
  };

  const statusClass: Record<string, string> = {
    new: 'bg-[#FEF9E7] text-[#B7860D] border border-[#F5E6A3]',
    approved: 'bg-[#EAFAF1] text-[#1E8449] border border-[#A9DFBF]',
    rejected: 'bg-[#FDEDEC] text-[#C0392B] border border-[#F5B7B1]',
  };

  const AppCard = ({ app }: { app: Application }) => (
    <div className="bg-white rounded-3xl border border-[#E6DED4] p-6 flex items-center justify-between gap-4 hover:shadow-md transition-shadow duration-200">
      <div>
        <div className="text-xs text-[#B8AFA7] font-medium mb-1">#{app.id}</div>
        <div className="text-2xl font-black text-[#3D3028]">
          {Number(app.amount).toLocaleString('ru-RU')} €
        </div>
        <div className="flex gap-4 mt-2">
          <span className="text-sm text-[#9E9387]">📅 {new Date(app.created_at).toLocaleDateString('ru-RU')}</span>
          <span className="text-sm text-[#9E9387]">⏱ {app.term} дней</span>
          {app.phone && <span className="text-sm text-[#9E9387]">📞 {app.phone}</span>}
        </div>
        {app.user_name && (
          <div className="text-sm text-[#9E9387] mt-1">{app.user_name}</div>
        )}
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${statusClass[app.status] ?? ''}`}>
          {statusLabel[app.status] ?? app.status}
        </span>
        {app.status === 'new' && (
          <div className="flex gap-2">
            <button
              type="button"
              disabled={updating === app.id}
              onClick={() => updateStatus(app.id, 'approved')}
              className="px-5 py-2 rounded-2xl bg-[#5F5247] text-white text-sm font-medium hover:bg-[#4A3E35] active:scale-95 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {updating === app.id ? '...' : '✓ Одобрить'}
            </button>
            <button
              type="button"
              disabled={updating === app.id}
              onClick={() => updateStatus(app.id, 'rejected')}
              className="px-5 py-2 rounded-2xl border-[1.5px] border-[#D7CCC1] text-[#9E9387] text-sm font-medium hover:bg-[#FDF8F5] hover:border-[#C0B5AC] active:scale-95 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ✗ Отклонить
            </button>
          </div>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center text-[#9E9387]">
        <div className="w-8 h-8 border-2 border-[#5F5247] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      <header className="bg-white/95 backdrop-blur-md border-b border-[#E6DED4] sticky top-0 z-10">
        <div className="px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard" className="text-[#9E9387] text-sm hover:text-[#5F5247] transition-colors">
              ← Назад
            </Link>
            <div className="w-px h-5 bg-[#E6DED4]" />
            <h1 className="text-lg font-semibold text-[#5F5247]">Заявки</h1>
          </div>
          <button
            type="button"
            onClick={() => { localStorage.clear(); router.push('/admin/login'); }}
            className="text-sm text-[#9E9387] hover:text-[#5F5247] transition-colors"
          >
            Выйти
          </button>
        </div>
      </header>

      <main className="px-8 py-8 max-w-4xl mx-auto">
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm border border-red-100">
            {error}
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Всего заявок', value: applications.length, color: '#5F5247' },
            { label: 'Ожидают решения', value: newApps.length, color: '#B7860D' },
            { label: 'Одобрено', value: approvedCount, color: '#1E8449' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-[#E6DED4] px-6 py-5">
              <div className="text-xs text-[#9E9387] mb-1">{label}</div>
              <div className="text-3xl font-black" style={{ color }}>{value}</div>
            </div>
          ))}
        </div>

        {newApps.length > 0 && (
          <>
            <div className="text-xs font-semibold text-[#9E9387] uppercase tracking-widest mb-3">Новые</div>
            <div className="space-y-3 mb-8">
              {newApps.map((app) => <AppCard key={app.id} app={app} />)}
            </div>
          </>
        )}

        {doneApps.length > 0 && (
          <>
            <div className="text-xs font-semibold text-[#9E9387] uppercase tracking-widest mb-3">Обработанные</div>
            <div className="space-y-3">
              {doneApps.map((app) => <AppCard key={app.id} app={app} />)}
            </div>
          </>
        )}

        {applications.length === 0 && (
          <div className="text-center py-20 text-[#B8AFA7]">Заявок пока нет</div>
        )}
      </main>
    </div>
  );
}
