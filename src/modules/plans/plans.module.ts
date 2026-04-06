import { Module } from '@nestjs/common';
import {  ProgramService } from './plans.service';
import { PlansController } from './plans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Program } from './entities/plan.entity';
import { ProgramFeatureService } from '../program-feature/program-feature.service';
import { ProgramFeature } from '../program-feature/entities/program-feature.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Program, ProgramFeature ])],
  controllers: [PlansController],
  providers: [ProgramService],
})
export class PlansModule {}
