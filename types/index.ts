export type User = {
  id: number;
  phone: string;
  name: string;
  email?: string;
  createdAt: string;
};

export type Application = {
  id: number;
  userId: number;
  amount: number;
  term: number;
  status: 'new' | 'processing' | 'approved' | 'rejected';
  type: 'personal' | 'business';
  companyName?: string;
  createdAt: string;
};

export type Loan = {
  id: number;
  applicationId: number;
  userId: number;
  amount: number;
  term: number;
  dailyRate: number;
  paymentAmount: number;
  totalAmount: number;
  status: 'pending_sign' | 'active' | 'completed' | 'defaulted';
  signedAt?: string;
  signedIp?: string;
  signedUserAgent?: string;
  createdAt: string;
};

export type Payment = {
  id: number;
  loanId: number;
  dueDate: string;
  amount: number;
  paidAmount: number;
  status: 'pending' | 'paid' | 'overdue';
  paidAt?: string;
};

export type Notification = {
  id: number;
  userId: number;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};
