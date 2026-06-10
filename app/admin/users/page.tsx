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
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch('/api/admin/users');
    const data = await res.json();
    if (data.success) setUsers(data.users);
    setLoading(false);
  };

  if (loading) {
    return <div className="min-h-screen bg-[#FFFFF0] flex items-center justify-center text-[#A0A0A0]">Загрузка...</div>;
  }

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <header className="bg-white/80 backdrop-blur-md border-b border-[#E8E0D5] sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-[#A0A0A0] hover:text-[#C6A43F] transition">← Назад</Link>
          <h1 className="text-xl font-light text-[#1A1A1A]">Клиенты</h1>
        </div>
        <button onClick={() => { localStorage.clear(); router.push('/admin/login'); }} className="text-[#A0A0A0] hover:text-[#C6A43F] transition text-sm">Выйти</button>
      </header>

      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          {users.length === 0 && <div className="text-center text-[#A0A0A0] py-12">Нет клиентов</div>}
          <div className="grid md:grid-cols-2 gap-3">
            {users.map((user) => (
              <div key={user.id} className="bg-white border border-[#E8E0D5] rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#C6A43F]/10 rounded-full flex items-center justify-center">
                    <span className="text-[#C6A43F] text-sm font-medium">{user.name?.[0] || user.phone?.[0] || 'U'}</span>
                  </div>
                  <div>
                    <p className="text-[#1A1A1A] font-medium">{user.name || user.phone}</p>
                    <p className="text-[#A0A0A0] text-sm">{user.phone}</p>
                    {user.email && <p className="text-[#A0A0A0] text-xs mt-1">{user.email}</p>}
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
