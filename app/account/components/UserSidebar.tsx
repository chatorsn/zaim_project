'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { href: '/account', label: '📊 Главная' },
  { href: '/account/applications', label: '📝 Мои заявки' },
  { href: '/account/loans', label: '💰 Мои займы' },
  { href: '/account/payments', label: '💳 Платежи' },
  { href: '/account/notifications', label: '🔔 Уведомления' },
];

export default function UserSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-[#e5d4ca] min-h-screen p-4 flex-shrink-0">
      <div className="mb-8">
        <h2 className="text-[#2c3943] text-lg font-medium">Мой кабинет</h2>
        <p className="text-[#77726f] text-xs">Личный кабинет</p>
      </div>
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition ${
                isActive
                  ? 'bg-[#ece6e3] text-[#2c3943]'
                  : 'text-[#77726f] hover:bg-[#ece6e3] hover:text-[#2c3943]'
              }`}
            >
              <span className="text-lg">{item.label.split(' ')[0]}</span>
              <span>{item.label.split(' ').slice(1).join(' ')}</span>
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-4 left-4 right-4">
        <button 
          onClick={() => { localStorage.clear(); window.location.href = '/login'; }}
          className="w-full text-left px-4 py-2.5 rounded-xl text-sm text-[#77726f] hover:bg-[#ece6e3] hover:text-[#2c3943] transition"
        >
          🚪 Выйти
        </button>
      </div>
    </aside>
  );
}
