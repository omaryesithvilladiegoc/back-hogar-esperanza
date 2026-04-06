import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProgramFeatureService } from './program-feature.service';
import { CreateProgramFeatureDto } from './dto/create-program-feature.dto';
import { UpdateProgramFeatureDto } from './dto/update-program-feature.dto';

@Controller('program-feature')
export class ProgramFeatureController {
  constructor(private readonly programFeatureService: ProgramFeatureService) {}

  @Post()
  create(@Body() createProgramFeatureDto: CreateProgramFeatureDto) {
    return this.programFeatureService.create(createProgramFeatureDto);
  }

  @Get()
  findAll() {
    return this.programFeatureService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.programFeatureService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProgramFeatureDto: UpdateProgramFeatureDto) {
    return this.programFeatureService.update(+id, updateProgramFeatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.programFeatureService.remove(+id);
  }
}
