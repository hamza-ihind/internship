/**
 * Authentication Tests
 * Tests for auth schemas, password validation, and login/register flows
 */

import {
  loginSchema,
  registerSchema,
  PasswordSchema,
  ResetSchema,
  NewPasswordSchema,
} from '../schemas/auth';

function expect(condition: boolean, message: string) {
  if (!condition) throw new Error(`❌ ${message}`);
}

console.log('🧪 Running Authentication Tests...\n');

// ============================================================================
// LOGIN SCHEMA TESTS
// ============================================================================
console.log('📝 Testing loginSchema...');

// Valid login
{
  const result = loginSchema.safeParse({
    email: 'user@example.com',
    password: 'password123',
  });
  expect(
    result.success === true,
    'loginSchema should accept valid email and password'
  );
}

// Invalid email format
{
  const result = loginSchema.safeParse({
    email: 'invalid-email',
    password: 'password123',
  });
  expect(
    result.success === false,
    'loginSchema should reject invalid email format'
  );
}

// Missing password
{
  const result = loginSchema.safeParse({
    email: 'user@example.com',
  });
  expect(
    result.success === false,
    'loginSchema should reject missing password'
  );
}

// With optional 2FA code
{
  const result = loginSchema.safeParse({
    email: 'user@example.com',
    password: 'password123',
    code: '123456',
  });
  expect(
    result.success === true,
    'loginSchema should accept optional 2FA code'
  );
}

console.log('✅ loginSchema tests passed\n');

// ============================================================================
// REGISTER SCHEMA TESTS
// ============================================================================
console.log('📝 Testing registerSchema...');

// Valid registration
{
  const result = registerSchema.safeParse({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'SecurePass123',
  });
  expect(
    result.success === true,
    'registerSchema should accept valid registration data'
  );
}

// Name too short
{
  const result = registerSchema.safeParse({
    name: 'Jo',
    email: 'john@example.com',
    password: 'SecurePass123',
  });
  expect(
    result.success === false,
    'registerSchema should reject name shorter than 3 characters'
  );
}

// Password too short
{
  const result = registerSchema.safeParse({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'short',
  });
  expect(
    result.success === false,
    'registerSchema should reject password shorter than 8 characters'
  );
}

// Password too long
{
  const result = registerSchema.safeParse({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'ThisPasswordIsWayTooLongAndExceedsTwentyCharacters',
  });
  expect(
    result.success === false,
    'registerSchema should reject password longer than 20 characters'
  );
}

// Invalid email
{
  const result = registerSchema.safeParse({
    name: 'John Doe',
    email: 'not-an-email',
    password: 'SecurePass123',
  });
  expect(
    result.success === false,
    'registerSchema should reject invalid email format'
  );
}

// Edge case: exactly 8 characters password
{
  const result = registerSchema.safeParse({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'Pass1234',
  });
  expect(
    result.success === true,
    'registerSchema should accept exactly 8 character password'
  );
}

// Edge case: exactly 20 characters password
{
  const result = registerSchema.safeParse({
    name: 'John Doe',
    email: 'john@example.com',
    password: '12345678901234567890',
  });
  expect(
    result.success === true,
    'registerSchema should accept exactly 20 character password'
  );
}

console.log('✅ registerSchema tests passed\n');

// ============================================================================
// PASSWORD CHANGE SCHEMA TESTS
// ============================================================================
console.log('📝 Testing PasswordSchema...');

// Valid password change
{
  const result = PasswordSchema.safeParse({
    currentPassword: 'OldPassword123',
    newPassword: 'NewPassword456',
    confirmPassword: 'NewPassword456',
  });
  expect(
    result.success === true,
    'PasswordSchema should accept matching new and confirm passwords'
  );
}

// Mismatched passwords
{
  const result = PasswordSchema.safeParse({
    currentPassword: 'OldPassword123',
    newPassword: 'NewPassword456',
    confirmPassword: 'DifferentPassword789',
  });
  expect(
    result.success === false,
    'PasswordSchema should reject mismatched passwords'
  );
}

// Current password too short
{
  const result = PasswordSchema.safeParse({
    currentPassword: 'short',
    newPassword: 'NewPassword456',
    confirmPassword: 'NewPassword456',
  });
  expect(
    result.success === false,
    'PasswordSchema should reject current password shorter than 6 characters'
  );
}

// New password too short
{
  const result = PasswordSchema.safeParse({
    currentPassword: 'OldPassword123',
    newPassword: 'short',
    confirmPassword: 'short',
  });
  expect(
    result.success === false,
    'PasswordSchema should reject new password shorter than 6 characters'
  );
}

// Missing confirmPassword
{
  const result = PasswordSchema.safeParse({
    currentPassword: 'OldPassword123',
    newPassword: 'NewPassword456',
  });
  expect(
    result.success === false,
    'PasswordSchema should reject missing confirmPassword'
  );
}

console.log('✅ PasswordSchema tests passed\n');

// ============================================================================
// RESET PASSWORD SCHEMA TESTS
// ============================================================================
console.log('📝 Testing ResetSchema...');

// Valid reset request
{
  const result = ResetSchema.safeParse({
    email: 'user@example.com',
  });
  expect(result.success === true, 'ResetSchema should accept valid email');
}

// Invalid email
{
  const result = ResetSchema.safeParse({
    email: 'invalid-email',
  });
  expect(
    result.success === false,
    'ResetSchema should reject invalid email format'
  );
}

// Missing email
{
  const result = ResetSchema.safeParse({});
  expect(result.success === false, 'ResetSchema should reject missing email');
}

console.log('✅ ResetSchema tests passed\n');

// ============================================================================
// NEW PASSWORD SCHEMA TESTS
// ============================================================================
console.log('📝 Testing NewPasswordSchema...');

// Valid new password
{
  const result = NewPasswordSchema.safeParse({
    password: 'NewSecure123',
  });
  expect(
    result.success === true,
    'NewPasswordSchema should accept valid password'
  );
}

// Password too short
{
  const result = NewPasswordSchema.safeParse({
    password: 'short',
  });
  expect(
    result.success === false,
    'NewPasswordSchema should reject password shorter than 8 characters'
  );
}

// Password too long
{
  const result = NewPasswordSchema.safeParse({
    password: 'ThisPasswordIsWayTooLongAndExceedsTwentyCharacters',
  });
  expect(
    result.success === false,
    'NewPasswordSchema should reject password longer than 20 characters'
  );
}

console.log('✅ NewPasswordSchema tests passed\n');

console.log('✨ All Authentication Tests Passed!\n');
