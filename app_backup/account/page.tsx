'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AccountPage() {
  const [user, setUser] = useState<{ id: string; phone: string } | null>(null);
  const [loans, setLoans] = useState([]);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('loans');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const userPhone = localStorage.getItem('userPhone');
    if (!userId) {
      router.push('/login');
      return;
    }
    setUser({ id: userId, phone: userPhone || '' });
    fetchData(userId);
  }, []);

  const fetchData = async (userId: string) => {
    try {
      const [loansRes, appsRes] = await Promise.all([
        fetch(`/api/loan?userId=${userId}`),
        fetch(`/api/application?userId=${userId}`)
      ]);
      const loansData = await loansRes.json();
      const appsData = await appsRes.json();
      setLoans(loansData.loans || []);
      setApplications(appsData.applications || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    router.push('/');
  };

  if (loading) return <div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center">Загрузка...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      <header className="bg-white border-b border-[#E8E0D7] px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <Link href="/" className="text-2xl font-semibold text-[#18181B]">LumenBridge</Link>
        <div className="flex gap-4">
          <button onClick={() => setActiveTab('new-application')} className="text-[#5F5247] border border-[#5F5247] px-4 py-2 rounded-full text-sm hover:bg-[#5F5247] hover:text-white transition">Новая заявка</button>
          <button onClick={logout} className="text-[#71717A] hover:text-red-500 transition">Выйти</button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        <aside className="md:w-64 bg-white border-r border-[#E8E0D7] p-4">
          <nav className="space-y-1">
            <button onClick={() => setActiveTab('loans')} className={`w-full text-left p-3 rounded-lg transition ${activeTab === 'loans' ? 'bg-[#5F5247] text-white' : 'text-[#71717A] hover:bg-[#F5F2EE]'}`}>Мои займы</button>
            <button onClick={() => setActiveTab('applications')} className={`w-full text-left p-3 rounded-lg transition ${activeTab === 'applications' ? 'bg-[#5F5247] text-white' : 'text-[#71717A] hover:bg-[#F5F2EE]'}`}>Заявки</button>
          </nav>
        </aside>

        <div className="flex-1 p-6">
          {activeTab === 'loans' && (
            <div>
              <h2 className="text-2xl font-bold text-[#18181B] mb-6">Мои займы</h2>
              {loans.length === 0 ? (
                <p className="text-[#71717A]">У вас пока нет займов</p>
              ) : (
                <div className="space-y-4">
                  {loans.map((loan: any) => (
                    <div key={loan.id} className="bg-white border border-[#E8E0D7] rounded-xl p-5">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-2xl font-bold text-[#18181B]">{loan.amount} €</p>
                          <p className="text-[#71717A] text-sm">Срок: {loan.term} дней</p>
                        </div>
                        <div className="text-right">
                          <span className={`text-sm px-3 py-1 rounded-full ${loan.status === 'active' ? 'bg-green-100 text-green-700' : loan.status === 'pending_sign' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>
                            {loan.status === 'active' ? 'Активен' : loan.status === 'pending_sign' ? 'Ожидает подписания' : 'Закрыт'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'applications' && (
            <div>
              <h2 className="text-2xl font-bold text-[#18181B] mb-6">Мои заявки</h2>
              {applications.length === 0 ? (
                <p className="text-[#71717A]">У вас пока нет заявок</p>
              ) : (
                <div className="space-y-4">
                  {applications.map((app: any) => (
                    <div key={app.id} className="bg-white border border-[#E8E0D7] rounded-xl p-5 flex justify-between items-center">
                      <div>
                        <p className="text-xl font-bold text-[#18181B]">{app.amount} €</p>
                        <p className="text-[#71717A] text-sm">Срок: {app.term} дней</p>
                      </div>
                      <span className={`text-sm px-3 py-1 rounded-full ${app.status === 'approved' ? 'bg-green-100 text-green-700' : app.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {app.status === 'new' ? 'На рассмотрении' : app.status === 'approved' ? 'Одобрена' : 'Отклонена'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'new-application' && (
            <div className="bg-white border border-[#E8E0D7] rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-[#18181B] mb-6">Новая заявка</h2>
              <ApplicationForm userId={user.id} onSuccess={() => { fetchData(user.id); setActiveTab('applications'); }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ApplicationForm({ userId, onSuccess }: { userId: string; onSuccess: () => void }) {
  const [amount, setAmount] = useState(5000);
  const [term, setTerm] = useState(30);
  const [loading, setLoading] = useState(false);
  const [userPhone, setUserPhone] = useState('');

  useEffect(() => {
    setUserPhone(localStorage.getItem('userPhone') || '');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/application', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, amount, term, type: 'personal', fullName: userPhone, phone: userPhone, email: '' })
    });
    if (res.ok) onSuccess();
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-[#71717A] text-sm mb-1">Сумма (€)</label>
        <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="w-full border border-[#E8E0D7] rounded-xl p-3" min={500} max={50000} required />
      </div>
      <div>
        <label className="block text-[#71717A] text-sm mb-1">Срок (дни)</label>
        <input type="number" value={term} onChange={(e) => setTerm(Number(e.target.value))} className="w-full border border-[#E8E0D7] rounded-xl p-3" min={7} max={90} required />
      </div>
      <button type="submit" disabled={loading} className="w-full bg-[#5F5247] text-white py-3 rounded-full font-medium hover:bg-[#7B6652] transition">
        {loading ? 'Отправка...' : 'Отправить заявку'}
      </button>
    </form>
  );
}
