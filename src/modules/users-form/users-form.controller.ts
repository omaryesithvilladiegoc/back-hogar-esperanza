import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersFormService } from './users-form.service';
import { UpdateUsersFormDto } from './dto/update-users-form.dto';
import { CreateUserFormDto } from './dto/create-users-form.dto';

@Controller('users-form')
export class UsersFormController {
  constructor(private readonly usersFormService: UsersFormService) {}

  @Post()
  async create(@Body() createUsersFormDto: CreateUserFormDto) {
    try {
      const newUserForm = await this.usersFormService.create(createUsersFormDto);
      return newUserForm;
    } catch (error) {
      throw error
    }
    
   
  }
  @Get()
  findAll() {
    return this.usersFormService.findAll();
  }

 
}
