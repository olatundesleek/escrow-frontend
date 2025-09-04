type UserEscrowStatus = 'pending' | 'active' | 'rejected' | 'disputed';
type UserPaymentStatus = 'unpaid' | 'paid' | 'pending';
type UserEscrowFeePayment = 'buyer' | 'seller' | 'split';
type UserCreatorRole = 'buyer' | 'seller';
type DisputeStatus = 'pending' | 'resolved';

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
  sellerUsername?: string;
  buyerUsername?: string;
  __v: number;
}

export interface AllUserEscrowsDataResponse {
  success: boolean;
  message: string;
  escrows: UserEscrowItem[];
  pagination: {
    total: number;
    totalPage: number;
    currentPage: number;
    pageSize: number;
  };
}

export interface UserEscrowDetailResponse {
  message: string;
  escrow: UserEscrowItem;
}

export interface BaseWallet {
  totalBalance: number;
  lockedBalance: number;
  availableBalance: number;
  currency: string;
  _id: string;
  user: string;
  createdAt: string;
  updatedAt: string;
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
      wallet: BaseWallet;
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

export interface BaseTransaction {
  status: string;
  _id: string;
  user: string;
  wallet: string;
  direction: 'debit' | 'credit';
  type: 'escrow_payment' | 'wallet_deposit' | 'withdrawal';
  from: string;
  reference: string;
  amount: number;
  gateway: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserTransactionItem extends BaseTransaction {
  escrow: string;
  role: 'buyer' | 'seller';
  to: string;
}

export interface AllTransactionsResponse {
  success: boolean;
  data: UserTransactionItem[];
}

export interface DepositResponse {
  statusCode: number;
  success: boolean;
  message: string;
  addFundsResponse: {
    transaction: BaseTransaction;
    payment: {
      status: boolean;
      message: string;
      data: {
        authorization_url: string;
        access_code: string;
        reference: string;
      };
    };
  };
}

export interface initialUserType {
  username: string;
  email: string;
  phone: string;
  role: string;
  joined: string;
  avatar: string;
  streetAddress: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export interface completeTradeResponse {
  success: boolean;
  message: string;
  escrow: UserEscrowItem;
}

export interface DisputeResponse {
  success: boolean;
  message: string;
  dispute: {
    id: string;
    status: DisputeStatus;
  };
}

export interface getWalletResponse {
  statusCode: number;
  success: boolean;
  message: string;
  walletDetails: BaseWallet;
}
