import { Module } from '@nestjs/common';
import { ProgramFeatureService } from './program-feature.service';
import { ProgramFeatureController } from './program-feature.controller';

@Module({
  controllers: [ProgramFeatureController],
  providers: [ProgramFeatureService],
})
export class ProgramFeatureModule {}
