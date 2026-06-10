import Link from 'next/link';

export default function PrivacyPage() {
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
          <h1 className="text-3xl font-bold text-[#18181B] mb-6">Политика конфиденциальности</h1>
          <div className="space-y-6 text-[#71717A]">
            <p>LumenBridge Finance Ltd осуществляет деятельность в соответствии с GDPR.</p>
            <h2 className="text-xl font-semibold text-[#18181B]">1. Какие данные мы собираем</h2>
            <p>Имя, телефон, email, данные о заявках и займах.</p>
            <h2 className="text-xl font-semibold text-[#18181B]">2. Цели обработки</h2>
            <p>Обработка заявок, заключение договоров, связь с клиентами.</p>
            <h2 className="text-xl font-semibold text-[#18181B]">3. Контакты</h2>
            <p>support@lumenbridge.example</p>
          </div>
        </div>
      </main>
    </div>
  );
}
