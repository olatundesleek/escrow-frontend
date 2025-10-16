type UserEscrowStatus =
  | 'pending'
  | 'active'
  | 'rejected'
  | 'disputed'
  | 'completed';
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
    totalPages: number;
    currentPage: number;
    pageSize: number;
  };
}

export interface UserEscrowDetailResponse {
  message: string;
  escrow: UserEscrowItem;
}

export interface UserBankInfo {
  accountName: string | null;
  accountNumber: string | null;
  bankCode: string | null;
  bankName: string | null;
  recipientCode: string | null;
}

export interface UserBaseWallet {
  totalBalance: number;
  lockedBalance: number;
  availableBalance: number;
  currency: string;
  _id: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  bankInfo: UserBankInfo;
}

/* */

export interface UserDashboardData {
  kyc: {
    status: 'verified' | 'unverified';
  };
  isVerified: boolean;
  status: 'active' | 'inactive';
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  createdAt: string;
  wallet: UserBaseWallet;
  phone: string;
  profilePicture: string;
  subRole: string;
}

export interface UserDashboardDataResponse {
  message: string;
  dashboardDetails: {
    success: boolean;
    data: {
      userDashboardData: UserDashboardData;
      userDisputes: UserEscrowItem[];
      userEscrows: UserEscrowItem[];
      userTransactions: UserTransactionItem[];
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
  state: string;
  postalCode: string;
}

export type Address = {
  city: string;
  country: string;
  postalCode: string;
  state: string;
  street: string;
  streetAddress: string;
  _id: string;
};

export type KYC = {
  status: 'unverified' | 'pending' | 'verified';
};

export type User = {
  _id: string;
  email: string;
  firstname: string;
  lastname: string;
  username: string;
  phone: string;
  profilePicture: string;
  role: 'admin' | 'user' | 'moderator';
  subRole?: string; // optional since not all roles may have it
  isVerified: boolean;
  kyc: KYC;
  address: Address;
};

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

// Wallet types
export interface getWalletResponse {
  statusCode: number;
  success: boolean;
  message: string;
  walletDetails: UserBaseWallet;
}

export interface Bank {
  id: number;
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: string;
  pay_with_bank: boolean;
  supports_transfer: boolean;
  available_for_direct_debit: boolean;
  active: boolean;
  country: string;
  currency: string;
  type: string;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface getAllBanksListResponse {
  status: boolean;
  message: string;
  data: Bank[];
}

export interface resolveUserBankResponse {
  statusCode: number;
  success: boolean;
  message: string;
  accountInfo: {
    accountInfo: {
      account_number: string;
      account_name: string;
      bank_id: number;
    };
  };
}
