import { Test, TestingModule } from '@nestjs/testing';
import { SendMailsService } from './send-mails.service';

describe('SendMailsService', () => {
  let service: SendMailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendMailsService],
    }).compile();

    service = module.get<SendMailsService>(SendMailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
