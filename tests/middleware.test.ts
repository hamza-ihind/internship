/**
 * Middleware Tests
 * Tests for route protection, role-based access, and redirects
 */

import { expect } from './test-utils';

console.log('🧪 Running Middleware Tests...\n');

// ============================================================================
// ROUTE MATCHING TESTS
// ============================================================================
console.log('📝 Testing Route Matching...');

type MatcherPattern = string;

const protectedRoutes: MatcherPattern[] = [
  '/admin/:path*',
  '/dashboard/:path*',
  '/settinggs/:path*',
];

function matchesProtectedRoute(pathname: string): boolean {
  // Next.js matcher with :path* matches the base path and any subpaths
  // /admin/:path* matches /admin, /admin/, /admin/users, etc.
  // But NOT /admin-panel or /admins
  const basePaths = protectedRoutes.map((pattern) => pattern.split('/:')[0]);
  return basePaths.some((basePath) => {
    // Match exact path or path with trailing slash
    return pathname === basePath || pathname.startsWith(basePath + '/');
  });
}

// Protected routes that should match
const shouldMatch = [
  '/admin',
  '/admin/users',
  '/admin/internships',
  '/admin/customers',
  '/admin/home',
  '/admin/settings/profile',
  '/dashboard',
  '/dashboard/applications',
  '/dashboard/saved',
  '/dashboard/profile',
  '/dashboard/settings',
  '/settinggs',
  '/settinggs/profile',
];

shouldMatch.forEach((path) => {
  expect(matchesProtectedRoute(path), `${path} should match protected routes`);
});

// Public routes that should NOT match
const shouldNotMatch = [
  '/',
  '/internships',
  '/internships/123',
  '/auth/login',
  '/auth/register',
  '/pricing',
  '/about',
  '/contact',
  '/api/auth/signin',
];

shouldNotMatch.forEach((path) => {
  expect(
    !matchesProtectedRoute(path),
    `${path} should NOT match protected routes`
  );
});

console.log('✅ Route matching tests passed\n');

// ============================================================================
// ADMIN ROUTE ACCESS TESTS
// ============================================================================
console.log('📝 Testing Admin Route Access...');

type MiddlewareToken = {
  role?: 'USER' | 'ADMIN';
  sub?: string;
};

type RedirectResult = {
  shouldRedirect: boolean;
  redirectUrl?: string;
};

function checkAdminAccess(
  pathname: string,
  token: MiddlewareToken | null
): RedirectResult {
  // No token = not authenticated (handled by NextAuth)
  if (!token) {
    return { shouldRedirect: false }; // NextAuth will handle
  }

  // Check admin routes
  if (pathname.startsWith('/admin')) {
    if (token.role !== 'ADMIN') {
      return { shouldRedirect: true, redirectUrl: '/' };
    }
  }

  return { shouldRedirect: false };
}

// ADMIN accessing admin routes (allowed)
{
  const adminToken: MiddlewareToken = { role: 'ADMIN', sub: '123' };
  const paths = ['/admin', '/admin/users', '/admin/internships'];

  paths.forEach((path) => {
    const result = checkAdminAccess(path, adminToken);
    expect(!result.shouldRedirect, `ADMIN should access ${path}`);
  });
}

// USER accessing admin routes (denied)
{
  const userToken: MiddlewareToken = { role: 'USER', sub: '456' };
  const paths = ['/admin', '/admin/users', '/admin/internships'];

  paths.forEach((path) => {
    const result = checkAdminAccess(path, userToken);
    expect(result.shouldRedirect, `USER should be redirected from ${path}`);
    expect(
      result.redirectUrl === '/',
      `USER should redirect to / from ${path}`
    );
  });
}

// No token accessing admin routes
{
  const paths = ['/admin', '/admin/users', '/admin/internships'];

  paths.forEach((path) => {
    const result = checkAdminAccess(path, null);
    expect(
      !result.shouldRedirect,
      `Unauthenticated user at ${path} should be handled by NextAuth`
    );
  });
}

console.log('✅ Admin route access tests passed\n');

