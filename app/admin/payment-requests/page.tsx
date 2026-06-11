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
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      router.push('/admin/login');
      return;
    }
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const res = await fetch('/api/admin/payment-requests');
    const data = await res.json();
    setRequests(data.requests || []);
    setLoading(false);
  };

  const updateStatus = async (id: number, status: string) => {
    await fetch('/api/admin/payment-requests', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    });
    fetchRequests();
  };

  if (loading) return <div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center">Загрузка...</div>;

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      <header className="bg-white border-b border-[#E8E0D7] px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-[#71717A] hover:text-[#5F5247]">← Назад</Link>
          <h1 className="text-xl font-semibold text-[#18181B]">Заявки на оплату</h1>
        </div>
        <button onClick={() => { localStorage.clear(); router.push('/admin/login'); }} className="text-[#71717A] hover:text-red-500">Выйти</button>
      </header>
      <main className="p-6">
        <div className="max-w-4xl mx-auto space-y-4">
          {requests.length === 0 && <div className="text-center text-[#71717A] py-12">Нет заявок на оплату</div>}
          {requests.map((req) => (
            <div key={req.id} className="bg-white border border-[#E8E0D7] rounded-xl p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-2xl font-bold text-[#18181B]">{req.amount} €</p>
                  <p className="text-[#71717A] text-sm mt-1">Заёмщик ID: {req.user_id}</p>
                  <p className="text-[#71717A] text-sm">Займ #{req.loan_id}</p>
                  <p className="text-[#A0A0A0] text-xs mt-2">Reference: {req.reference || '—'}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium px-3 py-1 rounded-full inline-block ${req.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : req.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {req.status === 'pending' ? 'Ожидает' : req.status === 'approved' ? 'Одобрена' : 'Отклонена'}
                  </p>
                  <p className="text-[#A0A0A0] text-xs mt-2">{new Date(req.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              {req.status === 'pending' && (
                <div className="flex gap-3 mt-4">
                  <button onClick={() => updateStatus(req.id, 'approved')} className="bg-green-500 text-white px-4 py-2 rounded-full text-sm hover:bg-green-600 transition">Подтвердить</button>
                  <button onClick={() => updateStatus(req.id, 'rejected')} className="border border-red-500 text-red-500 px-4 py-2 rounded-full text-sm hover:bg-red-50 transition">Отклонить</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
