import Link from 'next/link';

export default function ForBusiness() {
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
          <h1 className="text-3xl font-medium text-[#2c3943] mb-6">Займы для бизнеса в Европе</h1>
          <p className="text-sm text-[#77726f] mb-8">Краткосрочные финансовые решения для предпринимателей и компаний.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#ece6e3] rounded-xl p-6">
              <h3 className="font-medium text-[#2c3943] mb-4">Условия</h3>
              <ul className="space-y-2 text-sm text-[#77726f]">
                <li>• Сумма: 30 000 – 500 000 EUR</li>
                <li>• Срок: 1 – 12 месяцев</li>
                <li>• Залог: не требуется</li>
              </ul>
            </div>
            <div className="bg-[#ece6e3] rounded-xl p-6">
              <h3 className="font-medium text-[#2c3943] mb-4">Преимущества</h3>
              <ul className="space-y-2 text-sm text-[#77726f]">
                <li>• Быстрый доступ к средствам</li>
                <li>• Простая процедура</li>
                <li>• Прозрачные условия</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
