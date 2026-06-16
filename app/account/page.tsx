'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/shared/ui/Card';

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
      setSuccessMessage('Договор успешно подписан! Займ активирован.');
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

  const getStatusText = (status: string) => {
    if (status === 'paid') return 'Оплачен';
    if (status === 'overdue') return 'Просрочен';
    return 'Ожидает';
  };

  const getStatusColor = (status: string) => {
    if (status === 'paid') return 'bg-green-100 text-green-700';
    if (status === 'overdue') return 'bg-red-100 text-red-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-[#F7F5F2] via-[#F5F2EE] to-[#EFE8DF] flex items-center justify-center">Загрузка...</div>;
  }

  const activeLoans = loans.filter(l => l.status === 'active').length;
  const pendingApps = applications.filter(a => a.status === 'new').length;
  const approvedApps = applications.filter(a => a.status === 'approved').length;
  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F5F2] via-[#F5F2EE] to-[#EFE8DF]">
      <header className="bg-white/95 backdrop-blur-sm border-b border-[#E8E0D7] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl md:text-2xl font-semibold text-[#18181B] tracking-tight">LumenBridge</Link>
          <div className="flex gap-3">
            <Link href="/" className="px-5 py-2.5 rounded-full border border-[#5F5247] text-[#5F5247] hover:bg-[#5F5247] hover:text-white transition text-sm font-medium">
              На главную
            </Link>
            <button onClick={logout} className="px-5 py-2.5 rounded-full bg-[#5F5247] text-white hover:bg-[#7B6652] transition text-sm font-medium">
              Выйти
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-xl text-green-700 text-center">
            {successMessage}
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#18181B] mb-2">Личный кабинет</h1>
          <p className="text-[#71717A]">Управляйте займами и отслеживайте статус заявок</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center p-4 md:p-5">
            <p className="text-sm text-[#71717A] mb-1">Активные займы</p>
            <p className="text-3xl font-bold text-[#5F5247]">{activeLoans}</p>
          </Card>
          <Card className="text-center p-4 md:p-5">
            <p className="text-sm text-[#71717A] mb-1">Заявки</p>
            <p className="text-3xl font-bold text-[#5F5247]">{applications.length}</p>
          </Card>
          <Card className="text-center p-4 md:p-5">
            <p className="text-sm text-[#71717A] mb-1">На рассмотрении</p>
            <p className="text-3xl font-bold text-orange-500">{pendingApps}</p>
          </Card>
          <Card className="text-center p-4 md:p-5">
            <p className="text-sm text-[#71717A] mb-1">Одобрено</p>
            <p className="text-3xl font-bold text-green-600">{approvedApps}</p>
          </Card>
        </div>

        <div className="flex gap-2 mb-6 border-b border-[#E8E0D7]">
          <button
            onClick={() => { setActiveTab('loans'); setSelectedLoan(null); }}
            className={`px-5 py-2 rounded-t-lg transition ${activeTab === 'loans' ? 'bg-white text-[#5F5247] border border-[#E8E0D7] border-b-white font-medium' : 'text-[#71717A] hover:text-[#5F5247]'}`}
          >
            💰 Мои займы
          </button>
          <button
            onClick={() => { setActiveTab('applications'); setSelectedLoan(null); }}
            className={`px-5 py-2 rounded-t-lg transition ${activeTab === 'applications' ? 'bg-white text-[#5F5247] border border-[#E8E0D7] border-b-white font-medium' : 'text-[#71717A] hover:text-[#5F5247]'}`}
          >
            📄 Заявки
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`px-5 py-2 rounded-t-lg transition ${activeTab === 'notifications' ? 'bg-white text-[#5F5247] border border-[#E8E0D7] border-b-white font-medium' : 'text-[#71717A] hover:text-[#5F5247]'}`}
          >
            🔔 Уведомления {unreadCount > 0 && `(${unreadCount})`}
          </button>
        </div>

        {activeTab === 'loans' && (
          <div>
            {loans.length === 0 ? (
              <Card className="text-center py-12">
                <div className="text-5xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-[#18181B] mb-2">У вас пока нет активных займов</h3>
                <p className="text-[#71717A] mb-6">Создайте первую заявку и получите предварительное решение онлайн</p>
                <Link href="/" className="inline-block px-8 py-3 rounded-full bg-[#5F5247] text-white hover:bg-[#7B6652] transition font-medium">
                  Новая заявка
                </Link>
              </Card>
            ) : selectedLoan ? (
              <div>
                <button onClick={() => setSelectedLoan(null)} className="text-[#5F5247] mb-4 inline-flex items-center gap-1 hover:underline">
                  ← Назад к списку
                </button>
                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="text-2xl font-bold text-[#18181B] mb-4">Детали займа</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div><span className="text-[#71717A]">Сумма:</span> <span className="font-semibold">{selectedLoan.amount.toLocaleString()} €</span></div>
                      <div><span className="text-[#71717A]">Срок:</span> <span className="font-semibold">{selectedLoan.term} дней</span></div>
                      <div><span className="text-[#71717A]">Ставка:</span> <span className="font-semibold">{selectedLoan.daily_rate * 100}% в день</span></div>
                      <div><span className="text-[#71717A]">Платёж в день:</span> <span className="font-semibold">{selectedLoan.payment_amount} €</span></div>
                      <div className="col-span-2"><span className="text-[#71717A]">Итого к возврату:</span> <span className="font-semibold text-[#5F5247]">{selectedLoan.total_amount} €</span></div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-[#E8E0D7] flex flex-wrap gap-3">
                      {selectedLoan.status === 'pending_sign' && (
                        <button
                          onClick={requestOtp}
                          disabled={signingLoading}
                          className="px-6 py-2.5 rounded-full bg-[#5F5247] text-white hover:bg-[#7B6652] transition font-medium disabled:opacity-50"
                        >
                          {signingLoading ? 'Запрос кода...' : '✍️ Подписать договор'}
                        </button>
                      )}
                      {selectedLoan.status === 'active' && (
                        <button
                          onClick={() => setShowPaymentModal(true)}
                          className="px-6 py-2.5 rounded-full border border-[#5F5247] text-[#5F5247] hover:bg-[#5F5247] hover:text-white transition font-medium"
                        >
                          💳 Заявка на оплату
                        </button>
                      )}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-xl font-semibold text-[#18181B] mb-4">График платежей</h3>
                    {paymentsLoading ? (
                      <div className="text-center py-8 text-[#71717A]">Загрузка...</div>
                    ) : payments.length === 0 ? (
                      <div className="text-center py-8 text-[#71717A]">График платежей будет создан после подписания договора</div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-[#E8E0D7]">
                              <th className="text-left py-3 text-sm font-medium text-[#71717A]">Дата</th>
                              <th className="text-left py-3 text-sm font-medium text-[#71717A]">Сумма</th>
                              <th className="text-left py-3 text-sm font-medium text-[#71717A]">Статус</th>
                            </tr>
                          </thead>
                          <tbody>
                            {payments.map((payment) => (
                              <tr key={payment.id} className="border-b border-[#E8E0D7]">
                                <td className="py-3 text-sm">{new Date(payment.due_date).toLocaleDateString()}</td>
                                <td className="py-3 text-sm font-medium">{payment.amount} €</td>
                                <td className="py-3">
                                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(payment.status)}`}>
                                    {getStatusText(payment.status)}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </Card>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {loans.map((loan) => (
                  <Card key={loan.id} className="p-5 md:p-6 cursor-pointer hover:shadow-md transition" onClick={() => selectLoan(loan)}>
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <div>
                        <p className="text-2xl font-bold text-[#18181B]">{loan.amount.toLocaleString()} €</p>
                        <p className="text-[#71717A] text-sm mt-1">Срок: {loan.term} дней</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                          loan.status === 'active' ? 'bg-green-100 text-green-700' :
                          loan.status === 'pending_sign' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {loan.status === 'active' ? 'Активен' : loan.status === 'pending_sign' ? 'Ожидает подписания' : 'Закрыт'}
                        </span>
                        <p className="text-xs text-[#A0A0A0] mt-2">Нажмите для деталей →</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'applications' && (
          <div>
            {applications.length === 0 ? (
              <Card className="text-center py-12">
                <div className="text-5xl mb-4">📄</div>
                <h3 className="text-xl font-semibold text-[#18181B] mb-2">У вас пока нет заявок</h3>
                <p className="text-[#71717A] mb-6">Оставьте заявку на займ — это займёт всего несколько минут</p>
                <Link href="/" className="inline-block px-8 py-3 rounded-full bg-[#5F5247] text-white hover:bg-[#7B6652] transition font-medium">
                  Новая заявка
                </Link>
              </Card>
            ) : (
              <div className="space-y-4">
                {applications.map((app) => (
                  <Card key={app.id} className="p-5 md:p-6">
                    <div className="flex flex-wrap justify-between items-center gap-4">
                      <div>
                        <p className="text-2xl font-bold text-[#18181B]">{app.amount.toLocaleString()} €</p>
                        <p className="text-[#71717A] text-sm mt-1">Срок: {app.term} дней</p>
                        <p className="text-[#A0A0A0] text-xs mt-1">{new Date(app.created_at).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                          app.status === 'approved' ? 'bg-green-100 text-green-700' :
                          app.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {app.status === 'new' ? 'На рассмотрении' : app.status === 'approved' ? 'Одобрена' : 'Отклонена'}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'notifications' && (
          <div>
            {notifications.length === 0 ? (
              <Card className="text-center py-12">
                <div className="text-5xl mb-4">🔔</div>
                <h3 className="text-xl font-semibold text-[#18181B] mb-2">Нет уведомлений</h3>
                <p className="text-[#71717A]">Здесь будут появляться уведомления о статусе ваших заявок и займов</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <Card key={notif.id} className={`p-5 cursor-pointer hover:shadow-md transition ${!notif.is_read ? 'border-l-4 border-l-[#5F5247]' : ''}`} onClick={() => markNotificationRead(notif.id)}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-[#18181B]">{notif.title}</h4>
                        <p className="text-[#71717A] text-sm mt-1">{notif.message}</p>
                        <p className="text-[#A0A0A0] text-xs mt-2">{new Date(notif.created_at).toLocaleString()}</p>
                      </div>
                      {!notif.is_read && <div className="w-2 h-2 bg-[#5F5247] rounded-full"></div>}
                    </div>
                  </Card>
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
            <h3 className="text-xl font-bold text-[#18181B] mb-4">Подписание договора</h3>
            {!otpSent ? (
              <p className="text-[#71717A] mb-4">Запрос кода...</p>
            ) : (
              <>
                <p className="text-[#71717A] mb-4">Введите код из SMS</p>
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full bg-white border border-[#E8E0D7] rounded-xl p-3 text-[#18181B] text-center text-2xl font-mono mb-4"
                  placeholder="000000"
                  maxLength={6}
                />
                <button
                  onClick={verifyOtp}
                  disabled={signingLoading}
                  className="w-full px-6 py-3 rounded-full bg-[#5F5247] text-white hover:bg-[#7B6652] transition font-medium disabled:opacity-50"
                >
                  {signingLoading ? 'Проверка...' : 'Подтвердить'}
                </button>
              </>
            )}
            <button
              onClick={() => { setShowOtpModal(false); setOtpCode(''); setOtpSent(false); }}
              className="w-full mt-3 text-[#71717A] py-2 rounded-xl hover:text-[#18181B] transition"
            >
              Отмена
            </button>
          </div>
        </div>
      )}

      {/* Payment Request Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-[#18181B] mb-4">Заявка на оплату</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[#71717A] text-sm mb-1">Сумма (€)</label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full bg-white border border-[#E8E0D7] rounded-xl p-3 focus:border-[#5F5247] outline-none"
                  placeholder="Введите сумму"
                />
              </div>
              <div>
                <label className="block text-[#71717A] text-sm mb-1">Реквизиты / Reference</label>
                <input
                  type="text"
                  value={paymentReference}
                  onChange={(e) => setPaymentReference(e.target.value)}
                  className="w-full bg-white border border-[#E8E0D7] rounded-xl p-3 focus:border-[#5F5247] outline-none"
                  placeholder="Номер перевода / IBAN"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={submitPaymentRequest}
                  disabled={paymentLoading}
                  className="flex-1 px-4 py-2.5 rounded-full bg-[#5F5247] text-white hover:bg-[#7B6652] transition font-medium disabled:opacity-50"
                >
                  {paymentLoading ? 'Отправка...' : 'Отправить'}
                </button>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-full border border-[#E8E0D7] text-[#71717A] hover:bg-gray-50 transition"
                >
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
