const { PrismaClient } = require('@prisma/client');

async function testEnvironment() {
  console.log('Testing environment variables and database connectivity...\n');
  
  // Test environment variables
  console.log('1. Environment Variables:');
  console.log(`   DATABASE_URL: ${process.env.DATABASE_URL ? 'SET' : 'NOT SET'}`);
  console.log(`   CLERK_PUBLISHABLE_KEY: ${process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? 'SET' : 'NOT SET'}`);
  console.log(`   CLERK_SECRET_KEY: ${process.env.CLERK_SECRET_KEY ? 'SET' : 'NOT SET'}`);
  console.log(`   R2_ACCESS_KEY_ID: ${process.env.R2_ACCESS_KEY_ID ? 'SET' : 'NOT SET'}`);
  console.log(`   R2_SECRET_ACCESS_KEY: ${process.env.R2_SECRET_ACCESS_KEY ? 'SET' : 'NOT SET'}`);
  console.log(`   R2_ENDPOINT_URL: ${process.env.R2_ENDPOINT_URL ? 'SET' : 'NOT SET'}\n`);
  
  // Test database connectivity
  try {
    console.log('2. Database Connectivity Test:');
    const prisma = new PrismaClient();
    const clinics = await prisma.clinic.count();
    console.log(`   ✓ Database connected successfully`);
    console.log(`   ✓ Found ${clinics} clinics in the database\n`);
    await prisma.$disconnect();
  } catch (error) {
    console.error('   ✗ Database connection failed:', error.message);
  }
  
  console.log('Environment setup verification complete!');
}

testEnvironment().catch(console.error);