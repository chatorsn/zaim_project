'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password })
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminRole', data.role);
      router.push('/admin/dashboard');
    } else {
      setError(data.error || 'Неверный логин или пароль');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFFF0] to-[#F5F0E8] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#C6A43F] to-[#A8862E] rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
            <span className="text-2xl font-bold text-white">LB</span>
          </div>
          <h1 className="text-3xl font-bold text-[#1A1A1A] tracking-tight">LumenBridge</h1>
          <p className="text-[#4A4A4A] text-sm mt-2">Войдите в административную панель</p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-8 border border-[#E8E0D5]">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm text-center"
              >
                {error}
              </motion.div>
            )}
            
            <div>
              <label className="block text-[#4A4A4A] text-sm mb-2">Логин</label>
              <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="w-full bg-white border border-[#E8E0D5] rounded-xl p-3 text-[#1A1A1A] placeholder-[#A0A0A0] focus:border-[#C6A43F] focus:outline-none transition"
                placeholder="admin"
                required
              />
            </div>
            
            <div>
              <label className="block text-[#4A4A4A] text-sm mb-2">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white border border-[#E8E0D5] rounded-xl p-3 text-[#1A1A1A] placeholder-[#A0A0A0] focus:border-[#C6A43F] focus:outline-none transition"
                placeholder="••••••••"
                required
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#C6A43F] to-[#A8862E] hover:from-[#D4B96A] hover:to-[#B8963E] text-white py-3 rounded-xl font-medium transition disabled:opacity-50 shadow-md"
            >
              {loading ? 'Вход...' : 'Войти'}
            </motion.button>
          </form>
          
          <div className="mt-6 text-center">
            <Link href="/" className="text-[#A0A0A0] text-sm hover:text-[#C6A43F] transition">
              ← Вернуться на сайт
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
