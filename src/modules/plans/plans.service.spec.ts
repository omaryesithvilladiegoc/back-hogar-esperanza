import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProgramService } from './plans.service';
import { Program } from './entities/plan.entity';
import { ProgramFeature } from '../program-feature/entities/program-feature.entity';

const programRepositoryMock = {
  count: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  findOneBy: jest.fn(),
  update: jest.fn(),
};

const featureRepositoryMock = {
  create: jest.fn(),
};

describe('ProgramService', () => {
  let service: ProgramService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProgramService,
        {
          provide: getRepositoryToken(Program),
          useValue: programRepositoryMock,
        },
        {
          provide: getRepositoryToken(ProgramFeature),
          useValue: featureRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<ProgramService>(ProgramService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
