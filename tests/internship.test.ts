/**
 * Internship Schema Tests
 * Tests for internship data validation and business logic
 */

import { internshipSchema } from '../schemas/internship';

function expect(condition: boolean, message: string) {
  if (!condition) throw new Error(`❌ ${message}`);
}

console.log('🧪 Running Internship Schema Tests...\n');

// ============================================================================
// VALID INTERNSHIP TESTS
// ============================================================================
console.log('📝 Testing Valid Internship Data...');

// Complete internship with all fields
{
  const result = internshipSchema.safeParse({
    title: 'Software Engineering Intern',
    company: 'TechCorp Morocco',
    location: 'Casablanca, Morocco',
    mode: 'hybrid',
    description:
      'Join our team to work on exciting projects and learn modern technologies.',
    requirements:
      "Bachelor's degree in Computer Science, knowledge of JavaScript",
    stipend: 5000,
    tags: ['JavaScript', 'React', 'Node.js'],
    openings: 3,
    startsAt: new Date('2025-06-01'),
    endsAt: new Date('2025-08-31'),
  });
  expect(result.success === true, 'Complete internship data should be valid');
}

// Minimal required fields
{
  const result = internshipSchema.safeParse({
    title: 'Backend Developer Intern',
    company: 'StartupHub',
    location: 'Rabat',
    mode: 'on-site',
    description: 'Work with our backend team on API development.',
  });
  expect(
    result.success === true,
    'Internship with only required fields should be valid'
  );
}

// Remote internship
{
  const result = internshipSchema.safeParse({
    title: 'Remote Data Analyst Intern',
    company: 'DataInsights',
    location: 'Remote',
    mode: 'remote',
    description: 'Analyze data and create reports for our clients.',
    stipend: 4000,
  });
  expect(result.success === true, 'Remote internship should be valid');
}

// On-site internship
{
  const result = internshipSchema.safeParse({
    title: 'Marketing Intern',
    company: 'MarketingPro',
    location: 'Marrakech',
    mode: 'on-site',
    description: 'Help with social media campaigns and content creation.',
    openings: 2,
  });
  expect(result.success === true, 'On-site internship should be valid');
}

console.log('✅ Valid internship tests passed\n');

// ============================================================================
// INVALID INTERNSHIP TESTS
// ============================================================================
console.log('📝 Testing Invalid Internship Data...');

// Title too short
{
  const result = internshipSchema.safeParse({
    title: 'I',
    company: 'TechCorp',
    location: 'Casablanca',
    mode: 'hybrid',
    description: 'Description here',
  });
  expect(
    result.success === false,
    'Title shorter than 2 characters should be invalid'
  );
}

// Company name too short
{
  const result = internshipSchema.safeParse({
    title: 'Software Intern',
    company: 'T',
    location: 'Casablanca',
    mode: 'hybrid',
    description: 'Description here',
  });
  expect(
    result.success === false,
    'Company name shorter than 2 characters should be invalid'
  );
}

// Location too short
{
  const result = internshipSchema.safeParse({
    title: 'Software Intern',
    company: 'TechCorp',
    location: 'C',
    mode: 'hybrid',
    description: 'Description here',
  });
  expect(
    result.success === false,
    'Location shorter than 2 characters should be invalid'
  );
}

// Invalid mode
{
  const result = internshipSchema.safeParse({
    title: 'Software Intern',
    company: 'TechCorp',
    location: 'Casablanca',
    mode: 'in-office',
    description: 'Description here',
  });
  expect(result.success === false, 'Invalid mode should be rejected');
}

// Description too short
{
  const result = internshipSchema.safeParse({
    title: 'Software Intern',
    company: 'TechCorp',
    location: 'Casablanca',
    mode: 'hybrid',
    description: 'Short',
  });
  expect(
    result.success === false,
    'Description shorter than 10 characters should be invalid'
  );
}

// Negative stipend (currently allowed by schema, but valid as integer)
{
  const result = internshipSchema.safeParse({
    title: 'Software Intern',
    company: 'TechCorp',
    location: 'Casablanca',
    mode: 'hybrid',
    description: 'Description here with enough characters',
    stipend: -1000,
  });
  expect(
    result.success === true,
    'Negative stipend is allowed (schema has no min constraint)'
  );
}

// Non-integer stipend should be invalid
{
  const result = internshipSchema.safeParse({
    title: 'Software Intern',
    company: 'TechCorp',
    location: 'Casablanca',
    mode: 'hybrid',
    description: 'Description here with enough characters',
    stipend: 1000.5,
  });
  expect(result.success === false, 'Non-integer stipend should be invalid');
}

// Zero or negative openings
{
  const result = internshipSchema.safeParse({
    title: 'Software Intern',
    company: 'TechCorp',
    location: 'Casablanca',
    mode: 'hybrid',
    description: 'Description here with enough characters',
    openings: 0,
  });
  expect(result.success === false, 'Zero openings should be invalid');
}

{
  const result = internshipSchema.safeParse({
    title: 'Software Intern',
    company: 'TechCorp',
    location: 'Casablanca',
    mode: 'hybrid',
    description: 'Description here with enough characters',
    openings: -5,
  });
  expect(result.success === false, 'Negative openings should be invalid');
}

// Missing required fields
{
  const result = internshipSchema.safeParse({
    title: 'Software Intern',
    company: 'TechCorp',
  });
  expect(result.success === false, 'Missing required fields should be invalid');
}

