import Link from 'next/link';

export default function PrivacyPage() {
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
          <h1 className="text-3xl font-bold text-[#2E5A4C] mb-6">Политика конфиденциальности</h1>
          <div className="space-y-6 text-[#4A4A4A] leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-[#2E5A4C] mb-3">1. Общая информация</h2>
              <p>LumenBridge Finance Ltd осуществляет деятельность в соответствии с применимым европейским законодательством, включая GDPR.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-[#2E5A4C] mb-3">2. Какие данные мы собираем</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Имя и фамилия</li>
                <li>Номер телефона</li>
                <li>Адрес электронной почты</li>
                <li>Данные о заявках и займах</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-[#2E5A4C] mb-3">3. Цели обработки данных</h2>
              <p>Данные используются для обработки заявок, заключения договоров, связи с клиентами и выполнения требований законодательства.</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold text-[#2E5A4C] mb-3">4. Контакты</h2>
              <p>По вопросам обработки данных: support@lumenbridge.example</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
