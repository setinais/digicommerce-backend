import { Module } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryResolver } from './sub-category.resolver';

@Module({
  providers: [SubCategoryResolver, SubCategoryService]
})
export class SubCategoryModule {}
