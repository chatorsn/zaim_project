import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#ece6e3]">
      <header className="bg-[#2c3943] border-b border-[#3d4f5c] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-medium text-[#ece6e3]">LumenBridge</Link>
          <Link href="/" className="text-sm text-[#9dabb4] hover:text-[#ece6e3] transition">На главную</Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white border border-[#e5d4ca] rounded-2xl p-8 shadow-sm">
          <h1 className="text-3xl font-medium text-[#2c3943] mb-6">Политика конфиденциальности</h1>
          <div className="space-y-4 text-sm text-[#77726f]">
            <p>LumenBridge Finance Ltd осуществляет деятельность в соответствии с GDPR.</p>
            <h2 className="text-xl font-medium text-[#2c3943] mt-6">Какие данные мы собираем</h2>
            <p>Имя, телефон, email, данные о заявках и займах.</p>
            <h2 className="text-xl font-medium text-[#2c3943] mt-6">Цели обработки</h2>
            <p>Обработка заявок, заключение договоров, связь с клиентами.</p>
            <h2 className="text-xl font-medium text-[#2c3943] mt-6">Контакты</h2>
            <p>support@lumenbridge.example</p>
          </div>
        </div>
      </main>
    </div>
  );
}
