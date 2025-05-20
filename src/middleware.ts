import { NextResponse, type NextRequest } from 'next/server';
import { verifyUserToken } from './app/_lib/auth';

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { pathname, search } = req.nextUrl;
  let redirectUrl;

  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      redirectUrl = new URL('/login', req.url);
      redirectUrl.searchParams.set('redirect', pathname + search);
      return NextResponse.redirect(redirectUrl);
    }

    const payload = await verifyUserToken(token);
    console.log('middleware line 17:', payload);
    if (!payload) {
      redirectUrl = new URL('/login', req.url);
      redirectUrl.searchParams.set('redirect', pathname + search);
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (pathname === '/login' && token) {
    const payload = await verifyUserToken(token);
    if (payload) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};

