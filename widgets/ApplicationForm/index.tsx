'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/shared/ui/Button';

export function ApplicationForm() {
  const [userId, setUserId] = useState<string | null>(null);
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

  useEffect(() => {
    setUserId(localStorage.getItem('userId'));
  }, []);

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
      body: JSON.stringify({ ...formData, userId })
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
      setTimeout(() => setSuccess(''), 5000);
    } else {
      setError(data.error || 'Ошибка при создании заявки');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {success && <div className="bg-green-100 border border-green-300 rounded-2xl p-4 text-green-700 text-sm text-center">{success}</div>}
      {error && <div className="bg-red-100 border border-red-200 rounded-2xl p-4 text-red-600 text-sm text-center">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-[#71717A] text-sm mb-2">Сумма (€)</label>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => updateAmount(formData.amount - 500)} className="w-10 h-10 rounded-full bg-[#F5F2EE] text-[#5F5247] text-xl hover:bg-[#5F5247] hover:text-white transition">−</button>
              <input type="number" value={formData.amount} onChange={(e) => updateAmount(Number(e.target.value))} className="w-full text-center text-xl font-semibold bg-white border border-[#E8E0D7] rounded-xl py-3 text-[#18181B]" />
              <button type="button" onClick={() => updateAmount(formData.amount + 500)} className="w-10 h-10 rounded-full bg-[#F5F2EE] text-[#5F5247] text-xl hover:bg-[#5F5247] hover:text-white transition">+</button>
            </div>
            <p className="text-[#A0A0A0] text-xs mt-1 text-center">от 500 до 50 000 €</p>
          </div>

          <div>
            <label className="block text-[#71717A] text-sm mb-2">Срок (дни)</label>
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => updateTerm(formData.term - 1)} className="w-10 h-10 rounded-full bg-[#F5F2EE] text-[#5F5247] text-xl hover:bg-[#5F5247] hover:text-white transition">−</button>
              <input type="number" value={formData.term} onChange={(e) => updateTerm(Number(e.target.value))} className="w-full text-center text-xl font-semibold bg-white border border-[#E8E0D7] rounded-xl py-3 text-[#18181B]" />
              <button type="button" onClick={() => updateTerm(formData.term + 1)} className="w-10 h-10 rounded-full bg-[#F5F2EE] text-[#5F5247] text-xl hover:bg-[#5F5247] hover:text-white transition">+</button>
            </div>
            <p className="text-[#A0A0A0] text-xs mt-1 text-center">от 7 до 90 дней</p>
          </div>
        </div>
        
        <div>
          <label className="block text-[#71717A] text-sm mb-2">Тип заявителя</label>
          <div className="flex gap-3">
            <button type="button" onClick={() => setFormData({...formData, type: 'personal', companyName: ''})} className={`flex-1 py-2.5 rounded-full border transition ${formData.type === 'personal' ? 'bg-[#5F5247] text-white border-[#5F5247]' : 'bg-white text-[#71717A] border-[#E8E0D7] hover:border-[#5F5247]'}`}>Физическое лицо</button>
            <button type="button" onClick={() => setFormData({...formData, type: 'business'})} className={`flex-1 py-2.5 rounded-full border transition ${formData.type === 'business' ? 'bg-[#5F5247] text-white border-[#5F5247]' : 'bg-white text-[#71717A] border-[#E8E0D7] hover:border-[#5F5247]'}`}>Бизнес</button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#71717A] text-sm mb-2">ФИО *</label>
            <input type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full bg-white border border-[#E8E0D7] rounded-xl p-3 text-[#18181B] placeholder-[#A0A0A0] focus:border-[#5F5247] outline-none" placeholder="Иван Иванов" required />
          </div>
          <div>
            <label className="block text-[#71717A] text-sm mb-2">Телефон *</label>
            <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-white border border-[#E8E0D7] rounded-xl p-3 text-[#18181B] placeholder-[#A0A0A0] focus:border-[#5F5247] outline-none" placeholder="+7 999 123-45-67" required />
          </div>
        </div>
        
        <div>
          <label className="block text-[#71717A] text-sm mb-2">Email</label>
          <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-white border border-[#E8E0D7] rounded-xl p-3 text-[#18181B] placeholder-[#A0A0A0] focus:border-[#5F5247] outline-none" placeholder="ivan@example.com" />
        </div>
        
        {formData.type === 'business' && (
          <div>
            <label className="block text-[#71717A] text-sm mb-2">Название компании *</label>
            <input type="text" value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} className="w-full bg-white border border-[#E8E0D7] rounded-xl p-3 text-[#18181B] placeholder-[#A0A0A0] focus:border-[#5F5247] outline-none" placeholder="ООО Ромашка" required />
          </div>
        )}
        
        <Button type="submit" disabled={loading} fullWidth>
          {loading ? 'Отправка...' : 'Отправить заявку'}
        </Button>
      </form>
    </div>
  );
}
