import { verifyUserToken } from '@/app/_lib/auth';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
): Promise<NextResponse<{ isLoggedIn: boolean }>> {
  const token = req.cookies.get('token')?.value;
  let isLoggedIn = false;

  if (token) {
    try {
      const payload = await verifyUserToken(token);

      if (payload && (payload.role === 'user' || payload.role === 'admin')) {
        isLoggedIn = true;
      }
    } catch (error) {
      console.error('Error:', error);
      isLoggedIn = false;
    }
  }

  return NextResponse.json({ isLoggedIn });
}
