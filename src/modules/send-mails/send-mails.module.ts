import { Module } from '@nestjs/common';
import { SendMailsService } from './send-mails.service';

@Module({
  controllers: [],
  providers: [SendMailsService],
})
export class SendMailsModule {}