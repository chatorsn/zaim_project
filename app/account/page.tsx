'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Loan = {
  id: number;
  amount: number;
  term: number;
  status: string;
  payment_amount: number;
  total_amount: number;
  daily_rate: number;
  signed_at: string;
};

type Application = {
  id: number;
  amount: number;
  term: number;
  status: string;
  created_at: string;
};

type Payment = {
  id: number;
  due_date: string;
  amount: number;
  paid_amount: number;
  status: string;
};

type Notification = {
  id: number;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

export default function AccountPage() {
  const [user, setUser] = useState<{ id: string; phone: string } | null>(null);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeTab, setActiveTab] = useState('loans');
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [paymentsLoading, setPaymentsLoading] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [signingLoading, setSigningLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentReference, setPaymentReference] = useState('');
  const [paymentLoading, setPaymentLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const userPhone = localStorage.getItem('userPhone');
    if (!userId) {
      router.push('/login');
      return;
    }
    setUser({ id: userId, phone: userPhone || '' });
    fetchData(userId);
  }, []);

  const fetchData = async (userId: string) => {
    try {
      const [loansRes, appsRes, notifRes] = await Promise.all([
        fetch(`/api/loan?userId=${userId}`),
        fetch(`/api/application?userId=${userId}`),
        fetch(`/api/notifications?userId=${userId}`)
      ]);
      const loansData = await loansRes.json();
      const appsData = await appsRes.json();
      const notifData = await notifRes.json();
      setLoans(loansData.loans || []);
      setApplications(appsData.applications || []);
      setNotifications(notifData.notifications || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPayments = async (loanId: number) => {
    setPaymentsLoading(true);
    try {
      const res = await fetch(`/api/payments?loanId=${loanId}`);
      const data = await res.json();
      setPayments(data.payments || []);
    } catch (err) {
      console.error(err);
    } finally {
      setPaymentsLoading(false);
    }
  };

  const selectLoan = (loan: Loan) => {
    setSelectedLoan(loan);
    fetchPayments(loan.id);
  };

  const requestOtp = async () => {
    if (!selectedLoan) return;
    setSigningLoading(true);
    const res = await fetch('/api/otp/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ loanId: selectedLoan.id, userId: user?.id })
    });
    if (res.ok) {
      setOtpSent(true);
      setShowOtpModal(true);
    }
    setSigningLoading(false);
  };

  const verifyOtp = async () => {
    setSigningLoading(true);
    const res = await fetch('/api/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        loanId: selectedLoan?.id,
        code: otpCode,
        userId: user?.id,
        ip: '0.0.0.0',
        userAgent: navigator.userAgent
      })
    });
    if (res.ok) {
      setShowOtpModal(false);
      setOtpCode('');
      setOtpSent(false);
      setSuccessMessage('Договор подписан! Займ активирован.');
      setTimeout(() => setSuccessMessage(''), 5000);
      if (user?.id) fetchData(user.id);
      setSelectedLoan(null);
    } else {
      alert('Неверный код');
    }
    setSigningLoading(false);
  };

  const submitPaymentRequest = async () => {
    if (!selectedLoan || !paymentAmount) {
      alert('Введите сумму');
      return;
    }
    setPaymentLoading(true);
    const res = await fetch('/api/payment-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        loanId: selectedLoan.id,
        userId: user?.id,
        amount: parseFloat(paymentAmount),
        reference: paymentReference
      })
    });
    if (res.ok) {
      setShowPaymentModal(false);
      setPaymentAmount('');
      setPaymentReference('');
      setSuccessMessage('Заявка на оплату отправлена! Ожидайте подтверждения.');
      setTimeout(() => setSuccessMessage(''), 5000);
    } else {
      alert('Ошибка при отправке заявки');
    }
    setPaymentLoading(false);
  };

  const logout = () => {
    localStorage.clear();
    router.push('/');
  };

  const markNotificationRead = async (id: number) => {
    await fetch(`/api/notifications/${id}/read`, { method: 'PUT' });
    setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  if (loading) {
    return <div className="min-h-screen bg-[#ece6e3] flex items-center justify-center">Загрузка...</div>;
  }

  const activeLoans = loans.filter(l => l.status === 'active').length;
  const pendingApps = applications.filter(a => a.status === 'new').length;
  const approvedApps = applications.filter(a => a.status === 'approved').length;
  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="min-h-screen bg-[#ece6e3]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#2c3943] border-b border-[#3d4f5c]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-medium text-[#ece6e3] tracking-tight">LumenBridge</Link>
          <div className="flex gap-3">
            <Link href="/" className="px-5 py-2 rounded-full border border-[#4a5c6a] text-[#9dabb4] hover:bg-[#3d4f5c] hover:text-[#ece6e3] transition text-sm">На главную</Link>
            <button onClick={logout} className="px-5 py-2 rounded-full bg-[#4a5c6a] text-[#ece6e3] hover:bg-[#3d4f5c] transition text-sm">Выйти</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-12">
        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-xl text-green-700 text-sm text-center">
            {successMessage}
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-3xl font-medium text-[#2c3943]">Личный кабинет</h1>
          <p className="text-sm text-[#77726f]">Управляйте займами и отслеживайте статус заявок</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-[#e5d4ca] rounded-2xl p-5 text-center shadow-sm">
            <p className="text-xs text-[#9dabb4] mb-1">Активные займы</p>
            <p className="text-3xl font-medium text-[#2c3943]">{activeLoans}</p>
          </div>
          <div className="bg-white border border-[#e5d4ca] rounded-2xl p-5 text-center shadow-sm">
            <p className="text-xs text-[#9dabb4] mb-1">Заявки</p>
            <p className="text-3xl font-medium text-[#2c3943]">{applications.length}</p>
          </div>
          <div className="bg-white border border-[#e5d4ca] rounded-2xl p-5 text-center shadow-sm">
            <p className="text-xs text-[#9dabb4] mb-1">На рассмотрении</p>
            <p className="text-3xl font-medium text-orange-500">{pendingApps}</p>
          </div>
          <div className="bg-white border border-[#e5d4ca] rounded-2xl p-5 text-center shadow-sm">
            <p className="text-xs text-[#9dabb4] mb-1">Одобрено</p>
            <p className="text-3xl font-medium text-green-600">{approvedApps}</p>
          </div>
        </div>

        <div className="flex gap-2 mb-6 border-b border-[#e5d4ca]">
          <button
            onClick={() => { setActiveTab('loans'); setSelectedLoan(null); }}
            className={`px-5 py-2 rounded-t-lg transition ${activeTab === 'loans' ? 'bg-white text-[#2c3943] border border-[#e5d4ca] border-b-white font-medium' : 'text-[#77726f] hover:text-[#2c3943]'}`}
          >
            Мои займы
          </button>
          <button
            onClick={() => { setActiveTab('applications'); setSelectedLoan(null); }}
            className={`px-5 py-2 rounded-t-lg transition ${activeTab === 'applications' ? 'bg-white text-[#2c3943] border border-[#e5d4ca] border-b-white font-medium' : 'text-[#77726f] hover:text-[#2c3943]'}`}
          >
            Заявки
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-5 py-2 rounded-t-lg transition ${activeTab === 'notifications' ? 'bg-white text-[#2c3943] border border-[#e5d4ca] border-b-white font-medium' : 'text-[#77726f] hover:text-[#2c3943]'}`}
          >
            Уведомления {unreadCount > 0 && `(${unreadCount})`}
          </button>
        </div>

        {/* Контент табов */}
        {activeTab === 'loans' && (
          <div>
            {loans.length === 0 ? (
              <div className="bg-white border border-[#e5d4ca] rounded-2xl p-12 text-center shadow-sm">
                <div className="text-5xl mb-4">📋</div>
                <h3 className="text-xl font-medium text-[#2c3943] mb-2">У вас пока нет активных займов</h3>
                <p className="text-sm text-[#77726f] mb-6">Создайте первую заявку и получите предварительное решение онлайн</p>
                <Link href="/" className="inline-block px-8 py-3 rounded-full bg-[#2c3943] text-[#ece6e3] text-sm font-medium hover:bg-[#3d4f5c] transition">Новая заявка</Link>
              </div>
            ) : selectedLoan ? (
              <div>
                <button onClick={() => setSelectedLoan(null)} className="text-[#9dabb4] hover:text-[#2c3943] transition mb-4 text-sm">← Назад к списку</button>
                <div className="space-y-6">
                  <div className="bg-white border border-[#e5d4ca] rounded-2xl p-6 shadow-sm">
                    <h3 className="text-xl font-medium text-[#2c3943] mb-4">Детали займа</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div><span className="text-[#77726f]">Сумма:</span> <span className="font-medium text-[#2c3943]">{selectedLoan.amount.toLocaleString()} €</span></div>
                      <div><span className="text-[#77726f]">Срок:</span> <span className="font-medium text-[#2c3943]">{selectedLoan.term} дней</span></div>
                      <div><span className="text-[#77726f]">Ставка:</span> <span className="font-medium text-[#2c3943]">{selectedLoan.daily_rate * 100}% в день</span></div>
                      <div><span className="text-[#77726f]">Платёж в день:</span> <span className="font-medium text-[#2c3943]">{selectedLoan.payment_amount} €</span></div>
                      <div className="col-span-2"><span className="text-[#77726f]">Итого к возврату:</span> <span className="font-medium text-[#2c3943]">{selectedLoan.total_amount} €</span></div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-[#e5d4ca] flex flex-wrap gap-3">
                      {selectedLoan.status === 'pending_sign' && (
                        <button onClick={requestOtp} disabled={signingLoading} className="px-6 py-2.5 rounded-full bg-[#2c3943] text-[#ece6e3] text-sm font-medium hover:bg-[#3d4f5c] transition disabled:opacity-50">
                          {signingLoading ? 'Запрос кода...' : 'Подписать договор'}
                        </button>
                      )}
                      {selectedLoan.status === 'active' && (
                        <button onClick={() => setShowPaymentModal(true)} className="px-6 py-2.5 rounded-full border border-[#e5d4ca] text-[#2c3943] text-sm font-medium hover:bg-[#ece6e3] transition">Заявка на оплату</button>
                      )}
                    </div>
                  </div>

                  <div className="bg-white border border-[#e5d4ca] rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-medium text-[#2c3943] mb-4">График платежей</h3>
                    {paymentsLoading ? (
                      <div className="text-center py-8 text-[#77726f]">Загрузка...</div>
                    ) : payments.length === 0 ? (
                      <div className="text-center py-8 text-[#77726f]">График платежей будет создан после подписания договора</div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-[#e5d4ca]">
                              <th className="text-left py-3 text-xs font-medium text-[#9dabb4]">Дата</th>
                              <th className="text-left py-3 text-xs font-medium text-[#9dabb4]">Сумма</th>
                              <th className="text-left py-3 text-xs font-medium text-[#9dabb4]">Статус</th>
                            </tr>
                          </thead>
                          <tbody>
                            {payments.map((payment) => (
                              <tr key={payment.id} className="border-b border-[#e5d4ca]">
                                <td className="py-3 text-sm">{new Date(payment.due_date).toLocaleDateString()}</td>
                                <td className="py-3 text-sm">{payment.amount} €</td>
                                <td className="py-3">
                                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${payment.status === 'paid' ? 'bg-green-100 text-green-700' : payment.status === 'overdue' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                    {payment.status === 'paid' ? 'Оплачен' : payment.status === 'overdue' ? 'Просрочен' : 'Ожидает'}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  <div className="bg-white border border-[#e5d4ca] rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-medium text-[#2c3943] mb-4">История платежей</h3>
                    {payments.filter(p => p.status === 'paid').length === 0 ? (
                      <p className="text-[#77726f] text-center py-4 text-sm">Нет оплаченных платежей</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-[#e5d4ca]">
                              <th className="text-left py-3 text-xs font-medium text-[#9dabb4]">Дата оплаты</th>
                              <th className="text-left py-3 text-xs font-medium text-[#9dabb4]">Сумма</th>
                              <th className="text-left py-3 text-xs font-medium text-[#9dabb4]">Статус</th>
                            </tr>
                          </thead>
                          <tbody>
                            {payments.filter(p => p.status === 'paid').map((payment) => (
                              <tr key={payment.id} className="border-b border-[#e5d4ca]">
                                <td className="py-3 text-sm">{payment.paid_at ? new Date(payment.paid_at).toLocaleDateString() : new Date(payment.due_date).toLocaleDateString()}</td>
                                <td className="py-3 text-sm">{payment.amount} €</td>
                                <td className="py-3">
                                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Оплачен</span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {loans.map((loan) => (
                  <div key={loan.id} className="bg-white border border-[#e5d4ca] rounded-2xl p-5 cursor-pointer hover:shadow-md transition shadow-sm" onClick={() => selectLoan(loan)}>
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <div>
                        <p className="text-xl font-medium text-[#2c3943]">{loan.amount.toLocaleString()} €</p>
                        <p className="text-xs text-[#77726f] mt-1">Срок: {loan.term} дней</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs ${loan.status === 'active' ? 'bg-green-100 text-green-700' : loan.status === 'pending_sign' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}>
                          {loan.status === 'active' ? 'Активен' : loan.status === 'pending_sign' ? 'Ожидает подписания' : 'Закрыт'}
                        </span>
                        <p className="text-xs text-[#9dabb4] mt-2">Нажмите для деталей →</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'applications' && (
          <div>
            {applications.length === 0 ? (
              <div className="bg-white border border-[#e5d4ca] rounded-2xl p-12 text-center shadow-sm">
                <div className="text-5xl mb-4">📄</div>
                <h3 className="text-xl font-medium text-[#2c3943] mb-2">У вас пока нет заявок</h3>
                <p className="text-sm text-[#77726f] mb-6">Оставьте заявку на займ — это займёт всего несколько минут</p>
                <Link href="/" className="inline-block px-8 py-3 rounded-full bg-[#2c3943] text-[#ece6e3] text-sm font-medium hover:bg-[#3d4f5c] transition">Новая заявка</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {applications.map((app) => (
                  <div key={app.id} className="bg-white border border-[#e5d4ca] rounded-2xl p-5 shadow-sm">
                    <div className="flex flex-wrap justify-between items-center gap-4">
                      <div>
                        <p className="text-xl font-medium text-[#2c3943]">{app.amount.toLocaleString()} €</p>
                        <p className="text-xs text-[#77726f] mt-1">Срок: {app.term} дней</p>
                        <p className="text-xs text-[#9dabb4] mt-1">{new Date(app.created_at).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs ${app.status === 'approved' ? 'bg-green-100 text-green-700' : app.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {app.status === 'new' ? 'На рассмотрении' : app.status === 'approved' ? 'Одобрена' : 'Отклонена'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'notifications' && (
          <div>
            {notifications.length === 0 ? (
              <div className="bg-white border border-[#e5d4ca] rounded-2xl p-12 text-center shadow-sm">
                <div className="text-5xl mb-4">🔔</div>
                <h3 className="text-xl font-medium text-[#2c3943] mb-2">Нет уведомлений</h3>
                <p className="text-sm text-[#77726f]">Здесь будут появляться уведомления о статусе ваших заявок и займов</p>
              </div>
            ) : (
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div key={notif.id} className={`bg-white border border-[#e5d4ca] rounded-2xl p-5 cursor-pointer hover:shadow-md transition shadow-sm ${!notif.is_read ? 'border-l-4 border-l-[#2c3943]' : ''}`} onClick={() => markNotificationRead(notif.id)}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-[#2c3943]">{notif.title}</h4>
                        <p className="text-sm text-[#77726f] mt-1">{notif.message}</p>
                        <p className="text-xs text-[#9dabb4] mt-2">{new Date(notif.created_at).toLocaleString()}</p>
                      </div>
                      {!notif.is_read && <div className="w-2 h-2 bg-[#2c3943] rounded-full"></div>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-medium text-[#2c3943] mb-4">Подписание договора</h3>
            {!otpSent ? (
              <p className="text-[#77726f] mb-4">Запрос кода...</p>
            ) : (
              <>
                <p className="text-[#77726f] mb-4">Введите код из SMS</p>
                <input type="text" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} className="w-full text-center text-2xl font-mono mb-4" placeholder="000000" maxLength={6} />
                <button onClick={verifyOtp} disabled={signingLoading} className="w-full bg-[#2c3943] text-[#ece6e3] py-3 rounded-full text-sm font-medium hover:bg-[#3d4f5c] transition disabled:opacity-50">
                  {signingLoading ? 'Проверка...' : 'Подтвердить'}
                </button>
              </>
            )}
            <button onClick={() => { setShowOtpModal(false); setOtpCode(''); setOtpSent(false); }} className="w-full mt-3 text-[#77726f] py-2 rounded-xl hover:text-[#2c3943] transition">
              Отмена
            </button>
          </div>
        </div>
      )}

      {/* Payment Request Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-medium text-[#2c3943] mb-4">Заявка на оплату</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#77726f] mb-1">Сумма (€)</label>
                <input type="number" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} className="w-full" placeholder="Введите сумму" />
              </div>
              <div>
                <label className="block text-sm text-[#77726f] mb-1">Реквизиты / Reference</label>
                <input type="text" value={paymentReference} onChange={(e) => setPaymentReference(e.target.value)} className="w-full" placeholder="Номер перевода / IBAN" />
              </div>
              <div className="flex gap-3">
                <button onClick={submitPaymentRequest} disabled={paymentLoading} className="flex-1 bg-[#2c3943] text-[#ece6e3] py-2.5 rounded-full text-sm font-medium hover:bg-[#3d4f5c] transition disabled:opacity-50">
                  {paymentLoading ? 'Отправка...' : 'Отправить'}
                </button>
                <button onClick={() => setShowPaymentModal(false)} className="flex-1 border border-[#e5d4ca] text-[#77726f] py-2.5 rounded-full hover:bg-[#ece6e3] transition">
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
