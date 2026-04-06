import { Injectable } from '@nestjs/common';
import { CreateProgramFeatureDto } from './dto/create-program-feature.dto';
import { UpdateProgramFeatureDto } from './dto/update-program-feature.dto';

@Injectable()
export class ProgramFeatureService {
  create(createProgramFeatureDto: CreateProgramFeatureDto) {
    return 'This action adds a new programFeature';
  }

  findAll() {
    return `This action returns all programFeature`;
  }

  findOne(id: number) {
    return `This action returns a #${id} programFeature`;
  }

  update(id: number, updateProgramFeatureDto: UpdateProgramFeatureDto) {
    return `This action updates a #${id} programFeature`;
  }

  remove(id: number) {
    return `This action removes a #${id} programFeature`;
  }
}
