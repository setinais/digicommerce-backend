import { IsIn, IsInt, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

const NodeEnvs: string[] = ['development', 'production'];

export const environmentMandatory = {
  API_NAME: process.env.API_NAME as string,
  API_PORT: Number(process.env.API_PORT),
  API_KEY: process.env.API_KEY as string,
  DATABASE_URL: process.env.DATABASE_URL?.trim(),
  NODE_ENV: process.env.NODE_ENV,
};

export class EnvironmentMandatory {
  @IsNotEmpty()
  @IsString()
  API_NAME: string;

  @IsInt()
  @IsNumber()
  @Min(1)
  @Max(65536)
  @IsNotEmpty()
  API_PORT: number;

  @IsNotEmpty()
  @IsString()
  API_KEY: string;

  @IsNotEmpty({ message: 'postgresql://<user>:<password>@<host>:<port>/<database>?schema=public' })
  @IsString({ message: 'postgresql://<user>:<password>@<host>:<port>/<database>?schema=public' })
  DATABASE_URL: string;

  @IsIn(NodeEnvs)
  NODE_ENV: string;
}
