import { verifyUserToken } from '@/app/_lib/auth';
import { NextResponse, type NextRequest } from 'next/server';

export async function GET(
  req: NextRequest,
): Promise<NextResponse<{ isLoggedIn: boolean; role: 'user' | 'admin' }>> {
  const token = req.cookies.get('token')?.value;
  let isLoggedIn = false;
  let role: 'user' | 'admin' = 'user';

  if (token) {
    try {
      const payload = await verifyUserToken(token);

      if (payload && (payload.role === 'user' || payload.role === 'admin')) {
        isLoggedIn = true;
        role = payload.role;
      }
    } catch (error) {
      console.error('Error:', error);
      isLoggedIn = false;
    }
  }

  return NextResponse.json({ isLoggedIn, role });
}
