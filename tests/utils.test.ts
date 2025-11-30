/**
 * Utility Functions Tests
 * Tests for common utility functions, helpers, and formatters
 */

function expect(condition: boolean, message: string) {
  if (!condition) throw new Error(`❌ ${message}`);
}

console.log('🧪 Running Utility Functions Tests...\n');

// ============================================================================
// PASSWORD STRENGTH VALIDATION
// ============================================================================
console.log('📝 Testing Password Strength Validation...');

type PasswordStrength = 'weak' | 'medium' | 'strong';

function getPasswordStrength(password: string): PasswordStrength {
  if (password.length < 8) return 'weak';

  let strength = 0;
  if (/[a-z]/.test(password)) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^a-zA-Z0-9]/.test(password)) strength++;

  if (strength <= 2) return 'weak';
  if (strength === 3) return 'medium';
  return 'strong';
}

// Weak passwords
{
  expect(
    getPasswordStrength('short') === 'weak',
    'Short password should be weak'
  );
  expect(
    getPasswordStrength('12345678') === 'weak',
    'Only numbers should be weak'
  );
  expect(
    getPasswordStrength('abcdefgh') === 'weak',
    'Only lowercase should be weak'
  );
}

// Medium passwords
{
  expect(
    getPasswordStrength('Password1') === 'medium',
    'Password with upper, lower, and number should be medium'
  );
  expect(
    getPasswordStrength('Pass1234') === 'medium',
    'Mixed case with numbers should be medium'
  );
}

// Strong passwords
{
  expect(
    getPasswordStrength('Password1!') === 'strong',
    'Password with all character types should be strong'
  );
  expect(
    getPasswordStrength('Secure@Pass123') === 'strong',
    'Complex password should be strong'
  );
}

console.log('✅ Password strength validation tests passed\n');

// ============================================================================
// EMAIL VALIDATION
// ============================================================================
console.log('📝 Testing Email Validation...');

function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Valid emails
{
  const validEmails = [
    'user@example.com',
    'test.user@example.com',
    'user+tag@example.co.uk',
    'user123@test-domain.com',
    'a@b.co',
  ];

  validEmails.forEach((email) => {
    expect(isValidEmail(email), `${email} should be valid`);
  });
}

// Invalid emails
{
  const invalidEmails = [
    'invalid',
    '@example.com',
    'user@',
    'user @example.com',
    'user@.com',
    'user@domain',
    '',
  ];

  invalidEmails.forEach((email) => {
    expect(!isValidEmail(email), `${email} should be invalid`);
  });
}

console.log('✅ Email validation tests passed\n');

// ============================================================================
// DATE FORMATTING
// ============================================================================
console.log('📝 Testing Date Formatting...');

