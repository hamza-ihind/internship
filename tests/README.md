# Test Suite Documentation

## Overview

Comprehensive test suite for the Internship Platform covering authentication, authorization, business logic, and utility functions.

## Test Files

### 1. **auth.test.ts** - Authentication Tests

Tests authentication schemas and validation logic:

- ✅ Login schema validation
- ✅ Registration schema validation (name, email, password)
- ✅ Password change schema with confirmation
- ✅ Password reset schema
- ✅ New password schema with length validation
- ✅ Email format validation
- ✅ Optional 2FA code handling

**Key Test Cases:**

- Valid/invalid email formats
- Password length constraints (8-20 characters)
- Name minimum length (3 characters)
- Password confirmation matching
- Edge cases (exact min/max lengths)

### 2. **roles.test.ts** - Role-Based Access Control Tests

Tests RBAC implementation and permissions:

- ✅ Role enum validation (USER, ADMIN only)
- ✅ Route access by role
- ✅ Default redirects for each role
- ✅ Permission checks for actions
- ✅ Session token role validation
- ✅ Role-based redirects (admin→/admin, user→/dashboard)

**Key Test Cases:**

- Admin accessing admin routes (allowed)
- User accessing admin routes (denied, redirect to /)
- Admin accessing user dashboard (redirect to /admin)
- Permission matrix (VIEW_USERS, EDIT_USERS, etc.)
- Invalid role detection

### 3. **internship.test.ts** - Internship Schema Tests

Tests internship data validation:

- ✅ Complete internship with all fields
- ✅ Minimal required fields
- ✅ Mode enum (remote, hybrid, on-site)
- ✅ Title, company, location minimum lengths
- ✅ Description minimum length (10 chars)
- ✅ Stipend validation (positive integers)
- ✅ Openings validation (minimum 1)
- ✅ Optional fields (requirements, dates, tags)
- ✅ Default values (tags: [], openings: 1)

**Key Test Cases:**

- All three work modes validated
- Negative stipend/openings rejected
- Empty tags default to empty array
- Optional vs required field handling
- Long descriptions accepted

### 4. **middleware.test.ts** - Middleware & Route Protection Tests

Tests route protection and access control:

- ✅ Protected route pattern matching
- ✅ Admin route access control
- ✅ Dashboard route access control
- ✅ Combined middleware logic
- ✅ Authentication state handling
- ✅ Redirect URL construction
- ✅ Nested route protection
- ✅ Edge cases (similar-named routes, case sensitivity)

**Key Test Cases:**

- Public routes bypass protection
- /admin/\* only accessible by ADMIN
- /dashboard/\* redirects ADMIN to /admin
- Unauthenticated users handled by NextAuth
- Nested admin paths protected correctly

### 5. **utils.test.ts** - Utility Functions Tests

Tests helper functions and formatters:

- ✅ Password strength validation (weak/medium/strong)
- ✅ Email validation with regex
- ✅ Date formatting (short/long)
- ✅ Currency formatting (MAD, USD)
- ✅ String manipulation (truncate, slugify)
- ✅ Array utilities (unique, chunk)
- ✅ Validation helpers (URL, phone)
- ✅ Text formatting (capitalize, titleCase)
- ✅ Number utilities (clamp, range check)

**Key Test Cases:**

- Password strength based on character types
- Email regex validation
- Moroccan phone number format (+212...)
- URL validation
- Slugify removes special chars and converts to lowercase
- Clamp keeps values within bounds

### 6. **database.test.ts** - Database Schema & Business Logic Tests

Tests Prisma schema and business rules:

- ✅ User model defaults (role: USER, plan: FREE)
- ✅ Internship status transitions (DRAFT→ACTIVE→CLOSED)
- ✅ Application status lifecycle (PENDING→ACCEPTED/REJECTED/WITHDRAWN)
- ✅ Relationship validations (user-applications)
- ✅ Token expiration checks
- ✅ Unique constraints (email, tokens)
- ✅ Plan limits (FREE: 5 apps/month, PRO: unlimited)
- ✅ Business rules (can apply?, can edit?, can withdraw?)

