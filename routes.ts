/**
 * An array of routes that are accessible to the public
 * these routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  '/',
  '/api/auth/providers',
  '/astuces',
  '/new-verification',
  '/api/uploadthing',
  '/api/webhook',
  '/settinggs',
  '/blogs',
];

/**
 * An array of routes that are used for authentication
 * these routes will redirect logged in users to /settings
 * @type {string[]}
 */

export const authRoutes = [
  '/sign-in',
  '/sign-up',
  '/error',
  '/reset',
  '/new-password',
];

/**
 * The Prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * Role-based routes that require specific user roles
 * @type {Object}
 */
export const roleBasedRoutes = {
  student: ['/student'],
  teacher: ['/teacher'],
  admin: ['/admin'],
};

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/';
