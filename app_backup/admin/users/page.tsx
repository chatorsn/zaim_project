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

  if (loading) return <div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center">Загрузка...</div>;

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      <header className="bg-white border-b border-[#E8E0D7] px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-[#71717A] hover:text-[#5F5247]">← Назад</Link>
          <h1 className="text-xl font-semibold text-[#18181B]">Клиенты</h1>
        </div>
        <button onClick={() => { localStorage.clear(); router.push('/admin/login'); }} className="text-[#71717A] hover:text-red-500">Выйти</button>
      </header>
      <main className="p-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4">
          {users.length === 0 && <div className="text-center text-[#71717A] py-12 col-span-2">Нет клиентов</div>}
          {users.map((user) => (
            <div key={user.id} className="bg-white border border-[#E8E0D7] rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#5F5247] rounded-full flex items-center justify-center text-white font-bold">{user.name?.[0] || user.phone?.[0]}</div>
                <div>
                  <p className="font-medium text-[#18181B]">{user.name || user.phone}</p>
                  <p className="text-[#71717A] text-sm">{user.phone}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
