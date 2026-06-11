import Link from 'next/link';

export default function HowItWorks() {
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
          <h1 className="text-4xl font-bold text-[#18181B] mb-6">Как работает сервис</h1>
          <div className="space-y-8">
            <div>
              <div className="text-3xl font-bold text-[#5F5247] mb-2">01</div>
              <h2 className="text-xl font-semibold mb-2">Регистрация</h2>
              <p className="text-[#71717A]">Введите номер телефона и подтвердите его с помощью SMS-кода.</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#5F5247] mb-2">02</div>
              <h2 className="text-xl font-semibold mb-2">Заявка</h2>
              <p className="text-[#71717A]">Выберите сумму и срок займа, отправьте заявку.</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#5F5247] mb-2">03</div>
              <h2 className="text-xl font-semibold mb-2">Получение средств</h2>
              <p className="text-[#71717A]">После одобрения деньги поступают на ваш счёт.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
