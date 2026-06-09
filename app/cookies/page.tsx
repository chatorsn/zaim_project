'use client';
import Link from 'next/link';

export default function Cookies() {
  return (
    <div className="min-h-screen bg-[#0D0D0D]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold text-white">LumenBridge</Link>
          <Link href="/" className="text-[#C6A43F] border border-[#C6A43F] px-5 py-2 rounded-xl hover:bg-[#C6A43F]/10 transition">
            На главную
          </Link>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-medium text-white mb-8">Политика использования файлов cookies</h1>
          
          <div className="space-y-6 text-[#A0A0A0] leading-relaxed">
            <section>
              <h2 className="text-2xl font-medium text-white mb-4">1. Что такое cookies</h2>
              <p>Cookies — это небольшие текстовые файлы, которые сохраняются на устройстве пользователя при посещении сайта.</p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-white mb-4">2. Какие cookies мы используем</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Обязательные</strong> — необходимы для работы сайта</li>
                <li><strong>Аналитические</strong> — для анализа посещаемости</li>
                <li><strong>Функциональные</strong> — для запоминания настроек</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-white mb-4">3. Управление cookies</h2>
              <p>Вы можете управлять cookies через настройки вашего браузера или с помощью cookie-баннера на сайте.</p>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#262626] py-8 px-6 text-center text-[#A0A0A0] text-sm">
        <p>© 2024 LumenBridge Finance Ltd. Все права защищены.</p>
      </footer>
    </div>
  );
}
