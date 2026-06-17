import Link from 'next/link';

export default function HowItWorks() {
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
          <h1 className="text-3xl font-medium text-[#2c3943] mb-6">Как работает сервис</h1>
          <div className="space-y-6">
            {[
              { num: '01', title: 'Регистрация', desc: 'Введите номер телефона и подтвердите его с помощью SMS-кода.' },
              { num: '02', title: 'Заявка', desc: 'Выберите сумму и срок займа, отправьте заявку на рассмотрение.' },
              { num: '03', title: 'Получение средств', desc: 'После одобрения деньги поступают на ваш банковский счёт.' }
            ].map((item) => (
              <div key={item.num} className="border-b border-[#e5d4ca] pb-6 last:border-0">
                <div className="text-2xl font-medium text-[#9dabb4] mb-2">{item.num}</div>
                <h2 className="text-xl font-medium text-[#2c3943] mb-2">{item.title}</h2>
                <p className="text-sm text-[#77726f]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
