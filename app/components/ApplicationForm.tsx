'use client';

import { useState } from 'react';

type ApplicationFormProps = {
  userId?: string;
  onSuccess?: () => void;
};

export default function ApplicationForm({ userId, onSuccess }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    amount: 5000,
    term: 30,
    type: 'personal',
    fullName: '',
    phone: '',
    email: '',
    companyName: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const updateAmount = (value: number) => {
    setFormData({...formData, amount: Math.min(50000, Math.max(500, value))});
  };

  const updateTerm = (value: number) => {
    setFormData({...formData, term: Math.min(90, Math.max(7, value))});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const res = await fetch('/api/application', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    const data = await res.json();
    if (res.ok) {
      setSuccess(`Заявка №${data.application.id} создана! Ожидайте решения.`);
      setFormData({
        amount: 5000,
        term: 30,
        type: 'personal',
        fullName: '',
        phone: '',
        email: '',
        companyName: ''
      });
      if (onSuccess) onSuccess();
      setTimeout(() => setSuccess(''), 5000);
    } else {
      setError(data.error || 'Ошибка при создании заявки');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {success && <div className="bg-green-100 border border-green-300 rounded-xl p-3 text-green-700 text-sm text-center">{success}</div>}
      {error && <div className="bg-red-100 border border-red-300 rounded-xl p-3 text-red-600 text-sm text-center">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-[#4A4A4A] text-sm mb-1">Сумма (€) *</label>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => updateAmount(formData.amount - 500)} className="w-10 h-10 rounded-full bg-[#F5F0E8] text-[#1A1A1A] text-xl hover:bg-[#E8E0D5] transition">−</button>
              <input type="number" value={formData.amount} onChange={(e) => updateAmount(Number(e.target.value))} className="w-full text-center text-xl font-semibold border border-[#E2DCD3] rounded-xl py-2" />
              <button type="button" onClick={() => updateAmount(formData.amount + 500)} className="w-10 h-10 rounded-full bg-[#F5F0E8] text-[#1A1A1A] text-xl hover:bg-[#E8E0D5] transition">+</button>
            </div>
            <p className="text-[#A0A0A0] text-xs mt-1 text-center">от 500 до 50 000 €</p>
          </div>

          <div>
            <label className="block text-[#4A4A4A] text-sm mb-1">Срок (дни) *</label>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => updateTerm(formData.term - 1)} className="w-10 h-10 rounded-full bg-[#F5F0E8] text-[#1A1A1A] text-xl hover:bg-[#E8E0D5] transition">−</button>
              <input type="number" value={formData.term} onChange={(e) => updateTerm(Number(e.target.value))} className="w-full text-center text-xl font-semibold border border-[#E2DCD3] rounded-xl py-2" />
              <button type="button" onClick={() => updateTerm(formData.term + 1)} className="w-10 h-10 rounded-full bg-[#F5F0E8] text-[#1A1A1A] text-xl hover:bg-[#E8E0D5] transition">+</button>
            </div>
            <p className="text-[#A0A0A0] text-xs mt-1 text-center">от 7 до 90 дней</p>
          </div>
        </div>
        
        <div>
          <label className="block text-[#4A4A4A] text-sm mb-1">Тип заявителя</label>
          <div className="flex gap-3">
            <button type="button" onClick={() => setFormData({...formData, type: 'personal', companyName: ''})} className={`flex-1 py-2 rounded-full border transition ${formData.type === 'personal' ? 'bg-[#C6A43F] text-white border-[#C6A43F]' : 'bg-white border-[#E2DCD3] text-[#4A4A4A] hover:border-[#C6A43F]'}`}>Физическое лицо</button>
            <button type="button" onClick={() => setFormData({...formData, type: 'business'})} className={`flex-1 py-2 rounded-full border transition ${formData.type === 'business' ? 'bg-[#C6A43F] text-white border-[#C6A43F]' : 'bg-white border-[#E2DCD3] text-[#4A4A4A] hover:border-[#C6A43F]'}`}>Бизнес</button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className="block text-[#4A4A4A] text-sm mb-1">ФИО *</label><input type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full border border-[#E2DCD3] rounded-xl p-3 focus:border-[#C6A43F] outline-none" required /></div>
          <div><label className="block text-[#4A4A4A] text-sm mb-1">Телефон *</label><input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full border border-[#E2DCD3] rounded-xl p-3 focus:border-[#C6A43F] outline-none" required /></div>
        </div>
        
        <div><label className="block text-[#4A4A4A] text-sm mb-1">Email</label><input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full border border-[#E2DCD3] rounded-xl p-3 focus:border-[#C6A43F] outline-none" /></div>
        
        {formData.type === 'business' && (
          <div><label className="block text-[#4A4A4A] text-sm mb-1">Название компании *</label><input type="text" value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} className="w-full border border-[#E2DCD3] rounded-xl p-3 focus:border-[#C6A43F] outline-none" required /></div>
        )}
        
        <button type="submit" disabled={loading} className="w-full bg-[#C6A43F] text-black py-3 rounded-full font-medium hover:bg-[#D4B96A] transition disabled:opacity-50">
          {loading ? 'Отправка...' : 'Отправить заявку'}
        </button>
      </form>
    </div>
  );
}
