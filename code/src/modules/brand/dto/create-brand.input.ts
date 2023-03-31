import { InputType, Int, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateBrandInput implements Prisma.BrandCreateInput {
  @IsNotEmpty()
  @Field(() => String)
  name: string;
}
