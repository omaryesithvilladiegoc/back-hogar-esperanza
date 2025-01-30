import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersFormService } from './users-form.service';
import { CreateUserFormDto } from './dto/create-users-form.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '../auth/decorators/role.decorator';
import { Roles } from '../auth/enums/roles.enum';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('users-form')
export class UsersFormController {
 
  constructor(private readonly usersFormService: UsersFormService) {}

  @Post()
  async create(@Body() createUsersFormDto: CreateUserFormDto) {
    console.log(createUsersFormDto);
    
    try {
      const newUserForm = await this.usersFormService.create(createUsersFormDto);
      console.log(newUserForm);
      return newUserForm;
    } catch (error) {
      console.log(error);
      
      throw error
    }
  }

  @ApiBearerAuth()
  @Role(Roles.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
  @Get()
  findAll() {
    return this.usersFormService.findAll();
  }

 
}
