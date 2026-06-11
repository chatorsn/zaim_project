'use client';
import { useState } from 'react';
import { calculateLoan } from '@/features/calculator/model/calculatorApi';

export function useCalculator() {
  const [amount, setAmount] = useState(15000);
  const [term, setTerm] = useState(45);
  const [result, setResult] = useState<{ paymentAmount: number; totalAmount: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const calculate = async () => {
    setLoading(true);
    try {
      const data = await calculateLoan(amount, term);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return { amount, setAmount, term, setTerm, result, loading, calculate };
}
