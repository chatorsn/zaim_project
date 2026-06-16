'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    applications: 0,
    loans: 0,
    users: 0,
    paymentRequests: 0
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    async function loadData() {
      try {
        const [apps, loans, users, payments] = await Promise.all([
          fetch('/api/admin/applications').then(r => r.json()),
          fetch('/api/admin/loans').then(r => r.json()),
          fetch('/api/admin/users').then(r => r.json()),
          fetch('/api/admin/payment-requests').then(r => r.json())
        ]);
        setStats({
          applications: apps.applications?.length || 0,
          loans: loans.loans?.length || 0,
          users: users.users?.length || 0,
          paymentRequests: payments.requests?.length || 0
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#5F5247] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      <header className="bg-white/95 backdrop-blur-md border-b border-[#E6DED4] sticky top-0 z-10">
        <div className="px-8 h-16 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-[#5F5247]">LumenBridge Admin</h1>
          <button
            type="button"
            onClick={() => { localStorage.clear(); router.push('/admin/login'); }}
            className="text-sm text-[#9E9387] hover:text-[#5F5247] transition-colors"
          >
            Выйти
          </button>
        </div>
      </header>

      <main className="px-8 py-8 max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-[#3D3028]">Панель управления</h2>
          <p className="text-[#9E9387] mt-1 text-sm">Обзор системы</p>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Заявки', value: stats.applications, color: '#5F5247', href: '/admin/applications' },
            { label: 'Займы', value: stats.loans, color: '#1E8449', href: '/admin/loans' },
            { label: 'Клиенты', value: stats.users, color: '#1A5276', href: '/admin/users' },
            { label: 'Оплаты', value: stats.paymentRequests, color: '#B7860D', href: '/admin/payment-requests' },
          ].map(({ label, value, color, href }) => (
            <Link key={label} href={href}
              className="bg-white rounded-2xl border border-[#E6DED4] px-6 py-5 hover:shadow-md transition-shadow duration-200 block">
              <div className="text-xs text-[#9E9387] mb-1">{label}</div>
              <div className="text-4xl font-black" style={{ color }}>{value}</div>
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-[#E6DED4] p-6">
          <h3 className="text-sm font-semibold text-[#9E9387] uppercase tracking-widest mb-4">Быстрые действия</h3>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Все заявки', href: '/admin/applications', primary: true },
              { label: 'Все займы', href: '/admin/loans', primary: false },
              { label: 'Все клиенты', href: '/admin/users', primary: false },
            ].map(({ label, href, primary }) => (
              <Link key={href} href={href}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  primary
                    ? 'bg-[#5F5247] text-white hover:bg-[#4A3E35]'
                    : 'border border-[#D7CCC1] text-[#5F5247] hover:bg-[#F7F5F2]'
                }`}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
