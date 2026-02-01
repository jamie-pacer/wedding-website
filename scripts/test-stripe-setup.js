#!/usr/bin/env node

/**
 * Stripe Setup Verification Script
 * 
 * This script checks if your Stripe environment variables are properly configured.
 * Run with: node scripts/test-stripe-setup.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking Stripe Configuration...\n');

// Load .env.local file
const envPath = path.join(__dirname, '..', '.env.local');
let envVars = {};

try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      envVars[key] = value;
    }
  });
} catch (error) {
  console.error('❌ Error: Could not read .env.local file');
  console.error('   Make sure .env.local exists in the project root\n');
  process.exit(1);
}

// Check required variables
const checks = [
  {
    name: 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    required: true,
    pattern: /^pk_(test|live)_/,
    description: 'Stripe Publishable Key'
  },
  {
    name: 'STRIPE_SECRET_KEY',
    required: true,
    pattern: /^sk_(test|live)_/,
    description: 'Stripe Secret Key'
  },
  {
    name: 'NEXT_PUBLIC_BASE_URL',
    required: true,
    pattern: /^https?:\/\/.+/,
    description: 'Base URL'
  }
];

let allValid = true;

checks.forEach(check => {
  const value = envVars[check.name];
  
  if (!value || value === 'pk_test_...' || value === 'sk_test_...') {
    console.log(`❌ ${check.description} (${check.name})`);
    console.log(`   Not set or using placeholder value\n`);
    allValid = false;
  } else if (!check.pattern.test(value)) {
    console.log(`⚠️  ${check.description} (${check.name})`);
    console.log(`   Value doesn't match expected pattern: ${check.pattern}\n`);
    allValid = false;
  } else {
    const mode = value.includes('_test_') ? 'TEST' : 'LIVE';
    console.log(`✅ ${check.description} (${check.name})`);
    console.log(`   Mode: ${mode}`);
    console.log(`   Value: ${value.substring(0, 20)}...\n`);
  }
});

// Check if keys match (both test or both live)
const pubKey = envVars['NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'] || '';
const secretKey = envVars['STRIPE_SECRET_KEY'] || '';

const pubIsTest = pubKey.includes('_test_');
const secretIsTest = secretKey.includes('_test_');

if (pubKey && secretKey && pubIsTest !== secretIsTest) {
  console.log('⚠️  WARNING: Publishable and Secret keys are in different modes!');
  console.log(`   Publishable: ${pubIsTest ? 'TEST' : 'LIVE'}`);
  console.log(`   Secret: ${secretIsTest ? 'TEST' : 'LIVE'}`);
  console.log('   Both keys should be in the same mode.\n');
  allValid = false;
}

// Summary
console.log('─'.repeat(60));
if (allValid) {
  console.log('✅ All checks passed! Your Stripe setup looks good.');
  console.log('\nNext steps:');
  console.log('1. Start your dev server: npm run dev');
  console.log('2. Visit http://localhost:3000/registry');
  console.log('3. Test with card: 4242 4242 4242 4242\n');
} else {
  console.log('❌ Some checks failed. Please review the issues above.');
  console.log('\nRefer to STRIPE_SETUP.md for detailed setup instructions.\n');
  process.exit(1);
}
