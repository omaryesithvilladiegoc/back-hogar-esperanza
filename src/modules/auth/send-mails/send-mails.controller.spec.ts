import { Test, TestingModule } from '@nestjs/testing';
import { SendMailsController } from './send-mails.controller';
import { SendMailsService } from './send-mails.service';

describe('SendMailsController', () => {
  let controller: SendMailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SendMailsController],
      providers: [SendMailsService],
    }).compile();

    controller = module.get<SendMailsController>(SendMailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
