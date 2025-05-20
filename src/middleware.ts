import { NextResponse, type NextRequest } from 'next/server';


export default async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  console.log('Token:', token);

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};


/*

export default async function middleware(req: NextRequest) {
  const isUserAuthenticated = await isExportAuthenticated();
  console.log('Is user authenticated:', isUserAuthenticated);

  if (!isUserAuthenticated) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};
*/
/*import { NextResponse, type NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  console.log('Token:', token);
  const allCookies = request.cookies.getAll();
  console.log('All Cookies:', allCookies);

  if (!token) return NextResponse.redirect(new URL('/login', request.url));

  NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};

 */
