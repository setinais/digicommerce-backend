import * as bcrypt from 'bcrypt';

export const genPassword = (password: string): string => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const compare = (password: string, userPassword: string): boolean => {
  return bcrypt.compareSync(password, userPassword);
};
