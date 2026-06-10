'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Payment = {
  id: number;
  loan_id: number;
  due_date: string;
  amount: number;
  paid_amount: number;
  status: string;
};

export default function AdminPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      router.push('/admin/login');
      return;
    }
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    const res = await fetch('/api/admin/payments');
    const data = await res.json();
    if (data.success) setPayments(data.payments);
    setLoading(false);
  };

  const getStatusLabel = (status: string) => {
    const map: Record<string, string> = {
      pending: 'Ожидает',
      paid: 'Оплачен',
      overdue: 'Просрочен'
    };
    return map[status] || status;
  };

  if (loading) {
    return <div className="min-h-screen bg-[#FFFFF0] flex items-center justify-center">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <header className="bg-white/80 backdrop-blur-md border-b border-[#E8E0D5] sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-[#4A4A4A] hover:text-[#2E5A4C]">← Назад</Link>
          <h1 className="text-2xl font-bold text-[#2E5A4C]">Платежи</h1>
        </div>
        <button onClick={() => { localStorage.clear(); router.push('/admin/login'); }} className="text-red-600">Выйти</button>
      </header>

      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          {payments.length === 0 && <div className="text-center text-[#4A4A4A] py-12">Нет платежей</div>}
          <div className="space-y-4">
            {payments.map((payment) => (
              <div key={payment.id} className="bg-white border border-[#E8E0D5] rounded-2xl p-5 shadow-sm">
                <div className="flex justify-between items-start flex-wrap gap-4">
                  <div>
                    <p className="text-xl font-bold text-[#2E5A4C]">{payment.amount} €</p>
                    <p className="text-[#4A4A4A] text-sm">Займ #{payment.loan_id}</p>
                    <p className="text-[#A0A0A0] text-sm">До {new Date(payment.due_date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className={`text-sm font-medium px-3 py-1 rounded-full inline-block ${
                      payment.status === 'paid' ? 'bg-green-100 text-green-700' :
                      payment.status === 'overdue' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {getStatusLabel(payment.status)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
