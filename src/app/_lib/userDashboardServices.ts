import {
  UserDashboardDataResponse,
  AllUserEscrowsDataResponse,
  UserEscrowDetailResponse,
} from '../_types/userDashboardServicesTypes';

export async function getUserDashboardData(): Promise<UserDashboardDataResponse> {
  const dashboardUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard`;
  try {
    const res = await fetch(dashboardUrl, {
      credentials: 'include',
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData);
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
      const errorData = await res.json();
      throw new Error(errorData);
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
      const errorData = await res.json();
      throw new Error(errorData);
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
