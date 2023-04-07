import { Field, InputType, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import {
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

@InputType()
export class UpdateAddressInput implements Prisma.AddressUncheckedUpdateInput {
  @IsNotEmpty()
  @IsUUID(4)
  @Field(() => String)
  id: string;

  @IsOptional()
  @IsNumberString()
  @Field(() => String)
  cep?: string;

  @IsOptional()
  @IsInt()
  @Field(() => Int)
  number?: number;

  @IsOptional()
  @IsString()
  @Field(() => String)
  complement?: string;

  @IsOptional()
  @IsString()
  @Field(() => String)
  address?: string;

  @IsOptional()
  @IsString()
  @Field(() => String)
  neighborhood?: string;

  @IsOptional()
  @IsInt()
  @Field(() => Int)
  cityId?: number;
}
