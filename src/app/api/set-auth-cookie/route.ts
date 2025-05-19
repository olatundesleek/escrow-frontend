import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  if (!token)
    return NextResponse.json(
      { success: false, message: 'No token provided' },
      { status: 400 },
    );

  const response = NextResponse.json({
    success: true,
    message: 'Login successful',
  });

  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  });

  return response;
}
