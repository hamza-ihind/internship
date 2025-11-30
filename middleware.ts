import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(function middleware(req) {
  const token = req.nextauth.token;
  const { pathname } = req.nextUrl;

  // Check if user is trying to access admin routes
  if (pathname.startsWith('/admin')) {
    // If not admin, redirect to home
    if (token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Check if user is trying to access user dashboard
  if (pathname.startsWith('/dashboard')) {
    // If admin, redirect to admin dashboard
    if (token?.role === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/settinggs/:path*'],
};
