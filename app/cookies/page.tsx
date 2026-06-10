import Link from 'next/link';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#F7F5F2]">
      <header className="bg-white border-b border-[#E8E0D7] sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-semibold text-[#18181B]">LumenBridge</Link>
          <Link href="/" className="text-[#71717A] hover:text-[#5F5247] transition">На главную</Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white border border-[#E8E0D7] rounded-2xl p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-[#18181B] mb-6">Политика использования cookies</h1>
          <div className="space-y-6 text-[#71717A]">
            <p>Cookies — это небольшие текстовые файлы, сохраняемые на устройстве.</p>
            <h2 className="text-xl font-semibold text-[#18181B]">1. Какие cookies мы используем</h2>
            <p>Обязательные, аналитические, функциональные.</p>
            <h2 className="text-xl font-semibold text-[#18181B]">2. Управление cookies</h2>
            <p>Вы можете управлять cookies через настройки браузера.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
