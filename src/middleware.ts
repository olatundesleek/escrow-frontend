import { NextResponse, type NextRequest } from 'next/server';
import { verifyUserToken } from './app/_lib/auth';

export default async function middleware(req: NextRequest) {
  console.log('middleware:', 'running from document');
  const token = req.cookies.get('token')?.value;
  const emailToken = req.nextUrl.searchParams.get('token');
  const { pathname, search } = req.nextUrl;

  let payload = null;
  let redirectUrl;

  // if (pathname.startsWith("/resetpassword")) {
  //   if (!emailToken) {
  //     redirectUrl = new URL("/forgottenpassword", req.url);
  //     return NextResponse.redirect(redirectUrl);
  //   }
  // }
  //Validating user token
  // If the token is not present, payload will remain null
  // If the token is present, it will be verified and payload will contain user data
  // If the token is invalid, payload will be set to null
  // If the token is expired, payload will be set to null
  // If the token is valid, payload will contain user data
  if (token) {
    try {
      payload = await verifyUserToken(token);
    } catch (err) {
      console.warn(err);
      payload = null;
    }
  }

  //Accessing Verify Email page
  // If the user is trying to access the verify email page without a token, redirect to register page
  if (pathname.startsWith('/verify-email') && !emailToken) {
    redirectUrl = new URL('/register', req.url);
    return NextResponse.redirect(redirectUrl);
  }

  //Accessing admin routes
  // If the user is trying to access admin routes without a valid token, redirect to admin login page
  if (
    pathname.startsWith('/admin') &&
    !payload &&
    !pathname.startsWith('/admin/login')
  ) {
    redirectUrl = new URL('/admin/login', req.url);
    redirectUrl.searchParams.set('redirect', pathname + search);
    return NextResponse.redirect(redirectUrl);
  }

  //Accessing admin routes with valid token
  // If the user is trying to access admin routes with a valid token, check if the user is an admin
  // If the user is an admin, allow access
  // If the user is not an admin, redirect to login page
  if (pathname.startsWith('/admin') && payload) {
    if (payload.role === 'user') {
      redirectUrl = new URL('/login', req.url);
      redirectUrl.searchParams.set('redirect', pathname + search);
      return NextResponse.redirect(redirectUrl);
    }

    if (payload.role === 'admin') return NextResponse.next();
  }

  //Accessing users dashboard
  if (pathname.startsWith('/dashboard') && !payload) {
    redirectUrl = new URL('/login', req.url);
    redirectUrl.searchParams.set('redirect', pathname + search);
    return NextResponse.redirect(redirectUrl);
  }

  if (pathname.startsWith('/dashboard') && payload) {
    console.log('middleware:', 'logging:in');
    return NextResponse.next();
  }

  //Accessing login while logged in
  if (pathname === '/login' && payload) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  console.log('payload from middleware:', payload);
  console.log('payload role from middleware:', payload?.role);
  const res = NextResponse.next();
  res.headers.set('x-user-authenticated', (!!payload).toString());
  res.headers.set(
    'x-user-role',
    payload?.role ? String(payload?.role) : 'user',
  );
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