// ============================================================================
// DASHBOARD ROUTE ACCESS TESTS
// ============================================================================
console.log('📝 Testing Dashboard Route Access...');

function checkDashboardAccess(
  pathname: string,
  token: MiddlewareToken | null
): RedirectResult {
  if (!token) {
    return { shouldRedirect: false }; // NextAuth will handle
  }

  // Check dashboard routes
  if (pathname.startsWith('/dashboard')) {
    if (token.role === 'ADMIN') {
      return { shouldRedirect: true, redirectUrl: '/admin' };
    }
  }

  return { shouldRedirect: false };
}

// USER accessing dashboard routes (allowed)
{
  const userToken: MiddlewareToken = { role: 'USER', sub: '456' };
  const paths = ['/dashboard', '/dashboard/applications', '/dashboard/saved'];

  paths.forEach((path) => {
    const result = checkDashboardAccess(path, userToken);
    expect(!result.shouldRedirect, `USER should access ${path}`);
  });
}

// ADMIN accessing dashboard routes (redirected to admin)
{
  const adminToken: MiddlewareToken = { role: 'ADMIN', sub: '123' };
  const paths = ['/dashboard', '/dashboard/applications', '/dashboard/saved'];

  paths.forEach((path) => {
    const result = checkDashboardAccess(path, adminToken);
    expect(result.shouldRedirect, `ADMIN should be redirected from ${path}`);
    expect(
      result.redirectUrl === '/admin',
      `ADMIN should redirect to /admin from ${path}`
    );
  });
}

console.log('✅ Dashboard route access tests passed\n');

// ============================================================================
// COMBINED MIDDLEWARE LOGIC TESTS
// ============================================================================
console.log('📝 Testing Combined Middleware Logic...');

function middlewareLogic(
  pathname: string,
  token: MiddlewareToken | null
): RedirectResult {
  if (!token) {
    return { shouldRedirect: false };
  }

  // Check admin routes
  if (pathname.startsWith('/admin')) {
    if (token.role !== 'ADMIN') {
      return { shouldRedirect: true, redirectUrl: '/' };
    }
  }

  // Check dashboard routes
  if (pathname.startsWith('/dashboard')) {
    if (token.role === 'ADMIN') {
      return { shouldRedirect: true, redirectUrl: '/admin' };
    }
  }

  return { shouldRedirect: false };
}

// Scenario: ADMIN tries to access USER dashboard
{
  const result = middlewareLogic('/dashboard/applications', {
    role: 'ADMIN',
    sub: '123',
  });
  expect(result.shouldRedirect, 'ADMIN accessing /dashboard should redirect');
  expect(result.redirectUrl === '/admin', 'ADMIN should redirect to /admin');
}

// Scenario: USER tries to access ADMIN panel
{
  const result = middlewareLogic('/admin/users', { role: 'USER', sub: '456' });
  expect(result.shouldRedirect, 'USER accessing /admin should redirect');
  expect(result.redirectUrl === '/', 'USER should redirect to /');
}

// Scenario: USER accesses their dashboard
{
  const result = middlewareLogic('/dashboard', { role: 'USER', sub: '456' });
  expect(
    !result.shouldRedirect,
    'USER accessing /dashboard should not redirect'
  );
}

// Scenario: ADMIN accesses admin panel
{
  const result = middlewareLogic('/admin', { role: 'ADMIN', sub: '123' });
  expect(!result.shouldRedirect, 'ADMIN accessing /admin should not redirect');
}

// Scenario: Public routes
{
  const publicPaths = ['/internships', '/', '/pricing'];
  const tokens: (MiddlewareToken | null)[] = [
    { role: 'ADMIN', sub: '123' },
    { role: 'USER', sub: '456' },
    null,
  ];

  publicPaths.forEach((path) => {
    tokens.forEach((token) => {
      const result = middlewareLogic(path, token);
      expect(
        !result.shouldRedirect,
        `Public path ${path} should be accessible`
      );
    });
  });
}

console.log('✅ Combined middleware logic tests passed\n');

// ============================================================================
// AUTHENTICATION STATE TESTS
// ============================================================================
console.log('📝 Testing Authentication States...');

