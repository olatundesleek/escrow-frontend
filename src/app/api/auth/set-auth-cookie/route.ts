import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
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

    // const isDev = process.env.NODE_ENV === 'development';
    // console.log(process.env.NODE_ENV === 'production');

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error setting auth cookie:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to set auth cookie' },
      { status: 500 },
    );
  }
}
