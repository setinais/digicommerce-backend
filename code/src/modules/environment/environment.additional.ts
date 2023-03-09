import { IsNotEmpty, IsString } from 'class-validator';

export const environmentAdditional = {
  API_DIGICOMMERCE_HOST: process.env.API_DIGICOMMERCE_HOST as string,
  API_DIGICOMMERCE_SECRET: process.env.API_DIGICOMMERCE_SECRET as string,
  REDIS_HOST: process.env.REDIS_HOST || '',
  REDIS_PORT: Number(process.env.REDIS_PORT) || 0,
};

export class EnvironmentAdditional {
  @IsNotEmpty()
  @IsString({ message: 'API address of Access' })
  API_DIGICOMMERCE_HOST: string;

  @IsNotEmpty()
  @IsString({ message: 'API secret key of Access' })
  API_DIGICOMMERCE_SECRET: string;
}
