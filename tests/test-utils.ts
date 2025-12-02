/**
 * Shared Test Utilities
 */

export function expect(condition: boolean, message: string) {
  if (!condition) throw new Error(`❌ ${message}`);
}

export function logSection(title: string) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`📝 ${title}`);
  console.log('='.repeat(60));
}

export function logTest(description: string) {
  console.log(`  ✓ ${description}`);
}

export function logError(error: Error) {
  console.error(`  ❌ ${error.message}`);
}
