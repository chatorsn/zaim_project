import { Card } from '@/shared/ui/Card';

const steps = [
  { num: '01', title: 'Регистрация', desc: 'Введите номер телефона и подтвердите его с помощью SMS-кода' },
  { num: '02', title: 'Заявка', desc: 'Выберите сумму и срок займа и отправьте заявку на рассмотрение' },
  { num: '03', title: 'Получение средств', desc: 'После одобрения деньги поступают на ваш банковский счёт' }
];

export function HowItWorks() {
  return (
    <section className="py-16 md:py-20 px-4 md:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#18181B] mb-3 md:mb-4">Как всё происходит</h2>
          <p className="text-base md:text-lg text-[#71717A]">Оформление займа занимает всего несколько минут</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step) => (
            <Card key={step.num} className="text-center hover:shadow-md transition">
              <div className="text-4xl md:text-5xl font-bold text-[#5F5247]/20 mb-3 md:mb-4">{step.num}</div>
              <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">{step.title}</h3>
              <p className="text-xs md:text-sm text-[#71717A]">{step.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
