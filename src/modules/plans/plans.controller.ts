import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProgramService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '../auth/decorators/role.decorator';
import { Roles } from '../auth/enums/roles.enum';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: ProgramService) {}

  @ApiBearerAuth()
  @Role(Roles.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
  @Post()
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.plansService.create(createPlanDto);
  }

  @Get()
  findAll() {
    return this.plansService.findAll();
  }

  @ApiBearerAuth()
  @Role(Roles.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plansService.findOne(id);
  }

  @ApiBearerAuth()
  @Role(Roles.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto) {
    return this.plansService.update(id, updatePlanDto);
  }

  @ApiBearerAuth()
  @Role(Roles.ADMIN)
  @UseGuards(AuthGuard,RolesGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
        return this.plansService.remove(id);
  }
}