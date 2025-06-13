type EscrowStatus = 'pending' | 'active' | 'completed' | 'disputed';
type PaymentStatus = 'unpaid' | 'paid' | 'pending';
type EscrowFeePayment = 'buyer' | 'counterparty';
type CreatorRole = 'buyer' | 'seller';

export interface AdminDashboardDataResponse {
  message: string;
  dashboardDetails: {
    success: boolean;
    message: string;
    data: {
      totalUsers: number;
      totalDisputes: number;
      totalEscrows: number;
      escrowStatus: {
        pending: number;
        active: number;
        completed: number;
        disputed: number;
      };
      totalTransactions: number;
      wallet: {
        totalAvailable: number;
        totalLocked: number;
        total: number;
      };
    };
  };
}

export interface EscrowItem {
  terms: string[];
  status: EscrowStatus;
  paymentStatus: PaymentStatus;
  escrowfeepayment: EscrowFeePayment;
  chatActive: boolean;
  _id: string;
  creator: null | string; // adjust if creator is later an object
  creatorRole: CreatorRole;
  counterpartyEmail: string;
  amount: number;
  category: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface EscrowDetails {
  escrows: EscrowItem[];
  totalPages: number;
  currentPage: number;
}

export interface AllEscrowsDataResponse {
  success: boolean;
  message: string;
  escrowDetails: {
    data: EscrowDetails;
  };
}

export interface EscrowResponse {
  message: string;
  escrow: EscrowItem;
}
