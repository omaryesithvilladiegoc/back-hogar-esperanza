import { Test, TestingModule } from '@nestjs/testing';
import { ProgramFeatureController } from './program-feature.controller';
import { ProgramFeatureService } from './program-feature.service';

describe('ProgramFeatureController', () => {
  let controller: ProgramFeatureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgramFeatureController],
      providers: [ProgramFeatureService],
    }).compile();

    controller = module.get<ProgramFeatureController>(ProgramFeatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
