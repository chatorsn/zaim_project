'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type User = {
  id: number;
  phone: string;
  name: string;
  email: string;
  created_at: string;
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) {
      router.push('/admin/login');
      return;
    }
    fetch('/api/admin/users')
      .then(r => r.json())
      .then(data => {
        setUsers(data.users || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="min-h-screen bg-[#ece6e3] flex items-center justify-center text-[#2c3943]">Загрузка...</div>;

  return (
    <div className="min-h-screen bg-[#ece6e3]">
      <header className="bg-[#2c3943] border-b border-[#3d4f5c] px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-sm text-[#9dabb4] hover:text-[#ece6e3] transition">← Назад</Link>
          <h1 className="text-xl font-medium text-[#ece6e3]">Клиенты</h1>
        </div>
        <button onClick={() => { localStorage.removeItem('adminToken'); localStorage.removeItem('adminRole'); router.push('/admin/login'); }} className="text-sm text-[#9dabb4] hover:text-[#ece6e3] transition">Выйти</button>
      </header>
      <main className="p-8 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-4">
          {users.length === 0 && <div className="text-center text-[#77726f] py-12 col-span-2">Нет клиентов</div>}
          {users.map((user) => (
            <div key={user.id} className="bg-white border border-[#e5d4ca] rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#2c3943] rounded-full flex items-center justify-center text-white font-medium text-sm">{user.name?.[0] || user.phone?.[0]}</div>
                <div>
                  <p className="font-medium text-[#2c3943]">{user.name || user.phone}</p>
                  <p className="text-sm text-[#77726f]">{user.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
