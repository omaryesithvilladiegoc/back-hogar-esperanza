import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { PlansController } from './plans.controller';
import { ProgramService } from './plans.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

const programServiceMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('PlansController', () => {
  let controller: PlansController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlansController],
      providers: [
        {
          provide: ProgramService,
          useValue: programServiceMock,
        },
        {
          provide: AuthGuard,
          useValue: { canActivate: jest.fn(() => true) },
        },
        {
          provide: RolesGuard,
          useValue: { canActivate: jest.fn(() => true) },
        },
        {
          provide: JwtService,
          useValue: { verify: jest.fn(), sign: jest.fn() },
        },
        {
          provide: Reflector,
          useValue: { getAllAndOverride: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<PlansController>(PlansController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
