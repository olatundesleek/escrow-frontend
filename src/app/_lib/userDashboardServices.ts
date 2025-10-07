import {
  AllTransactionsResponse,
  completeTradeResponse,
  CreateEscrowResponse,
  DepositResponse,
  DisputeResponse,
  getAllBanksListResponse,
  getWalletResponse,
  PayEscrowBillResponse,
  resolveUserBankResponse,
} from './../_types/userDashboardServicesTypes';

import {
  UserDashboardDataResponse,
  AllUserEscrowsDataResponse,
  UserEscrowDetailResponse,
  RejectEscrowResponse,
  AcceptEscrowResponse,
  ApiError,
  CreateEscrowFormInputs,
} from '../_types/userDashboardServicesTypes';

export async function getUserDashboardData(): Promise<UserDashboardDataResponse> {
  const dashboardUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard`;
  try {
    const res = await fetch(dashboardUrl, {
      credentials: 'include',
    });

    if (!res.ok) {
      const errorData: ApiError = await res.json();
      throw new Error(errorData.message);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Unknown error occurred',
    );
  }
}

export async function getUserAllEscrows(
  query?: Record<string, string | number>,
): Promise<AllUserEscrowsDataResponse> {
  const params = query
    ? `?${new URLSearchParams(query as Record<string, string>).toString()}`
    : '';

  const allEscrowsUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/escrows${params}`;

  try {
    const res = await fetch(allEscrowsUrl, {
      credentials: 'include',
    });

    if (!res.ok) {
      const errorData: ApiError = await res.json();
      throw new Error(errorData.message);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Something went wrong!',
    );
  }
}

export async function getUserEscrowDetails(
  id: string,
): Promise<UserEscrowDetailResponse> {
  const escrowDetailUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/escrow/${id}`;

  try {
    const res = await fetch(escrowDetailUrl, { credentials: 'include' });

    if (!res.ok) {
      const errorData: ApiError = await res.json();
      throw new Error(errorData.message);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Something went wrong',
    );
  }
}

export async function acceptEscrowApi({
  escrowId,
}: {
  escrowId: string;
}): Promise<AcceptEscrowResponse> {
  const acceptEscrowUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/acceptescrow`;

  try {
    const res = await fetch(acceptEscrowUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ escrowId }),
      credentials: 'include',
    });

    if (!res.ok) {
      const errorData: ApiError = await res.json();
      throw new Error(errorData.message);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Something went wrong',
    );
  }
}

export async function rejectEscrowApi({
  escrowId,
}: {
  escrowId: string;
}): Promise<RejectEscrowResponse> {
  const rejectEscrowUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/rejectescrow`;

  try {
    const res = await fetch(rejectEscrowUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ escrowId }),
      credentials: 'include',
    });

    if (!res.ok) {
      const errorData: ApiError = await res.json();
      throw new Error(errorData.message);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Something went wrong',
    );
  }
}

export async function createEscrowApi(
  data: CreateEscrowFormInputs,
): Promise<CreateEscrowResponse> {
  const createEscrowUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/escrow`;

  const {
    creatorRole,
    counterpartyEmail,
    amount,
    category,
    escrowFeePayment: escrowfeepayment,
    description,
    terms,
  } = data;

  try {
    const res = await fetch(createEscrowUrl, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        creatorRole,
        counterpartyEmail,
        amount,
        category,
        escrowfeepayment,
        description,
        terms,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Something went wrong!',
    );
  }
}

export async function payEscrowBillApi(payload: {
  escrowId: string;
  method: 'wallet' | 'gateway';
}): Promise<PayEscrowBillResponse> {
  const payEscrowBillUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/pay`;

  const { escrowId, method: userMethod } = payload;

  const method = userMethod === 'wallet' ? 'wallet' : 'paymentgateway';

  try {
    const res = await fetch(payEscrowBillUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ escrowId, method }),
      credentials: 'include',
    });

    if (!res.ok) {
      const errorData: ApiError = await res.json();
      throw new Error(errorData.message);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error('Error:', error);

    throw new Error(
      error instanceof Error ? error.message : 'Something went wrong',
    );
  }
}

export async function getUserTransactions(
  query?: Record<string, string | number>,
): Promise<AllTransactionsResponse> {
  const params = query
    ? `?${new URLSearchParams(query as Record<string, string>).toString()}`
    : '';

  const allTransactionsUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/transactions${params}`;

  try {
    const res = await fetch(allTransactionsUrl, {
      credentials: 'include',
    });

    if (!res.ok) {
      const errorData: ApiError = await res.json();
      throw new Error(errorData.message);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error('Error:', error);

    throw new Error(
      error instanceof Error ? error.message : 'Something went wrong',
    );
  }
}

export async function depositApi(payload: {
  amount: number;
}): Promise<DepositResponse> {
  const depositUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/wallet/add-funds`;

  try {
    const res = await fetch(depositUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      credentials: 'include',
    });

    if (!res.ok) {
      const errorData: ApiError = await res.json();
      throw new Error(errorData.message);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Something went wrong',
    );
  }
}

export async function completeTradeApi(): Promise<completeTradeResponse> {
  const completeTradeUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/escrow/complete`;

  try {
    const res = await fetch(completeTradeUrl, {
      credentials: 'include',
    });

    if (!res.ok) {
      const errorData: ApiError = await res.json();
      throw new Error(errorData.message);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Something went wrong',
    );
  }
}

export async function createDisputeApi(payload: {
  escrowId: string;
  reason: string;
}): Promise<DisputeResponse> {
  const createDisputeUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/dispute-create`;

  try {
    const res = await fetch(createDisputeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      credentials: 'include',
    });

    if (!res.ok) {
      const errorData: ApiError = await res.json();
      throw new Error(errorData.message);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Something went wrong',
    );
  }
}

export async function getWallet(): Promise<getWalletResponse> {
  const getWalletUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/wallet`;

  try {
    const res = await fetch(getWalletUrl, {
      credentials: 'include',
    });

    if (!res.ok) {
      const errorData: ApiError = await res.json();
      throw new Error(errorData.message);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error('Error:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Something went wrong',
    );
  }
}

export async function getAllBanksList(): Promise<getAllBanksListResponse> {
  const getAllBanksListUrl = `https://api.paystack.co/bank?currency=NGN`;

  try {
    const res = await fetch(getAllBanksListUrl);

    if (!res.ok) throw new Error('Failed to fetch bankss');

    const data = await res.json();

    return data;
  } catch (error) {
    console.error('Error:', error);

    throw new Error(
      error instanceof Error ? error.message : 'Something went wrong',
    );
  }
}

export async function resolveUserBank(payload: {
  bankCode: string;
  accountNumber: string;
}): Promise<resolveUserBankResponse> {
  const resolveUserBankUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/wallet/resolve-bank`;

  try {
    const res = await fetch(resolveUserBankUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      credentials: 'include',
    });

    if (!res.ok) {
      const errorData: ApiError = await res.json();
      throw new Error(errorData.message);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error('Error:', error);

    throw new Error(
      error instanceof Error ? error.message : 'Something went wrong',
    );
  }
}

export async function addUserBank(payload: {
  bankCode: string;
  accountNumber: string;
}) {
  const resolveUserBankUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/wallet/add-bank`;

  try {
    const res = await fetch(resolveUserBankUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      credentials: 'include',
    });

    if (!res.ok) {
      const errorData: ApiError = await res.json();
      throw new Error(errorData.message);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error('Error:', error);

    throw new Error(
      error instanceof Error ? error.message : 'Something went wrong',
    );
  }
}