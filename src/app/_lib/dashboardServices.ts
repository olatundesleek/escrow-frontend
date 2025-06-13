import { EscrowResponse } from './../_types/dashboardServicesTypes';
import {
  AdminDashboardDataResponse,
  AllEscrowsDataResponse,
} from '../_types/dashboardServicesTypes';

export async function getAdminDashboardData(): Promise<AdminDashboardDataResponse> {
  const dashboardUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/dashboard`;
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

export async function getAdminAllEscrows(): Promise<AllEscrowsDataResponse> {
  const allEscrowsUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/escrows`;

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

export async function getEscrowDetails(id: string): Promise<EscrowResponse> {
  const escrowDetailUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/escrow/${id}`;
  console.log(escrowDetailUrl);

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
