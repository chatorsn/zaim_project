'use client';
import Link from 'next/link';

export function BusinessSection() {
  return (
    <section className="py-16 md:py-20 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white border border-[#E8E0D7] rounded-2xl p-8 md:p-12 shadow-sm">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#18181B] mb-4">Финансирование для бизнеса</h2>
              <p className="text-lg text-[#71717A] mb-6">Решения для компаний и предпринимателей, которым важна скорость и предсказуемость</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-2xl font-bold text-[#5F5247]">30 000 – 500 000 €</p>
                  <p className="text-sm text-[#71717A]">Сумма займа</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#5F5247]">1 – 12 месяцев</p>
                  <p className="text-sm text-[#71717A]">Срок займа</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#5F5247]">Без залога</p>
                  <p className="text-sm text-[#71717A]">Стандартные условия</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#5F5247]">Быстрое рассмотрение</p>
                  <p className="text-sm text-[#71717A]">Решение за несколько минут</p>
                </div>
              </div>
              <Link href="/for-business" className="inline-block bg-[#5F5247] text-white px-8 py-3 rounded-full font-medium hover:bg-[#7B6652] transition">
                Узнать подробнее →
              </Link>
            </div>
            <div className="bg-[#F5F2EE] rounded-2xl p-6 text-center">
              <p className="text-sm text-[#71717A] mb-2">На данный момент</p>
              <p className="text-xl font-semibold text-[#18181B] mb-4">Онлайн-кабинет для бизнеса в разработке</p>
              <p className="text-[#71717A]">Заявки принимаются через форму обратной связи</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
