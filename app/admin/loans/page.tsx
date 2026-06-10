'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Loan = {
  id: number;
  user_id: number;
  amount: string;
  term: number;
  status: string;
  payment_amount: number;
  total_amount: number;
  created_at: string;
};

export default function AdminLoans() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      router.push('/admin/login');
      return;
    }
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    const res = await fetch('/api/admin/loans');
    const data = await res.json();
    if (data.success) setLoans(data.loans);
    setLoading(false);
  };

  const getStatusLabel = (status: string) => {
    const map: Record<string, string> = {
      pending_sign: 'Ожидает подписания',
      active: 'Активен',
      completed: 'Закрыт',
      defaulted: 'Просрочен'
    };
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
          <h1 className="text-xl font-light text-[#1A1A1A]">Займы</h1>
        </div>
        <button onClick={() => { localStorage.clear(); router.push('/admin/login'); }} className="text-[#A0A0A0] hover:text-[#C6A43F] transition text-sm">Выйти</button>
      </header>

      <main className="p-6">
        <div className="max-w-3xl mx-auto">
          {loans.length === 0 && <div className="text-center text-[#A0A0A0] py-12">Нет займов</div>}
          <div className="space-y-3">
            {loans.map((loan) => (
              <div key={loan.id} className="bg-white border border-[#E8E0D5] rounded-xl p-5">
                <div className="flex justify-between items-start flex-wrap gap-3">
                  <div>
                    <p className="text-xl font-light text-[#1A1A1A]">{Number(loan.amount).toLocaleString()} €</p>
                    <p className="text-[#A0A0A0] text-sm mt-1">{loan.term} дней</p>
                    <p className="text-[#A0A0A0] text-xs mt-1">Платёж: {loan.payment_amount} €</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs px-2 py-0.5 rounded ${
                      loan.status === 'active' ? 'bg-green-50 text-green-700' :
                      loan.status === 'pending_sign' ? 'bg-yellow-50 text-yellow-700' : 'bg-gray-50 text-gray-600'
                    }`}>
                      {getStatusLabel(loan.status)}
                    </p>
                    <p className="text-[#A0A0A0] text-sm mt-2">ID: {loan.user_id}</p>
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
