import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersFormService } from './users-form.service';
import { CreateUsersFormDto } from './dto/create-users-form.dto';
import { UpdateUsersFormDto } from './dto/update-users-form.dto';

@Controller('users-form')
export class UsersFormController {
  constructor(private readonly usersFormService: UsersFormService) {}

  @Post()
  create(@Body() createUsersFormDto: CreateUsersFormDto) {
    return this.usersFormService.create(createUsersFormDto);
  }

  @Get()
  findAll() {
    return this.usersFormService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersFormService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersFormDto: UpdateUsersFormDto) {
    return this.usersFormService.update(+id, updateUsersFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersFormService.remove(+id);
  }
}
