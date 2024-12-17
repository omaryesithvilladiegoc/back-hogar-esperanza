import { Injectable } from '@nestjs/common';
import { CreateUsersFormDto } from './dto/create-users-form.dto';
import { UpdateUsersFormDto } from './dto/update-users-form.dto';

@Injectable()
export class UsersFormService {
  create(createUsersFormDto: CreateUsersFormDto) {
    return 'This action adds a new usersForm';
  }

  findAll() {
    return `This action returns all usersForm`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersForm`;
  }

  update(id: number, updateUsersFormDto: UpdateUsersFormDto) {
    return `This action updates a #${id} usersForm`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersForm`;
  }
}