function formatDate(date: Date, format: 'short' | 'long' = 'short'): string {
  if (format === 'short') {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Short format
{
  const date = new Date('2025-06-15');
  const formatted = formatDate(date, 'short');
  expect(formatted.includes('2025'), 'Short format should include year');
  expect(
    formatted.includes('06') || formatted.includes('6'),
    'Short format should include month'
  );
}

// Long format
{
  const date = new Date('2025-06-15');
  const formatted = formatDate(date, 'long');
  expect(formatted.includes('2025'), 'Long format should include year');
  expect(formatted.includes('June'), 'Long format should include month name');
}

console.log('✅ Date formatting tests passed\n');

// ============================================================================
// CURRENCY FORMATTING
// ============================================================================
console.log('📝 Testing Currency Formatting...');

function formatCurrency(
  amount: number,
  currency: 'MAD' | 'USD' = 'MAD'
): string {
  const formatted = amount.toLocaleString('fr-MA');
  return currency === 'MAD' ? `${formatted} DH` : `$${formatted}`;
}

// MAD currency
{
  expect(
    formatCurrency(5000, 'MAD').includes('DH'),
    'MAD should use DH suffix'
  );
  expect(formatCurrency(5000, 'MAD').includes('5'), 'Should include amount');
}

// USD currency
{
  expect(formatCurrency(5000, 'USD').includes('$'), 'USD should use $ prefix');
  expect(formatCurrency(5000, 'USD').includes('5'), 'Should include amount');
}

// Large numbers
{
  const result = formatCurrency(1000000, 'MAD');
  expect(result.includes('DH'), 'Large amount should format correctly');
}

console.log('✅ Currency formatting tests passed\n');

// ============================================================================
// STRING MANIPULATION
// ============================================================================
console.log('📝 Testing String Manipulation...');

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Truncate text
{
  expect(
    truncateText('Short', 10) === 'Short',
    'Short text should not be truncated'
  );
  expect(
    truncateText('This is a long text', 10).length <= 13,
    'Long text should be truncated with ellipsis'
  );
  expect(
    truncateText('This is a long text', 10).includes('...'),
    'Truncated text should include ellipsis'
  );
}

// Slugify
{
  expect(
    slugify('Hello World') === 'hello-world',
    'Should convert spaces to hyphens'
  );
  expect(
    slugify('Hello  World') === 'hello-world',
    'Should handle multiple spaces'
  );
  expect(slugify('Hello-World') === 'hello-world', 'Should preserve hyphens');
  expect(
    slugify('Hello, World!') === 'hello-world',
    'Should remove special characters'
  );
  expect(
    slugify('  Hello World  ') === 'hello-world',
    'Should trim whitespace'
  );
}

console.log('✅ String manipulation tests passed\n');

// ============================================================================
// ARRAY UTILITIES
// ============================================================================
console.log('📝 Testing Array Utilities...');

function uniqueArray<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

// Unique array
{
  const result = uniqueArray([1, 2, 2, 3, 3, 3, 4]);
  expect(result.length === 4, 'Should remove duplicates');
  expect(
    result.includes(1) &&
      result.includes(2) &&
      result.includes(3) &&
      result.includes(4),
    'Should preserve unique values'
  );
}

{
  const result = uniqueArray(['a', 'b', 'a', 'c', 'b']);
  expect(result.length === 3, 'Should remove string duplicates');
}

// Chunk array
{
  const result = chunkArray([1, 2, 3, 4, 5, 6], 2);
  expect(result.length === 3, 'Should create 3 chunks');
  expect(result[0].length === 2, 'First chunk should have 2 elements');
  expect(result[2].length === 2, 'Last chunk should have 2 elements');
}

{
  const result = chunkArray([1, 2, 3, 4, 5], 2);
  expect(result.length === 3, 'Should create 3 chunks with uneven split');
  expect(result[2].length === 1, 'Last chunk should have 1 element');
}

console.log('✅ Array utilities tests passed\n');

// ============================================================================
// VALIDATION HELPERS
// ============================================================================
console.log('📝 Testing Validation Helpers...');

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function isValidPhoneNumber(phone: string): boolean {
  // Moroccan phone format
  const regex = /^(\+212|0)([ \-]?[0-9]){9}$/;
  return regex.test(phone);
}

// URL validation
{
  const validUrls = [
    'https://example.com',
    'http://test.com',
    'https://example.com/path',
    'https://sub.example.com',
  ];

  validUrls.forEach((url) => {
    expect(isValidUrl(url), `${url} should be valid`);
  });

  const invalidUrls = ['not-a-url', 'htp://wrong', '', 'example.com'];

  invalidUrls.forEach((url) => {
    expect(!isValidUrl(url), `${url} should be invalid`);
  });
}

// Phone number validation (Moroccan format)
{
  const validPhones = ['+212612345678', '+212 612345678', '0612345678'];

  validPhones.forEach((phone) => {
    expect(isValidPhoneNumber(phone), `${phone} should be valid`);
  });

  const invalidPhones = ['123456', '+1234567890', 'not-a-phone', ''];

  invalidPhones.forEach((phone) => {
    expect(!isValidPhoneNumber(phone), `${phone} should be invalid`);
  });
}

console.log('✅ Validation helpers tests passed\n');

// ============================================================================
// TEXT FORMATTING
// ============================================================================
console.log('📝 Testing Text Formatting...');

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

function titleCase(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Capitalize
{
  expect(capitalize('hello') === 'Hello', 'Should capitalize first letter');
  expect(capitalize('HELLO') === 'Hello', 'Should lowercase rest');
  expect(capitalize('h') === 'H', 'Should work with single character');
}

// Title case
{
  expect(
    titleCase('hello world') === 'Hello World',
    'Should title case each word'
  );
  expect(
    titleCase('HELLO WORLD') === 'Hello World',
    'Should work with uppercase input'
  );
  expect(titleCase('hello') === 'Hello', 'Should work with single word');
}

console.log('✅ Text formatting tests passed\n');

// ============================================================================
// NUMBER UTILITIES
// ============================================================================
console.log('📝 Testing Number Utilities...');

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

// Clamp
{
  expect(clamp(5, 0, 10) === 5, 'Value within range should stay same');
  expect(clamp(-5, 0, 10) === 0, 'Value below min should clamp to min');
  expect(clamp(15, 0, 10) === 10, 'Value above max should clamp to max');
}

// Range check
{
  expect(isInRange(5, 0, 10), '5 should be in range 0-10');
  expect(!isInRange(-1, 0, 10), '-1 should not be in range 0-10');
  expect(!isInRange(11, 0, 10), '11 should not be in range 0-10');
  expect(isInRange(0, 0, 10), '0 should be in range 0-10 (inclusive)');
  expect(isInRange(10, 0, 10), '10 should be in range 0-10 (inclusive)');
}

console.log('✅ Number utilities tests passed\n');

console.log('✨ All Utility Functions Tests Passed!\n');
