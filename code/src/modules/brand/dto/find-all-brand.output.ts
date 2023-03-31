import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Brand } from '../entities/brand.entity';
import { ApiPropertyOptional } from '@nestjs/swagger';

@ObjectType()
export class FindAllBrandOutput {
  @Field(() => Int!) total: number;
  @Field(() => [Brand]!) items: Brand[];
  @Field(() => Int, { nullable: true }) take?: number;
  @Field(() => Int, { nullable: true }) skip?: number;
  @Field(() => String, { nullable: true }) cursor?: string;
}
