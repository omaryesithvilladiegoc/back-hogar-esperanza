import { Test, TestingModule } from '@nestjs/testing';
import { ProgramFeatureService } from './program-feature.service';

describe('ProgramFeatureService', () => {
  let service: ProgramFeatureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgramFeatureService],
    }).compile();

    service = module.get<ProgramFeatureService>(ProgramFeatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
