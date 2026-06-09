'use client';
import Link from 'next/link';

export default function Privacy() {
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
          <h1 className="text-4xl lg:text-5xl font-medium text-white mb-8">Политика конфиденциальности</h1>
          
          <div className="space-y-6 text-[#A0A0A0] leading-relaxed">
            <section>
              <h2 className="text-2xl font-medium text-white mb-4">1. Общая информация</h2>
              <p>LumenBridge Finance Ltd осуществляет деятельность в соответствии с применимым европейским законодательством, включая GDPR.</p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-white mb-4">2. Какие данные мы собираем</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Имя и фамилия</li>
                <li>Номер телефона</li>
                <li>Адрес электронной почты</li>
                <li>Данные о заявках и займах</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-white mb-4">3. Цели обработки данных</h2>
              <p>Данные используются для обработки заявок, заключения договоров, связи с клиентами и выполнения требований законодательства.</p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-white mb-4">4. Права пользователя</h2>
              <p>Вы имеете право на доступ к своим данным, их исправление, удаление, ограничение обработки и отзыв согласия.</p>
            </section>

            <section>
              <h2 className="text-2xl font-medium text-white mb-4">5. Контакты</h2>
              <p>По вопросам обработки данных: support@lumenbridge.example</p>
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
