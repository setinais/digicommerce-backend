import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Measure } from '../entities/measure.entity';

@ObjectType()
export class FindAllMeasureOutput {
  @Field(() => Int!) total: number;
  @Field(() => [Measure]!) items: Measure[];
  @Field(() => Int, { nullable: true }) take?: number;
  @Field(() => Int, { nullable: true }) skip?: number;
  @Field(() => Int, { nullable: true }) cursor?: number;
}
