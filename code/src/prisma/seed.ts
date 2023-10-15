import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { categories } from './seeds/categories';
import { users } from './seeds/users';

async function main() {
  const prisma = new PrismaClient({ log: ['query'], errorFormat: 'pretty' });
  try {
    // create profile if not exists
    for (const category of categories) {
      const created = await prisma.category.create({ data: category });
      // Logger.debug(created, `Upsert profile: ${profile.id}`);
    }
    for (const user of users) {
      const created = await prisma.user.create({ data: user });
      // Logger.debug(created, `Upsert profile: ${profile.id}`);
    }
  } catch (e) {
    Logger.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
