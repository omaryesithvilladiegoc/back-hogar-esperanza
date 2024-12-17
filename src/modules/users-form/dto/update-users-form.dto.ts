import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersFormDto } from './create-users-form.dto';

export class UpdateUsersFormDto extends PartialType(CreateUsersFormDto) {}
