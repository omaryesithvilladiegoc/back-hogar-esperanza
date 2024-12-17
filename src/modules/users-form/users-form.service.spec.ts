import { Test, TestingModule } from '@nestjs/testing';
import { UsersFormService } from './users-form.service';

describe('UsersFormService', () => {
  let service: UsersFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersFormService],
    }).compile();

    service = module.get<UsersFormService>(UsersFormService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
