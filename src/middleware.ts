import { NextResponse, type NextRequest } from "next/server";
import { verifyUserToken } from './app/_lib/auth';

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const emailToken = req.nextUrl.searchParams.get('token');
  const { pathname, search } = req.nextUrl;

  let payload = null;
  let redirectUrl;

  if (token) {
    try {
      payload = await verifyUserToken(token);
    } catch (err) {
      console.warn(err);
      payload = null;
    }
  }

  if (pathname.startsWith('/verify-email') && !emailToken) {
    redirectUrl = new URL('/register', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  //Accessing admin routes
  if (
    pathname.startsWith('/admin') &&
    !payload &&
    !pathname.startsWith('/admin/login')
  ) {
    redirectUrl = new URL('/admin/login', req.url);
    redirectUrl.searchParams.set('redirect', pathname + search);
    return NextResponse.redirect(redirectUrl);
  }

  if (
    pathname.startsWith('/admin') &&
    payload &&
    !pathname.startsWith('/admin/login')
  ) {
    if (payload.role === 'user') {
      redirectUrl = new URL('/login', req.url);
      redirectUrl.searchParams.set('redirect', pathname + search);
      return NextResponse.redirect(redirectUrl);
    }

    console.log('middleware running:', payload);

    if (payload.role === 'admin') return NextResponse.next();
  }

  //Accessing users dashboard
  if (pathname.startsWith('/dashboard') && !payload) {
    redirectUrl = new URL('/login', req.url);
    redirectUrl.searchParams.set('redirect', pathname + search);
    return NextResponse.redirect(redirectUrl);
  }

  //Accessing login while logged in
  if (pathname === '/login' && payload) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  const res = NextResponse.next();
  res.headers.set('x-user-authenticated', (!!payload).toString());
  return res;
}

export const config = {
  matcher: [
    '/',
    '/dashboard/:path*',
    '/admin/:path*',
    '/login',
    '/verify-email',
    '/((?!_next|favicon.ico).*)',
  ],
};