**Key Test Cases:**

- Default values on model creation
- Status-based action permissions
- Application withdrawal rules (only PENDING)
- Duplicate application detection
- FREE plan application limits enforced
- Token expiration validation

## Running Tests

```bash
# Run all tests
npm test

# The test runner executes all test files in order
```

## Test Structure

Each test file follows this pattern:

```typescript
function expect(condition: boolean, message: string) {
  if (!condition) throw new Error(`❌ ${message}`);
}

console.log('🧪 Running [Category] Tests...\n');

// Test groups with descriptive headers
console.log('📝 Testing [Feature]...');

// Individual test cases
{
  const result = someFunction(input);
  expect(result === expected, 'Should produce expected output');
}

console.log('✅ [Feature] tests passed\n');
```

## Test Coverage Summary

| Category       | Test File          | Tests    | Status |
| -------------- | ------------------ | -------- | ------ |
| Authentication | auth.test.ts       | 40+      | ✅     |
| Authorization  | roles.test.ts      | 50+      | ✅     |
| Internships    | internship.test.ts | 35+      | ✅     |
| Middleware     | middleware.test.ts | 45+      | ✅     |
| Utilities      | utils.test.ts      | 50+      | ✅     |
| Database       | database.test.ts   | 40+      | ✅     |
| **Total**      | **6 files**        | **260+** | **✅** |

## Key Features Tested

### Authentication & Security

- ✅ Password strength validation
- ✅ Email format validation
- ✅ 2FA support
- ✅ Token expiration
- ✅ Password reset flow

### Authorization

- ✅ Role-based access control (ADMIN, USER)
- ✅ Permission checks
- ✅ Route protection
- ✅ Smart redirects based on role

### Business Logic

- ✅ Internship lifecycle (DRAFT→ACTIVE→CLOSED)
- ✅ Application lifecycle (PENDING→ACCEPTED/REJECTED/WITHDRAWN)
- ✅ Plan-based limits (FREE vs PRO)
- ✅ Duplicate application prevention
- ✅ Status-based action permissions

### Data Validation

- ✅ Schema validation (Zod)
- ✅ Model constraints (Prisma)
- ✅ Unique constraints
- ✅ Required vs optional fields
- ✅ Enum validation

## Best Practices

1. **Descriptive Test Names**: Each test clearly states what it validates
2. **Edge Cases**: Tests include boundary conditions and edge cases
3. **Positive & Negative Tests**: Both valid and invalid inputs tested
4. **Isolated Tests**: Each test is independent and can run in any order
5. **Clear Output**: Emoji indicators and grouping for easy reading
6. **Type Safety**: Full TypeScript typing throughout

## Extending Tests

To add new tests:

1. Create a new test file: `tests/feature.test.ts`
2. Follow the existing pattern with expect() helper
3. Add descriptive console.log() headers
4. Import in `tests/run.ts`
5. Run `npm test` to verify

Example:

```typescript
// tests/payments.test.ts
import { paymentSchema } from '../schemas/payment';

function expect(condition: boolean, message: string) {
  if (!condition) throw new Error(`❌ ${message}`);
}

console.log('🧪 Running Payment Tests...\n');

// Your tests here...

console.log('✨ All Payment Tests Passed!\n');
```

Then add to `tests/run.ts`:

```typescript
import './payments.test';
```

## Notes

- Tests use in-memory validation (no database connection required)
- Fast execution (< 1 second for all tests)
- No external dependencies or mocking needed
- Pure logic and schema validation
- Great for CI/CD pipelines

---

**Last Updated**: November 30, 2025  
**Test Framework**: Custom TypeScript runner with tsx  
**Total Tests**: 260+  
**Coverage**: Authentication, Authorization, Validation, Business Logic
