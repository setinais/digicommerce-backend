import { Prisma } from '@prisma/client';
import { genPassword } from 'src/core/utils/bcrypt';

export const users: Prisma.UserCreateInput[] = [
  {
    email: 'adm@adm.com',
    name: 'Admin',
    password: genPassword('Stefanini@10'),
  },
];
