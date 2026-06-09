import Link from 'next/link';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E8E0D5]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold text-[#2E5A4C]">LumenBridge</Link>
          <Link href="/" className="text-[#2E5A4C] border border-[#2E5A4C] px-5 py-2 rounded-full hover:bg-[#2E5A4C] hover:text-white transition">На главную</Link>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto bg-white border border-[#E8E0D5] rounded-3xl p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-[#2E5A4C] mb-6">Политика использования файлов cookies</h1>
          <div className="space-y-6 text-[#4A4A4A] leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-[#2E5A4C] mb-3">1. Что такое cookies</h2>
              <p>Cookies — это небольшие текстовые файлы, которые сохраняются на устройстве пользователя при посещении сайта.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-[#2E5A4C] mb-3">2. Какие cookies мы используем</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Обязательные</strong> — необходимы для работы сайта</li>
                <li><strong>Аналитические</strong> — для анализа посещаемости</li>
                <li><strong>Функциональные</strong> — для запоминания настроек</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-[#2E5A4C] mb-3">3. Управление cookies</h2>
              <p>Вы можете управлять cookies через настройки вашего браузера.</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
