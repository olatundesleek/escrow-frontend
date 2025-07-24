import {
  AllTransactionsResponse,
  CreateEscrowResponse,
  DepositResponse,
  PayEscrowBillResponse,
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

export async function getUserAllEscrows(): Promise<AllUserEscrowsDataResponse> {
  const allEscrowsUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/escrow`;

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