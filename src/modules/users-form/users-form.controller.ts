import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersFormService } from './users-form.service';
import { CreateUserFormDto } from './dto/create-users-form.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role } from '../auth/decorators/role.decorator';
import { Roles } from '../auth/enums/roles.enum';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { checkRateLimit, getClientIp } from 'src/common/security/rate-limit';

@Controller('users-form')
export class UsersFormController {
  constructor(private readonly usersFormService: UsersFormService) {}

  @Post()
  async create(
    @Body() createUsersFormDto: CreateUserFormDto,
    @Req() request: Request,
  ) {
    if (createUsersFormDto.website?.trim()) {
      throw new BadRequestException('Solicitud invalida');
    }

    const ip = getClientIp(request);
    const rateLimit = checkRateLimit({
      key: `users-form:${ip}`,
      windowMs: 15 * 60_000,
      maxAttempts: 5,
      blockDurationMs: 60 * 60_000,
    });

    if (!rateLimit.allowed) {
      throw new HttpException(
        'Demasiados envios en poco tiempo. Intenta nuevamente mas tarde.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    const newUserForm = await this.usersFormService.create(createUsersFormDto);
    return {
      message: 'Formulario enviado correctamente.',
      data: newUserForm,
    };
  }

  @ApiBearerAuth()
  @Role(Roles.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Get()
  findAll() {
    return this.usersFormService.findAll();
  }
}
