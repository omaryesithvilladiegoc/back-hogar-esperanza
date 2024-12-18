import { Module } from '@nestjs/common';
import { UsersFormService } from './users-form.service';
import { UsersFormController } from './users-form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersForm } from './entities/users-form.entity';
import { SendMailsService } from '../send-mails/send-mails.service';

@Module({
  imports:[TypeOrmModule.forFeature([UsersForm])],
  controllers: [UsersFormController],
  providers: [UsersFormService, SendMailsService],
})
export class UsersFormModule {}
