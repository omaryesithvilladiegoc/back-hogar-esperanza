import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { UsersFormController } from './users-form.controller';
import { UsersFormService } from './users-form.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

const usersFormServiceMock = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  remove: jest.fn(),
};

describe('UsersFormController', () => {
  let controller: UsersFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersFormController],
      providers: [
        {
          provide: UsersFormService,
          useValue: usersFormServiceMock,
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

    controller = module.get<UsersFormController>(UsersFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
