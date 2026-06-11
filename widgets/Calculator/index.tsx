'use client';
import { useCalculator } from './hooks/useCalculator';
import { Button } from '@/shared/ui/Button';

export function Calculator() {
  const { amount, setAmount, term, setTerm, result, loading, calculate } = useCalculator();

  return (
    <div className="bg-white border border-[#E8E0D7] rounded-2xl p-6 md:p-8 lg:p-12 max-w-3xl mx-auto shadow-sm">
      <div className="space-y-6 md:space-y-8">
        <div>
          <div className="flex justify-between text-[#18181B] mb-3 md:mb-4">
            <span className="text-base md:text-lg">Сумма займа</span>
            <span className="text-xl md:text-2xl font-semibold text-[#5F5247]">{amount.toLocaleString()} €</span>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <button onClick={() => setAmount(Math.max(500, amount - 1000))} className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#F5F2EE] text-[#5F5247] text-lg md:text-xl hover:bg-[#5F5247] hover:text-white transition">−</button>
            <div className="flex-1 text-center">
              <input type="number" value={amount} onChange={(e) => setAmount(Math.min(50000, Math.max(500, Number(e.target.value))))} className="w-full text-center text-2xl md:text-3xl font-semibold bg-white border border-[#E8E0D7] rounded-2xl py-2 md:py-4 text-[#18181B]" />
            </div>
            <button onClick={() => setAmount(Math.min(50000, amount + 1000))} className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#F5F2EE] text-[#5F5247] text-lg md:text-xl hover:bg-[#5F5247] hover:text-white transition">+</button>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-[#18181B] mb-3 md:mb-4">
            <span className="text-base md:text-lg">Срок займа</span>
            <span className="text-xl md:text-2xl font-semibold text-[#5F5247]">{term} дней</span>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <button onClick={() => setTerm(Math.max(7, term - 5))} className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#F5F2EE] text-[#5F5247] text-lg md:text-xl hover:bg-[#5F5247] hover:text-white transition">−</button>
            <div className="flex-1 text-center">
              <input type="number" value={term} onChange={(e) => setTerm(Math.min(90, Math.max(7, Number(e.target.value))))} className="w-full text-center text-2xl md:text-3xl font-semibold bg-white border border-[#E8E0D7] rounded-2xl py-2 md:py-4 text-[#18181B]" />
            </div>
            <button onClick={() => setTerm(Math.min(90, term + 5))} className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#F5F2EE] text-[#5F5247] text-lg md:text-xl hover:bg-[#5F5247] hover:text-white transition">+</button>
          </div>
        </div>
        <Button onClick={calculate} disabled={loading} fullWidth>
          {loading ? 'Расчёт...' : 'Рассчитать'}
        </Button>
        {result && (
          <div className="bg-[#F5F2EE] rounded-2xl p-4 md:p-6 mt-4 md:mt-6">
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <span className="text-sm md:text-base text-[#71717A]">Платёж в день</span>
              <span className="text-xl md:text-2xl font-bold text-[#18181B]">{result.paymentAmount} €</span>
            </div>
            <div className="flex justify-between items-center pt-3 md:pt-4 border-t border-[#5F5247]/20">
              <span className="text-sm md:text-base text-[#71717A]">Итого к возврату</span>
              <span className="text-2xl md:text-3xl font-bold text-[#5F5247]">{result.totalAmount} €</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
