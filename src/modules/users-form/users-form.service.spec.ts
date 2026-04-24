import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersFormService } from './users-form.service';
import { UsersForm } from './entities/users-form.entity';
import { Program } from '../plans/entities/plan.entity';
import { SendMailsService } from '../send-mails/send-mails.service';

const usersFormRepositoryMock = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
};

const programRepositoryMock = {
  findOne: jest.fn(),
};

const sendMailsServiceMock = {
  sendMail: jest.fn(),
};

describe('UsersFormService', () => {
  let service: UsersFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersFormService,
        {
          provide: getRepositoryToken(UsersForm),
          useValue: usersFormRepositoryMock,
        },
        {
          provide: getRepositoryToken(Program),
          useValue: programRepositoryMock,
        },
        {
          provide: SendMailsService,
          useValue: sendMailsServiceMock,
        },
      ],
    }).compile();

    service = module.get<UsersFormService>(UsersFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