console.log('✅ Invalid internship tests passed\n');

// ============================================================================
// EDGE CASES TESTS
// ============================================================================
console.log('📝 Testing Edge Cases...');

// Empty tags array (default)
{
  const result = internshipSchema.safeParse({
    title: 'DevOps Intern',
    company: 'CloudCorp',
    location: 'Fes',
    mode: 'remote',
    description: 'Work with cloud infrastructure and deployment.',
  });
  expect(
    result.success === true,
    'Internship without tags should default to empty array'
  );
  if (result.success) {
    expect(Array.isArray(result.data.tags), 'Tags should be an array');
    expect(result.data.tags.length === 0, 'Default tags should be empty array');
  }
}

// Default openings value
{
  const result = internshipSchema.safeParse({
    title: 'UX Designer Intern',
    company: 'DesignHub',
    location: 'Tangier',
    mode: 'hybrid',
    description: 'Create user interfaces and improve user experience.',
  });
  expect(
    result.success === true,
    'Internship without openings should default to 1'
  );
  if (result.success) {
    expect(result.data.openings === 1, 'Default openings should be 1');
  }
}

// Multiple tags
{
  const result = internshipSchema.safeParse({
    title: 'Full Stack Intern',
    company: 'WebDev Inc',
    location: 'Casablanca',
    mode: 'on-site',
    description: 'Build web applications using modern frameworks.',
    tags: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'GraphQL'],
  });
  expect(
    result.success === true,
    'Internship with multiple tags should be valid'
  );
  if (result.success) {
    expect(result.data.tags.length === 5, 'Should preserve all tags');
  }
}

// Very long but valid description
{
  const longDescription =
    'This is a comprehensive internship opportunity where you will work on various projects, collaborate with experienced developers, learn industry best practices, participate in code reviews, attend team meetings, contribute to open source projects, and gain hands-on experience with cutting-edge technologies in a professional environment.';

  const result = internshipSchema.safeParse({
    title: 'Senior Intern Position',
    company: 'MegaCorp',
    location: 'Casablanca',
    mode: 'hybrid',
    description: longDescription,
  });
  expect(result.success === true, 'Long valid description should be accepted');
}

// Large stipend value
{
  const result = internshipSchema.safeParse({
    title: 'Premium Intern',
    company: 'HighPayCorp',
    location: 'Casablanca',
    mode: 'on-site',
    description: 'High-paying internship for exceptional candidates.',
    stipend: 50000,
  });
  expect(result.success === true, 'Large stipend should be valid');
}

// Date validation (startsAt before endsAt)
{
  const startDate = new Date('2025-06-01');
  const endDate = new Date('2025-08-31');

  const result = internshipSchema.safeParse({
    title: 'Summer Intern',
    company: 'SummerCorp',
    location: 'Agadir',
    mode: 'on-site',
    description: 'Summer internship program for students.',
    startsAt: startDate,
    endsAt: endDate,
  });
  expect(result.success === true, 'Valid date range should be accepted');
}

// Exactly minimum values
{
  const result = internshipSchema.safeParse({
    title: 'AB',
    company: 'XY',
    location: 'CD',
    mode: 'remote',
    description: '1234567890',
    openings: 1,
  });
  expect(result.success === true, 'Exactly minimum values should be valid');
}

console.log('✅ Edge case tests passed\n');

// ============================================================================
// MODE ENUM TESTS
// ============================================================================
console.log('📝 Testing Mode Enum...');

const validModes = ['remote', 'hybrid', 'on-site'];

validModes.forEach((mode) => {
  const result = internshipSchema.safeParse({
    title: `${mode} Internship`,
    company: 'TestCorp',
    location: 'Test Location',
    mode: mode,
    description: 'Testing mode validation',
  });
  expect(result.success === true, `Mode '${mode}' should be valid`);
});

const invalidModes = ['in-office', 'work-from-home', 'flexible', 'onsite', ''];

invalidModes.forEach((mode) => {
  const result = internshipSchema.safeParse({
    title: 'Test Internship',
    company: 'TestCorp',
    location: 'Test Location',
    mode: mode,
    description: 'Testing mode validation',
  });
  expect(result.success === false, `Mode '${mode}' should be invalid`);
});

console.log('✅ Mode enum tests passed\n');

// ============================================================================
// OPTIONAL FIELDS TESTS
// ============================================================================
console.log('📝 Testing Optional Fields...');

// Without optional requirements
{
  const result = internshipSchema.safeParse({
    title: 'No Requirements Intern',
    company: 'OpenCorp',
    location: 'Casablanca',
    mode: 'remote',
    description: 'Open to all applicants regardless of background.',
  });
  expect(
    result.success === true,
    'Internship without requirements should be valid'
  );
}

// Without optional stipend
{
  const result = internshipSchema.safeParse({
    title: 'Volunteer Intern',
    company: 'NonProfit',
    location: 'Rabat',
    mode: 'on-site',
    description: 'Unpaid internship for social impact.',
  });
  expect(result.success === true, 'Internship without stipend should be valid');
}

// Without dates
{
  const result = internshipSchema.safeParse({
    title: 'Flexible Timeline Intern',
    company: 'FlexCorp',
    location: 'Marrakech',
    mode: 'hybrid',
    description: 'Internship with flexible start and end dates.',
  });
  expect(result.success === true, 'Internship without dates should be valid');
}

console.log('✅ Optional fields tests passed\n');

console.log('✨ All Internship Schema Tests Passed!\n');
