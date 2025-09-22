type EscrowStatus = "pending" | "active" | "completed" | "disputed";
type PaymentStatus = "unpaid" | "paid" | "pending";
type EscrowFeePayment = "buyer" | "counterparty";
type CreatorRole = "buyer" | "seller";

export interface AdminEscrowCreator {
  kyc: {
    status: "verified" | "unverified";
  };
  isVerified: boolean;
  status: "active" | "inactive";
  escrows: string[];
  disputes: [];
  transactions: [];
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  createdAt: string;
  _v: string;
  wallet: string;
}

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

export interface AdminEscrowItem {
  terms: string[];
  status: EscrowStatus;
  paymentStatus: PaymentStatus;
  escrowfeepayment: EscrowFeePayment;
  chatActive: boolean;
  _id: string;
  creator: AdminEscrowCreator;
  creatorRole: CreatorRole;
  creatorEmail: string;
  counterpartyEmail: string;
  amount: number;
  category: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface AdminEscrowDetailResponse {
  message: string;
  escrow: AdminEscrowItem;
}

export interface AdminEscrowDetails {
  escrows: AdminEscrowItem[];
  totalPages: number;
  currentPage: number;
}

export interface AllEscrowsDataResponse {
  success: boolean;
  message: string;
  escrowDetails: {
    data: AdminEscrowDetails;
  };
}

export interface FormValues {
  city: string;
  streetAddress: string;
  country: string;
  phone: string;
  postalCode: string;
  currentPassword: string;
  profilePicture?: string;
  password: string;
  confirmPassword: string;
  state: string;
}
