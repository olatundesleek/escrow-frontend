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
  status: 'pending' | 'active' | 'completed' | 'disputed';
  paymentStatus: 'unpaid' | 'paid';
  escrowfeepayment: 'buyer' | 'counterparty';
  chatActive: boolean;
  _id: string;
  creator: null | string; // adjust if creator is later an object
  creatorRole: 'buyer' | 'seller';
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
