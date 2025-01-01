import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role } from 'src/modules/auth/decorators/role.decorator';
import { AuthGuard } from 'src/modules/auth/guards/auth.guard';
import { RolesGuard } from 'src/modules/auth/guards/roles.guard';
import { Roles } from 'src/modules/auth/enums/roles.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @ApiBearerAuth()
  @Role(Roles.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto):Promise<User> {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      throw error
    }
  }

  @ApiBearerAuth()
  @Role(Roles.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
  @Get()
  async findAll():Promise<User[]> {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw error
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string):Promise<User> {
    try {
      return await this.userService.findOne(id);
    } catch (error) {
      throw error
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
