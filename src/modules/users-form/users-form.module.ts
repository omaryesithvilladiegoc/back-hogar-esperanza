import { Module } from '@nestjs/common';
import { UsersFormService } from './users-form.service';
import { UsersFormController } from './users-form.controller';

@Module({
  controllers: [UsersFormController],
  providers: [UsersFormService],
})
export class UsersFormModule {}
