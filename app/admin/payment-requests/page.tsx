'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type PaymentRequest = {
  id: number;
  loan_id: number;
  user_id: number;
  amount: number;
  reference: string;
  status: string;
  created_at: string;
};

export default function AdminPaymentRequests() {
  const [requests, setRequests] = useState<PaymentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const res = await fetch('/api/admin/payment-requests');
    const data = await res.json();
    if (data.success) setRequests(data.requests || []);
    setLoading(false);
  };

  const updateStatus = async (id: number, status: string) => {
    setUpdating(id);
    await fetch('/api/admin/payment-requests', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    });
    fetchRequests();
    setUpdating(null);
  };

  if (loading) {
    return <div className="min-h-screen bg-[#ece6e3] flex items-center justify-center text-[#2c3943]">Загрузка...</div>;
  }

  const getStatusText = (s: string) => {
    const map: Record<string, string> = { pending: 'Ожидает', approved: 'Одобрена', rejected: 'Отклонена' };
    return map[s] || s;
  };

  return (
    <div className="min-h-screen bg-[#ece6e3]">
      <header className="bg-[#2c3943] border-b border-[#3d4f5c] px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-sm text-[#9dabb4] hover:text-[#ece6e3] transition">← Назад</Link>
          <h1 className="text-xl font-medium text-[#ece6e3]">Заявки на оплату</h1>
        </div>
        <button onClick={() => { localStorage.removeItem('adminToken'); localStorage.removeItem('adminRole'); router.push('/admin/login'); }} className="text-sm text-[#9dabb4] hover:text-[#ece6e3] transition">Выйти</button>
      </header>
      <main className="p-8 max-w-6xl mx-auto">
        <div className="space-y-4">
          {requests.length === 0 && <div className="text-center text-[#77726f] py-12">Нет заявок на оплату</div>}
          {requests.map((req) => (
            <div key={req.id} className="bg-white border border-[#e5d4ca] rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                  <p className="text-2xl font-medium text-[#2c3943]">{req.amount.toLocaleString()} €</p>
                  <p className="text-sm text-[#77726f]">Займ #{req.loan_id}</p>
                  <p className="text-sm text-[#77726f]">Пользователь ID: {req.user_id}</p>
                  <p className="text-xs text-[#9dabb4] mt-2">Reference: {req.reference || '—'}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    req.status === 'pending' ? 'bg-[#ece6e3] text-[#2c3943]' :
                    req.status === 'approved' ? 'bg-[#dce9df] text-[#2c3943]' : 
                    'bg-[#f1dddd] text-[#2c3943]'
                  }`}>
                    {getStatusText(req.status)}
                  </span>
                  <p className="text-xs text-[#9dabb4] mt-2">{new Date(req.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              {req.status === 'pending' && (
                <div className="flex gap-3 mt-4 pt-4 border-t border-[#ece6e3]">
                  <button 
                    onClick={() => updateStatus(req.id, 'approved')} 
                    disabled={updating === req.id}
                    className="bg-[#2c3943] text-white px-5 py-2 rounded-xl text-sm hover:bg-[#3d4f5c] transition disabled:opacity-50"
                  >
                    {updating === req.id ? '...' : 'Подтвердить'}
                  </button>
                  <button 
                    onClick={() => updateStatus(req.id, 'rejected')} 
                    disabled={updating === req.id}
                    className="border border-[#e5d4ca] text-[#2c3943] px-5 py-2 rounded-xl text-sm hover:bg-[#ece6e3] transition disabled:opacity-50"
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
