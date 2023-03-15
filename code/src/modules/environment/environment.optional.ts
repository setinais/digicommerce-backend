import { LogLevel } from '@nestjs/common';
import { IsBooleanString, IsIn, IsNumber, IsOptional } from 'class-validator';

const LogLevels: LogLevel[] = ['debug', 'error', 'log', 'verbose', 'warn'];

export const environmentOptional = {
  DISABLE_AUTH: process.env.DISABLE_AUTH === 'true',
  GRAPHQL_DEBUG: process.env.GRAPHQL_DEBUG === 'true',
  GRAPHQL_INTROSPECTION: process.env.GRAPHQL_INTROSPECTION === 'true',
  GRAPHQL_PLAYGROUND: process.env.GRAPHQL_PLAYGROUND === 'true',
  JWT_TOKEN_EXPIRE_IN_SEC:
    Number(process.env.JWT_TOKEN_EXPIRE_IN_SEC) || 60 * 60 * 24,
  LOGGER: process.env.LOGGER?.split(',') || ['error', 'log', 'verbose', 'warn'],
};

export class EnvironmentOptional {
  @IsBooleanString()
  DISABLE_AUTH: string;

  @IsBooleanString()
  GRAPHQL_DEBUG: string;

  @IsBooleanString()
  GRAPHQL_INTROSPECTION: string;

  @IsBooleanString()
  GRAPHQL_PLAYGROUND: string;

  @IsOptional()
  @IsNumber()
  JWT_TOKEN_EXPIRE_IN_SEC: number;

  // each: true => Specifies if validated value is an array and each of its items must be validated
  @IsIn(LogLevels, { each: true })
  LOGGER: LogLevel[];
}
