type UserEscrowStatus = 'pending' | 'active' | 'rejected' | 'disputed';
type UserPaymentStatus = 'unpaid' | 'paid' | 'pending';
type UserEscrowFeePayment = 'buyer' | 'counterparty';
type UserCreatorRole = 'buyer' | 'seller';

export interface UserEscrowItem {
  terms: string[];
  status: UserEscrowStatus;
  paymentStatus: UserPaymentStatus;
  escrowfeepayment: UserEscrowFeePayment;
  chatActive: boolean;
  _id: string;
  creator: string;
  creatorRole: UserCreatorRole;
  counterpartyEmail: string;
  amount: number;
  category: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AllUserEscrowsDataResponse {
  success: boolean;
  message: string;
  escrows: {
    total: number;
    page: number;
    limit: number;
    data: UserEscrowItem[];
  };
}

export interface UserEscrowDetailResponse {
  message: string;
  escrow: UserEscrowItem;
}

export interface UserDashboardDataResponse {
  message: string;
  dashboardDetails: {
    success: boolean;
    data: {
      kyc: {
        status: 'verified' | 'unverified';
      };
      isVerified: boolean;
      status: 'active' | 'inactive';
      escrows: UserEscrowItem[];
      disputes: [];
      transactions: [];
      _id: string;
      firstname: string;
      lastname: string;
      username: string;
      email: string;
      createdAt: string;
      wallet: {
        balance: number;
        locked: number;
        currency: string;
        _id: string;
        user: string;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
}

export interface AcceptEscrowResponse {
  message: string;
  escrow: UserEscrowItem;
}

export interface RejectEscrowResponse {
  success: boolean;
  message: string;
}

export interface ApiError {
  message: string;
}

export interface CreateEscrowFormInputs {
  creatorRole: '' | 'buyer' | 'seller';
  counterpartyEmail: string;
  amount: number;
  category: string;
  escrowFeePayment: '' | 'buyer' | 'seller' | 'split';
  description: string;
  terms: string[];
}

export interface CreateEscrowResponse {
  message: string;
  escrow: UserEscrowItem;
}

export interface PayEscrowBillResponse {
  success: boolean;
  message: string;
  paymentDetails: {
    status: true;
    message: 'Authorization URL created';
    data: {
      authorization_url: string;
      access_code: string;
      reference: string;
    };
  };
}

