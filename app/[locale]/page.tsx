'use client';

import { Header } from '@/widgets/Header';
import { Hero } from '@/widgets/Hero';
import { Calculator } from '@/widgets/Calculator';
import { Benefits } from '@/widgets/Benefits';
import { HowItWorks } from '@/widgets/HowItWorks';
import { BusinessSection } from '@/widgets/BusinessSection';
import { ApplicationForm } from '@/widgets/ApplicationForm';
import { Footer } from '@/widgets/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <div className="py-12 md:py-16 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#18181B] mb-3 md:mb-4">Рассчитайте условия</h2>
            <p className="text-base md:text-lg text-[#71717A]">за несколько секунд</p>
          </div>
          <Calculator />
        </div>
      </div>
      <Benefits />
      <HowItWorks />
      <BusinessSection />
      <section className="py-16 md:py-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-[#E8E0D7] rounded-2xl p-6 md:p-8 lg:p-12 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6 md:mb-8">Подать заявку на займ</h2>
            <ApplicationForm />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
