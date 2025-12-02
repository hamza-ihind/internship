import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(function middleware(req) {
  const token = req.nextauth.token;
  const { pathname } = req.nextUrl;

  // Allow access to onboarding page always
  if (pathname === '/onboarding') {
    return NextResponse.next();
  }

  // Check if user hasn't completed onboarding and is trying to access protected routes
  if (token && !(token as any).onboardingCompleted) {
    // Allow access to auth pages and onboarding
    if (
      !pathname.startsWith('/auth') &&
      !pathname.startsWith('/api/onboarding')
    ) {
      // Redirect to onboarding for protected routes
      if (
        pathname.startsWith('/dashboard') ||
        pathname.startsWith('/admin') ||
        pathname.startsWith('/settinggs')
      ) {
        return NextResponse.redirect(new URL('/onboarding', req.url));
      }
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
