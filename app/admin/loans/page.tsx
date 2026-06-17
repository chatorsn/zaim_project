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
    const map: Record<string, string> = { 
      pending_sign: 'Ожидает подписания', 
      active: 'Активен', 
      completed: 'Закрыт', 
      defaulted: 'Просрочен' 
    };
    return map[s] || s;
  };

  if (loading) return <div className="min-h-screen bg-[#ece6e3] flex items-center justify-center text-[#2c3943]">Загрузка...</div>;

  return (
    <div className="min-h-screen bg-[#ece6e3]">
      <header className="bg-[#2c3943] border-b border-[#3d4f5c] px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-sm text-[#9dabb4] hover:text-[#ece6e3] transition">← Назад</Link>
          <h1 className="text-xl font-medium text-[#ece6e3]">Займы</h1>
        </div>
        <button onClick={() => { localStorage.removeItem('adminToken'); localStorage.removeItem('adminRole'); router.push('/admin/login'); }} className="text-sm text-[#9dabb4] hover:text-[#ece6e3] transition">Выйти</button>
      </header>
      <main className="p-8 max-w-6xl mx-auto">
        <div className="space-y-4">
          {loans.length === 0 && <div className="text-center text-[#77726f] py-12">Нет займов</div>}
          {loans.map((loan) => (
            <div key={loan.id} className="bg-white border border-[#e5d4ca] rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div>
                  <p className="text-2xl font-medium text-[#2c3943]">{Number(loan.amount).toLocaleString()} €</p>
                  <p className="text-sm text-[#77726f] mt-1">Срок: {loan.term} дней</p>
                  <p className="text-sm text-[#77726f]">Платёж: {loan.payment_amount} €</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    loan.status === 'active' ? 'bg-[#dce9df] text-[#2c3943]' :
                    loan.status === 'completed' ? 'bg-[#ece6e3] text-[#2c3943]' :
                    loan.status === 'defaulted' ? 'bg-[#f1dddd] text-[#2c3943]' :
                    'bg-[#ece6e3] text-[#2c3943]'
                  }`}>
                    {getStatus(loan.status)}
                  </span>
                  <p className="text-xs text-[#9dabb4] mt-2">ID заёмщика: {loan.user_id}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
