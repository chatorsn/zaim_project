'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Admin = {
  id: number;
  login: string;
  role: string;
  created_at: string;
};

export default function AdminAdmins() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string>('');
  const [showCreate, setShowCreate] = useState(false);
  const [newLogin, setNewLogin] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('operator');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleting, setDeleting] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const userRole = localStorage.getItem('adminRole') || '';
    setRole(userRole);
    
    if (!token) {
      router.push('/admin/login');
      return;
    }
    
    if (userRole !== 'admin') {
      router.push('/admin/dashboard');
      return;
    }
    
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/admin/admins', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.admins) setAdmins(data.admins);
    } catch (err) {
      console.error('Error fetching admins:', err);
    } finally {
      setLoading(false);
    }
  };

  const createAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch('/api/admin/admins', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          login: newLogin, 
          password: newPassword, 
          role: newRole 
        })
      });
      
      const data = await res.json();
      if (res.ok) {
        setSuccess(`Администратор ${newLogin} создан`);
        setNewLogin('');
        setNewPassword('');
        setNewRole('operator');
        setShowCreate(false);
        fetchAdmins();
      } else {
        setError(data.error || 'Ошибка создания');
      }
    } catch (err) {
      setError('Ошибка соединения');
    }
  };

  const deleteAdmin = async (id: number) => {
    if (!confirm('Удалить администратора?')) return;
    
    setDeleting(id);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`/api/admin/admins?id=${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (res.ok) {
        fetchAdmins();
      }
    } catch (err) {
      console.error('Error deleting admin:', err);
    }
    setDeleting(null);
  };

  if (loading) {
    return <div className="min-h-screen bg-[#ece6e3] flex items-center justify-center text-[#2c3943]">Загрузка...</div>;
  }

  if (role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#ece6e3] flex items-center justify-center">
        <div className="bg-white rounded-2xl border border-[#e5d4ca] p-8 text-center max-w-md">
          <h2 className="text-xl font-medium text-[#2c3943] mb-2">Доступ запрещен</h2>
          <p className="text-sm text-[#77726f] mb-4">Только администраторы могут управлять другими администраторами.</p>
          <Link href="/admin/dashboard" className="inline-block px-6 py-2 bg-[#2c3943] text-white rounded-xl text-sm hover:bg-[#3d4f5c] transition">Вернуться в дашборд</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ece6e3]">
      <header className="bg-[#2c3943] border-b border-[#3d4f5c] px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-sm text-[#9dabb4] hover:text-[#ece6e3] transition">← Назад</Link>
          <h1 className="text-xl font-medium text-[#ece6e3]">Управление администраторами</h1>
        </div>
        <button onClick={() => { 
          localStorage.removeItem('adminToken'); 
          localStorage.removeItem('adminRole'); 
          router.push('/admin/login'); 
        }} className="text-sm text-[#9dabb4] hover:text-[#ece6e3] transition">Выйти</button>
      </header>
      <main className="p-8 max-w-6xl mx-auto">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-medium text-[#2c3943]">Все администраторы ({admins.length})</h2>
            <button 
              onClick={() => setShowCreate(!showCreate)}
              className="px-4 py-2 bg-[#2c3943] text-white rounded-xl text-sm hover:bg-[#3d4f5c] transition"
            >
              + Создать
            </button>
          </div>

          {showCreate && (
            <div className="bg-white rounded-2xl border border-[#e5d4ca] p-6 shadow-sm">
              <h3 className="text-sm font-medium text-[#2c3943] mb-4">Новый администратор</h3>
              <form onSubmit={createAdmin} className="space-y-4">
                {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-xl">{error}</div>}
                {success && <div className="text-green-500 text-sm bg-green-50 p-3 rounded-xl">{success}</div>}
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#77726f] mb-1">Логин</label>
                    <input 
                      type="text" 
                      value={newLogin} 
                      onChange={(e) => setNewLogin(e.target.value)}
                      className="w-full border border-[#e5d4ca] rounded-xl px-4 py-2 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#77726f] mb-1">Пароль</label>
                    <input 
                      type="password" 
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full border border-[#e5d4ca] rounded-xl px-4 py-2 text-sm"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[#77726f] mb-1">Роль</label>
                  <select 
                    value={newRole} 
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full border border-[#e5d4ca] rounded-xl px-4 py-2 text-sm"
                  >
                    <option value="operator">Оператор</option>
                    <option value="admin">Администратор</option>
                  </select>
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="px-4 py-2 bg-[#2c3943] text-white rounded-xl text-sm hover:bg-[#3d4f5c] transition">Создать</button>
                  <button type="button" onClick={() => setShowCreate(false)} className="px-4 py-2 border border-[#e5d4ca] text-[#2c3943] rounded-xl text-sm hover:bg-[#ece6e3] transition">Отмена</button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-[#e5d4ca] p-6 shadow-sm">
            <div className="space-y-2">
              {admins.length === 0 && <p className="text-sm text-[#77726f]">Нет администраторов</p>}
              {admins.map((admin) => {
                const isCurrent = admin.login === localStorage.getItem('adminLogin');
                return (
                  <div key={admin.id} className="flex justify-between items-center py-3 border-b border-[#ece6e3] last:border-0">
                    <div>
                      <p className="text-sm font-medium text-[#2c3943]">{admin.login}</p>
                      <p className="text-xs text-[#77726f]">
                        Роль: {admin.role === 'admin' ? 'Администратор' : 'Оператор'}
                        {isCurrent && ' (Вы)'}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        admin.role === 'admin' ? 'bg-[#2c3943] text-white' : 'bg-[#ece6e3] text-[#2c3943]'
                      }`}>
                        {admin.role === 'admin' ? '👑 Admin' : '🔒 Operator'}
                      </span>
                      {!isCurrent && (
                        <button 
                          onClick={() => deleteAdmin(admin.id)}
                          disabled={deleting === admin.id}
                          className="text-xs text-red-500 hover:text-red-700 transition disabled:opacity-50"
                        >
                          {deleting === admin.id ? '...' : 'Удалить'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
