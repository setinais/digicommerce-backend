import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient({ log: ['query'], errorFormat: 'pretty' });
  try {
    // create profile if not exists
    // for (const profile of profiles) {
    //   const created = await prisma.profile.upsert({
    //     create: {
    //       id: profile.id,
    //       name: profile.name,
    //     },
    //     update: {},
    //     where: {
    //       id: profile.id,
    //     },
    //   });
    // update sequence
    // Logger.debug(created, `Upsert profile: ${profile.id}`);
    // }
    // const next = await prisma.profile.count();
    // await prisma.$executeRaw`SELECT setval('profiles_id_seq', ${next}, true);`;
  } catch (e) {
    Logger.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
