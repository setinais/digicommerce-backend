import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Brand } from '../entities/brand.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

@ObjectType()
export class FindAllBrandOutput {
  @Field(() => Int!) total: number;
  @Field(() => [Brand]!) items: Brand[];
}
