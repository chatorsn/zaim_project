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
    <div className="bg-white/20 backdrop-blur border border-white/20 rounded-3xl p-8">
      <h3 className="text-2xl font-bold text-white mb-4">Подать заявку на займ</h3>
      {success && <div className="bg-green-500/30 text-green-100 p-3 rounded-xl mb-4">{success}</div>}
      {error && <div className="bg-red-500/30 text-red-100 p-3 rounded-xl mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Сумма */}
          <div>
            <label className="block text-white/70 text-sm mb-2">Сумма займа (€)</label>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => updateAmount(formData.amount - 500)} className="w-10 h-10 rounded-full bg-white/10 text-white text-xl hover:bg-white/20 transition">−</button>
              <input type="number" value={formData.amount} onChange={(e) => updateAmount(Number(e.target.value))} className="w-full text-center text-xl font-semibold" />
              <button type="button" onClick={() => updateAmount(formData.amount + 500)} className="w-10 h-10 rounded-full bg-white/10 text-white text-xl hover:bg-white/20 transition">+</button>
            </div>
            <p className="text-white/40 text-xs mt-2 text-center">от 500 до 50 000 €</p>
          </div>

          {/* Срок */}
          <div>
            <label className="block text-white/70 text-sm mb-2">Срок займа (дни)</label>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => updateTerm(formData.term - 1)} className="w-10 h-10 rounded-full bg-white/10 text-white text-xl hover:bg-white/20 transition">−</button>
              <input type="number" value={formData.term} onChange={(e) => updateTerm(Number(e.target.value))} className="w-full text-center text-xl font-semibold" />
              <button type="button" onClick={() => updateTerm(formData.term + 1)} className="w-10 h-10 rounded-full bg-white/10 text-white text-xl hover:bg-white/20 transition">+</button>
            </div>
            <p className="text-white/40 text-xs mt-2 text-center">от 7 до 90 дней</p>
          </div>
        </div>
        
        <div>
          <label className="block text-white/70 text-sm mb-2">Тип заявителя</label>
          <div className="flex gap-4">
            <button type="button" onClick={() => setFormData({...formData, type: 'personal', companyName: ''})} className={`flex-1 py-2 rounded-full transition ${formData.type === 'personal' ? 'bg-[#2E5A4C] text-white' : 'bg-white/10 text-white/70'}`}>Физическое лицо</button>
            <button type="button" onClick={() => setFormData({...formData, type: 'business'})} className={`flex-1 py-2 rounded-full transition ${formData.type === 'business' ? 'bg-[#2E5A4C] text-white' : 'bg-white/10 text-white/70'}`}>Бизнес</button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div><label className="block text-white/70 text-sm mb-1">ФИО *</label><input type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full" required /></div>
          <div><label className="block text-white/70 text-sm mb-1">Телефон *</label><input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full" required /></div>
        </div>
        
        <div><label className="block text-white/70 text-sm mb-1">Email</label><input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full" /></div>
        
        {formData.type === 'business' && (
          <div><label className="block text-white/70 text-sm mb-1">Название компании *</label><input type="text" value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} className="w-full" required /></div>
        )}
        
        <button type="submit" disabled={loading} className="w-full bg-[#2E5A4C] text-white py-3 rounded-full font-medium hover:bg-[#3D6B5A] transition disabled:opacity-50">
          {loading ? 'Отправка...' : 'Отправить заявку'}
        </button>
      </form>
    </div>
  );
}
