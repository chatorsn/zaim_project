'use client';
import Link from 'next/link';

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E8E0D5]">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold text-[#2E5A4C]">LumenBridge</Link>
          <nav className="hidden md:flex gap-8 text-[#4A4A4A]">
            <Link href="/how-it-works" className="text-[#2E5A4C]">Как работает</Link>
            <Link href="/for-business" className="hover:text-[#2E5A4C] transition">Для бизнеса</Link>
            <Link href="/faq" className="hover:text-[#2E5A4C] transition">FAQ</Link>
            <Link href="/contacts" className="hover:text-[#2E5A4C] transition">Контакты</Link>
          </nav>
          <Link href="/login" className="text-[#2E5A4C] border border-[#2E5A4C] px-5 py-2 rounded-full hover:bg-[#2E5A4C] hover:text-white transition">Войти</Link>
        </div>
      </header>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-block mb-6 text-[#2E5A4C] hover:underline">← На главную</Link>
          <h1 className="text-5xl lg:text-6xl font-bold text-[#2E5A4C] mb-6 text-center">Как работает сервис</h1>
          <p className="text-xl text-[#4A4A4A] text-center mb-12">
            Мы сделали процесс получения займа максимально простым и понятным. Всё оформляется онлайн за несколько минут.
          </p>

          <div className="space-y-8">
            <div className="bg-white border border-[#E8E0D5] rounded-3xl p-8 shadow-sm">
              <p className="text-[#2E5A4C] text-sm font-medium mb-2">Шаг 1</p>
              <h2 className="text-2xl font-bold text-[#2E5A4C] mb-3">Регистрация</h2>
              <p className="text-[#4A4A4A] leading-relaxed">Введите номер телефона и подтвердите его с помощью SMS-кода. После этого вы получаете доступ к личному кабинету, где можно управлять заявками и отслеживать статус займа.</p>
            </div>

            <div className="bg-white border border-[#E8E0D5] rounded-3xl p-8 shadow-sm">
              <p className="text-[#2E5A4C] text-sm font-medium mb-2">Шаг 2</p>
              <h2 className="text-2xl font-bold text-[#2E5A4C] mb-3">Подача заявки</h2>
              <p className="text-[#4A4A4A] leading-relaxed">Выберите сумму и срок займа, укажите необходимую информацию и отправьте заявку на рассмотрение. Все условия отображаются заранее.</p>
            </div>

            <div className="bg-white border border-[#E8E0D5] rounded-3xl p-8 shadow-sm">
              <p className="text-[#2E5A4C] text-sm font-medium mb-2">Шаг 3</p>
              <h2 className="text-2xl font-bold text-[#2E5A4C] mb-3">Проверка и одобрение</h2>
              <p className="text-[#4A4A4A] leading-relaxed">Заявка анализируется автоматически на основе предоставленных данных. Решение принимается в короткие сроки. При повторных обращениях могут быть доступны более выгодные условия.</p>
            </div>

            <div className="bg-white border border-[#E8E0D5] rounded-3xl p-8 shadow-sm">
              <p className="text-[#2E5A4C] text-sm font-medium mb-2">Шаг 4</p>
              <h2 className="text-2xl font-bold text-[#2E5A4C] mb-3">Получение средств</h2>
              <p className="text-[#4A4A4A] leading-relaxed">После одобрения деньги переводятся на указанный банковский счёт. Перевод осуществляется сразу после подтверждения условий.</p>
            </div>

            <div className="bg-white border border-[#E8E0D5] rounded-3xl p-8 shadow-sm">
              <p className="text-[#2E5A4C] text-sm font-medium mb-2">Шаг 5</p>
              <h2 className="text-2xl font-bold text-[#2E5A4C] mb-3">Погашение</h2>
              <p className="text-[#4A4A4A] leading-relaxed">Погашение осуществляется удобным для вас способом в установленный срок. Вы можете внести платеж заранее без дополнительных комиссий.</p>
            </div>
          </div>

          <div className="mt-12 bg-[#F5F0E8] rounded-3xl p-8">
            <h3 className="text-xl font-bold text-[#2E5A4C] mb-4">Важно знать</h3>
            <ul className="space-y-2 text-[#4A4A4A]">
              <li>• Все условия займа отображаются до его оформления</li>
              <li>• Мы не взимаем скрытые комиссии</li>
              <li>• Данные клиентов обрабатываются в соответствии с требованиями законодательства</li>
              <li>• Информация о погашении учитывается во внутренней истории клиента</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
