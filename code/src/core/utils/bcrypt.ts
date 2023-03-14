import bcrypt from 'bcrypt';

export const genPassword = (password: string): string => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
