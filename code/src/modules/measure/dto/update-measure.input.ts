import { CreateMeasureInput } from './create-measure.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMeasureInput extends PartialType(CreateMeasureInput) {
  @Field(() => Int)
  id: number;
}
