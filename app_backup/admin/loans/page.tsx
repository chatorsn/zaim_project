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
    fetch('/api/admin/loans')
      .then(r => r.json())
      .then(data => {
        setLoans(data.loans || []);
        setLoading(false);
      });
  }, []);

  const getStatus = (s: string) => {
    const map: Record<string, string> = { pending_sign: 'Ожидает подписания', active: 'Активен', completed: 'Закрыт', defaulted: 'Просрочен' };
    return map[s] || s;
  };

  if (loading) return <div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center">Загрузка...</div>;

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      <header className="bg-white border-b border-[#E8E0D7] px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-[#71717A] hover:text-[#5F5247]">← Назад</Link>
          <h1 className="text-xl font-semibold text-[#18181B]">Займы</h1>
        </div>
        <button onClick={() => { localStorage.clear(); router.push('/admin/login'); }} className="text-[#71717A] hover:text-red-500">Выйти</button>
      </header>
      <main className="p-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {loans.length === 0 && <div className="text-center text-[#71717A] py-12">Нет займов</div>}
          {loans.map((loan) => (
            <div key={loan.id} className="bg-white border border-[#E8E0D7] rounded-xl p-5">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-2xl font-bold text-[#18181B]">{Number(loan.amount).toLocaleString()} €</p>
                  <p className="text-[#71717A] text-sm mt-1">Срок: {loan.term} дней</p>
                  <p className="text-[#71717A] text-xs">Платёж: {loan.payment_amount} €</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{getStatus(loan.status)}</p>
                  <p className="text-[#71717A] text-xs mt-1">ID заёмщика: {loan.user_id}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
