import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Hash password for test accounts
  const hashedPassword = await bcrypt.hash('password123', 12);

  // Create test users
  const admin = await prisma.user.upsert({
    where: { email: 'admin@encg.test' },
    update: {},
    create: {
      email: 'admin@encg.test',
      name: 'Administrateur ENCG',
      hashedPassword,
      role: 'ADMIN',
    },
  });

  const utilisateur = await prisma.user.upsert({
    where: { email: 'utilisateur@encg.test' },
    update: {},
    create: {
      email: 'utilisateur@encg.test',
      name: 'Utilisateur Standard',
      hashedPassword,
      role: 'UTILISATEUR',
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