type AuthState =
  | { authenticated: false }
  | { authenticated: true; role: 'USER' | 'ADMIN' };

function getAuthState(token: MiddlewareToken | null): AuthState {
  if (!token || !token.role) {
    return { authenticated: false };
  }
  return { authenticated: true, role: token.role };
}

// Authenticated users
{
  const adminState = getAuthState({ role: 'ADMIN', sub: '123' });
  expect(
    adminState.authenticated,
    'ADMIN token should result in authenticated state'
  );
  if (adminState.authenticated) {
    expect(adminState.role === 'ADMIN', 'Should have ADMIN role');
  }

  const userState = getAuthState({ role: 'USER', sub: '456' });
  expect(
    userState.authenticated,
    'USER token should result in authenticated state'
  );
  if (userState.authenticated) {
    expect(userState.role === 'USER', 'Should have USER role');
  }
}

// Unauthenticated users
{
  const noTokenState = getAuthState(null);
  expect(
    !noTokenState.authenticated,
    'Null token should result in unauthenticated state'
  );

  const emptyTokenState = getAuthState({});
  expect(
    !emptyTokenState.authenticated,
    'Empty token should result in unauthenticated state'
  );
}

console.log('✅ Authentication state tests passed\n');

// ============================================================================
// ROUTE PROTECTION EDGE CASES
// ============================================================================
console.log('📝 Testing Route Protection Edge Cases...');

// Nested admin routes
{
  const nestedPaths = [
    '/admin/users/edit/123',
    '/admin/internships/create',
    '/admin/settings/security/two-factor',
  ];

  const userToken: MiddlewareToken = { role: 'USER', sub: '456' };
  const adminToken: MiddlewareToken = { role: 'ADMIN', sub: '123' };

  nestedPaths.forEach((path) => {
    const userResult = middlewareLogic(path, userToken);
    expect(
      userResult.shouldRedirect,
      `USER should be blocked from nested path ${path}`
    );

    const adminResult = middlewareLogic(path, adminToken);
    expect(
      !adminResult.shouldRedirect,
      `ADMIN should access nested path ${path}`
    );
  });
}

// Similar-named routes
{
  // /admin vs /admin-panel, /dashboard vs /dashboard-old
  const adminToken: MiddlewareToken = { role: 'ADMIN', sub: '123' };

  // These should NOT be protected (don't start with /admin or /dashboard)
  const notProtected = [
    '/admin-panel',
    '/dashboard-old',
    '/admins',
    '/dashboards',
  ];

  notProtected.forEach((path) => {
    expect(!matchesProtectedRoute(path), `${path} should not be protected`);
  });
}

// Case sensitivity
{
  const paths = ['/ADMIN', '/Admin', '/aDmIn', '/DASHBOARD', '/Dashboard'];

  // Note: URLs are case-sensitive in most systems
  // These should NOT match our lowercase patterns
  paths.forEach((path) => {
    const matches = matchesProtectedRoute(path);
    // In real implementation, consider if you want case-insensitive matching
    expect(!matches, `${path} should not match (case-sensitive)`);
  });
}

console.log('✅ Route protection edge cases passed\n');

// ============================================================================
// REDIRECT URL CONSTRUCTION TESTS
// ============================================================================
console.log('📝 Testing Redirect URL Construction...');

function constructRedirectUrl(baseUrl: string, redirectPath: string): string {
  try {
    const url = new URL(redirectPath, baseUrl);
    return url.toString();
  } catch {
    return baseUrl + redirectPath;
  }
}

// Valid redirect URLs
{
  const baseUrl = 'https://example.com';

  const result1 = constructRedirectUrl(baseUrl, '/admin');
  expect(result1.includes('/admin'), 'Should construct /admin URL');

  const result2 = constructRedirectUrl(baseUrl, '/');
  expect(
    result2.endsWith('/') || result2.endsWith('example.com'),
    'Should construct / URL'
  );
}

console.log('✅ Redirect URL construction tests passed\n');

console.log('✨ All Middleware Tests Passed!\n');
