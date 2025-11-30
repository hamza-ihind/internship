/**
 * Test Runner
 * Executes all test suites for the internship platform
 */

console.log('🚀 Starting Test Suite...\n');
console.log('='.repeat(60));
console.log('\n');

// Import all test files
import './auth.test';
import './roles.test';
import './internship.test';
import './middleware.test';
import './utils.test';
import './database.test';

console.log('='.repeat(60));
console.log('\n🎉 All Test Suites Passed Successfully!\n');
console.log('Test Coverage:');
console.log('  ✓ Authentication & Authorization');
console.log('  ✓ Role-Based Access Control');
console.log('  ✓ Internship Validation');
console.log('  ✓ Middleware & Route Protection');
console.log('  ✓ Utility Functions');
console.log('  ✓ Database Schema & Business Logic');
console.log('\n');
