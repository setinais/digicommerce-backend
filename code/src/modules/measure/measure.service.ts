import { Injectable } from '@nestjs/common';
import { CreateMeasureInput } from './dto/create-measure.input';
import { UpdateMeasureInput } from './dto/update-measure.input';

@Injectable()
export class MeasureService {
  create(createMeasureInput: CreateMeasureInput) {
    return 'This action adds a new measure';
  }

  findAll() {
    return `This action returns all measure`;
  }

  findOne(id: number) {
    return `This action returns a #${id} measure`;
  }

  update(id: number, updateMeasureInput: UpdateMeasureInput) {
    return `This action updates a #${id} measure`;
  }

  remove(id: number) {
    return `This action removes a #${id} measure`;
  }
}
