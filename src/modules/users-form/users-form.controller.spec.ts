import { Test, TestingModule } from '@nestjs/testing';
import { UsersFormController } from './users-form.controller';
import { UsersFormService } from './users-form.service';

describe('UsersFormController', () => {
  let controller: UsersFormController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersFormController],
      providers: [UsersFormService],
    }).compile();

    controller = module.get<UsersFormController>(UsersFormController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
