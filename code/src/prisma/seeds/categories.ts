import { Prisma } from '@prisma/client';

export const categories: Prisma.CategoryCreateInput[] = [
  {
    name: 'Tacografo',
    SubCategories: {
      createMany: {
        data: [{ name: '1390' }, { name: '1318' }, { name: 'BVDR' }],
      },
    },
  },
  {
    name: 'Agulhas',
    SubCategories: {
      createMany: {
        data: [{ name: '1390' }, { name: '1318' }],
      },
    },
  },
];
