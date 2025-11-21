import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Setting up test data...');

  // Create test clinics
  const hubClinic = await prisma.clinic.create({
    data: {
      name: 'Hub Fertility Center',
      type: 'LEVEL2',
      location: 'Mumbai, Maharashtra',
      aiProvider: 'GROQ',
      aiApiKey: 'test-api-key', // In a real app, this would be encrypted
    },
  });

  const spokeClinic = await prisma.clinic.create({
    data: {
      name: 'Rural Fertility Clinic',
      type: 'LEVEL1',
      location: 'Pune, Maharashtra',
      hubClinicId: hubClinic.id,
      aiProvider: 'GEMINI',
      aiApiKey: 'test-api-key', // In a real app, this would be encrypted
    },
  });

  console.log('Created clinics:', hubClinic.name, 'and', spokeClinic.name);

  // Create test staff members
  const hubDoctor = await prisma.staff.create({
    data: {
      name: 'Dr. Anjali Sharma',
      role: 'Fertility Specialist',
      email: 'anjali@hubclinic.com',
      passwordHash: await bcrypt.hash('password123', 10),
      clinicId: hubClinic.id,
    },
  });

  const spokeNurse = await prisma.staff.create({
    data: {
      name: 'Nurse Priya Patel',
      role: 'Nurse',
      email: 'priya@spokeclinic.com',
      passwordHash: await bcrypt.hash('password123', 10),
      clinicId: spokeClinic.id,
    },
  });

  console.log('Created staff:', hubDoctor.name, 'and', spokeNurse.name);

  // Create test patients
  const patient1 = await prisma.patient.create({
    data: {
      mrn: 'P001',
      name: 'Sunita Desai',
      age: 32,
      phone: '+91 98765 43210',
      location: 'Pune, Maharashtra',
      medicalHistory: {
        chiefComplaint: 'Primary infertility for 2 years',
        historyPresent: [],
        menstrualHistory: {},
        obstetricHistory: {},
        medicalHistory: {},
        familyHistory: {},
        socialHistory: {}
      },
      clinicId: spokeClinic.id,
    },
  });

  const patient2 = await prisma.patient.create({
    data: {
      mrn: 'P002',
      name: 'Meera Reddy',
      age: 28,
      phone: '+91 98765 43211',
      location: 'Mumbai, Maharashtra',
      medicalHistory: {
        chiefComplaint: 'Secondary infertility for 1 year',
        historyPresent: [],
        menstrualHistory: {},
        obstetricHistory: {},
        medicalHistory: {},
        familyHistory: {},
        socialHistory: {}
      },
      clinicId: hubClinic.id,
    },
  });

  console.log('Created patients:', patient1.name, 'and', patient2.name);

  console.log('Test data setup complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });